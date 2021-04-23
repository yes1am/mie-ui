import React, { Component, RefObject } from 'react'
import cx from 'classnames'
import { Props, State } from './types'
import './style/index.less'

const prefixCls = 'mie-ui-avatar'

class Avatar extends Component<Props, State> {
  private avatarChildrenRef: RefObject<HTMLSpanElement> = React.createRef();
  private avatarNodeRef: RefObject<HTMLSpanElement> = React.createRef();
  private lastChildrenWidth: number = 0;
  private lastNodeWidth: number = 0;

  constructor (props: Props) {
    super(props)
    this.state = {
      scale: 1,
      mounted: false,
      isImgExist: true
    }
  }

  static defaultProps = {
    shape: 'circle',
    size: 'default'
  }

  componentDidMount () {
    this.setScale()
    this.setState({ mounted: true })
  }

  componentDidUpdate (prevProps: Props) {
    this.setScale()
    if (prevProps.src !== this.props.src) {
      this.setState({
        isImgExist: true,
        scale: 1
      })
    }
  }

  // 根据容器节点，和头像节点设置缩放
  setScale () {
    if (!this.avatarChildrenRef.current || !this.avatarNodeRef.current) {
      return
    }
    const childrenWidth = this.avatarChildrenRef.current.offsetWidth // offsetWidth avoid affecting be transform scale
    const nodeWidth = this.avatarNodeRef.current.offsetWidth
    // 0 没意义
    if (
      childrenWidth === 0 ||
      nodeWidth === 0 ||
      (this.lastChildrenWidth === childrenWidth && this.lastNodeWidth === nodeWidth)
    ) {
      return
    }
    // 用于缓存，防止重复计算
    this.lastChildrenWidth = childrenWidth
    this.lastNodeWidth = nodeWidth
    // 左右增加 4px,显得不那么挤
    this.setState({
      scale: nodeWidth - 8 < childrenWidth ? (nodeWidth - 8) / childrenWidth : 1
    })
  };

  handleImgLoadError = () => {
    this.setState({ isImgExist: false })
  };

  render () {
    const {
      shape,
      size,
      src,
      icon,
      className,
      style = {},
      ...restProps
    } = this.props
    let { children } = this.props

    const { isImgExist, scale, mounted } = this.state

    const sizeCls = cx({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small'
    })

    const classStr = cx(prefixCls, className, sizeCls, {
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-image`]: src && isImgExist,
      [`${prefixCls}-icon`]: icon
    })

    const sizeStyle =
      typeof size === 'number'
        ? {
            width: size,
            height: size,
            lineHeight: `${size}px`,
            fontSize: icon ? size / 2 : 18
          }
        : {}

    // NOTE: avatar 组件没有处理 loading 的情况
    if (src && isImgExist) {
      children = <img src={src} onError={this.handleImgLoadError} />
    } else if (icon) {
      children = icon
    } else {
      // NOTE: 文字 didMount 之后，setScale 触发的
      const childrenNode = this.avatarChildrenRef.current
      if (childrenNode || scale !== 1) {
        const childrenStyle: React.CSSProperties = {
          transform: `scale(${scale}) translateX(-50%)`
        }

        const sizeChildrenStyle =
          typeof size === 'number'
            ? {
                lineHeight: `${size}px`
              }
            : {}
        children = (
          <span
            className={`${prefixCls}-string`}
            ref={this.avatarChildrenRef}
            style={{ ...sizeChildrenStyle, ...childrenStyle }}
          >
            {children}
          </span>
        )
      } else {
        // NOTE: 文字第一次渲染的时候
        const childrenStyle: React.CSSProperties = {}
        if (!mounted) {
          childrenStyle.opacity = 0
        }

        children = (
          <span
            className={`${prefixCls}-string`}
            style={{ opacity: 0 }}
            ref={this.avatarChildrenRef}
          >
            {children}
          </span>
        )
      }
    }
    return (
      <span
        {...restProps}
        style={{ ...sizeStyle, ...style }}
        className={classStr}
        ref={this.avatarNodeRef}
      >
        {children}
      </span>
    )
  }
}

export default Avatar
