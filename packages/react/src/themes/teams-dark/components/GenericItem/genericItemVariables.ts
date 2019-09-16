import { GenericItemVariables } from 'src/themes/teams/components/GenericItem/genericItemVariables'

export default (siteVars: any): Partial<GenericItemVariables> => ({
  selectedFocusOutlineColor: siteVars.colors.brand[600],
  selectableFocusHoverBackgroundColor: siteVars.colors.grey[500],
  selectedBackgroundColor: siteVars.colors.grey[500],
})
