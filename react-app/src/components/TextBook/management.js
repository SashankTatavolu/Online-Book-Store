import axios from 'axios';
import React, { useState,useEffect } from 'react';
import './textall.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronCircleDown,faChevronCircleUp} from '@fortawesome/free-solid-svg-icons';


const Management=(props)=>{
    const[books,setBooks ]=useState({book:[]})
    const[isThereBooks,setisThereBooks]=useState(false)
        useEffect(() => {
                const getData=async()=>{
                    let bookDataFetched=await axios.get('http://127.0.0.1:8000/account/rest-auth/listOfSelectedTextBook/Management');
                    let bookData=bookDataFetched.data;
                    if(bookData.length===0){
                        setisThereBooks(false);
                    }
                    else{
                        setBooks({book:bookData});
                        setisThereBooks(true);
                    }}
                    
                    getData();
            
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
            let bookData=await axios.get(`http://127.0.0.1:8000/account/rest-auth/bookAdded/${typeOfStatus}`)
            let lengthOfData=bookData.data.length;
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

                    <div id="textbookCard" key={books.id}>

                        <p className="textbookTitle">{books.nameOfBook}</p>
                        <div>
                            <img src={books.bookImage} alt="booki"/>
                        </div>
                        <div className="textbookContents" key={books.id}>
                            <p><span>Writer:</span>{books.nameOfWriter}</p>
                            <p><span>Date Of Publication:</span>{books.dateOfPublication}</p>
                            <p><span>Price: Rs.</span>{books.labelPriceBook}</p>
                          <div id={"hideTheButton"+books.id} style={{display:"block"}}>
                          <button  key={books.id}  className="showMoreButtonText" onClick={(e)=>{showElementToHide(books.id)}} ><FontAwesomeIcon icon={faChevronCircleDown} style={{color:"rgb(245, 66, 66)"}}/></button>
                          </div>
                          
                            <div className="elementsToHide" style={{display:"none"}} key={books.id} id={books.id}>
                            <p><span>Type:</span>{books.typeOfBook}</p>
                            <p><span>Condition:</span>{books.conditionBook}</p>
                            <p><button id="buttonToPayText" onClick={()=>{changeStatusOfBook(books.id)}}>Add to cart</button></p>
                            <p><button className="showLessButtonText" id={books.id} onClick={(e)=>{hideElement(books.id)}}><FontAwesomeIcon icon={faChevronCircleUp} style={{color:"rgb(245, 66, 66)"}}/></button></p>
                            </div>
                        </div>
                    </div>
                    </div>
                    )})}
                return(
                    <div>
                        
                        <div className="showBook">
                        <div className="abouttextBook">
            
                            {
                                isThereBooks?showBooks():null
                            }
            
                        </div>
                    </div>
                    </div>
                )

}
export default Management;