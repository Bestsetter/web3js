import { OpenoceanApiSdk } from "@openocean.finance/api";

export default function OpenoceanComponents() {
  const openoceanApiSdk = new OpenoceanApiSdk();
  const { api, swapSdk, config } = openoceanApiSdk;
  api
    .getTokenList({
      chain: "BSC",
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      return;
    });
  return <div>OpenoceanComponents</div>;
}
