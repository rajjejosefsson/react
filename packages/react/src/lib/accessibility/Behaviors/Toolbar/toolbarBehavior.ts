import { Accessibility, FocusZoneMode } from '../../types'
import { FocusZoneDirection } from '../../FocusZone'

/**
 * @description
 * Implements ARIA Toolbar design pattern.
 * Child item components need to have toolbarItemBehavior assigned.
 * @specification
 * Adds role 'toolbar' to 'root' slot.
 * Embeds component into FocusZone.
 * Provides arrow key navigation in horizontal direction.
 * When component's container element receives focus, focus will be set to the default focusable child element of the component.
 */
const toolbarBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'toolbar',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      shouldFocusInnerElementWhenReceivedFocus: true,
      direction: FocusZoneDirection.horizontal,
    },
  },
})

export default toolbarBehavior
