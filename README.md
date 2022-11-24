# craco-plugin-babel-include

[Craco](https://github.com/gsoft-inc/craco) plugin which allows to import uncompiled modules from outside the `src` directory.

## Usage

```sh
npm i --save-dev craco-plugin-babel-include  # npm or
yarn add -D craco-plugin-babel-include       # yarn
```

```js
// craco.config.js
const CracoBabelInclude = require('craco-plugin-babel-include');

module.exports = {
  plugins: [
    {
      plugin: CracoBabelInclude,
      options: {
        include: ['@workspace/shared', '../ui-components'],
      },
    },
  ],
};
```

## Options

| Option    | Type                 | Description                               |
| --------- | -------------------- | ----------------------------------------- |
| `include` | `string \| string[]` | npm-package name or directory to include. |

## License

Apache-2.0 - see [LICENSE](./LICENSE) for details.
