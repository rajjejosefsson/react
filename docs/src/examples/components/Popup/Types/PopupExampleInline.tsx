import * as React from 'react'
import { Button, Popup } from '@stardust-ui/react'

const PopupExampleInline = () => (
  <Popup content="This popup is rendered next to the trigger." inline>
    <Button icon="more" />
  </Popup>
)

export default PopupExampleInline
