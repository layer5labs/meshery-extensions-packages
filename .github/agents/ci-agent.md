---
name: meshery-extensions-packages
description: Artifact storage and distribution agent for Meshery extensions. Specialized in sparse checkouts and artifact management.
---

# GitHub Copilot Custom Instructions for meshery-extensions-packages

## Repository Overview

This is the **meshery-extensions-packages** repository - an artifact storage and distribution repository for built extensions, assets, and packages. This is **NOT** a source code repository. It serves as the delivery mechanism for Meshery extensions built from other repositories.

## ⚠️ CRITICAL: Repository Size and Sparse Checkout Requirements

**MANDATORY RULE**: This repository contains extremely large directories (specifically `action-assets`) that can overwhelm local filesystems and CI/CD runners.

### Required Checkout Method

Create a branch and PR in this repo. Do not fork the repo.

**NEVER** perform a full clone or checkout of this repository. **ALWAYS** use sparse checkout:

```bash
# Correct way to clone
git clone --filter=blob:none --sparse https://github.com/layer5labs/meshery-extensions-packages
cd meshery-extensions-packages
git sparse-checkout set assets  # or other specific directories needed
```

### For GitHub Actions Workflows

When creating or modifying GitHub Actions workflows, **ALWAYS** use sparse checkout:

```yaml
- name: Checkout repository
  uses: actions/checkout@v4
  with:
    repository: layer5labs/meshery-extensions-packages
    sparse-checkout: |
      assets
      # Add only specific directories needed
      # NEVER include action-assets
    sparse-checkout-cone-mode: true
```

### Directories to Avoid

- **action-assets**: Extremely large, avoid at all costs unless explicitly required
- Only checkout directories specifically needed for the task

## Repository Ecosystem Understanding

This repository is part of a multi-repository CI/CD pipeline:

### 1. **[meshery/meshery](https://github.com/meshery/meshery)**
- **Role**: Core open-source cloud native management plane
- **Relationship**: Consumes extensions and assets from this repo
- **Interaction**: Downloads and uses built artifacts for enhanced capabilities

### 2. **[layer5io/meshery-cloud](https://github.com/layer5io/meshery-cloud)**
- **Role**: Remote Provider and management backend
- **Relationship**: Orchestrates extension delivery
- **Interaction**: Manages authentication/authorization for extension features

### 3. **[layer5labs/meshery-extensions](https://github.com/layer5labs/meshery-extensions)**
- **Role**: Source code repository for extensions
- **Relationship**: **Upstream** - This is where code is written
- **Interaction**: CI/CD builds code and publishes artifacts **TO** this repo

### 4. **[layer5labs/meshery-extensions-packages](https://github.com/layer5labs/meshery-extensions-packages)** (This Repository)
- **Role**: Artifact registry and distribution channel
- **Relationship**: **Downstream** - Receives built artifacts
- **Interaction**: Stores build outputs for distribution

## Guidelines for GitHub Copilot Coding Agent

### Task Appropriateness

This repository is suited for:
- ✅ Updating artifact metadata and manifests
- ✅ Managing package distribution configurations
- ✅ Updating documentation about packages/releases
- ✅ Modifying CI/CD workflows for artifact management
- ✅ Creating or updating asset organization scripts
- ✅ Managing package version information

This repository is **NOT** appropriate for:
- ❌ Writing extension source code (use meshery-extensions instead)
- ❌ Implementing new features (wrong repository)
- ❌ Large-scale code refactoring (this is an artifact repo)
- ❌ Tasks requiring full repository checkout

### Issue and Pull Request Scope

When working on issues:

1. **Verify the issue belongs here**: Confirm it's about artifact management, not source code
2. **Check repository size**: Ensure the task doesn't require full checkout
3. **Validate sparse checkout paths**: Only include necessary directories
4. **Document artifact changes**: Clearly describe what artifacts are affected

### Custom Instructions Priority

