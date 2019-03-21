[![Build Status](https://travis-ci.com/ricardocasares/radio-gql.svg?branch=master)](https://travis-ci.com/ricardocasares/radio-gql)
![Docker Pulls](https://img.shields.io/docker/pulls/ricardocasares/radio-gql.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# GraphQL API for [radio-browser](http://www.radio-browser.info)

Check the [playground](https://radio-gql.analogic.al)

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/ricardocasares/radio-gql)

## Sample query

```gql
{
  stations(query: "Electro") {
    url
    name
    tags
  }
}
```

## Stack

- ▲ [now](https://now.sh)
- docker
- [polka](https://github.com/lukeed/polka)
- [express-graphql](https://github.com/graphql/express-graphql)
- [radio-browser](http://www.radio-browser.info)

## Running the npm package

```bash
npm i -g radio-gql
radio-gql --port 3000
```

## Running the docker image

```bash
docker run -p 3000:3000 ricardocasares/radio-gql
```

### Build from scratch

Clone the repository and inside the root folder run:

```bash
docker build . -t radio-gql
docker run -p 3000:3000 radio-gql
```

You can now visit the playground at [http://localhost:3000](http://localhost:3000)

## Contributing

Feel free to open an issue, pull requests are preferred.

**IMPORTANT** Make sure you always create new branches from `beta`.

### Automated versioning

We use `semantic-release` to automate the versioning process, make sure you follow the [commit message convention explained here](https://github.com/semantic-release/semantic-release#commit-message-format).

**HEADS UP:** If you are not sure how write a commit message, make your changes in your feature branch and run `npm run commit` and follow the assistant.

### Releases

#### Beta

Create a feature branch and make a pull-request to `beta` branch.
Once its merged, you can try and install the package using `@beta` dist tag on `npm`.

```bash
npm i -g radio-gql@beta
```

#### Production

Create a new pull-request from `beta` to `master` branch.
Once it gets merged, the final version will be released using `@latest` dist tag on `npm`.
