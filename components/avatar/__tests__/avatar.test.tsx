import React from 'react'
import { mount } from 'enzyme'
import Avatar from '../index'

describe('Avatar', function () {
  it('should match snapshot', () => {
    const component = mount(<Avatar>J</Avatar>)
    expect(component).toMatchSnapshot()
  })
  it('render corrent', () => {
    const component = mount(<Avatar>SONGJP</Avatar>)
    expect(component.find('.mie-ui-avatar-string').at(0).text()).toBe('SONGJP')
  })
})
