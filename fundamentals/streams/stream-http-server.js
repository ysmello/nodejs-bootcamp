import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Buffer.from(String(Number(chunk.toString()) * -1))
    callback(null, transformed)
  }
}

// const server = http.createServer((req, res) => {
//   return req
//     .pipe(new InverseNumberStream())
//     .pipe(res)
// })

const server = http.createServer(async (req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  return res.end(fullStreamContent)
})


server.listen(3334)