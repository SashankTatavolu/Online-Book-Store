import axios from 'axios';
import React, { useState,useEffect } from 'react';
import './noteall.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronCircleDown,faChevronCircleUp} from '@fortawesome/free-solid-svg-icons'

const HandWritten=(props)=>{
    const[books,setBooks ]=useState({book:[]})
    const[isThereBooks,setisThereBooks]=useState(false)
        useEffect(() => {
                const getData=async()=>{
                    // let bookDataFetched=await axios.get('http://127.0.0.1:8000/account/rest-auth/listOfAllSelectedNotes/HandWritten');
                    let bookDataFetched = await axios.get(`http://127.0.0.1:8000/account/rest-auth/listOfAllSelectedNotes/31/HandWritten`);

                    let bookData=bookDataFetched.data;
                    if(bookData.length===0){
                        setisThereBooks(false);
                    }
                    else{
                        setBooks({book:bookData});
                        setisThereBooks(true);
                    }}
                    
                    getData()
            
        }, []) 


    

    const showElementToHide=(id)=>{
        let ids=id;
        document.getElementById('hideTheButton'+`${ids}`).style='display:none';
        document.getElementById(`${ids}`).style="display:block";
    }
    const hideElement=(id)=>{
        let ids=id;
        document.getElementById(`${ids}`).style="display:none";
        document.getElementById('hideTheButton'+`${ids}`).style='display:show';

    }
    async function changeStatusOfBook(data){
        let typeOfStatus=props.loginStatus;
        if(typeof(typeOfStatus)==="number"){
            let bookData=await axios.get(`http://127.0.0.1:8000/account/rest-auth/listOfAddedNotes/${typeOfStatus}`)
            let lengthOfData=bookData.data.length;
            if(lengthOfData===0){
                props.bookFunction(data,"all");
                        document.getElementById('insideBookCard'+`${data}`).style='display:none';

            }
            else{
                for(var k=0;k<bookData.data.length;k++){
                    let bookId=bookData.data[k].id;
                    if(bookId===data){
                    alert("You have added this book in list");
                     break;
                     
                    }
                    if(k+1===lengthOfData){
                        props.bookFunction(data,"all");
                        document.getElementById('insideBookCard'+`${data}`).style='display:none';
    
    
    
                    }
                }
    

            }
           
            

        }
        else{
            alert("Please Login to add")
        }
        


    }
    if(typeof(props.rejectedBook)==="number"){
        document.getElementById('insideBookCard'+`${props.rejectedBook}`).style='display:show';
      //  document.getElementById(`${props.rejectedBook}`).style="display:none";
        document.getElementById('hideTheButton'+`${props.rejectedBook}`).style='display:show';


    }
    //if(props.categoryIdentifier.bookCategory!="all" && props.categoryIdentifier.bookCategory!=="" ){
      //  let bookIDS=props.categoryIdentifier.ID;
       // console.log(props.categoryIdentifier.bookCategory)
       // console.log(typeof(props.categoryIdentifier.bookCategory))
        //console.log(typeof(props.categoryIdentifier.ID))
       // console.log(props.categoryIdentifier.ID)
       // document.getElementById('insideBookCard'+`${props.categoryIdentifier.ID}`).style='display:none';


        


   // }
    const showBooks=()=>{
        return books.book.map(books=>{
            return(
                <div id={"insideBookCard"+books.id} style={{display:"show"}}>

                    <div id="NoteCard"  key={books.id}  >
                    <p className="noteTitle">{books.noteTitle}</p>



                        <div className="noteContents" key={books.id}>
                            <p><span>Faculty:</span>{books.noteFaculty}</p>
                            <p><span>Price: Rs.</span>{books.notePrice}</p>
                          <div id={"hideTheButton"+books.id} style={{display:"block"}}>
                          <button  key={books.id}  className="showMoreButtonNote" onClick={(e)=>{showElementToHide(books.id)}} ><FontAwesomeIcon icon={faChevronCircleDown} style={{color:"rgb(247, 148, 164)"}}/></button>
                          </div>
                          
                            <div className="elementsToHide" style={{display:"none"}} key={books.id} id={books.id}>
                            <p><span>Type:</span>{books.notesType}</p>
                            <p><span>Information:</span>{books.noteExplanation}</p>
                            <p><button id="buttonToPayNote" onClick={()=>{changeStatusOfBook(books.id)}}>Add to cart</button></p>
                            <p><button className="showLessButtonNote" id={books.id} onClick={(e)=>{hideElement(books.id)}}><FontAwesomeIcon icon={faChevronCircleUp} style={{color:"rgb(247, 148, 164)"}}/></button></p>
                            </div>
                        </div>
                    </div>
                    </div>)})}
                return(
                    <div>
                        
                        <div className="showBook">
                        <div className="aboutBook">
            
                            {
                                isThereBooks?showBooks():null
                            }
            
                        </div>
                    </div>
                    </div>
                )
        }
        
    



   
    


export default HandWritten;
