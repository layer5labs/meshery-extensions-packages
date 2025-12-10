# GitHub Copilot Coding Agent Instructions for meshery-extensions-packages

This document provides comprehensive instructions for GitHub Copilot coding agents working on the [meshery-extensions-packages](https://github.com/layer5labs/meshery-extensions-packages) repository.

## Repository Overview

The `meshery-extensions-packages` repository is a multi-function repository that serves several critical purposes in the Layer5/Meshery ecosystem:

### Primary Functions

1. **Layer5 Badges** - Recognition program assets (SVG/PNG format)
2. **Layer5 Cloud Remote Provider Packages** - Email templates and release artifacts
3. **Kanvas Snapshot Images** - Infrastructure-as-code visual diagrams stored as images
4. **Embedded Meshery Designs** - Exportable design files with HTML/CSS/JS

### Repository Structure

```
/assets
  /badges           - SVG and PNG badge representations
  /meshmap          - Animated GIFs, SVGs, quick tips
  /organizations    - Custom org icons (PNG) namespaced by org UUID
  /kanvas           - Images for Kanvas designs, roadmaps, flowcharts
    /getting-started - WebP format images
/email              - HTML email templates, assets for layer5-cloud
/action-assets      - PR snapshot images (namespaced by year/month)
  /2024@7/<design-id>-light.png
  /2024@7/<design-id>-dark.png
/design-assets      - Catalog item snapshots (permanent links)
  /<design-id>-light.png
  /<design-id>-dark.png
/meshery-design-embed - Exported design files for web embedding
```

## Critical Considerations

### ⚠️ SPARSE CHECKOUT REQUIREMENT

**IMPORTANT**: This repository has a very large file size due to extensive image and asset storage. Always use sparse checkout to avoid overloading GitHub Action runners.

```bash
# Correct sparse checkout approach
git clone --filter=blob:none --sparse https://github.com/layer5labs/meshery-extensions-packages
git sparse-checkout add assets
```

**For CI/CD workflows, always configure sparse checkout:**

```yaml
- uses: actions/checkout@v4
  with:
    repository: layer5labs/meshery-extensions-packages
    sparse-checkout: |
      assets/badges
      email
    sparse-checkout-cone-mode: false
```

### Cross-Repository Integration

The meshery-extensions-packages repository integrates with multiple related repositories:

1. **[meshery/meshery](https://github.com/meshery/meshery)** - Main Meshery application
   - Cloud native infrastructure management platform
   - Kubernetes multi-cluster deployments
   - Visual and collaborative GitOps

2. **[layer5io/meshery-cloud](https://github.com/layer5io/meshery-cloud)** - Layer5 Cloud backend
   - Remote provider for Meshery
   - Authentication and user management
   - Catalog and design storage

3. **[layer5labs/meshery-extensions](https://github.com/layer5labs/meshery-extensions)** - Meshery UI extensions
   - Extension framework for Meshery
   - UI components and plugins

4. **[layer5labs/kanvas-snapshot](https://github.com/layer5labs/kanvas-snapshot)** - GitHub Action
   - Generates visual snapshots of infrastructure-as-code
   - Supports Kubernetes manifests, Helm charts, Docker Compose
   - Uploads snapshots to meshery-extensions-packages

## Coding Best Practices

### 1. Asset Management

**When adding or modifying assets:**

- Follow established naming conventions:
  - PR snapshots: `/action-assets/YYYY@M/<design-id>-{light|dark}.png`
  - Catalog snapshots: `/design-assets/<design-id>-{light|dark}.png`
  - Organization icons: `/assets/organizations/<org-uuid>/{mobile|desktop}.png`

- Always provide both light and dark mode versions for images
- Use appropriate formats:
  - Badges: SVG (preferred) and PNG
  - Screenshots: PNG
  - Marketing/UI: WebP for better compression
  - Animated content: GIF or animated SVG

- Optimize images before committing:
  ```bash
  # Example using imagemagick
  convert input.png -strip -quality 85 output.png
  ```

### 2. Email Template Development

**When working with email templates in `/email`:**

- Use inline CSS for email compatibility
- Test across multiple email clients (Gmail, Outlook, Apple Mail)
- Ensure images are referenced via permanent URLs (not relative paths)
- Include alt text for all images
- Use table-based layouts for maximum compatibility
- Test responsive behavior for mobile devices

```html
<!-- Good example - use main or specific tag for stability -->
<img src="https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/main/assets/badges/meshmap/meshmap.svg" 
     alt="MeshMap Badge" 
     style="max-width: 100%; height: auto;" />
```

### 3. CI/CD Workflow Development

**When creating or modifying GitHub Actions workflows:**

- Always use sparse checkout (see example above)
- Set appropriate timeouts to prevent runaway jobs
- Use caching for dependencies when possible
- Handle large file uploads in chunks if needed
- Implement proper error handling and retry logic

```yaml
# Example workflow with sparse checkout
name: Update Badges
on:
  workflow_dispatch:
  push:
    branches: [master, main]
    paths:
      - 'assets/badges/**'

jobs:
  process-badges:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v4
        with:
          sparse-checkout: |
            assets/badges
          sparse-checkout-cone-mode: false
          
      - name: Process badges
        run: |
          # Your badge processing logic here
          echo "Processing badges..."
```

### 4. Snapshot Management

**When working with Kanvas snapshots:**

- Understand the two types of snapshots:
  1. **PR snapshots** (temporary, monthly namespaced)
  2. **Catalog snapshots** (permanent, design-id based)

- Ensure proper permissions for public access
- Maintain consistent image dimensions
- Generate both light and dark themes
- Use semantic versioning for design IDs when applicable

### 5. Design Embedding

**When creating embedded design files:**

- Ensure all dependencies are self-contained
- Use relative paths for local assets
- Minify JavaScript and CSS for production
- Include proper error handling
- Document embed parameters and customization options

## Testing Guidelines

### Local Testing

Before submitting PRs:

1. **Image validation:**
   ```bash
   # Check image formats and sizes
   file assets/badges/*.svg
   ls -lh design-assets/*.png
   ```

2. **Email template testing:**
   - Use tools like [Litmus](https://litmus.com) or [Email on Acid](https://www.emailonacid.com)
   - Test with actual email clients
   - Verify image loading from URLs

3. **Workflow testing:**
   ```bash
   # Use act for local workflow testing
   act -j process-badges --sparse-checkout
   ```

### Integration Testing

- Test cross-repository integrations carefully
- Verify snapshot URLs are accessible
- Ensure badge URLs work in external contexts
- Test design embeds in various web environments

## Security Considerations

1. **Access Control:**
   - Never commit secrets or tokens
   - Use GitHub Secrets for sensitive data
   - Validate external inputs in workflows

2. **Image Security:**
   - Scan uploaded images for malware
   - Validate image formats and content
   - Limit file sizes to prevent abuse

3. **URL Safety:**
   - Validate and sanitize external URLs
   - Use HTTPS for all external resources
   - Implement rate limiting where appropriate

## Performance Optimization

### For Large Repositories

1. **Use shallow clones in CI/CD:**
   ```yaml
   - uses: actions/checkout@v4
     with:
       fetch-depth: 1
       sparse-checkout: |
         required/path
   ```

2. **Implement caching:**
   ```yaml
   - uses: actions/cache@v3
     with:
       path: ~/.npm
       key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
   ```

3. **Optimize image storage:**
   - Use Git LFS for very large files if needed
   - Consider external CDN for frequently accessed assets
   - Implement cleanup workflows for old snapshots

## Documentation Standards

When adding new features:

1. Update README.md with:
   - New directory structures
   - Usage examples
   - Configuration options

2. Add inline comments for complex logic
3. Document API endpoints and data formats
4. Provide migration guides for breaking changes

## Common Patterns

### Adding a New Badge

```bash
# 1. Create SVG in assets/badges/<badge-name>/
# 2. Generate PNG version
# 3. Update badge documentation
# 4. Test rendering in various contexts
```

### Adding a New Snapshot

```python
# Pseudo-code for snapshot workflow
1. Receive design from Meshery
2. Generate light and dark versions
3. Determine storage path (PR or catalog)
4. Upload to appropriate directory
5. Return public URL
```

### Creating Email Templates

```html
<!-- Template structure -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Title</title>
  <style type="text/css">
    /* Inline styles for compatibility */
  </style>
</head>
<body>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <!-- Content -->
  </table>
</body>
</html>
```

## Troubleshooting

### Common Issues

1. **Repository size too large:**
   - Solution: Use sparse checkout, implement cleanup workflows

2. **Workflow timeouts:**
   - Solution: Optimize checkout, use caching, split into multiple jobs

3. **Image loading failures:**
   - Solution: Verify public access, check URL formatting, test in incognito

4. **Cross-repo integration failures:**
   - Solution: Check API versions, verify authentication, review CORS settings

## Additional Resources

- [Meshery Documentation](https://docs.meshery.io)
- [Layer5 Cloud](https://cloud.layer5.io)
- [Kanvas Snapshot Action](https://github.com/layer5labs/kanvas-snapshot)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Git Sparse Checkout](https://git-scm.com/docs/git-sparse-checkout)

## Questions and Support

For questions or issues:
- Open an issue in the appropriate repository
- Join [Layer5 Slack](https://slack.layer5.io)
- Visit [Layer5 Community Forum](https://discuss.layer5.io)

---

**Remember:** This is a high-traffic repository with large binary assets. Always prioritize efficiency, use sparse checkout, and test thoroughly before merging.
