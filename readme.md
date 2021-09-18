to create network you need to create first block in the network which is called Genesis block

to create it use this command: 

```
geth --datadir folderToStore init genesis.json
```

genesis.json is the file which contains config for the Genesis block
use puppeth tool for creating it


to launch blockchain use this:

```
geth --http --http.api web3,eth,debug,personal,net,miner --datadir blockchain
```

after that you can create account like that 

```

// create and unlock account
personal.newAccount('password')
//address _output

// while testing you might need to ignore signing transactions for simplisity
personal.unlockAccount("_output", "password", time exm: 15000)

```