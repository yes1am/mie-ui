import React, { Component, RefObject } from 'react'
import { PortalWithState } from 'react-portal'
import { Props } from './types'
import cx from 'classnames'
import './style/index.less'

const prefixCls = 'mie-ui-tooltip'

class Tooltip extends Component<Props, null> {
  private alignRef: RefObject<HTMLDivElement> = React.createRef();
  private triggerRef: RefObject<HTMLDivElement> = React.createRef();

  static defaultProps = {
    position: 'center',
    distanceFromTop: 0,
    distanceAddonLeft: 0
  }

  constructor (props: Props) {
    super(props)
    this.updateStyle = this.updateStyle.bind(this)
  }

  updateStyle () {
    const trigger = this.triggerRef && this.triggerRef.current
    const align = this.alignRef && this.alignRef.current
    if (!trigger || !align) {
      return
    }
    const arrowWidth = 8
    const { position, distanceFromTop = 0, distanceAddonLeft = 0 } = this.props
    const result = trigger.getBoundingClientRect()
    const { left, top, width } = result
    const { width: alignWidth, height: alignHeight } = align.getBoundingClientRect()

    let leftStyle = 0

    if (position === 'right') {
      leftStyle = left - (alignWidth - width)
    } else if (position === 'center') {
      leftStyle = left - (alignWidth - width) / 2
    } else {
      leftStyle = left
    }

    align.style.top = (top - alignHeight - distanceFromTop - arrowWidth / 2) + 'px'
    align.style.left = (leftStyle + distanceAddonLeft) + 'px'
  }

  render () {
    const { children, title, position } = this.props
    return (
      <PortalWithState closeOnOutsideClick onOpen={this.updateStyle}>
        {
          ({ openPortal, closePortal, portal }) => {
            return (
              <div>
                <div
                  ref={this.triggerRef}
                  onMouseEnter={openPortal}
                  onMouseLeave={closePortal}
                >
                  {children}
                </div>
                {
                  portal(
                    <div ref={this.alignRef} className={cx(prefixCls, `${prefixCls}-${position}`)}>
                      {title}
                    </div>
                  )
                }
              </div>
            )
          }
        }
      </PortalWithState>
    )
  }
}

export default Tooltip
