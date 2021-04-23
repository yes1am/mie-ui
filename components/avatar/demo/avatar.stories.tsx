import React from 'react'
import Avatar from '../index'

export default {
  title: '组件/Avatar',
  component: Avatar,
  argTypes: {
  }
}

export const One = () => <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
One.storyName = '图片'

export const Two = () => <Avatar>SONGJP</Avatar>
Two.storyName = '文字'
