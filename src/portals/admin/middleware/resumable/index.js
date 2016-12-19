import express from 'express'
import resumable from './resumable'
import multipart from 'connect-multiparty'

const app = express()

app.use(multipart())

app.post('/uploads', (req, res) => {
  resumable.post(req, (status, filename, original_filename, identifier) => {
    res.send(status)
  })
})

app.get('/uploads', (req, res) => {
  resumable.get(req, (status, filename, original_filename, identifier) => {
    res.send((status === 'found' ? 200 : 404), status)
  })
})

export default app
