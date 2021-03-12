# GitHub Actions GCC Problem Matcher

Big thank-you to [xt0rted](https://github.com/xt0rted) for the Github Actions Problem Matcher Template: well documented, excellent test coverage and commenting.

The pattern match regex used here [comes from vs-code](https://github.com/microsoft/vscode-cpptools/blob/a8285cbc0efb5b09c2d2229b0e0772dcb3b602df/Extension/package.json#L76-L94), and was motivated by [gcc-problem-matcher by Ammar Askar](https://github.com/ammaraskar/gcc-problem-matcher).

[![CI Workflow Status](https://github.com/electronjoe/gcc-problem-matcher/workflows/CI/badge.svg)](https://github.com/electronjoe/gcc-problem-matcher/actions?query=workflow%3ACI)

## Usage

```yml
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: electronjoe/gcc-problem-matcher@v1
      - run: echo "Run some tests that will be picked up"
      - uses: electrojoe/gcc-problem-matcher@v1
        with:
          action: remove
      - run: echo "Run some more tests that shouldn't be picked up"
```

## Options

Name | Allowed values | Description
-- | -- | --
`action` | `add` (default), `remove` | If the problem matcher should be registered or removed

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

## Build & Release Updates to electronjoe/gcc-problem-matcher

From a clean checkout:

```shell
git checkout releases/v1 && git merge main

purge dist && purge lib && purge node_modules

npm ci

npm run lint --if-present && npm test

npm run build && npm run release

git commit -m "Release v1.1.0"      # creates the release commit
git tag -fa v1 -m "Update v1 tag"   # updates the v1 tag to point to the latest release
git push origin && git push origin v1 --force
```