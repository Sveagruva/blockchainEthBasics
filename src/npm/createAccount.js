const env = require('../../eNV.json');
const Web3 = require('web3');
const args = process.argv.slice(2);

const web3 = new Web3(env.host);

const account = web3.eth.accounts.create(args[0]);

console.log('address', account.address);
console.log('privateKey', account.privateKey);
console.log('password', args[0]);