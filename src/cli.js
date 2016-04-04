#!/usr/bin/env node
var fs = require('fs')
var path = require('path')
var validate = require('./validate')
var usage = () => {
  var txt = path.join(__dirname, 'usage.txt')
  fs.createReadStream(txt).pipe(process.stdout)
}
var argv = require('minimist')(process.argv.slice(2), {
  default: {
    d: path.join(process.env.HOME || process.env.USERPROFILE
                 || process.getcwd(), '.hyperkv')
  },
  alias: { h: 'help' },
  //boolean: [ 'json' ]
})

function c (v, cb) {
  if (!v)
    usage()
  else
    cb()
}

// help
if (argv.h || !argv._)
  usage()

switch (argv._[0]) {

case ('list'):
  console.log('list time!')
  break

// get [key]
case ('get'):
  var k = argv._[1]
  c(validate.str(k), () => {
    console.log('get !', k)
  })
  break

  // put [key] [value]
case ('put'):
  var k = argv._[1]
  var v = argv._[2]
  c(validate.str(k) && validate.str(v), () => {
    console.log('put!', k, v)
  })
  break


// start [keys.json]
case ('start'):
  var ssbkeys = argv._[1]
  c(validate.ssb(ssbkeys), () => {
    console.log('start time!')
  })
  break

default:
  usage()
}




//var spawn = require('child_process').spawn
//
//var e = spawn('electron-spawn', [
//  require('path').join(__dirname, 'daemon.js'),
//] )
//
//e.stderr.pipe(process.stderr)
//e.stdout.pipe(process.stdin)
