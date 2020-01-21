import { expect } from 'chai'
import Builder from '../../src/actions/Builder'
import JSON5Config from '../../src/helpers/JSON5Config'
import path from 'path'
import { captureStdout } from '../helpers'

describe('Builder', () => {
  it('should find the local plugin', async () => {
    const no_runtime_config = `${__dirname}/../fixtures/fab.local-plugins.json5`

    const { stdout, result } = await captureStdout(
      async () =>
        Builder.getPlugins(
          no_runtime_config,
          (await JSON5Config.readFrom(no_runtime_config)).data
        ),
      { quiet: false }
    )

    const { build_plugins, runtime_plugins } = result

    expect(
      build_plugins.map(({ plugin_name, plugin_args }) => [plugin_name, plugin_args])
    ).to.deep.equal([
      ['./plugins/build-and-render', { first: 'plugin' }],
      ['./plugins/build-only', { then: 'this one' }],
    ])
    expect(runtime_plugins).to.deep.equal([
      path.resolve(`${__dirname}/../fixtures/plugins/build-and-render/runtime.js`),
      path.resolve(`${__dirname}/../fixtures/plugins/runtime-only.js`),
    ])
    expect(stdout).to.contain(
      'Plugin ./plugins/empty exports neither a "build" or "runtime" export, ignoring it.'
    )
  })
})