import * as React from 'react'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import {
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  commonPropTypes,
  ContentComponentProps,
  applyAccessibilityKeyHandlers,
  ShorthandFactory,
} from '../../lib'
import Flex from '../Flex/Flex'
import { genericItemBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import { ShorthandValue, WithAsProp, ComponentEventHandler, withSafeTypeForAs } from '../../types'
import Box, { BoxProps } from '../Box/Box'

export interface GenericItemSlotClassNames {
  header: string
  headerMedia: string
  main: string
  content: string
  contentMedia: string
  media: string
  endMedia: string
}

export interface GenericItemProps
  extends UIComponentProps,
    ContentComponentProps<ShorthandValue<BoxProps>> {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility
  contentMedia?: ShorthandValue<BoxProps>
  /** Toggle debug mode. */
  debug?: boolean
  header?: ShorthandValue<BoxProps>
  endMedia?: ShorthandValue<BoxProps>
  headerMedia?: ShorthandValue<BoxProps>

  /** A generic item can appear more important and draw the user's attention. */
  important?: boolean
  media?: ShorthandValue<BoxProps>

  index?: number

  /** A generic item can indicate that it can be selected. */
  selectable?: boolean
  /** Indicates if the current generic item is selected. */
  selected?: boolean

  /** A generic item can indicate that it can be navigable. */
  navigable?: boolean

  truncateContent?: boolean
  truncateHeader?: boolean
  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<GenericItemProps>
}

class GenericItem extends UIComponent<WithAsProp<GenericItemProps>> {
  static create: ShorthandFactory<GenericItemProps>

  static displayName = 'GenericItem'

  static className = 'ui-genericitem'

  static slotClassNames: GenericItemSlotClassNames

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    contentMedia: PropTypes.any,
    content: PropTypes.any,

    debug: PropTypes.bool,

    header: PropTypes.any,
    endMedia: PropTypes.any,
    headerMedia: PropTypes.any,

    important: PropTypes.bool,
    media: PropTypes.any,

    selectable: PropTypes.bool,
    navigable: PropTypes.bool,
    index: PropTypes.number,
    selected: PropTypes.bool,

    truncateContent: PropTypes.bool,
    truncateHeader: PropTypes.bool,

    onClick: PropTypes.func,
  }

  static defaultProps = {
    as: 'div',
    accessibility: genericItemBehavior as Accessibility,
  }

  actionHandlers = {
    performClick: event => {
      this.handleClick(event)
      event.preventDefault()
    },
  }

  handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ classes, accessibility, unhandledProps, styles }) {
    const { as, debug, endMedia, media, content, contentMedia, header, headerMedia } = this.props

    const contentElement = Box.create(content, {
      defaultProps: {
        className: GenericItem.slotClassNames.content,
        styles: styles.content,
      },
    })
    const contentMediaElement = Box.create(contentMedia, {
      defaultProps: {
        className: GenericItem.slotClassNames.contentMedia,
        styles: styles.contentMedia,
      },
    })
    const headerElement = Box.create(header, {
      defaultProps: {
        className: GenericItem.slotClassNames.header,
        styles: styles.header,
      },
    })
    const headerMediaElement = Box.create(headerMedia, {
      defaultProps: {
        className: GenericItem.slotClassNames.headerMedia,
        styles: styles.headerMedia,
      },
    })
    const endMediaElement = Box.create(endMedia, {
      defaultProps: {
        className: GenericItem.slotClassNames.endMedia,
        styles: styles.endMedia,
      },
    })
    const mediaElement = Box.create(media, {
      defaultProps: {
        className: GenericItem.slotClassNames.media,
        styles: styles.media,
      },
    })

    const hasHeaderPart = !!(headerElement || headerMediaElement)
    const headerPart = hasHeaderPart && (
      <>
        <Flex.Item grow>{headerElement}</Flex.Item>
        {headerMediaElement}
      </>
    )

    const hasContentPart = !!(contentElement || contentMediaElement)
    const contentPart = hasContentPart && (
      <>
        <Flex.Item grow>{contentElement}</Flex.Item>
        {contentMediaElement}
      </>
    )

    const hasBothParts = hasContentPart && hasHeaderPart

    return (
      <Flex
        vAlign="center"
        as={as}
        debug={debug}
        className={classes.root}
        onClick={this.handleClick}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {mediaElement}

        <Flex.Item grow>
          <Flex
            className={GenericItem.slotClassNames.main}
            column={hasBothParts}
            styles={styles.main}
          >
            {hasBothParts ? <Flex>{headerPart}</Flex> : headerPart}
            {hasBothParts ? <Flex>{contentPart}</Flex> : contentPart}
          </Flex>
        </Flex.Item>
        {endMediaElement}
      </Flex>
    )
  }
}

GenericItem.create = createShorthandFactory({ Component: GenericItem, mappedProp: 'content' })
GenericItem.slotClassNames = {
  header: `${GenericItem.className}__header`,
  headerMedia: `${GenericItem.className}__headerMedia`,
  main: `${GenericItem.className}__main`,
  content: `${GenericItem.className}__content`,
  contentMedia: `${GenericItem.className}__contentMedia`,
  media: `${GenericItem.className}__media`,
  endMedia: `${GenericItem.className}__endMedia`,
}

/**
 * A GenericItem renders an item at is core
 */
export default withSafeTypeForAs<typeof GenericItem, GenericItemProps, 'div'>(GenericItem)
