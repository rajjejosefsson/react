import {
  AnyActions,
  EnhancedActions,
  Manager,
  ManagerFactory,
  Middleware,
} from '@stardust-ui/state'
import * as React from 'react'

import { getDefinedAutoControlledProps, getInitialAutoControlledState } from './stateUtils'

const useStateManager = <
  State,
  Actions extends AnyActions,
  Props extends Partial<State>,
  AProps extends keyof State
>(
  managerFactory: ManagerFactory<State, Actions>,
  props: Props,
  autoControlledProps: (keyof Props)[] = [],
): Manager<State, Actions> => {
  const latestManager = React.useRef<Manager<State, Actions> | null>(null)

  // Heads up! setState() is used only for triggering rerenders stateManager is SSOT()
  const [, setState] = React.useState()
  const syncState = React.useCallback(
    (manager: Manager<State, Actions>) => setState(manager.state),
    [],
  )

  const definedAutoControlledProps = getDefinedAutoControlledProps(autoControlledProps, props)
  // Is used as dependencies to recreate manager
  const autoControlledValues = autoControlledProps.reduce(
    (values: any[], propName: AProps) => [...values, props[propName]],
    [],
  )

  const overrideAutoControlledProps: Middleware<State, Actions> = (
    _prevState: State,
    nextState: State,
  ) => ({
    ...nextState,
    ...definedAutoControlledProps,
  })

  const manager = React.useMemo(() => {
    // If manager exists, the current state will be used
    const initialState = latestManager.current
      ? { ...latestManager.current.state, ...definedAutoControlledProps }
      : getInitialAutoControlledState(autoControlledProps, props)

    return managerFactory({
      // Factory has already configured actions
      actions: {} as EnhancedActions<State, Actions>,
      state: initialState,
      middleware: [overrideAutoControlledProps],
      sideEffects: [syncState],
    })
  }, autoControlledValues)

  latestManager.current = manager

  return manager
}

export default useStateManager
