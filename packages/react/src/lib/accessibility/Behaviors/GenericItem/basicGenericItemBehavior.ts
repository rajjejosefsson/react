import { Accessibility } from '../../types'

/**
 * @specification
 * Adds role='none'.
 */

const basicGenericItemBehavior: Accessibility = props => ({
  attributes: {
    root: {
      role: 'none',
    },
  },
})

export default basicGenericItemBehavior
