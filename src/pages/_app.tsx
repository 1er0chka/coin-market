import type { AppProps } from "next/app";
import { CoinInfoProvider } from "@/app/provider/CoinInfoContext";
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CoinInfoProvider>
      <Component {...pageProps} />
    </CoinInfoProvider>
  );
}
