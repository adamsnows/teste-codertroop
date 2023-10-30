import "@/styles/globals.css";
const inter = Inter({ subsets: ["latin"] });
import { Inter } from "next/font/google";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