When custom instructions conflict with these guidelines:

1. **Sparse checkout requirements ALWAYS take priority**
2. **Repository ecosystem understanding is critical**
3. **Never compromise on avoiding full checkout**
4. **Escalate if task requires action-assets directory**

### Pre-flight Checklist for Copilot

Before starting work:
- [ ] Confirm this is an artifact management task
- [ ] Identify minimum directories needed
- [ ] Configure sparse checkout appropriately
- [ ] Understand which upstream repo owns the source code
- [ ] Verify CI/CD impact on downstream consumers

### Environment Configuration

If your task requires running scripts or builds:

1. **Minimal dependencies**: Only install what's needed for the specific task
2. **Respect .gitignore**: Don't commit build artifacts or temporary files
3. **Use existing tooling**: Check package.json, Makefile, or scripts first
4. **Document environment needs**: If special setup is required, document it

### Model Context Protocol (MCP) Integration

When using MCP servers:
- Focus on metadata and package management contexts
- Avoid loading entire repository history
- Use targeted file/directory contexts
- Respect sparse checkout boundaries

### Security Considerations

This repository contains distributed artifacts:
- **Verify artifact integrity**: Ensure checksums and signatures are maintained
- **Audit third-party assets**: Be cautious with external dependencies
- **Protect release artifacts**: Don't modify published versions
- **Document changes**: All artifact updates must be traceable

### Iteration and Feedback

When iterating on PRs:
1. **Keep checkout scope minimal**: Don't expand sparse checkout unnecessarily
2. **Test artifact accessibility**: Ensure changes don't break downstream consumption
3. **Validate CI/CD impact**: Check that workflows still function correctly
4. **Monitor repo size**: Alert if changes increase repository size significantly

### Communication Guidelines

When creating PRs or issues:
- **Specify affected artifacts**: List exact packages/extensions impacted
- **Reference upstream changes**: Link to source code commits if applicable
- **Document distribution impact**: Note which systems consume these artifacts
- **Tag related repositories**: Cross-reference meshery/meshery or meshery-extensions if relevant

## Common Tasks and Patterns

### Adding New Artifacts

```bash
# 1. Sparse checkout the target directory
git sparse-checkout set assets/<category>

# 2. Add the artifact
# 3. Update manifests/metadata
# 4. Test accessibility
# 5. Commit and push
```

### Updating Package Metadata

```bash
# 1. Minimal checkout
git sparse-checkout set <metadata-directory>

# 2. Update version/manifest files
# 3. Validate JSON/YAML schemas
# 4. Document changes in commit message
```

### CI/CD Workflow Modifications

- **Always** use sparse checkout in workflow definitions
- **Test** workflows don't timeout due to large files
- **Validate** artifact upload/download processes
- **Document** any new dependencies or tools

## Troubleshooting

### Issue: Checkout taking too long
**Solution**: You've likely initiated a full checkout. Cancel and use sparse checkout.

### Issue: CI runner out of disk space
**Solution**: Check for full checkouts in workflow files. Add sparse-checkout configuration.

### Issue: Unable to find artifact
**Solution**: Verify the artifact path and ensure sparse checkout includes that directory.

### Issue: Need to work on source code
**Solution**: This is the wrong repository. Navigate to layer5labs/meshery-extensions.

## Additional Resources

- [AGENTS.md](../agents.md) - Detailed sparse checkout instructions
- [meshery-extensions](https://github.com/layer5labs/meshery-extensions) - Source code repository
- [Meshery Documentation](https://docs.meshery.io) - Project documentation

## Summary

Remember: This is an **artifact distribution repository**, not a source code repository. Your primary responsibilities are:
1. **Always use sparse checkout**
2. **Manage artifacts, not source code**
3. **Understand the repository ecosystem**
4. **Protect CI/CD pipeline performance**
5. **Document all changes to distributed artifacts**

When in doubt, ask: "Should this code change happen in meshery-extensions instead?"
