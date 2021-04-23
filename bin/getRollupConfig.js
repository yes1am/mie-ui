const typescript = require('@rollup/plugin-typescript')
// 为了将引入的 npm 包，也打包进最终结果中
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const { babel } = require('@rollup/plugin-babel')
const pkg = require('../package.json')
const NpmImport = require('less-plugin-npm-import')
const postcss = require('rollup-plugin-postcss')
const autoprefixer = require('autoprefixer')
const replace = require('@rollup/plugin-replace')

// 去除 dependencies 和 peerDependencies， 因为这个都是调用方应该提供的环境
const external = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})]

// UMD 的情况下只有 peerDenendencies 会被 external
const umdExternal = [...Object.keys(pkg.peerDependencies || {})]

const getRollupConfig = (type, input, name, globals) => {
  const plugins = [
    postcss({
      extract: true,
      use: {
        sass: null,
        stylus: null,
        less: {
          plugins: [new NpmImport({ prefix: '~' })],
          javascriptEnabled: true
        }
      },
      plugins: [
        autoprefixer({
        // https://github.com/postcss/autoprefixer/issues/776
          remove: false
        })
      ]
    }),
    resolve(),
    typescript(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      // 必须设置 extensions，默认不包括 ts 和 tsx. see: https://babeljs.io/docs/en/babel-core#default_extensions
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    })
  ]

  const commonConfig = {
    input,
    external,
    plugins
  }

  switch (type) {
    case 'esm':
      return {
        output: {
          file: `es/${name}.js`,
          format: 'esm'
        },
        ...commonConfig
      }
    case 'cjs':
      return {
        output: {
          file: `lib/${name}.js`,
          format: 'cjs'
        },
        ...commonConfig
      }
    case 'umd':
      return {
        output: {
          file: `dist/${name}.js`,
          format: 'umd',
          globals,
          name
        },
        ...commonConfig,
        external: umdExternal,
        plugins: [
          ...plugins,
          replace({
            'process.env.NODE_ENV': JSON.stringify('development')
          })
        ]
      }
  }
}

module.exports = getRollupConfig
