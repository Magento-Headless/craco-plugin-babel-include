import * as path from 'path'
import { getLoader, loaderByName, throwUnexpectedConfigError } from '@craco/craco'

const babelLoaderName = 'babel-loader'

const getBabelLoader = (webpackConfig, throwErr) => {
  const {
    isFound,
    match: { loader },
  } = getLoader(webpackConfig, loaderByName(babelLoaderName))

  if (!isFound) {
    throwErr(
      `Could not find ${babelLoaderName} in the webpack config!`,
      `webpack+${babelLoaderName}`
    )
  }

  return loader
}

const throwError = (message, githubIssueQuery) =>
  throwUnexpectedConfigError({
    packageName: 'craco-plugin-babel-include',
    githubRepo: 'craco-plugin-babel-include',
    message,
    githubIssueQuery
  })

export const babelIncludePlugin = {
  overrideWebpackConfig: ({
    webpackConfig,
    pluginOptions,
    context: { paths }
  }) => {
    // Remove ModuleScopePlugin
    if (Array.isArray(webpackConfig.resolve.plugins)) {
      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        (p) => p.constructor.name !== 'ModuleScopePlugin'
      )
    }

    // Add the paths to the babel-loader
    const babelLoader = getBabelLoader(webpackConfig, throwError)

    let includePaths = Array.isArray(pluginOptions.include)
      ? pluginOptions.include
      : [pluginOptions.include]

    // Ensure absolute paths
    includePaths = includePaths.map((_path) => {
      try {
        // Check if the path is an npm module
        return path.dirname(
          require.resolve(path.join(_path, 'package.json'), {
            paths: [paths.appPath]
          })
        )
      } catch (err) {
        // Otherwise resolve local
        return path.resolve(_path)
      }
    })

    if (!Array.isArray(babelLoader.include)) {
      babelLoader.include = [babelLoader.include]
    }

    babelLoader.include.push(...includePaths)
    
    return webpackConfig
  }
}
