import { OpenoceanApiSdk } from "@openocean.finance/api";

export default function OpenoceanComponents() {
  const openoceanApiSdk = new OpenoceanApiSdk();
  const { api, swapSdk, config } = openoceanApiSdk;

  api
    .getTokenList({
      chain: "bsc",
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error)
      return;
    })

  return (
    <div>
      <div>OpenoceanComponents</div>
    </div>
  );
}

