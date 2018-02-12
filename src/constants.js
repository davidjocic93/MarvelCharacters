import md5 from "crypto-js/md5";

export const BASE_URL = "https://gateway.marvel.com/";
export const PRIV_KEY = "28eff7bde526640c986639c8fc2bfd60d9658ba0";
export const PUBLIC_KEY = "e40572c51c3a14b54c8ece81dce8e6c5";
export const TS = new Date().getTime();
export const HASH = md5(TS + PRIV_KEY + PUBLIC_KEY).toString();
export const RESULTS_PER_PAGE = 12;