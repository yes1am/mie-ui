// see: https://react-svgr.com/docs/testing/
import * as React from 'react'

export default 'SvgrURL'
// eslint-disable-next-line react/display-name
const SvgrMock = React.forwardRef((props, ref: any) => <span ref={ref} {...props} />)
export const ReactComponent = SvgrMock
