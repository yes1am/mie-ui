import React from 'react'

export interface Props {
  /** 头像的 src 链接 */
  src?: string;
  /** 外层 classname  */
  className?: string;
  /** 头像大小 */
  size?: 'default' | 'large' | 'small';
  /** 头像形状，影响 border-radius */
  shape?: 'circle' | 'square'
  /**  */
  style?: React.CSSProperties
  /** 渲染的 icon */
  icon?: React.ReactNode;
}

export interface State {
  scale: number;
  mounted: boolean;
  isImgExist: boolean;
}
