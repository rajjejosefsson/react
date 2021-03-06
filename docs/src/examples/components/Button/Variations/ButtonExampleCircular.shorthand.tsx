import * as React from 'react'
import { Button, Flex } from '@stardust-ui/react'

const ButtonExampleCircular = () => (
  <Flex gap="gap.smaller">
    <Button circular content="C" />
    <Button circular icon="emoji" />
    <Button circular icon="broadcast" primary />
  </Flex>
)
export default ButtonExampleCircular
