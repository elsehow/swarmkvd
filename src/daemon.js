#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2))
var dnode = require('dnode')
var keys = JSON.parse(require('fs').readFileSync(argv.k))
var opts = {
  keys: keys,
  sodium: require('chloride/browser'),
  valueEncoding: 'json',
  hubs: [ 'https://signalhub.mafintosh.com' ]
}
var level = require('level')
var swarmlog = require('swarmlog')
var sub = require('subleveldown')
var db = level('/tmp/.swarmkv')
opts.db = sub(db, 'log')
var log = swarmlog(opts)
var kv = require('hyperkv')({
  log: log,
  db: sub(db, 'kv')
})

var server = dnode({

  put: function (k, v, cb) {
    kv.put(k, v, cb)
  },

  get: function (k, cb) {
    kv.get(k, cb)
  },

  list: function (cb) {
    var rows = []
    var readS = kv.createReadStream(kv)
    readS.on('data', (row) => {
      rows.push(JSON.stringify(row))
    })
    readS.on('end', () => {
      cb(rows)
    })
  },

});
server.listen(argv.p);
