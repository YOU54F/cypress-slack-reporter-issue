// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {

  on('task', {
    queryDb: query => {
      return queryTestDb(query, config)
    },
  })

  require('cypress-plugin-retries/lib/plugin')(on)

  on('before:browser:launch', (browser, launchOptions) => {
    // ref: https://docs.cypress.io/api/plugins/browser-launch-api.html#Usage
    launchOptions.args.push('--disable-dev-shm-usage')

    return launchOptions
  })
}

const mysql = require('mysql')

function queryTestDb(query, config) {
  const connection = mysql.createConnection(config.env.db, {
    multipleStatements: true
  })
  connection.connect()
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error)
      else {
        connection.end()
        return resolve(results)
      }
    })
  })
}