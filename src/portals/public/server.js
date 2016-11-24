import { Router } from 'express'
import fs from 'fs'
import path from 'path'

const website = Router()

const directories = ['../../platform/apps','../../apps']
directories.map(function(directory) {
  fs.readdirSync(path.join(__dirname, directory)).filter(function(apppath) {
    const server = path.join(__dirname, directory, apppath, 'public/server.js')
    if(fs.existsSync(server)) {
      website.use(`/${apppath}`, require(server).default)
    }
  })
})

export default website
