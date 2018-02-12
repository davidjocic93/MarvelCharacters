import React from "react";
import { dataService } from "../../service/dataService";
import Characters from "../characters/characters";
import SearchBar from "../search/search";
import Pagination from "react-js-pagination";
import { RESULTS_PER_PAGE } from "../../constants";

class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            characters: [],
            bookmarkedCharacters: [],
            searchTerm: "",
            searching: false,
            total: null,
            pages: 1,
            page: 1,
        };
    }

    handleChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        clearTimeout(this.timer);
        this.setState({ searchTerm });
        this.timer = setTimeout(this.triggerChange, 1000);
    }

    triggerChange = () => {

        const { searchTerm } = this.state;

        if (!searchTerm) {
            this.setState({
                characters: [],
                searchTerm: null,
                searching: false,
                page: 1,
                pages: 1,
                total: this.state.bookmarkedCharacters.length
            });
            return;
        }

        this.searchCharacters(searchTerm);
    }

    searchCharacters = (searchTerm, page) => {

        dataService.getCharacters(searchTerm, page,
            (characters, total, pages) => {
                this.setState({
                    characters,
                    searchTerm,
                    searching: true,
                    total,
                    pages,
                    page
                });
            });
    }

    handlePageChange = (page) => {
        const searchTerm = this.state.searchTerm;
        this.searchCharacters(searchTerm, page);
    }

    isCharacterBookmarked = (characters, character) => {

        for (let i = 0; i < characters.length; i++) {
            if (character._id === characters[i]._id) {
                return i;
            }
        }
        return -1;
    }

    bookmarkCharacter = (character) => {

        let bookmarkedCharacters = this.state.bookmarkedCharacters;
        let alreadyBookmarked = this.isCharacterBookmarked(bookmarkedCharacters, character);

        alreadyBookmarked >= 0 ? bookmarkedCharacters.splice(alreadyBookmarked, 1) : bookmarkedCharacters.push(character);

        let bookmarkedCharactersStringified = JSON.stringify(bookmarkedCharacters);
        localStorage.setItem("MARVEL_CHARACTERS", bookmarkedCharactersStringified);

        this.setState({
            bookmarkedCharacters,
        });
    }

    getBookmarkedCharacters = () => {
        let storedCharacters = localStorage.getItem("MARVEL_CHARACTERS");
        let bookmarkedCharacters = [];

        if (storedCharacters) {
            bookmarkedCharacters = JSON.parse(storedCharacters);
        }

        if (bookmarkedCharacters) {
            this.setState({
                bookmarkedCharacters,
                total: bookmarkedCharacters.length
            });
        }
    }

    componentDidMount() {
        this.timer = null;
        this.getBookmarkedCharacters();
    }

    render() {

        return (
            <div>
                <SearchBar search={this.handleChange} />
                <div className="content-container">
                    {this.state.pages > 1 && (
                        <div className="pagination-container">
                            <Pagination
                                className="pagination"
                                LinkClass="link"
                                itemClass="listItem"
                                activeLinkClass="activePageLink"
                                activePage={this.state.page}
                                itemsCountPerPage={RESULTS_PER_PAGE}
                                totalItemsCount={this.state.total}
                                onChange={this.handlePageChange}
                                pageRangeDisplayed="3"
                            />
                        </div>
                    )}
                    {this.state.searching ?
                        (this.state.characters.length ?
                            <Characters
                                characters={this.state.characters}
                                bookmarkedCharacters={this.state.bookmarkedCharacters}
                                bookmarkCharacter={this.bookmarkCharacter} />
                            :
                            <div className="no-results"><h1>No characters with that name!</h1></div>
                        )
                        :
                        (this.state.bookmarkedCharacters.length ?
                            <Characters
                                characters={this.state.bookmarkedCharacters}
                                bookmarkedCharacters={this.state.bookmarkedCharacters}
                                bookmarkCharacter={this.bookmarkCharacter} />
                            :
                            <div className="no-results"><h1>Search for your favorite Marvel hero!</h1></div>
                        )
                    }
                </div>
            </div>
        );

    }
}

export default MainPage;