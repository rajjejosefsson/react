import { genericItemBehavior } from 'src/lib/accessibility'

describe('ListItemBehavior.ts', () => {
  test('use BasicGenericItemBehavior if selectable prop is NOT defined', () => {
    const property = {}
    const expectedResult = genericItemBehavior(property)
    expect(expectedResult.attributes.root.role).toEqual('none')
  })
})
