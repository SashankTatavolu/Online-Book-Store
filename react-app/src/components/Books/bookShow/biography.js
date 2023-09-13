import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import Books from '../books';
import './bookShow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

const Biography = (props) => {
  const [books, setBooks] = useState({ book: [] });
  const [isThereBooks, setisThereBooks] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const bookDataFetched = await axios.get('http://127.0.0.1:8000/account/rest-auth/listOfSelectedBook/Biography');
        const bookData = bookDataFetched.data;
        if (bookData.length === 0) {
          setisThereBooks(false);
        } else {
          setBooks({ book: bookData });
          setisThereBooks(true);
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    getData();
  }, []);

  const showElementToHide = (id) => {
    const ids = id;
    document.getElementById('hideTheButton' + `${ids}`).style.display = 'none';
    document.getElementById(`${ids}`).style.display = 'block';
  };

  const hideElement = (id) => {
    const ids = id;
    document.getElementById(`${ids}`).style.display = 'none';
    document.getElementById('hideTheButton' + `${ids}`).style.display = 'block';
  };

  async function changeStatusOfBook(data) {
    const typeOfStatus = props.loginStatus;
    if (typeof typeOfStatus === 'number') {
      try {
        const bookData = await axios.get(`http://127.0.0.1:8000/account/rest-auth/bookAdded/${typeOfStatus}`);
        const lengthOfData = bookData.data.length;
        if (lengthOfData === 0) {
          props.bookFunction(data, 'all');
          document.getElementById('insideBookCard' + `${data}`).style.display = 'none';
        } else {
          let added = false;
          for (let k = 0; k < bookData.data.length; k++) {
            const bookId = bookData.data[k].id;
            if (bookId === data) {
              alert('You have added this book in list');
              added = true;
              break;
            }
            if (k + 1 === lengthOfData) {
              props.bookFunction(data, 'all');
              document.getElementById('insideBookCard' + `${data}`).style.display = 'none';
            }
          }
          if (!added) {
            props.bookFunction(data, 'all');
            document.getElementById('insideBookCard' + `${data}`).style.display = 'none';
          }
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    } else {
      alert('Please Login to add');
    }
  }

  if (typeof props.rejectedBook === 'number') {
    document.getElementById('insideBookCard' + `${props.rejectedBook}`).style.display = 'show';
    document.getElementById('hideTheButton' + `${props.rejectedBook}`).style.display = 'show';
  }

  const showBooks = () => {
    return books.book.map((book) => {
      return (
        <div id="bookCard" key={book.id}>
          <p className="bookTitle">{book.nameOfBook}</p>
          <div>
            <img src={book.bookImage} alt="book" />
          </div>
          <div className="bookContents" key={book.id}>
            <p>
              <span>Writer:</span>
              {book.nameOfWriter}
            </p>
            <p>
              <span>Date Of Publication:</span>
              {book.dateOfPublication}
            </p>
            <p>
              <span>Price:</span>
              {book.labelPriceBook}
            </p>
            <div id={'hideTheButton' + book.id} style={{ display: 'block' }}>
              <button className="showMoreButton" onClick={() => showElementToHide(book.id)}>
                <FontAwesomeIcon icon={faChevronCircleDown} style={{ color: 'rgb(218, 195, 46)' }} />
              </button>
            </div>
            <div className="elementsToHide" style={{ display: 'none' }} key={book.id} id={book.id}>
              <p>
                <span>Type:</span>
                {book.typeOfBook}
              </p>
              <p>
                <span>Condition:</span>
                {book.conditionBook}
              </p>
              <p>
                <button id="buttonToPay" onClick={() => changeStatusOfBook(book.id)}>
                  Add to cart
                </button>
              </p>
              <p>
                <button className="showLessButton" id={book.id} onClick={() => hideElement(book.id)}>
                  <FontAwesomeIcon icon={faChevronCircleUp} style={{ color: 'rgb(218, 195, 46)' }} />
                </button>
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="showBook">
        <div className="aboutBook">{isThereBooks ? showBooks() : null}</div>
      </div>
    </div>
  );
};

export default Biography;
