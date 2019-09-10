import { AnyActions, EnhancedAction, Manager, ManagerConfig } from './types'

const createManager = <State, Actions extends AnyActions>(
  config: ManagerConfig<State, Actions>,
): Manager<State, Actions> => {
  const { actions, debug, middleware = [], sideEffects = [], state } = config
  const _state: State = Object.assign({}, state) as State

  const getState = (): State => Object.assign({}, _state)
  const setState = (partial: Partial<State>): State => Object.assign(_state, partial)

  const manager: Manager<State, Actions> = {
    actions: {} as Actions,
    get state() {
      return getState()
    },
  }

  // assign actions to manager's api
  Object.keys(actions).forEach(actionName => {
    const enhancedAction = actions[actionName]
    const action = (...args: Parameters<typeof enhancedAction>) => {
      applyAction(enhancedAction, ...args)
      applyMiddleware()
      applySideEffects()
    }

    manager.actions[actionName] = action
  })

  const applyAction = <A extends EnhancedAction<State, Actions>>(
    action: A,
    ...args: Parameters<A>
  ) => {
    if (!action) return
    if (debug) console.log('manager ACTION', action.name || 'Anonymous')

    const actionResult = action(...args)(getState(), manager.actions)
    if (actionResult) setState(actionResult)
  }

  const applyMiddleware = () => {
    const prevState = getState()

    middleware.forEach((middlewareItem, index) => {
      if (debug) {
        console.log(`manager MIDDLEWARE[${index}]`, {
          prev: prevState,
          next: getState(),
        })
      }
      setState(middlewareItem(prevState, getState(), manager.actions))
    })
  }

  const applySideEffects = (): void => {
    if (!sideEffects) return

    sideEffects.forEach((sideEffect, index) => {
      if (debug) console.log(`manager SIDE_EFFECT[${index}]`)
      sideEffect(manager)
    })
  }

  return manager
}

export default createManager
