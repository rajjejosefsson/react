import * as React from 'react'
import { isConformant, handlesAccessibility } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'

import GenericItem from 'src/components/GenericItem/GenericItem'

describe('GenericItem', () => {
  isConformant(GenericItem)
  handlesAccessibility(GenericItem, { defaultRootRole: 'none' })

  test('handleClick is executed when mouse click is clicked for generic item', () => {
    const onClick = jest.fn()
    const genericItem = mountWithProvider(<GenericItem onClick={onClick} />).find('GenericItem')
    genericItem.simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
