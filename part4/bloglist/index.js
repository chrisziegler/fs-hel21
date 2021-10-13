const app = require('./app')
const http = require('http')
const { config, logger } = require('./utils')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`server listening at PORT ${config.PORT}`)
})
