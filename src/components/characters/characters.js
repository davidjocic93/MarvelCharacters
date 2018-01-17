import React from 'react';
import SingleCharacter from '../singleCharacter/singleCharacter';
import "./characters.css";

const Characters = (props) => {
    return (
        <div className="characters-wrapper">
            {props.characters.map(character => {
                return (
                    <SingleCharacter
                        character={character}
                        key={character._id}
                        bookmarkedCharacters={props.bookmarkedCharacters}
                        bookmarkCharacter={props.bookmarkCharacter} />
                );
            })}
        </div>
    );
};

export default Characters;
