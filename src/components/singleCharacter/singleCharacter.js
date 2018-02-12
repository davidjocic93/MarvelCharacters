import React from "react";
import "./singleCharacter.css";

const SingleCharacter = (props) => {
  const { _name, _id, _imageUrl } = props.character;

  let bookmarkedCharacters;
  let bookmarked = false;

  props.bookmarkedCharacters ? bookmarkedCharacters = props.bookmarkedCharacters : bookmarkedCharacters = [];

  for (let i = 0; i < bookmarkedCharacters.length; i++) {
    if (bookmarkedCharacters[i]._id === _id) {
      bookmarked = true;
    }
  }


  return (
    <div className="character-card">
      {<img src={_imageUrl} alt="character" className="character-image" />}
      <div className="div-table">
        <div className="div-table-cell">
          <p>{_name}</p>
        </div>
      </div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Bookmark-outlined-circular-button-symbol.svg/2000px-Bookmark-outlined-circular-button-symbol.svg.png" alt="bookmark"
        className={bookmarked ? "bookmark activeBookmark" : "bookmark"} onClick={() => props.bookmarkCharacter(props.character)} />
    </div>
  );

};

export default SingleCharacter;