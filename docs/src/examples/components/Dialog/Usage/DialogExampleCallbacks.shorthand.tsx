import { createCallbackLogFormatter } from '@stardust-ui/code-sandbox'
import { useBooleanKnob, useLogKnob } from '@stardust-ui/docs-components'
import { Button, Dialog } from '@stardust-ui/react'
import * as React from 'react'

const DialogExampleCallbacks = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open' })

  const onCancel = useLogKnob(
    'onCancel',
    () => setOpen(false),
    createCallbackLogFormatter(['open']),
  )
  const onConfirm = useLogKnob(
    'onConfirm',
    () => setOpen(false),
    createCallbackLogFormatter(['open']),
  )
  const onOpen = useLogKnob('onOpen', () => setOpen(true), createCallbackLogFormatter(['open']))

  return (
    <Dialog
      cancelButton="Cancel"
      confirmButton="Confirm"
      onCancel={onCancel}
      onConfirm={onConfirm}
      onOpen={onOpen}
      open={open}
      header="Action confirmation"
      trigger={<Button content="Open a dialog" />}
    />
  )
}

export default DialogExampleCallbacks
