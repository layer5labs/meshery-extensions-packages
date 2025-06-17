<p style="text-align:center;" align="center">
      <picture align="center">
         <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/.github/assets/images/layer5/layer5-light-no-trim.svg" />
         <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/.github/assets/images/layer5/layer5-no-trim.svg" />
         <img align="center" src="https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/.github/assets/images/layer5/layer5-no-trim.svg" alt="Shows a dark layer5 logo in light mode and a white logo in dark mode" width="45%"/>
      </picture>
</p>

<p align="center">
<a href="https://github.com/layer5io/layer5" alt="GitHub contributors">
<img src="https://img.shields.io/github/contributors/layer5io/layer5.svg" /></a>
<a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+org%3Alayer5io+org%3Ameshery+org%3Alayer5labs+org%3Aservice-mesh-performance+org%3Aservice-mesh-patterns+label%3A%22help+wanted%22" alt="Help wanted GitHub issues">
<img src="https://img.shields.io/github/issues/layer5io/layer5/help%20wanted.svg?color=%23DDDD00" /></a>
<a href="https://slack.layer5.io" alt="Slack">
<img src="https://img.shields.io/badge/Slack-@layer5.svg?logo=slack" /></a>
<a href="https://twitter.com/layer5" alt="Twitter Follow">
<img src="https://img.shields.io/twitter/follow/layer5.svg?label=Follow+Layer5&style=social" /></a>
<a href="https://github.com/layer5io/layer5" alt="License">
<img src="https://img.shields.io/github/license/layer5io/layer5.svg" /></a>
</p>

<h5><p align="center"><i>If you’re using Layer5 products or if you like the project, please <a href="https://github.com/layer5io/layer5/stargazers">★</a> this repository to show your support! 🤩</i></p></h5>

### 🧭 Purpose of the Repository

> **This repository serves as the home for Layer5’s community-driven extensions, recognition badges, visual assets, and remote provider packages used across the Layer5 and Meshery ecosystem.**  
>  
> It aims to:
> - Empower contributors through the Layer5 Recognition Program (with shareable badges).
> - Host visual assets for emails, Kanvas designs, and MeshMap UI.
> - Provide reusable components and templates for the Layer5 Cloud remote provider.
> - Offer public static snapshots used in Meshery GitHub Actions and catalog references.

_If you're contributing to Meshery, Layer5, or looking to integrate with its design/visual ecosystem—this repo is where you’ll find those shared packages._

<br />

## ⚠️ Contributor Warning

Before cloning this repo to your local machine, ensure that you do so sparsely or your clone will take a long time to download / sync.

Example of a sparse checkout:

```bash
git clone --filter=blob:none --sparse https://github.com/layer5labs/meshery-extensions-packages
git sparse-checkout init --cone
git sparse-checkout set assets
```

---

## 📦 Repo Overview

ℹ️ This repository has multiple functions.

### Function 1: Layer5 Badges
See [badges.layer5.io](https://badges.layer5.io) for the full set and description of the Layer5 Recognition Program.

**Examples**

[![](https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/meshmap/meshmap.svg)](https://cloud.layer5.io/user/090e7114-509a-4046-81f1-9c5fb8daf724?tab=badges) [![](https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/meshery-operator/meshery-operator.svg)](https://cloud.layer5.io/user/090e7114-509a-4046-81f1-9c5fb8daf724?tab=badges) [![](https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/docker-extension/docker-extension.svg)](https://cloud.layer5.io/user/090e7114-509a-4046-81f1-9c5fb8daf724?tab=badges)

**Relevant Directories**
- `/assets`: Contains:
  - `/assets/badges`: Stores SVG/PNG badge representations.
  - `/assets/meshmap`: Stores MeshMap assets like animations and SVGs.
  - `/assets/organizations`: Custom org icons in PNG format.
  - `/assets/kanvas`: Kanvas images for designs, flowcharts, etc.

### Function 2: Layer5 Cloud Remote Provider Packages
Access Layer5 Cloud at [cloud.layer5.io](https://cloud.layer5.io)

**Relevant Directories**
- `/email`: Contains HTML email templates, SVGs/PNGs for newsletters and notifications.

### Function 3: Images Taken by Kanvas Snapshots
Learn more at [Meshery GitHub Action Snapshot](https://meshery.io/extensions/github-action-meshery-snapshot)

**Relevant Directories**
- `/action-assets`: Stores PR snapshot images (light/dark mode) in a date-structured directory.
- `/design-assets`: Public-facing snapshots used for catalog items.

---

## 🤝 How to Contribute

We welcome all contributors! Whether you're a beginner or an experienced developer, your contributions are valuable.

📘 **Read the contributing guide:** [Layer5 Contributor Guide](https://docs.meshery.io/project/contributing)

🧩 **Explore beginner issues:** [Good First Issues](https://github.com/layer5labs/meshery-extensions-packages/labels/good%20first%20issue)

🛠️ **Set up the project:**

```bash
git clone --filter=blob:none --sparse https://github.com/layer5labs/meshery-extensions-packages
cd meshery-extensions-packages
git sparse-checkout init --cone
git sparse-checkout set assets
```

---

<br /><br />

## 🚀 Get Involved with the Community

✔️ **Join** weekly meetings via the [community calendar](https://meshery.io/calendar)  
✔️ **Watch** past [recordings](https://www.youtube.com/@mesheryio?sub_confirmation=1)  
✔️ **Fill out** the [newcomer form](https://meshery.io/newcomers)  
✔️ **Discuss** in the [forums](https://meshery.io/community#discussion-forums)  
✔️ **Explore** the [community handbook](https://meshery.io/community#handbook)  
✔️ **Chat with us** on [Slack](https://slack.meshery.io)  
✔️ **Ask for help** from MeshMates or request guidance  

> _Not sure where to start? Check out the [help-wanted issues](https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+(org%3Ameshery+OR+org%3Aservice-mesh-performance+OR+org%3Aservice-mesh-patterns+OR+org%3Ameshery-extensions)+label%3A%22help+wanted%22)._ 


---

## 🧠 Helpful Resources

- 📘 [Meshery Documentation](https://docs.meshery.io/)
- 🛠️ [Build & Release Strategy](https://docs.meshery.io/project/releases)
- 🎨 [Meshery UI Figma Designs](https://www.figma.com/file/ghI1hfYFIVR2EKENKcVLxZ/Meshery-UI-Designs)
