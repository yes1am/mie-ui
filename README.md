# @songjp/mie-ui

个人的 React UI Library, 主要用于学习 [father-build](https://github.com/umijs/father/tree/master/packages/father-build) 打包组件库的流程

## 1. 使用

**安装:**  

```shell
yarn add @songjp/mie-ui
```

**使用方式:**  
目前打包出了 es 目录(esm 模块)， lib 目录(cjs 模块) 以及 dist 目录(umd) 模块。

```shell
// 方式1: import
import '@songjp/mie-ui/es/avatar.css'  // 单独加载组件的 css
import { Avatar } from '@songjp/mie-ui'

<Avatar>J</Avatar>

// 方式2: UMD
<script src="node_modules/react/umd/react.development.js"></script>
<script src="node_modules/react-dom/umd/react-dom.development.js"></script>
<script src="node_modules/@songjp/mit-ui/dist/mie-ui.js"></script>
<link href="node_modules/@songjp/mit-ui/dist/mie-ui.css" rel="stylesheet" />
<script>
  ReactDOM.render(
      React.createElement(miemie.tooltip, {
        title: '我是文本 的 Tooltip',
        // other props
      },
      '我是 children'
    ), document.querySelector('#root')
  )
</script>
```

## 2. 发布

```shell
# 打 tag
npm version patch/minor/maior

# 推代码
git push

# 推 tag 触发 CI 执行发布
git push origin --tags
```