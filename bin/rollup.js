const rollup = require('rollup')
const getRollupConfig = require('./getRollupConfig')
const componentConfig = require('./component-config')

const build = async (type, componentEntry, name, gloabls) => {
  const config = getRollupConfig(type, componentEntry, name, gloabls)
  const { output, ...input } = config
  const bundle = await rollup.rollup(input)
  await bundle.write(output)
}

const main = async () => {
  for (const component of componentConfig) {
    const [type, componentEntry, name, gloabls] = component
    await build(type, componentEntry, name, gloabls)
  }
}

main()
