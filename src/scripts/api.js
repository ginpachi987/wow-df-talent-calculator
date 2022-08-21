import nProgress from "nprogress"
import '../../node_modules/nprogress/nprogress.css'

const server = 'https://projects.yoro.dev/df-talents/api/'

export function request(method, data, auth = false) {
  const body = { method: method }
  if (data) body.body = data
  if (auth) {
    body.password = prompt('Enter your password:')
    if (!body.password) return
  }
  nProgress.start()
  return fetch(server, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .finally(() => {
      nProgress.done()
    })
}