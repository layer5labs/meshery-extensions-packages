# Working with Meshery Extensions Packages

This document outlines the purpose of this repository, its relationship with other Layer5 repositories, and critical instructions for working with it efficiently.

## Repository Overview

`meshery-extensions-packages` serves as a storage and distribution repository for built artifacts, assets, and packages related to Meshery extensions. Unlike source code repositories, this repo often contains large binary files and generated assets.

## Repository Interchange & Ecosystem

To effectively work with this repository, it is important to understand its place in the broader Meshery ecosystem:

1. **[github.com/meshery/meshery](https://github.com/meshery/meshery)**
    * **Role**: The core open-source cloud native management plane.
    * **Interaction**: Consumes the extensions and assets hosted in `meshery-extensions-packages` to provide enhanced capabilities to users.

2. **[github.com/layer5io/meshery-cloud](https://github.com/layer5io/meshery-cloud)**
    * **Role**: The Remote Provider and management backend.
    * **Interaction**: Orchestrates the delivery of extensions and manages user authentication/authorization for the features enabled by these packages.

3. **[github.com/layer5labs/meshery-extensions](https://github.com/layer5labs/meshery-extensions)**
    * **Role**: The source code repository for proprietary or advanced Meshery extensions.
    * **Interaction**: This is where the code lives. CI/CD pipelines build the code from `meshery-extensions` and publish the resulting artifacts to `meshery-extensions-packages`.

4. **[github.com/layer5labs/meshery-extensions-packages](https://github.com/layer5labs/meshery-extensions-packages)** (This Repository)
    * **Role**: The artifact registry / distribution channel.
    * **Interaction**: Stores the output of builds. It is the "delivery" mechanism.

## Sparse Checkout Instructions

**⚠️ CRITICAL WARNING**: This repository contains extremely large directories (specifically `action-assets`) that can overwhelm local filesystems and CI runners.

**DO NOT** perform a full checkout of this repository. Always use **sparse checkout** to only retrieve the directories you need (typically `assets` or specific package folders).

### How to Clone Sparsely

When cloning this repository, use the following commands to avoid downloading the massive `action-assets` directory:

```bash
# 1. Clone with blob filtering to avoid downloading history of large files immediately
git clone --filter=blob:none --sparse https://github.com/layer5labs/meshery-extensions-packages

# 2. Enter the directory
cd meshery-extensions-packages

# 3. Configure sparse checkout to only include necessary folders (e.g., assets)
git sparse-checkout set assets

# Verify that action-assets is NOT present
ls -d action-assets 2>/dev/null || echo "Success: action-assets is not checked out."
```

### For GitHub Actions / CI Agents

If you are configuring a CI workflow or a custom coding agent, ensure your checkout step is configured to ignore `action-assets`.

```yaml
- name: Checkout meshery-extensions-packages
  uses: actions/checkout@v4
  with:
    repository: layer5labs/meshery-extensions-packages
    sparse-checkout: |
      assets
      # Add other specific folders as needed
      # EXCLUDE action-assets
    sparse-checkout-cone-mode: true
```
