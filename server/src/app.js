require('dotenv').config()
const express = require('express')
const router = require('./routes')
const morgan = require('morgan')
const helmet = require('helmet')
const i18next = require('i18next')
const compression = require('compression')
const Backend = require('i18next-fs-backend')
const middleware = require('i18next-http-middleware')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()

// config multiple language
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json'
    }
  })

//init middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
)
app.use(middleware.handle(i18next))
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cookieParser())
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json'
    }
  })

//init db
require('~/db/init.mongodb')

//init router
app.use(router)

//handling errors
app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  const statusCode = error.status || 500
  res.status(statusCode).json({
    success: false,
    code: statusCode,
    langMessage: error.langMessage || null,
    message: error.message || 'Internal server error'
  })
  next(error)
})

module.exports = app
