import { BASE_URL, PUBLIC_KEY, TS, HASH, RESULTS_PER_PAGE } from "../constants";
import axios from "axios";



class CommunicationService {


    getRequest(url, query, page, succesHandler, errorHandler) {

        const requestUrl = `${BASE_URL}${url}`;

        axios.get(requestUrl, {
            params: {
                "nameStartsWith": query,
                "ts": TS,
                "apikey": PUBLIC_KEY,
                "hash": HASH,
                "limit": RESULTS_PER_PAGE,
                "offset": (page * RESULTS_PER_PAGE) - RESULTS_PER_PAGE || 0
            }
        })
            .then(response => succesHandler(response))
            .catch((error) => errorHandler(error));
    }

}


export const communicationService = new CommunicationService();