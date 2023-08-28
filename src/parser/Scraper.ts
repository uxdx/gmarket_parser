import axios, { AxiosRequestConfig } from "axios";

export async function scrape(url: string): Promise<string> {
  // Axios Request Config
  const headers = {
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-encoding": "gzip, deflate, br",
    "accept-language":
      "ko-KR,ko;q=0.9,ja-JP;q=0.8,ja;q=0.7,en-US;q=0.6,en;q=0.5",
    "cache-control": "max-age=0",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36",
  };
  const options: AxiosRequestConfig = {
    url,
    headers,
  };

  // Send query
  return (await axios(options)).data;
}
