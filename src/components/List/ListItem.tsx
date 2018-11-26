import * as React from 'react'

import * as PropTypes from 'prop-types'
import { createShorthandFactory, UIComponent } from '../../lib'
import ItemLayout from '../ItemLayout/ItemLayout'
import { listItemBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import { Extendable } from '../../../types/utils'
import { UIComponentProps } from '../../lib/commonPropInterfaces'
import { commonUIComponentPropTypes } from '../../lib/commonPropTypes'
import Slot from '../Slot/Slot'

export interface ListItemProps extends UIComponentProps<any, any> {
  /**
   * Accessibility behavior if overridden by the user.
   * @default listItemBehavior
   * */
  accessibility?: Accessibility
  contentMedia?: any
  /** Shorthand for primary content. */
  content?: any
  /** Toggle debug mode */
  debug?: boolean
  header?: any
  endMedia?: any
  headerMedia?: any

  /** A list item can appear more important and draw the user's attention. */
  important?: boolean
  media?: any

  /** A list item can indicate that it can be selected. */
  selection?: boolean
  truncateContent?: boolean
  truncateHeader?: boolean
}

export interface ListItemState {
  isHovering: boolean
}

/**
 * A list item contains a single piece of content within a list.
 */
class ListItem extends UIComponent<Extendable<ListItemProps>, ListItemState> {
  static create: Function

  static displayName = 'ListItem'

  static className = 'ui-list__item'

  static propTypes = {
    ...commonUIComponentPropTypes,
    contentMedia: PropTypes.any,
    content: PropTypes.any,

    debug: PropTypes.bool,

    header: PropTypes.any,
    endMedia: PropTypes.any,
    headerMedia: PropTypes.any,

    important: PropTypes.bool,
    media: PropTypes.any,

    selection: PropTypes.bool,
    truncateContent: PropTypes.bool,
    truncateHeader: PropTypes.bool,

    accessibility: PropTypes.func,
  }

  static defaultProps = {
    as: 'li',
    accessibility: listItemBehavior as Accessibility,
  }

  constructor(props: ListItemProps) {
    super(props, null)

    this.state = {
      isHovering: false,
    }
  }

  private itemRef = React.createRef<HTMLElement>()

  renderComponent({ ElementType, classes, accessibility, rest, styles }) {
    const {
      as,
      debug,
      endMedia,
      media,
      content,
      contentMedia,
      header,
      headerMedia,
      truncateContent,
      truncateHeader,
    } = this.props

    const contentSlot = Slot.create(content, {
      defaultProps: { as: 'span', styles: styles.content },
    })

    return (
      <ItemLayout
        as={as}
        className={classes.root}
        rootCSS={styles.root}
        content={contentSlot}
        contentMedia={contentMedia}
        debug={debug}
        endMedia={endMedia}
        header={header}
        headerMedia={headerMedia}
        media={media}
        mediaCSS={styles.media}
        truncateContent={truncateContent}
        truncateHeader={truncateHeader}
        headerCSS={styles.header}
        headerMediaCSS={styles.headerMedia}
        contentCSS={styles.content}
        ref={this.itemRef}
        {...accessibility.attributes.root}
        {...rest}
      />
    )
  }
}

ListItem.create = createShorthandFactory(ListItem, 'main')

export default ListItem
