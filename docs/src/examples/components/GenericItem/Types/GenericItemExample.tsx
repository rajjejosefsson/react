import * as React from 'react'
import { GenericItem, Image } from '@stardust-ui/react'

const GenericItemExample = () => (
  <div>
    <GenericItem
      media={<Image src="public/images/avatar/small/matt.jpg" avatar />}
      header="Irving Kuhic"
      headerMedia="7:26:56 AM"
      content="Program the sensor to the SAS alarm through the haptic SQL card!"
    />
  </div>
)

export default GenericItemExample
