var execSync = require('child_process').execSync

function ex (cmd) {
  return execSync(cmd).toString()
}


//console.log(ex('./src/cli.js'))
//console.log(ex('./src/cli.js list'))
//console.log(ex('./src/cli.js put thing nice'))
//console.log(ex('./src/cli.js get thing'))
console.log(ex('./src/cli.js start keys.json'))
