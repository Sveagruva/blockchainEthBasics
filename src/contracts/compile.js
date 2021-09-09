const solc = require('solc');
const path = require("path");
const fs = require("fs");



module.exports = compile = (fileName, name) => {
    const source = fs.readFileSync(path.resolve(__dirname, fileName),"utf8");

    const output = JSON.parse(solc.compile(JSON.stringify({
        language: 'Solidity',
        sources: {
            contract: {
                content: source
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': [ '*' ]
                }
            }
        }
    })));

    if(output.errors) {
        output.errors.forEach(err => console.error(err.formattedMessage));
        throw new Error('cannot compile contract');
    }

    return {
        abi: output.contracts.contract[name].abi,
        bytecode: output.contracts.contract[name].evm.bytecode.object,
    };
};