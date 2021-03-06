import { Checkbox } from '@stardust-ui/react'

const getScreenerSteps = (): ScreenerSteps => [
  builder => builder.click(`.${Checkbox.className}`).snapshot('Checks checkbox'),
  (builder, keys) => builder.keys('body', keys.tab).snapshot('Focuses checkbox'),
]

export default getScreenerSteps
