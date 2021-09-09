const fs = require('fs');

const env = require('../../eNV.json');
const Web3 = require('web3');
const args = process.argv.slice(2);
const path = require('path');
const compile = require('../contracts/compile');

const web3 = new Web3(env.host);

const {abi, bytecode} = compile('SimpleStorage.sol', 'cont');
const keyStore = web3.eth.accounts.encrypt(env.privateKey, env.password);

const deploy = async () => {
    const account = web3.eth.accounts.decrypt(keyStore, env.password);

    try {
        const txnCount = await web3.eth.getTransactionCount(account.address);

        let signedTransactionObject = await account.signTransaction( {
            nonce: web3.utils.numberToHex(txnCount),
            gas: 4000000,
            data: bytecode,
            from: account.address,
            chainId: 420,
        } );

        let result = await web3.eth.sendSignedTransaction(signedTransactionObject.rawTransaction);

        console.log("Contract deployed to", result.contractAddress);
    } catch (e) {
        console.error(e);
    }
};

deploy().then(() => process.exit(0));