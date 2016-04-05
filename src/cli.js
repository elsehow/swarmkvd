#!/usr/bin/env node
var fs = require('fs')
var path = require('path')
var validate = require('./validate')
var daemon = path.join(__dirname, 'daemon.js')
var usage = () => {
  var txt = path.join(__dirname, 'usage.txt')
  fs.createReadStream(txt).pipe(process.stdout)
}
var argv = require('minimist')(process.argv.slice(2), {
  default: {
    //d: path.join(process.env.HOME || process.env.USERPROFILE
    //             || process.getcwd(), '.hyperkv'),
    p: 8889,
  },
  alias: { h: 'help' },
  //boolean: [ 'json' ]
})

function spawnDaemon (keyfile, database, port) {
  var spawn = require('child_process').spawn
  var e = spawn('electron-spawn', [
    daemon,
    '-k',
    keyfile,
    '-d',
    database,
    '-p',
    port,
  ] )
  e.stderr.pipe(process.stderr)
  e.stdout.pipe(process.stdout)
}

function dnodeDo (cb) {
  var dnode = require('dnode')
  var d = dnode.connect(argv.p);
  d.on('remote', remote => cb(remote, d))
}

function c (v, cb) {
  if (!v)
    usage()
  else
    dnodeDo(cb)
}


switch (argv._[0]) {

case ('list'):
  c(true, (remote, d) => {
    remote['list']((rows) => {
      console.log(rows)
      d.end()
    })
  })
  break

// get [key]
case ('get'):
  var k = argv._[1]
  c(validate.str(k), (remote, d) => {
    remote.get(k, (err, res) => {
      console.log(res)
      d.end();
    })
   })
  break

  // put [key] [value]
case ('put'):
  var k = argv._[1]
  var v = argv._[2]
  c(validate.str(k) && validate.str(v), (remote, d) => {
    remote.put(k, v, (err, node) => {
      if (err) console.log(err)
      d.end();
    })
  })
  break

// start [keys.json]
case ('start'):
  var ssbkeys = argv._[1]
  if (validate.ssb(ssbkeys))
    spawnDaemon(ssbkeys, argv.d, argv.p)
  break

default:
  usage()
}

