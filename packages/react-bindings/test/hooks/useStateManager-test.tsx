import { useStateManager } from '@stardust-ui/react-bindings'
import { createManager, ManagerFactory } from '@stardust-ui/state'
import { shallow } from 'enzyme'
import * as React from 'react'
import * as ReactTestUtils from 'react-dom/test-utils'

type TestState = { open: boolean; value: string }
type TestActions = { change: (value: string) => void; toggle: () => void }

const testStateManager: ManagerFactory<TestState, TestActions> = config =>
  createManager<TestState, TestActions>({
    ...config,
    actions: {
      change: (value: string) => () => ({ value }),
      toggle: () => state => ({ open: !state.open }),
    },
    state: {
      open: false,
      value: '',
      ...config.state,
    },
  })

type TestComponentProps = Partial<TestState> & {
  defaultOpen?: boolean
  color?: string
}

const TestComponent: React.FunctionComponent<TestComponentProps> = props => {
  const manager = useStateManager(testStateManager, props, ['open', 'value'])

  return (
    <>
      <div className={`open-${manager.state.open}`} />

      <input onChange={e => manager.actions.change(e.target.value)} value={manager.state.value} />
      <button className={props.color} onClick={() => manager.actions.toggle()} />
    </>
  )
}

describe('useStateManager', () => {
  it('foo', () => {
    const wrapper = shallow(<TestComponent />)

    expect(wrapper.find('div').prop('className')).toBe('open-false')
    expect(wrapper.find('input').prop('value')).toBe('')
  })

  it('foo', () => {
    const wrapper = shallow(<TestComponent defaultOpen />)
    expect(wrapper.find('div').prop('className')).toBe('open-true')
  })

  it('foo2', () => {
    const wrapper = shallow(<TestComponent />)

    ReactTestUtils.act(() => {
      wrapper.find('button').simulate('click')
    })
    expect(wrapper.find('div').prop('className')).toBe('open-true')
  })

  it('foo2a', () => {
    const wrapper = shallow(<TestComponent />)

    ReactTestUtils.act(() => {
      wrapper.find('input').simulate('change', { target: { value: 'foo' } })
    })
    expect(wrapper.find('input').prop('value')).toBe('foo')
  })

  it('foo3', () => {
    const wrapper = shallow(<TestComponent />)

    ReactTestUtils.act(() => {
      wrapper.setProps({ color: 'red' })
    })
    expect(wrapper.find('div').prop('className')).toBe('open-false')
  })

  it('foo4', () => {
    const wrapper = shallow(<TestComponent />)

    ReactTestUtils.act(() => {
      wrapper.setProps({ open: false })
    })
    expect(wrapper.find('div').prop('className')).toBe('open-false')

    ReactTestUtils.act(() => {
      wrapper.setProps({ open: true })
    })
    expect(wrapper.find('div').prop('className')).toBe('open-true')
  })

  it('foo5', () => {
    const wrapper = shallow(<TestComponent />)

    ReactTestUtils.act(() => {
      wrapper.setProps({ open: true })
    })
    expect(wrapper.find('div').prop('className')).toBe('open-true')

    ReactTestUtils.act(() => {
      wrapper.setProps({ open: undefined })
    })
    expect(wrapper.find('div').prop('className')).toBe('open-true')
  })
})
