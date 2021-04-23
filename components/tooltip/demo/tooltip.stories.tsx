import React from 'react'
import Tooltip from '../index'
import '../style/index.css'

export default {
  title: '组件/Tooltip',
  component: null,
  argTypes: {
  }
}

export const One = () => (
  <div style={{ padding: 100 }}>
    <div style={{ display: 'flex' }}>
      <div style={{ margin: '0 50px' }}>
        <Tooltip position="left" title="我是左对齐左对齐左对齐">
          长文本左对齐
        </Tooltip>
      </div>
      <div style={{ margin: '0 50px' }}>
        <Tooltip position="left" title="左对齐">
          左对齐
        </Tooltip>
      </div>
      <div style={{ margin: '0 50px' }}>
        <Tooltip position="center" title="我是居中对齐居中对齐居中对齐">
          长文本居中对齐
        </Tooltip>
      </div>
      <div style={{ margin: '0 50px' }}>
        <Tooltip position="center" title="我是居中对齐">
          居中对齐
        </Tooltip>
      </div>
      <div style={{ margin: '0 50px' }}>
        <Tooltip position="right" title="我是右对齐右对齐右对齐">
          长文本右对齐
        </Tooltip>
      </div>
      <div style={{ margin: '0 50px' }}>
        <Tooltip position="right" title="我是右对齐">
          右对齐
        </Tooltip>
      </div>
    </div>
  </div>
)

One.storyName = 'Tooltip'
