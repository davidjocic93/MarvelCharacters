import { communicationService } from "./communicationService";
import Character from "../components/entities/character";
import { RESULTS_PER_PAGE } from "../constants";

class DataService {

    getCharacters(name, page, charachtersHandler) {

        let allCharachters = [];

        communicationService.getRequest("v1/public/characters", name, page,
            (serverResponse) => {


                serverResponse.data.data.results.map(char => {
                    const name = char.name;
                    const id = char.id;
                    const imageUrl = char.thumbnail.path + "/landscape_xlarge." + char.thumbnail.extension;
                    const detailsUrl = char.urls[0].url;

                    const character = new Character(name, id, imageUrl, detailsUrl);
                    allCharachters.push(character);

                });

                const total = serverResponse.data.data.total;
                const pages = Math.ceil(total / RESULTS_PER_PAGE);

                charachtersHandler(allCharachters, total, pages);

            },
            (serverErrorObject) => {
                console.log(serverErrorObject);
            });
    };
};

export const dataService = new DataService();
