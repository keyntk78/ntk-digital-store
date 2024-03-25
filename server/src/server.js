const app = require('~/app')
const { appConfig } = require('~/configs/config.mongodb')

const PORT = appConfig.port || 3056

app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(`WSV ECommerce start with ${PORT}`)
})
