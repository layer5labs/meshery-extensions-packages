# Coding Agent Guidelines for Layer5/Meshery Repositories

This document provides comprehensive guidelines for GitHub Copilot coding agents and AI assistants working across Layer5 and Meshery repositories, with specific focus on cross-repository CI/CD workflows and infrastructure-as-code tooling.

## Table of Contents

1. [Repository Ecosystem](#repository-ecosystem)
2. [General Principles](#general-principles)
3. [Sparse Checkout for Large Repositories](#sparse-checkout-for-large-repositories)
4. [Cross-Repository CI/CD Patterns](#cross-repository-cicd-patterns)
5. [GitHub Actions Best Practices](#github-actions-best-practices)
6. [Testing and Validation](#testing-and-validation)
7. [Security Considerations](#security-considerations)
8. [Asset and Resource Management](#asset-and-resource-management)

## Repository Ecosystem

### Core Repositories

Understanding the relationship between these repositories is critical:

#### 1. **meshery/meshery**
- **Purpose:** Main Meshery application - self-service engineering platform
- **Technology:** Go (backend), React (frontend), Kubernetes
- **Key Features:** Cloud native infrastructure management, multi-cluster Kubernetes deployments, visual GitOps
- **Agent Considerations:** 
  - Large codebase with multiple components
  - Requires understanding of Kubernetes concepts
  - Heavy integration testing requirements

#### 2. **layer5io/meshery-cloud**
- **Purpose:** Layer5 Cloud backend and remote provider
- **Technology:** Backend services, authentication, APIs
- **Key Features:** User management, design catalog, cloud synchronization
- **Agent Considerations:**
  - Security-sensitive operations
  - API versioning important
  - Requires careful handling of user data

#### 3. **layer5labs/meshery-extensions**
- **Purpose:** Meshery UI extensions and plugin framework
- **Technology:** JavaScript/React, extension APIs
- **Key Features:** Extension framework, UI components, plugin system
- **Agent Considerations:**
  - Frontend-focused development
  - Component reusability
  - Browser compatibility requirements

#### 4. **layer5labs/meshery-extensions-packages**
- **Purpose:** Multi-function asset repository
- **Technology:** Static assets, HTML/CSS, GitHub Actions
- **Key Features:** Badge storage, snapshot images, email templates, design embeds
- **Agent Considerations:**
  - **CRITICAL:** Very large repository - always use sparse checkout
  - Binary asset management
  - Public URL accessibility requirements
  - Cross-repository references

#### 5. **layer5labs/kanvas-snapshot** (This Repository)
- **Purpose:** GitHub Action for infrastructure-as-code visualization
- **Technology:** Composite GitHub Action, Node.js, Cypress, Bash
- **Key Features:** Generates visual snapshots of K8s manifests, Helm charts, Docker Compose
- **Agent Considerations:**
  - Composite action with multiple sub-actions
  - Integration with Meshery Cloud APIs
  - Cypress E2E testing
  - Asset upload to meshery-extensions-packages

## General Principles

### 1. Minimal Changes Philosophy

- Make the smallest possible changes to achieve the goal
- Don't refactor working code unless directly related to the task
- Preserve existing patterns and conventions
- Document significant architectural decisions

### 2. Cross-Repository Awareness

When working on features that span repositories:

```yaml
# Example: Action that references multiple repos
- name: Checkout kanvas-snapshot
  uses: actions/checkout@v4
  with:
    repository: layer5labs/kanvas-snapshot
    path: action

- name: Checkout meshery-extensions-packages (SPARSE!)
  uses: actions/checkout@v4
  with:
    repository: layer5labs/meshery-extensions-packages
    sparse-checkout: |
      action-assets
      design-assets
    sparse-checkout-cone-mode: false
    path: packages
```

### 3. Understand the Workflow Context

Before making changes:
- Identify which repository the change impacts
- Understand the data flow between systems
- Consider downstream dependencies
- Review related GitHub Actions workflows

## Sparse Checkout for Large Repositories

### Why Sparse Checkout Matters

The `meshery-extensions-packages` repository contains:
- Thousands of badge images (SVG/PNG)
- Snapshot images accumulated over time
- Email templates with embedded images
- Design embed files with assets

**Without sparse checkout, cloning can take 15+ minutes and consume 10+ GB.**

### Implementing Sparse Checkout

#### In GitHub Actions:

```yaml
- name: Sparse checkout (REQUIRED for large repos)
  uses: actions/checkout@v4
  with:
    repository: layer5labs/meshery-extensions-packages
    sparse-checkout: |
      assets/badges
      email/templates
    sparse-checkout-cone-mode: false
    fetch-depth: 1  # Shallow clone
```

#### Command Line:

```bash
# Initial sparse clone
git clone --filter=blob:none --sparse https://github.com/layer5labs/meshery-extensions-packages
cd meshery-extensions-packages

# Add specific directories
git sparse-checkout add assets/badges
git sparse-checkout add action-assets/2024@11

# List current sparse checkout
git sparse-checkout list

# Disable sparse checkout (use with caution)
git sparse-checkout disable
```

#### Best Practices:

1. **Only checkout what you need:** Be specific about directories
2. **Use shallow clones:** Set `fetch-depth: 1` in actions
3. **Cache when possible:** Cache the sparse checkout between workflow runs
4. **Monitor runner disk space:** Add checks for available space
5. **Document requirements:** Comment in workflows why specific paths are needed

```yaml
# Good example with caching
- name: Cache sparse checkout
  uses: actions/cache@v3
  with:
    path: meshery-extensions-packages
    key: sparse-${{ runner.os }}-${{ hashFiles('.git/sparse-checkout') }}

- name: Sparse checkout packages
  if: steps.cache.outputs.cache-hit != 'true'
  uses: actions/checkout@v4
  with:
    repository: layer5labs/meshery-extensions-packages
    sparse-checkout: |
      assets/badges
    path: meshery-extensions-packages
```

## Cross-Repository CI/CD Patterns

### Pattern 1: Snapshot Generation and Upload

**Flow:** kanvas-snapshot → Meshery Cloud → meshery-extensions-packages

```yaml
# In kanvas-snapshot action
name: "Generate and Upload Snapshot"
steps:
  # 1. Generate snapshot using Meshery Cloud API
  - name: Create design snapshot
    env:
      MESHERY_TOKEN: ${{ secrets.MESHERY_TOKEN }}
      DESIGN_ID: ${{ env.APPLICATION_ID }}
    run: |
      # Cypress test generates snapshot
      npm run snapshot

  # 2. Upload to meshery-extensions-packages
  - name: Upload snapshot
    run: |
      node node-file-upload/index.js
    env:
      ASSET_LOCATION: action-assets/2024@11
```

**Agent Considerations:**
- Ensure proper authentication token handling
- Verify snapshot generation before upload
- Handle upload failures gracefully
- Maintain both light and dark versions

### Pattern 2: Badge Update Workflows

**Flow:** meshery-cloud → meshery-extensions-packages → User repositories

```yaml
# Triggered by badge achievement in meshery-cloud
name: Update User Badge
on:
  repository_dispatch:
    types: [badge-earned]

jobs:
  update-badge:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          sparse-checkout: |
            assets/badges/${{ github.event.client_payload.badge_name }}
          sparse-checkout-cone-mode: false

      - name: Generate badge variants
        run: |
          # Create SVG and PNG versions
          ./scripts/generate-badge.sh "${{ github.event.client_payload.badge_name }}"

      - name: Commit and push
        run: |
          git config user.name "meshery-bot"
          git add assets/badges
          git commit -m "Add badge: ${{ github.event.client_payload.badge_name }}"
          git push
```

### Pattern 3: Email Template Deployment

**Flow:** meshery-extensions-packages → meshery-cloud email service

```yaml
# Validate and deploy email templates
name: Deploy Email Templates
on:
  push:
    paths:
      - 'email/**'

jobs:
  validate-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          sparse-checkout: |
            email
          sparse-checkout-cone-mode: false

      - name: Validate HTML templates
        run: |
          npm install html-validate
          npx html-validate email/**/*.html

      - name: Test inline CSS
        run: |
          npm install juice
          node scripts/validate-email-css.js

      - name: Deploy to staging
        if: github.ref == 'refs/heads/main'
        run: |
          # Upload to staging environment
          ./scripts/deploy-templates.sh staging

      - name: Deploy to production
        if: github.ref == 'refs/heads/release'
        run: |
          ./scripts/deploy-templates.sh production
```

## GitHub Actions Best Practices

### 1. Composite Actions Structure

For reusable actions like kanvas-snapshot:

```yaml
# action.yml
name: "Kanvas Snapshot"
description: "Generates infrastructure visualization"
inputs:
  githubToken:
    description: "GitHub PAT"
    required: true
  mesheryToken:
    description: "Meshery Cloud token"
    required: true
  application_type:
    description: "Type: Kubernetes Manifest, Docker Compose, or Helm Chart"
    required: true

runs:
  using: "composite"
  steps:
    - name: Validate inputs
      shell: bash
      run: |
        if [[ -z "${{ inputs.mesheryToken }}" ]]; then
          echo "Error: mesheryToken is required"
          exit 1
        fi

    - name: Execute snapshot generation
      shell: bash
      run: |
        # Main logic here
        ./action/scripts/generate-snapshot.sh
```

**Key Points:**
- Use `composite` for multi-step actions
- Validate inputs early
- Use `shell: bash` for all steps
- Handle errors explicitly
- Provide clear output messages

### 2. Timeout and Resource Management

```yaml
jobs:
  snapshot:
    runs-on: ubuntu-latest
    timeout-minutes: 15  # Prevent hanging jobs
    
    steps:
      - name: Check disk space
        run: |
          df -h
          if [ $(df / | awk 'NR==2 {print $5}' | sed 's/%//') -gt 80 ]; then
            echo "Warning: Low disk space"
          fi

      - name: Clean up after job
        if: always()
        run: |
          # Clean temporary files
          rm -rf /tmp/meshery-*
          docker system prune -f
```

### 3. Secret and Credential Management

```yaml
# Good practices
env:
  MESHERY_TOKEN: ${{ secrets.MESHERY_TOKEN }}  # Never log this
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

steps:
  - name: Use secrets safely
    run: |
      # NEVER echo secrets
      # BAD: echo $MESHERY_TOKEN
      
      # GOOD: Use in commands without displaying
      curl -H "Authorization: Bearer $MESHERY_TOKEN" \
           https://api.layer5.io/...
    env:
      MESHERY_TOKEN: ${{ secrets.MESHERY_TOKEN }}

  - name: Mask sensitive data in logs
    run: |
      # Use ::add-mask:: to hide values in logs
      echo "::add-mask::$SENSITIVE_VALUE"
```

### 4. Conditional Execution

```yaml
steps:
  - name: Ping Meshery Playground
    id: ping
    run: |
      if curl -f https://playground.meshery.io/health; then
        echo "available=true" >> $GITHUB_OUTPUT
      else
        echo "available=false" >> $GITHUB_OUTPUT
      fi

  - name: Use playground if available
    if: steps.ping.outputs.available == 'true'
    run: |
      echo "Using playground.meshery.io"
      echo "MESHERY_URL=https://playground.meshery.io" >> $GITHUB_ENV

  - name: Start local Meshery
    if: steps.ping.outputs.available != 'true'
    uses: helm/kind-action@v1.10.0
    with:
      cluster_name: "meshery-test"
```

### 5. Artifact Management

```yaml
- name: Upload snapshot artifacts
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: snapshots-${{ github.run_id }}
    path: |
      screenshots/*.png
      logs/*.txt
    retention-days: 7  # Clean up old artifacts

- name: Download artifacts in dependent job
  uses: actions/download-artifact@v4
  with:
    name: snapshots-${{ github.run_id }}
    path: ./downloaded-snapshots
```

## Testing and Validation

### 1. Local Testing of Actions

```bash
# Use 'act' to test GitHub Actions locally
# Install: https://github.com/nektos/act

# Test specific job
act -j test-snapshot

# Test with secrets
act -j test-snapshot --secret-file .secrets

# Test with specific event
act push -e test-event.json

# Dry run to see what would execute
act -n
```

### 2. Integration Testing

```javascript
// Example Cypress test for snapshot generation
describe('Snapshot Generation', () => {
  before(() => {
    cy.login(Cypress.env('token'))
  })

  it('should generate snapshot for Kubernetes manifest', () => {
    cy.uploadDesign({
      type: 'Kubernetes Manifest',
      content: cy.fixture('k8s-manifest.yaml')
    })

    cy.generateSnapshot()
      .should('have.property', 'imageUrl')
      .and('match', /https:\/\/.*\.png$/)
  })

  it('should create both light and dark versions', () => {
    cy.task('checkFile', 'design-123-light.png').should('exist')
    cy.task('checkFile', 'design-123-dark.png').should('exist')
  })
})
```

### 3. Validation Scripts

```bash
#!/bin/bash
# validate-snapshot.sh

set -e

IMAGE_PATH=$1
EXPECTED_SIZE_MIN=10000  # 10KB minimum

# Check file exists
if [ ! -f "$IMAGE_PATH" ]; then
  echo "Error: Image not found at $IMAGE_PATH"
  exit 1
fi

# Check file size (portable method)
SIZE=$(wc -c < "$IMAGE_PATH" | tr -d ' ')
if [ "$SIZE" -lt "$EXPECTED_SIZE_MIN" ]; then
  echo "Error: Image too small ($SIZE bytes)"
  exit 1
fi

# Verify it's a valid PNG
if ! file "$IMAGE_PATH" | grep -q "PNG"; then
  echo "Error: Not a valid PNG image"
  exit 1
fi

echo "Validation passed for $IMAGE_PATH"
```

## Security Considerations

### 1. Token and Secret Security

```yaml
# DO NOT do this:
- name: Bad example
  run: |
    echo "Token is: ${{ secrets.MESHERY_TOKEN }}"  # NEVER!
    curl -v https://api.layer5.io/...  # -v exposes auth headers in logs

# DO this instead:
- name: Good example
  run: |
    # Use secrets without logging (no -v flag, use -f for fail-fast)
    response=$(curl -f -s -H "Authorization: Bearer $MESHERY_TOKEN" \
                     https://api.layer5.io/...)
    # Process response safely
    echo "Request completed"
  env:
    MESHERY_TOKEN: ${{ secrets.MESHERY_TOKEN }}
```

### 2. Input Validation

```bash
# Validate user inputs to prevent injection attacks
validate_input() {
  local input=$1
  # Pattern allows UUIDs and design IDs (alphanumeric, hyphens, underscores, dots)
  local pattern='^[a-zA-Z0-9._-]+$'
  
  if [[ ! $input =~ $pattern ]]; then
    echo "Error: Invalid input format (only alphanumeric, dots, hyphens, underscores allowed)"
    exit 1
  fi
}

# Usage
DESIGN_ID="${{ inputs.designID }}"
validate_input "$DESIGN_ID"
```

### 3. Dependency Security

```yaml
# Pin action versions
- uses: actions/checkout@v4.1.1  # Good: specific version
# NOT: uses: actions/checkout@master  # Bad: moving target

# Scan for vulnerabilities
- name: Security scan
  run: |
    npm audit --audit-level=high
    # or
    go list -json -m all | nancy sleuth
```

## Asset and Resource Management

### 1. Image Optimization

```bash
#!/bin/bash
# optimize-images.sh

for image in assets/**/*.png; do
  # Optimize PNG files
  optipng -o7 "$image"
  
  # Or use ImageMagick
  convert "$image" -strip -quality 85 "$image"
done

for image in assets/**/*.svg; do
  # Optimize SVG files
  svgo "$image"
done
```

### 2. Storage Management

```yaml
# Cleanup old snapshots workflow
name: Cleanup Old Snapshots
on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly on Sunday

jobs:
  cleanup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          sparse-checkout: |
            action-assets
          fetch-depth: 0  # Need history for age calculation

      - name: Remove snapshots older than 90 days
        run: |
          # Use safer deletion method with confirmation
          find action-assets -name "*.png" -type f -mtime +90 -print0 | xargs -0 rm -f

      - name: Commit cleanup
        run: |
          git config user.name "meshery-bot"
          git add action-assets
          git commit -m "Clean up snapshots older than 90 days" || echo "Nothing to clean"
          git push
```

### 3. CDN and Caching

```yaml
# For frequently accessed assets
- name: Upload to CDN
  run: |
    # Upload to CDN with proper cache headers
    aws s3 cp design-assets/ s3://cdn.layer5.io/designs/ \
      --recursive \
      --cache-control "public, max-age=31536000" \
      --metadata-directive REPLACE
```

## Troubleshooting Guide

### Common Issues and Solutions

#### Issue: "Repository too large to clone"

**Solution:**
```bash
# Use sparse checkout
git clone --filter=blob:none --sparse \
  https://github.com/layer5labs/meshery-extensions-packages
git sparse-checkout add <needed-directory>
```

#### Issue: "Snapshot upload fails intermittently"

**Solution:**
```bash
# Add retry logic
upload_with_retry() {
  local max_attempts=3
  local attempt=1
  
  while [ $attempt -le $max_attempts ]; do
    if node upload.js; then
      echo "Upload successful"
      return 0
    fi
    echo "Attempt $attempt failed, retrying..."
    attempt=$((attempt + 1))
    sleep 5
  done
  
  echo "Upload failed after $max_attempts attempts"
  return 1
}

upload_with_retry
```

#### Issue: "GitHub Action timeout"

**Solution:**
```yaml
# Optimize workflow
jobs:
  test:
    timeout-minutes: 20  # Set reasonable timeout
    steps:
      - uses: actions/cache@v3  # Add caching
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
      
      - name: Use sparse checkout
        # Only checkout what's needed
```

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Meshery Documentation](https://docs.meshery.io)
- [Layer5 Community Handbook](https://layer5.io/community/handbook)
- [Git Sparse Checkout Guide](https://git-scm.com/docs/git-sparse-checkout)
- [Composite Actions Guide](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action)

## Contributing

When contributing across these repositories:

1. Review this guide before starting
2. Test locally when possible
3. Use sparse checkout for large repos
4. Document cross-repo dependencies
5. Add appropriate error handling
6. Update relevant documentation
7. Request reviews from maintainers familiar with the integration points

---

**Questions?** Join us on [Slack](https://slack.layer5.io) or open a discussion in the [Community Forum](https://discuss.layer5.io).
