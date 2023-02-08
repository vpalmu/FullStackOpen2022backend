const app = require('./app')
const logger = require('./utils/logger')
const { PORT }  = require('./utils/config')

// start the application
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
    logger.info(`open in broswer: http://localhost:${PORT}`)
})