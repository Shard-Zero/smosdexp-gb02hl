import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import OrderlyProvider from "@/components/orderlyProvider";
import { HttpsRequiredWarning } from "@/components/HttpsRequiredWarning";
import { withBasePath } from "./utils/base-path";
import { getRuntimeConfig } from "./utils/runtime-config";
import { getSEOConfig, getUserLanguage } from "./utils/seo";

export default function App() {
  const seoConfig = getSEOConfig();
  const defaultLanguage = getUserLanguage();

  return (
    <>
      <Helmet>
        <html lang={seoConfig.language || defaultLanguage} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={withBasePath(getRuntimeConfig('VITE_FAVICON_PATH') || "/favicon.webp")} />
        <style>{`
          /* Force hide default Orderly footer logo by attribute matching */
          footer svg[width="45"][height="14"] {
            display: none !important;
          }
        `}</style>
      </Helmet>
      <HttpsRequiredWarning />
      <OrderlyProvider>
        <Outlet />
      </OrderlyProvider>
    </>
  );
}

