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

# Layer5 Badges
*Examples*

[![](https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/meshmap/meshmap.svg)](https://meshery.layer5.io/user/090e7114-509a-4046-81f1-9c5fb8daf724?tab=badges) [![](https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/meshery-operator/meshery-operator.svg)](https://meshery.layer5.io/user/090e7114-509a-4046-81f1-9c5fb8daf724?tab=badges) [![](https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/docker-extension/docker-extension.svg)](https://meshery.layer5.io/user/090e7114-509a-4046-81f1-9c5fb8daf724?tab=badges)
<!---

![](https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/first-share/first-share.svg)
![](https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/first-log-streaming-session/first-log-streaming-session.svg)
 [![](https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/bring-a-buddy/bring-a-buddy.svg)](https://meshery.layer5.io/user/090e7114-509a-4046-81f1-9c5fb8daf724?tab=badges) 
[![](https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/first-application/first-application.svg)](https://meshery.layer5.io/user/090e7114-509a-4046-81f1-9c5fb8daf724?tab=badges) 
-->

See https://badges.layer5.io for the full set and description of the Layer5 Recognition Program.

# Registry for Layer5 Cloud Remote Provider Packages
Access Layer5 Cloud at https://meshery.layer5.io 



## About Layer5

Layer5's cloud native application and infrastructure management software enables organizations to expect more from their infrastructure. We embrace _developer_-defined infrastructure. We empower developers to change how they write applications, support _operators_ in rethinking how they run modern infrastructure, and enable _product owners_ to regain full-control over their product portfolio.

### Directory structure
1. `action-assets`: 
      1.   Stores the snapshots taken as part of pull requests. Each snapshot have 2 versions and are namespaced based on the year and month they were taken, for eg: snapshot against a particular PR created on 10th July 2024 will be stored at
      a. Light: `action-assets/2024@7/<design-id>-light.png` 
      b. Dark version: `action-assets/2024@7/<design-id>-dark.png` 
 
      2. `design-assets`: Stores the snapshots taken for catalog items. Every time a catalog item is updated, the corresponding snapshot for that catalog item is also updated. Catalog snapshots are referenced rom different systems, which need unauthenticated, public access to static resources, and therefore, require a permanent link.
      Each catalog item has two versions of the snapshot stored at
      a. Light: `actions-assets/design-assets/<design-id-light>.png`
      b. Dark: `actions-assets/design-assets/<design-id-dark>.png`


2. `assets`: Contains 3 directories
      1. `badges`: Stores the SVG and PNG representation of badges to be used in emails.
      2. `meshmap`: Stores the animated gifs, svgs, quicktips etc,
      3. `organizations`: Stores the custom icons in PNG format namespaced under orgid.
      ```
      organizations/<org-uuid>/mobile.png
      organizations/<org-uuid>/desktop.png
      ```

3. `email`: Contains html emails templates, svgs/png to be used for emails sent for `layer5-cloud` and other newsletter html templates.
