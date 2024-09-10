# Meshery Snapshot Helm Plugin

The **Meshery Snapshot Helm Plugin** allows users to generate a visual snapshot of their Helm charts directly from the command line. It simplifies the process of creating Meshery Snapshots, providing a visual representation of packaged Helm charts. This plugin integrates with Meshery Cloud and GitHub Actions to automate the workflow of snapshot creation, which is especially useful for Helm users who need to quickly visualize their chart configurations.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Helm charts can be complex, especially when custom configurations are applied via `values.yaml` files. This plugin bridges the gap between Helm chart configurations and their visual representation by converting Helm charts into **Meshery Snapshots**. These snapshots can be received either via email or as a URL displayed directly in the terminal.

### Key Features

1. **Snapshot Generation:** Create visual snapshots of Helm charts, complete with associated resources.
2. **Synchronous/Asynchronous Delivery:** Choose between receiving snapshots via email or directly in the terminal.
3. **Seamless Integration:** Leverages Meshery Cloud and GitHub Actions to handle snapshot rendering.
4. **Support for Packaged Charts:** Works with both packaged `.tar.gz` charts and unpackaged Helm charts.

---

## Installation

To install the Meshery Snapshot Helm Plugin, use the following steps:

### Prerequisites

- Helm v3 or later must be installed on your system.
- Go
- Meshery Cloud account (optional)

### Plugin Installation

1. Open your terminal.
2. Run the following command to install the Meshery Snapshot Plugin:

   ```bash
   helm plugin install https://github.com/meshery/snapshot-plugin (will change)
   ```

3. Verify the installation by running:

   ```bash
   helm plugin list
   ```

   You should see the **Meshery Snapshot Plugin** listed as `snapshot`.

4. Set up the required environment variables (see the [Environment Variables](#environment-variables) section).

---

## Usage

Once the plugin is installed, you can generate a snapshot using either a packaged or unpackaged Helm chart.

### Command Usage

```bash
helm snapshot -f <chart-URI> [-n <snapshot-name>] [-e <email>]
```

- **`-f`**: Path or URL to the Helm chart (required).
- **`-n`**: Optional name for the snapshot. If not provided, it will be auto-generated based on the chart name.
- **`-e`**: Optional email address to receive the snapshot. If not provided, the snapshot will be displayed in the terminal.

### Example

To generate a snapshot for a Helm chart located at `https://meshery.io/charts/v0.8.0-meshery.tar.gz`, you can use:

```bash
helm snapshot -f https://meshery.io/charts/v0.8.0-meshery.tar.gz -n meshery-chart
```

## Cloning the Repository and Testing Locally

If you want to clone the repository and test the Meshery Snapshot Helm Plugin locally, follow the steps below.

### 1. Clone the Repository

To get started, you'll first need to clone the Meshery Snapshot Helm Plugin repository from GitHub. Run the following command in your terminal:

```bash
git clone https://github.com/layer5labs/meshery-extensions-packages.git
```

### 2. Navigate to the Plugin Directory

Once the repository is cloned, navigate to 

```bash
cd helm-plugins/snapshot
```

### 3. Set Up Environment Variables

Before testing the plugin, ensure you have a `.env` file set up in the repository’s root directory. This file should contain the required environment variables for the plugin to interact with GitHub and Meshery Cloud.

Create the `.env` file and add the following variables:

```bash
GITHUB_TOKEN=your_github_token_here
MESHERY_TOKEN=your_meshery_token_here
COOKIE=your_meshery_cookie_here
OWNER=your_github_username
REPO=your_github_repo_name
WORKFLOW=your_github_workflow_name
BRANCH=your_branch_name
MESHERY_CLOUD_BASE_URL=meshery_cloud_url
```

Make sure to replace the placeholder values with your actual credentials.

### 4. Build the Plugin

```bash
go build -o helm-plugin-snapshot
```

This will generate an executable named `helm-plugin-snapshot` in your current directory.

### 5. Test the Plugin Locally

Once the plugin is built, you can test it locally. For example, to generate a snapshot for a Helm chart, run the following command:

```bash
helm snapshot -f https://meshery.io/charts/v0.8.0-meshery.tar.gz -n meshery-chart
```

This command will trigger the snapshot generation process. If everything is set up correctly, you should see a visual snapshot URL or receive the snapshot via email, depending on the options you specified.


### 7. Debugging

If you encounter any issues during testing, check the log file generated in the `snapshot-plugin` directory. The logs can provide more insight into any errors that may occur.

To check the logs, open the log file in your preferred text editor:

```bash
cat snapshot.log
```

This file contains a timestamped log of operations performed during the snapshot generation process.
