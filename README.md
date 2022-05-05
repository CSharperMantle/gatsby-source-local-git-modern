# gatsby-source-local-git-modern

[![npm](https://img.shields.io/npm/v/gatsby-source-local-git-modern?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/gatsby-source-local-git-modern)
[![MIT](https://img.shields.io/github/license/CSharperMantle/gatsby-source-local-git-modern?style=for-the-badge)](https://github.com/CSharperMantle/gatsby-source-local-git-modern/blob/master/LICENSE)
[![build](https://img.shields.io/github/workflow/status/CSharperMantle/gatsby-source-local-git-modern/Node%20CI?logo=github&style=for-the-badge)](https://github.com/CSharperMantle/gatsby-source-local-git-modern/actions)

Update: Archived. Refer to the [original repository](https://github.com/PMudra/gatsby-source-local-git) for latest updates.

This is a fork and modernized version of [`gatsby-source-local-git`](https://github.com/PMudra/gatsby-source-local-git) with the aim of keeping up with latest dependency versions and APIs.

A Gatsby source plugin for sourcing data into your Gatsby application from your local git repository.
The plugin enables gatsby sites to include meta data about their own git repository at build time.

You can find a running example here: https://using-gatsby-source-local-git.netlify.app/

Missing a feature? Please create an issue (or even a pull request).

## Install

```shell
npm install --save gatsby-source-local-git-modern
```

## How to use

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [`gatsby-source-local-git-modern`],
}
```

Sources of the [example](https://using-gatsby-source-local-git.netlify.app/) are available at [examples/using-gatsby-source-local-git/](examples/using-gatsby-source-local-git/)

## How to query

The plugin creates `Commit`, `Tag`, `Branch` and `Author` nodes.

:warning: Please be aware that CI platforms might use an optimized strategy to fetch your git repository. Make sure to fetch all history for branches and tags depending on your needs.

### Latest commit hash

```graphql
{
  gitCommit(latest: { eq: true }) {
    hash
  }
}
```

### Latest tag name

```graphql
{
  gitTag(latest: { eq: true }) {
    name
  }
}
```

Only tag names including a dot will be considered (like `v1.2.3` or `1.2` but not `newest-feature`).

### Current Branches

```graphql
{
  gitBranch(current: { eq: true }) {
    name
  }
}
```

### Authors

```graphql
{
  allGitAuthor(sort: { fields: name }) {
    nodes {
      name
      email
    }
    totalCount
  }
}
```
