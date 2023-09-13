import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './noteall.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

const Printed = (props) => {
  const [books, setBooks] = useState({ book: [] });
  const [isThereBooks, setIsThereBooks] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const bookDataFetched = await axios.get('http://127.0.0.1:8000/account/rest-auth/listOfAllSelectedNotes/Printed');
        const bookData = bookDataFetched.data;
        if (bookData.length === 0) {
          setIsThereBooks(false);
        } else {
          setBooks({ book: bookData });
          setIsThereBooks(true);
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    getData();
  }, []);

  const showElementToHide = (id) => {
    document.getElementById(`hideTheButton${id}`).style.display = 'none';
    document.getElementById(`${id}`).style.display = 'block';
  };

  const hideElement = (id) => {
    document.getElementById(`${id}`).style.display = 'none';
    document.getElementById(`hideTheButton${id}`).style.display = 'block';
  };

  async function changeStatusOfBook(data) {
    const typeOfStatus = props.loginStatus;
    if (typeof typeOfStatus === 'number') {
      try {
        const bookData = await axios.get(`http://127.0.0.1:8000/account/rest-auth/listOfAddedNotes/${typeOfStatus}`);
        const lengthOfData = bookData.data.length;
        if (lengthOfData === 0) {
          props.bookFunction(data, 'all');
          document.getElementById('insideBookCard' + data).style.display = 'none';
        } else {
          let added = false;
          for (let k = 0; k < lengthOfData; k++) {
            const bookId = bookData.data[k].id;
            if (bookId === data) {
              alert('You have added this book in list');
              added = true;
              break;
            }
          }
          if (!added) {
            props.bookFunction(data, 'all');
            document.getElementById('insideBookCard' + data).style.display = 'none';
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
    document.getElementById('insideBookCard' + props.rejectedBook).style.display = 'block';
    document.getElementById('hideTheButton' + props.rejectedBook).style.display = 'block';
  }

  const showBooks = () => {
    return books.book.map((book) => {
      return (
        <div id={'insideBookCard' + book.id} style={{ display: 'block' }} key={book.id}>
          <div id="NoteCard">
            <p className="noteTitle">{book.noteTitle}</p>
            <div className="noteContents">
              <p>
                <span>Faculty:</span>
                {book.noteFaculty}
              </p>
              <p>
                <span>Price: Rs.</span>
                {book.notePrice}
              </p>
              <div id={'hideTheButton' + book.id} style={{ display: 'block' }}>
                <button className="showMoreButtonNote" onClick={() => showElementToHide(book.id)}>
                  <FontAwesomeIcon icon={faChevronCircleDown} style={{ color: 'rgb(247, 148, 164)' }} />
                </button>
              </div>
              <div className="elementsToHide" style={{ display: 'none' }} id={book.id}>
                <p>
                  <span>Type:</span>
                  {book.notesType}
                </p>
                <p>
                  <span>Information:</span>
                  {book.noteExplanation}
                </p>
                <p>
                  <button id="buttonToPayNote" onClick={() => changeStatusOfBook(book.id)}>
                    Add to cart
                  </button>
                </p>
                <p>
                  <button className="showLessButtonNote" onClick={() => hideElement(book.id)}>
                    <FontAwesomeIcon icon={faChevronCircleUp} style={{ color: 'rgb(247, 148, 164)' }} />
                  </button>
                </p>
              </div>
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

export default Printed;
