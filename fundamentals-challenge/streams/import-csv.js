import fs from 'node:fs'
import { parse } from 'csv-parse'

const csvPath = new URL('./tasks.csv', import.meta.url)
const stream = fs.createReadStream(csvPath)

const createParse = parse({
  fromLine: 2
})

async function run() {
  stream.pipe(createParse)
    .on("data", (data) => {
      const [title, description] = data

      fetch('http://localhost:3333/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description
        })
      })
    })
}

run()