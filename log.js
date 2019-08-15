require('colors')
module.exports = function(message, critical = false, debug = false) {
  if (critical) console.error(message.red)
  else if (debug) console.debug(message.blue)
  else console.log(message)
}