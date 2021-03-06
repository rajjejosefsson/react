import * as React from 'react'
import { SplitButton } from '@stardust-ui/react'

const SplitButtonExampleDisabledShorthand = () => (
  <SplitButton
    disabled
    menu={[
      { key: 'group', content: 'New group message' },
      { key: 'channel', content: 'New channel message' },
    ]}
    button="New conversation"
  />
)

export default SplitButtonExampleDisabledShorthand
