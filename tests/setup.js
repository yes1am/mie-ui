/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

// see https://stackoverflow.com/questions/51887552/jest-enzyme-document-createrange-is-not-a-function-on-mount
if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document
    }
  })
}

configure({ adapter: new Adapter() })
