import * as React from 'react'
import * as keyboardKey from 'keyboard-key'
import { isConformant, handlesAccessibility } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'

import GenericItem from 'src/components/GenericItem/GenericItem'
import { selectableListItemBehavior } from 'src/lib/accessibility'

describe('GenericItem', () => {
  isConformant(GenericItem)
  handlesAccessibility(GenericItem, { defaultRootRole: 'listitem' })

  test('handleClick is executed when Enter is pressed for selectable list', () => {
    const onClick = jest.fn()
    const genericItem = mountWithProvider(
      <GenericItem accessibility={selectableListItemBehavior} onClick={onClick} />,
    ).find('GenericItem')
    genericItem.simulate('keydown', { keyCode: keyboardKey.Enter })
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('handleClick is executed when Spacebar is pressed for selectable list', () => {
    const onClick = jest.fn()
    const genericItem = mountWithProvider(
      <GenericItem accessibility={selectableListItemBehavior} onClick={onClick} />,
    ).find('ListItem')
    genericItem.simulate('keydown', { keyCode: keyboardKey.Spacebar })
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
