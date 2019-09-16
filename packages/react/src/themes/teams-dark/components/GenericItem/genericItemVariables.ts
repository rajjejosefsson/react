import { GenericItemVariables } from '../../../teams/components/GenericItem/genericItemVariables'

export default (siteVars: any): Partial<GenericItemVariables> => ({
  focusOutlineColor: siteVars.colors.brand[600],
  focusHoverBackgroundColor: siteVars.colors.grey[500],
  selectedBackgroundColor: siteVars.colors.grey[500],
})
