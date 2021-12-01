import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x7B440DB22B2B89c0E862A8d205FDb17bA5Fc3fa4"
);

export default instance;
