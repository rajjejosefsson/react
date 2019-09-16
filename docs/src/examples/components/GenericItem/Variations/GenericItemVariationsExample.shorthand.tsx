import { useBooleanKnob, useRangeKnob, useStringKnob } from '@stardust-ui/docs-components'
import { GenericItem, Image } from '@stardust-ui/react'
import * as React from 'react'

const GenericItemVariationsExample = () => {
  const [debug] = useBooleanKnob({ name: 'debug' })
  const [truncateContent] = useBooleanKnob({ name: 'truncateContent', initialValue: true })
  const [truncateHeader] = useBooleanKnob({ name: 'truncateHeader', initialValue: true })
  const [selectable] = useBooleanKnob({ name: 'selectable', initialValue: false })
  const [selected] = useBooleanKnob({ name: 'selected', initialValue: false })
  const [width] = useRangeKnob({ name: 'width', initialValue: '25rem' })
  const [header] = useStringKnob({
    name: 'header',
    initialValue: 'Irving Kuhic - Super long title here',
  })
  const [content] = useStringKnob({
    name: 'content',
    initialValue: 'Program the sensor to the SAS alarm through the haptic SQL card!',
  })
  const [headerMedia] = useStringKnob({ name: 'headerMedia', initialValue: '7:26 AM' })
  const [endMedia] = useStringKnob({ name: 'endMedia', initialValue: '•••' })
  const [contentMedia] = useStringKnob({ name: 'contentMedia', initialValue: '' })

  return (
    <div style={{ width }}>
      <GenericItem
        debug={debug}
        truncateContent={truncateContent}
        truncateHeader={truncateHeader}
        selectable={selectable}
        selected={selected}
        media={<Image src="public/images/avatar/small/matt.jpg" avatar />}
        header={header}
        headerMedia={headerMedia}
        content={content}
        contentMedia={contentMedia}
        endMedia={endMedia}
      />
    </div>
  )
}

export default GenericItemVariationsExample
