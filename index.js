const app = require('./app') // the actual Express app
const logger = require('./utils/logger')
const { PORT }  = require('./utils/config')

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
    logger.info(`open in broswer: http://localhost:${PORT}`)
})