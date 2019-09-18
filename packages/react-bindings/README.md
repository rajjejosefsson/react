`@stardust-ui/react-bindings`
===

A set of reusable components and hooks to build component libraries and UI kits.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Hooks](#hooks)
  - [`useStateManager()`](#usestatemanager)
    - [Usage](#usage)
    - [Reference](#reference)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation

**NPM**
```bash
npm install --save @stardust-ui/react-bindings
```

**Yarn**
```bash
yarn add @stardust-ui/react-bindings
```

# Hooks

## `useStateManager()`

A React hook that provides bindings for state managers. 

### Usage 

The examples below assume a component called `<Counter>` will be used this way:

```tsx
import { useStateManager } from '@stardust-ui/react-bindings'
import { createManager, ManagerFactory } from '@stardust-ui/state'

type InputProps = { value?: string, defaultValue?: string, onChange: (value: string) => void }
type InputState = { value: string }
type InputActions = { change: (value: string) => void }

const createInputManager: ManagerFactory<InputState, InputActions> = config =>
  createManager<InputState, InputActions>({
    ...config,
    actions: {
      change: (value: string) => () => ({ value }),
    },
    state: { value: '', ...config.state, },
  })

const Input: React.FC<InputProps> = () => {
  const [state, actions] = useStateManager(createToggleManager, props, ['open'])

  return <input onChange={e => { 
actions.change(e.target.value)
if (props.onChange) onChange(e.target.value)
 }} value={state.value} />
}
```

### Reference

```tsx
const [state, actions] = useStateManager(createToggleManager, props, ['open'])
const [state, actions] = useStateManager(
  managerFactory: ManagerFactory<State, Actions>, 
  props: Props,
  autoControlledProps: (keyof Props)[] = [],
)
```

- `managerFactory` - a factory that implements state manager API
- `props` - all component props
- `autoControlledProps` - optional and is required only if your component implements [controlled mode](https://reactjs.org/docs/uncontrolled-components.html).
