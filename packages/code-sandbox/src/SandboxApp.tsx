import { KnobInspector, KnobProvider } from '@stardust-ui/docs-components'
import { Divider, Flex, Header, Provider, RadioGroup, Text, themes } from '@stardust-ui/react'
// @ts-ignore
import pkg from '@stardust-ui/react/package.json'
import * as React from 'react'

import KnobsSnippet from './KnobsSnippet'
import knobComponents from './knobComponents'

const items = [
  {
    key: 'light',
    label: 'Teams Light',
    value: 'teams',
  },
  {
    key: 'dark',
    label: 'Teams Dark',
    value: 'teamsDark',
  },
  {
    key: 'hc',
    label: 'Teams High Contrast',
    value: 'teamsHighContrast',
  },
]

const SandboxApp: React.FunctionComponent = props => {
  const { children } = props
  const [theme, setTheme] = React.useState(items[0].value)

  return (
    <Provider theme={themes[theme]} styles={{ height: '100vh', padding: '1rem' }}>
      {/* TODO: Load it in more React way */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/prismjs@1.16.0/themes/prism-tomorrow.min.css"
      />

      <KnobProvider components={knobComponents}>
        <div>
          <Header>Stardust UI @ {pkg.version}</Header>
          <p>
            This example is powered by Stardust UI, check{' '}
            <Text as="a" href="https://stardust-ui.github.io/react/">
              our docs
            </Text>{' '}
            and{' '}
            <Text as="a" href="https://github.com/stardust-ui/react">
              GitHub
            </Text>
            .
          </p>

          <Flex>
            Select theme:
            <RadioGroup
              checkedValueChanged={(e, data) => setTheme(data.value as string)}
              checkedValue={theme}
              items={items}
            />
          </Flex>
          <Divider />
          <KnobInspector>
            {knobs =>
              knobs && (
                <>
                  <KnobsSnippet>{knobs}</KnobsSnippet>
                  <Divider />
                </>
              )
            }
          </KnobInspector>

          {children}
        </div>
      </KnobProvider>
    </Provider>
  )
}

export default SandboxApp
