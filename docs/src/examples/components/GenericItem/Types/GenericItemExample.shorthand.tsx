import * as React from 'react'
import { GenericItem, Image } from '@stardust-ui/react'
import { useBooleanKnob } from '@stardust-ui/docs-components'

const GenericItemExampleShorthand = () => {
  const [debug] = useBooleanKnob({ name: 'debug' })

  return (
    <GenericItem
      debug={debug}
      media={<Image src="public/images/avatar/small/matt.jpg" avatar />}
      header="Irving Kuhic"
      headerMedia="7:26:56 AM"
      content="Program the sensor to the SAS alarm through the haptic SQL card!"
    />
  )
}
export default GenericItemExampleShorthand
