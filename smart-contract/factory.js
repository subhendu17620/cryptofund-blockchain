import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x2DA99d6910102285faCB27cDBc027B940fD52288'
  // '0x893Bb59DC5cab0a0Ec790a29148738031ff6F9b6',
  // '0xC36c88551eAD91Fb5a7a7F657b1A4a1361FdDA76'
  // '0x2765416213a346f23049054AD712473775D7735a'
  // "0x7B440DB22B2B89c0E862A8d205FDb17bA5Fc3fa4"
);

export default instance;
