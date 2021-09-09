const fs = require('fs');
const env = require('../../eNV.json');
const Web3 = require('web3');
const args = process.argv.slice(2);
const path = require('path');
const compile = require('../contracts/compile');

const web3 = new Web3(env.host);
const {abi, bytecode} = compile('SimpleStorage.sol', 'cont');

let contract = new web3.eth.Contract(abi, env.storageContractAddress);

contract.methods.get().call().then(value => console.log('contract holds: ' + value) || process.exit(0));