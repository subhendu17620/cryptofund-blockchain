import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x7AA58D140c9119acE5bb306424C3FD4b083efE1C"
);

export default instance;
