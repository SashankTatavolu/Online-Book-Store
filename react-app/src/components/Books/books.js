import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { faTimes ,faHandPointRight} from '@fortawesome/free-solid-svg-icons'

import './books.css';
import child from '../../assests/child.webp'
import BookShow from './bookShow/bookShow';
import Fiction from './bookShow/fiction';
import NoNFiction from './bookShow/nonFiction';
import History from './bookShow/History';
import Biography from './bookShow/biography';
import Kids from './bookShow/kids';
import SelfHelp from './bookShow/selfHelp';
import Comics from './bookShow/comics';
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Books=(props)=>{
    let loginVerify=props.data;
    const[all,setAll]=useState(true);
   const[fiction,setFiction]=useState(false);
   const[nonFiction,setNonFiction]=useState(false);
   const[history,setHistory]=useState(false);
   const[biography,setBiography]=useState(false);
   const[kids,setKids]=useState(false);
   const[selfHelp,setSelfHelp]=useState(false);
   const[comics,setComics]=useState(false);
   const[count,setCount]=useState(0);
//    const[]=useState();
    const[addBookID]=useState([]);
    const[bookInfo ]=useState([]);
    // const[]=useState([]);
    const[openModalBook,setOpenModalBook]=useState(false);
    const[buyBookList,setBuyBookList]=useState(false);
    const[buyBookTotal,setBuyBookTotal]=useState(0);
    const[rejectedBookID,setRejecetdBookID]=useState(null)
    // const[]=useState({bookCategory:"",ID:""});
    const functionAll=()=>{ 
        setAll(true);
        setFiction(false);
        setNonFiction(false);
        setHistory(false);
        setBiography(false);
        setKids(false);
        setSelfHelp(false);
        setComics(false);
    }
    const functionFiction=()=>{
        setAll(false);
        setFiction(true);
        setNonFiction(false);
        setHistory(false);
        setBiography(false);
        setKids(false);
        setSelfHelp(false);
        setComics(false);

    }
    const functionNonFiction=()=>{
        setAll(false);
        setFiction(false);
        setNonFiction(true);
        setHistory(false);
        setBiography(false);
        setKids(false);
        setSelfHelp(false);
        setComics(false);

    }
    const functionHistory=()=>{
        setAll(false);
        setFiction(false);
        setNonFiction(false);
        setHistory(true);
        setBiography(false);
        setKids(false);
        setSelfHelp(false);
        setComics(false);
    }
    const functionBiography=()=>{
        setAll(false);
        setFiction(false);
        setNonFiction(false);
        setHistory(false);
        setBiography(true);
        setKids(false);
        setSelfHelp(false);
        setComics(false);

    }
    const functionKids=()=>{
        setAll(false);
        setFiction(false);
        setNonFiction(false);
        setHistory(false);
        setBiography(false);
        setKids(true);
        setSelfHelp(false);
        setComics(false);

    }
    const functionSelfHelp=()=>{
        setAll(false);
        setFiction(false);
        setNonFiction(false);
        setHistory(false);
        setBiography(false);
        setKids(false);
        setSelfHelp(true);
        setComics(false);

    }
    const functionComics=()=>{
        setAll(false);
        setFiction(false);
        setNonFiction(false);
        setHistory(false);
        setBiography(false);
        setKids(false);
        setSelfHelp(false);
        setComics(true);
    }
    const getIDOfBook=(data,bookType)=>{
    addBookID.push(data);
    function countAdd(){
    let countUp=count+1;
    document.getElementById('countBook').innerHTML=countUp;
    setCount(countUp);
    }
    countAdd();
    for(let i=0;i<addBookID.length;i++){
        for(let j=i+1;j<addBookID.length;j++){
            if(JSON.stringify(addBookID[i])===JSON.stringify(addBookID[j])){
                addBookID.splice(j,1)
                alert("This is already added in your Cart");
                countDown();
                break;
            }  
            
        }
    }
    function countDown(){
        setCount(addBookID.length);
    }
    }

    async function functionAddedOnCart(){
        let bookIDS=addBookID;
        let total=0
       for(let i=0;i<bookIDS.length;i++){
         let bookInformation=await axios.get(`http://127.0.0.1:8000/account/rest-auth/getBook/${bookIDS[i]}`)
         bookInfo.push(bookInformation.data)
         
           }
          for(let i=0;i<bookInfo.length;i++){
              for(let j=i+1;j<bookInfo.length;j++){
                  if(JSON.stringify(bookInfo[i])===JSON.stringify(bookInfo[j])){
                     bookInfo.splice(j,1)
                  }    
              }
          }
          bookInfo.map(book=>{
              total=total+book[0].labelPriceBook
          })
          setBuyBookTotal(total)
        if(bookIDS.length!==0){
            setOpenModalBook(true);
            setBuyBookList(true);
        }
        else{
            alert("Cart is empty")
        }


    }
    

    const returnBuyBookList=()=>{
        return bookInfo.map((book,num)=>{
            let bookID=book[0].id
                return(
                    <tr id={"bookContent"+bookID} key={num}>
                        <td key={num}>{num+1}.</td>
                        <td key={num}>{book[0].nameOfBook}</td>
                        <td key={num}>{book[0].labelPriceBook}</td>
                        <td key={num} ><button id="cancelBuyBookButton" onClick={(e)=>{cancelBook(bookID,num)}} >Cancel</button></td>
                    </tr>
                )}
                )
                }

    const cancelBook=(bookID,num)=>{
        let total=0;
        bookInfo.splice(num,1);
        addBookID.splice(num,1);
        bookInfo.map(book=>{
            total=total+book[0].labelPriceBook
        })
        setBuyBookTotal(total);
       
        setCount(count-1);
        setRejecetdBookID(bookID)
       
        
    }
    
        
    
        
    
    
    return(
        <div id="Books">
            <div className="topBackgroundBook">
                <div className="topBackgroundBookWrittenContent">
                    <div className="topBackgroundBookWrittenContentStyles">
                    <p>Buy <span>your</span></p>
                    <p>favourite <span>Book</span></p>
                    <p>from <span>Here</span></p>
                    </div>
                </div>
                <div className="topBackgroundBookImage">
                    <img src={child} alt="child" style={{height:"100%"}}/>
                </div>
            </div>
            <p className="titleBook">BOOKS</p>
            <div className="bodyBook">
                <div className="leftColoumBook">
                    <p className="categoriesBookTitle">CATEGORIES</p>
                    <div className="categoriesContentBook">
                        <p onClick={functionAll}>All</p>
                        <p onClick={functionFiction}>Fiction</p>
                        <p onClick={functionNonFiction}>Non-Fiction</p>
                        <p onClick={functionHistory}>History</p>
                        <p onClick={functionBiography}>Biography</p>
                        <p onClick={functionKids}>Kids</p>
                        <p onClick={functionSelfHelp}>Self Help</p>
                        <p onClick={functionComics}>Comics</p>
                    </div>

                </div>
                <div className="rightPartBook">
                    <div id="rightPartBookTop">
                        <div>
                            {
                                all?<span>All</span>:fiction?<span>Fiction</span>:nonFiction?<span>Non-Fiction</span>:history?<span>History</span>:biography?<span>Biography</span>:
                                kids?<span>Kids</span>:selfHelp?<span>Self-Help</span>:comics?<span>Comics</span>:<span>All</span>
                            }
                        </div>
                        <div><p onClick={functionAddedOnCart}>My Cart<FontAwesomeIcon icon={faShoppingCart}/>(<span id="countBook">{count}</span>)</p></div>
                    </div>
                    {
                        all?<BookShow bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID}  />:fiction?<Fiction bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID}/>:nonFiction?<NoNFiction bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID}/>:history?<History bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID}/>:biography?<Biography bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID}/>:
                        kids?<Kids bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID}/>:selfHelp?<SelfHelp bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID}/>:comics?<Comics bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID}/>:<BookShow bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID}/>
                    }
                    
                 
                    
                    
                        

                </div>

            </div>
            <Modal isOpen={openModalBook} id="buyBookModal" style={{backgroundColor:"rgb(231, 213, 167)"}} >
                <div className="buyBookModalTop">
                    <div style={{marginLeft:"10%"}}>Your List</div>
                    <div><FontAwesomeIcon icon={faTimes} style={{cursor:"pointer"}} onClick={()=>{setOpenModalBook(false);setRejecetdBookID(null)}}/></div>
                </div>
                <div id="BuyTable">
                <div className="buyBookModalMiddle">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                    {buyBookList?returnBuyBookList():null}
                    </tbody>
                </div>
                <div className="buyBookModalBottom">
                    {buyBookList?
                    <div >
                        <div id="totalPriceOfBook" >
                                <tr>
                                    <td></td>
                                    <td>Total Amount : </td>
                                    <td>Rs. {buyBookTotal}</td>
                                    <td><button id="checkOut" onClick={e=>{alert("Since these are demo only.Further process is not done.")}}  >Check Out <span style={{margin:"0px 1%"}}><FontAwesomeIcon icon={faHandPointRight}/></span> </button></td>
                                </tr>
                                
                            </div>
                        
                    </div>
                    
                        :null}
                </div>


                </div>
            </Modal>
        </div>
    )
}

export default Books;