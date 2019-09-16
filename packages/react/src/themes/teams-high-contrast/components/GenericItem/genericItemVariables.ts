import { GenericItemVariables } from '../../../teams/components/GenericItem/genericItemVariables'

export default (siteVars: any): Partial<GenericItemVariables> => ({
  selectedColor: siteVars.colors.black,
  selectedBackgroundColor: siteVars.accessibleCyan,

  selectableFocusHoverBackgroundColor: siteVars.accessibleYellow,
  selectableFocusHoverColor: siteVars.colors.black,
})
