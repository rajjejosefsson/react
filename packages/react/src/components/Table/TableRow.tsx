import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as React from 'react'
import TableCell, { TableCellProps } from './TableCell'
import { UIComponent, RenderResultConfig, UIComponentProps, commonPropTypes } from '../../lib'
import { ReactProps, ShorthandValue } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'

export interface TableRowProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   * @available TableRowBehavior
   * */
  accessibility?: Accessibility

  items?: ShorthandValue[]

  headerIndex?: number
}

/**
 * A TableRow is used to harmonize negative space in a layout.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class TableRow extends UIComponent<ReactProps<TableRowProps>, any> {
  public static displayName = 'TableRow'

  public static className = 'ui-TableRow'

  public static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    content: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([
        PropTypes.arrayOf(customPropTypes.nodeContent),
        customPropTypes.nodeContent,
      ]),
    ]),
    items: customPropTypes.collectionShorthand,
    headerIndex: PropTypes.number,
  }

  public static defaultProps: TableRowProps = {
    as: 'tr',
    accessibility: defaultBehavior,
  }

  public renderCells() {
    const { items, headerIndex } = this.props

    return _.map(items, (item: TableCellProps, index) => {
      if (headerIndex && index === headerIndex) {
        return <TableCell as="th" scope="row" {...item} />
      }
      return <TableCell {...item} />
    })
  }

  public renderComponent({
    accessibility,
    ElementType,
    classes,
    unhandledProps,
  }: RenderResultConfig<any>): React.ReactNode {
    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
        {this.renderCells()}
      </ElementType>
    )
  }
}

export default TableRow