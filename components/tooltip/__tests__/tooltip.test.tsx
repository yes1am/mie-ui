import React from 'react'
import { mount } from 'enzyme'
import Tooltip from '../index'

describe('Tooltip', function () {
  it('should match snapshot', () => {
    const component = mount(
      <Tooltip position="left" title="我是左对齐左对齐左对齐">
        长文本左对齐
      </Tooltip>
    )
    expect(component).toMatchSnapshot()
  })
  it('render corrent', () => {
    const component = mount(
      <Tooltip position="left" title="我是左对齐左对齐左对齐">
        <div className="aaa">长文本左对齐</div>
      </Tooltip>
    )
    expect(component.find('.mie-ui-tooltip-left').length).toBe(0)
  })
})
