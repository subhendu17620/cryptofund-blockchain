import axios from "axios";

export async function getETHPrice() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum"
    );
    return response.data[0].current_price.toFixed(2);

    // const data = await response.json();
    // const ethPrice = data[0].current_price;
    // return parseFloat(parseFloat(ethPrice).toFixed(2));
  } catch (error) {
    console.log(error);
  }
}

export function getWEIPriceInUSD(usd, wei) {
  return parseFloat(convertWeiToETH(wei) * usd).toFixed(2);
}
export function getETHPriceInUSD(usd, eth) {
  return parseFloat(eth * usd).toFixed(2);
}

export function convertWeiToETH(wei) {
  return parseFloat(wei) / 1000000000000000000;
}
