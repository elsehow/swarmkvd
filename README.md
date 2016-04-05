# empty-package

run your own distributed key-value store! 

like bittorrent sync, but for a kvstore

## installation

    npm install -g electron-prebuilt
    npm install -g swarmkvd

now generate some keys

    node -pe "JSON.stringify(require('ssb-keys').generate())" > keys.json

## usage

    swarmkvd start keys.json 
    
      Host a kv. If keys.json has a public and private key,
        you can put items. If it has only a public key, you
        can get and list items.
    
        optional: -d [database]
    
    swarmkvd get KEY
    
      Print a json object for the values at KEY,
        mapping hashes to values
    
    swarmkvd list
    
      Print a list of keys and values as json, one per line.
    
    swarmkvd put KEY VALUE
    
      Assoc VALUE with KEY in the kv

## developing

        npm install
        npm run watch

now you can edit `test/index.js` or `src/index.js`

`npm test` will re-run on changes
