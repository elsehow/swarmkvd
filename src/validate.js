// validators
module.exports = {

  // validate ssb key file
  ssb: (f) => {
    try {
      var keys = JSON.parse(require('fs').readFileSync(f))
      if (!keys || !keys.public)
        return false
      return true
    }
    catch (e) {
      return false
    }
  },

  // validate a string
  str: (x)=>  {
    return typeof x === 'string'
  },

}
