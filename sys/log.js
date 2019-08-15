require('colors')
module.exports = (message, critical = false, debug = false) => {
  if (critical) console.error(`${message}`.red)
  else if (debug) console.debug(`${message}`.blue)
  else console.log(message)
}