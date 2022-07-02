const server = 'https://projects.yoro.dev/df-talents/api/'

export function request(method, data, auth = false) {
  const body = { method: method }
  if (data) body.body = data
  if (auth) {
    body.password = prompt('Enter your password:')
    // console.log(body)
    if (!body.password) return
  }
  return fetch(server, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}