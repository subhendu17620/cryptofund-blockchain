// Load environment variables.
require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const mnemonicPhrase = process.env.mnemonic;
const network = process.env.infura_link;

const provider = new HDWalletProvider({
    mnemonic: {
        phrase: mnemonicPhrase
    },
    providerOrUrl: network
});

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);

    // console.log({ data: "0x" + compiledFactory.evm.bytecode.object });

    const result = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: "0x" + compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0] });

    console.log("Contract deployed to", result.options.address);
    // console.log(result)
    provider.engine.stop();
};

deploy();
