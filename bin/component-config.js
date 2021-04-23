const path = require('path')
const resolve = (dir) => {
  return path.resolve(__dirname, dir)
}

module.exports = [
  ['esm', resolve('../components/avatar/index.tsx'), 'avatar'],
  ['cjs', resolve('../components/avatar/index.tsx'), 'avatar'],
  ['esm', resolve('../components/tooltip/index.tsx'), 'tooltip'],
  ['cjs', resolve('../components/tooltip/index.tsx'), 'tooltip'],
  ['esm', resolve('../components/index.ts'), 'index'],
  ['cjs', resolve('../components/index.ts'), 'index'],
  ['umd', resolve('../components/index.ts'), 'mie-ui', { react: 'React', 'react-dom': 'ReactDOM' }]
]
