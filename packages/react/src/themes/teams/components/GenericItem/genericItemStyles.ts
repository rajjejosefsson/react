import { pxToRem } from '../../../../lib'
import { screenReaderContainerStyles } from '../../../../lib/accessibility/Styles/accessibilityStyles'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'
import {
  default as GenericItem,
  GenericItemProps,
} from '../../../../components/GenericItem/GenericItem'

const truncateStyle: ICSSInJSStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

const hoverStyle = (p: GenericItemProps, v): ICSSInJSStyle => ({
  background: v.focusHoverBackgroundColor,
  color: v.focusHoverColor,
  cursor: 'pointer',

  [`& .${GenericItem.slotClassNames.header}`]: { color: 'inherit' },
  [`& .${GenericItem.slotClassNames.content}`]: { color: 'inherit' },

  // hide the header media and content media on hover
  [`& .${GenericItem.slotClassNames.headerMedia}`]: {
    ...screenReaderContainerStyles,
    color: 'inherit',
  },
  [`& .${GenericItem.slotClassNames.contentMedia}`]: { display: 'none', color: 'inherit' },

  // show the end media on hover
  [`& .${GenericItem.slotClassNames.endMedia}`]: { display: 'block', color: 'inherit' },
})

const focusStyle = (p: GenericItemProps, v): ICSSInJSStyle => ({
  ...hoverStyle(p, v),
  outline: 0,

  ':focus-visible': {
    outline: `.2rem solid ${v.focusOutlineColor}`,
    zIndex: 1,
  },
})

const selectedStyle = variables => ({
  background: variables.selectedBackgroundColor,
  color: variables.selectedColor,
})

const genericItemStyles: ComponentSlotStylesPrepared<GenericItemProps, any> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    minHeight: v.minHeight,
    padding: v.rootPadding,

    // hide the end media by default until hovering
    [`& .${GenericItem.slotClassNames.endMedia}`]: { display: 'none' },

    '&:hover': hoverStyle(p, v),
    '&:focus': focusStyle(p, v),
    ...(p.selectable && {
      position: 'relative',
      ...(p.selected && selectedStyle(v)),
    }),
    ...(p.important && {
      fontWeight: 'bold',
    }),
  }),
  media: ({ props: p }): ICSSInJSStyle => ({
    ...(p.important && {
      '::before': {
        content: '""',
        position: 'absolute',
        left: pxToRem(8),
        width: pxToRem(2),
        height: pxToRem(2),
        background: '#000',
      },
    }),
    ...((p.header || p.content) && {
      marginRight: pxToRem(8),
    }),
  }),
  header: ({ props: p, variables: v }) => ({
    fontSize: v.headerFontSize,
    lineHeight: v.headerLineHeight,
    ...(p.truncateHeader && truncateStyle),
    ...((!p.content || p.headerMedia) && {
      marginRight: pxToRem(8),
    }),
  }),
  headerMedia: ({ variables: v }): ICSSInJSStyle => ({
    fontSize: v.headerMediaFontSize,
    lineHeight: v.headerMediaLineHeight,
    alignSelf: 'flex-end',
  }),
  content: ({ props: p, variables: v }) => ({
    fontSize: v.contentFontSize,
    lineHeight: v.contentLineHeight,
    ...(p.truncateContent && truncateStyle),
    ...((!p.header || p.contentMedia) && {
      marginRight: pxToRem(8),
    }),
  }),
  contentMedia: ({ props: p, variables: v }) => ({
    fontSize: v.contentMediaFontSize,
    lineHeight: v.contentMediaLineHeight,
  }),
  endMedia: ({ props: p }) => ({
    ...((p.selectable || p.navigable) && { display: 'none' }),
    flexShrink: 0,
  }),
  main: () => ({
    minWidth: 0, // needed for the truncate styles to work
  }),
}

export default genericItemStyles
