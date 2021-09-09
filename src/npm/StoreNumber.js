const fs = require('fs');

const env = require('../../eNV.json');
const Web3 = require('web3');
const args = process.argv.slice(2);
const path = require('path');
const compile = require('../contracts/compile');

const web3 = new Web3(env.host);
const {abi, bytecode} = compile('SimpleStorage.sol', 'cont');

const keyStore = web3.eth.accounts.encrypt(env.privateKey, env.password);

const store = async () => {
    const account = web3.eth.accounts.decrypt(keyStore, env.password);

    try {
        let contract = new web3.eth.Contract(abi, env.storageContractAddress);

        const contractMethodAbi = contract.methods.set(parseInt(args[0])).encodeABI();

        const txnCount = await web3.eth.getTransactionCount(account.address);

        let signedTransactionObject = await account.signTransaction( {
            nonce: web3.utils.numberToHex(txnCount),
            gas: 4000000,
            data: contractMethodAbi,
            from: account.address,
            chainId: 420,
            to: env.storageContractAddress,
        } );

        let result = await web3.eth.sendSignedTransaction(signedTransactionObject.rawTransaction);

        console.log("stored to", result);
    } catch (e) {
        console.error(e);
    }

};

store().then(() => process.exit(0));