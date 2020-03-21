import { createBrowserHistory } from 'history'

const pagePrefix = process.env.pagePrefix

export default createBrowserHistory({
  basename: pagePrefix,
})
