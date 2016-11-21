import { Router } from 'express'
import fs from 'fs'
import path from 'path'

const website = Router()

const root = path.resolve('.')
const directories = ['src/platform/apps','src/apps']
directories.map(function(directory) {
  fs.readdirSync(path.join(root, directory)).filter(function(apppath) {
    const server = path.join(root, directory, apppath, 'public/server.js')
    if(fs.existsSync(server)) {
      website.use(`/${apppath}`, require(server).default)
    }
  })
})

export default website
