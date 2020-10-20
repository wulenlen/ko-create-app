/*
 * @Description: 设置babel插件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-11 14:57:12
 * @LastEditors: Charles
 * @LastEditTime: 2020-03-03 18:19:43
 */

/**
 * @description: 获取插件绝对路径
 * @param1: param
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:13:44
 */
const resolvePlugin = require('./util/index').resolvePlugin;

module.exports = function (plugins = []) {
  const basePlugins = [
    // Stage 0
    '@babel/plugin-proposal-function-bind',
    // Stage 1
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-logical-assignment-operators',
    '@babel/plugin-transform-regenerator',
    [
      '@babel/plugin-proposal-optional-chaining',
      {
        loose: false,
      },
    ],
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        useBuiltIns: true,
      },
    ][
      ('@babel/plugin-transform-destructuring',
      {
        loose: false,
        selectiveLoose: [
          'useState',
          'useEffect',
          'useContext',
          'useReducer',
          'useCallback',
          'useMemo',
          'useRef',
          'useImperativeHandle',
          'useLayoutEffect',
          'useDebugValue',
        ],
      })
    ],
    [
      '@babel/plugin-proposal-pipeline-operator',
      {
        proposal: 'minimal',
      },
    ],
    [
      '@babel/plugin-proposal-nullish-coalescing-operator',
      {
        loose: true,
      },
    ],
    '@babel/plugin-proposal-do-expressions',
    // Stage 2
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    // Stage 3
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: false,
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
      },
    ],
    '@babel/plugin-proposal-json-strings',
    [
      'babel-plugin-import',
      { libraryName: 'antd', libraryDirectory: 'lib' },
      'ant',
    ],
    [
      'babel-plugin-import',
      { libraryName: 'ant-mobile', libraryDirectory: 'lib' },
      'ant-mobile',
    ][
      ('babel-plugin-import',
      { libraryName: 'ant-design-vue', libraryDirectory: 'lib' },
      'ant-design-vue')
    ],
  ];
  return {
    babelrc: false,
    presets: resolvePlugin([
      [
        /**
         * TODO: customize @babel/preset-env config,especially targets options
         * official docs: We don't recommend using preset-env this way because it doesn't take advantage of its ability to target specific environments/versions.
         */
        '@babel/preset-env',
        {
          modules: false, // 推荐
          exclude: ['transform-typeof-symbol'],
        },
      ],
      ['@babel/preset-react'],
      ['@babel/preset-typescript'],
    ]),
    plugins: resolvePlugin(basePlugins.concat(plugins)),
  };
};
