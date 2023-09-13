import React, { useState } from 'react'
import './textBookAll.css'
import textbook1 from '../../assests/textbook1.jpg';
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Modal from 'react-modal';
import { faTimes ,faHandPointRight} from '@fortawesome/free-solid-svg-icons'
import TextBookAll from './textbookAll';
import Law from './law'
import Engineering from './engineering';
import Medical from './medical';
import Management from './management'
import BioChemistry from './bioChemistry';
import Geography from './geography'
import Physics from './physics';

 

const TextBook=(props)=>{
    let loginVerify=props.data;
    const[all,setAll]=useState(true);
   const[law,setLaw]=useState(false);
   const[engineering,setEngineering]=useState(false);
   const[medical,setMedical]=useState(false);
   const[management,setManagement]=useState(false);
   const[bioChemistry,setBioChemistry]=useState(false);
   const[geography,setGeography]=useState(false);
   const[physics,setPhysics]=useState(false);
   const[count,setCount]=useState(0);
   const[addBookID]=useState([]);
//    const[]=useState();
    const[bookInfo ]=useState([]);
    // const[]=useState([]);
    const[openModalBook,setOpenModalBook]=useState(false);
    const[buyBookList,setBuyBookList]=useState(false);
    const[buyBookTotal,setBuyBookTotal]=useState(0);
    const[rejectedBookID,setRejecetdBookID]=useState(null)
    // const[]=useState({bookCategory:"",ID:""});
   


   const functionAll=()=>{
    setAll(true);
    setLaw(false);
    setEngineering(false);
    setMedical(false);
    setManagement(false);
    setBioChemistry(false);
    setGeography(false);
    setPhysics(false);
}
const functionLaw=()=>{
    setAll(false);
    setLaw(true);
    setEngineering(false);
    setMedical(false);
    setManagement(false);
    setBioChemistry(false);
    setGeography(false);
    setPhysics(false);
}
const functionEngineering=()=>{
    setAll(false);
    setLaw(false);
    setEngineering(true);
    setMedical(false);
    setManagement(false);
    setBioChemistry(false);
    setGeography(false);
    setPhysics(false);
}
const functionMedical=()=>{
    setAll(false);
    setLaw(false);
    setEngineering(false);
    setMedical(true);
    setManagement(false);
    setBioChemistry(false);
    setGeography(false);
    setPhysics(false);
}
const functionManagement=()=>{
    setAll(false);
    setLaw(false);
    setEngineering(false);
    setMedical(false);
    setManagement(true);
    setBioChemistry(false);
    setGeography(false);
    setPhysics(false);
}
const functionBioChemistry=()=>{
    setAll(false);
    setLaw(false);
    setEngineering(false);
    setMedical(false);
    setManagement(false);
    setBioChemistry(true);
    setGeography(false);
    setPhysics(false);
}
const functionGeography=()=>{
    setAll(false);
    setLaw(false);
    setEngineering(false);
    setMedical(false);
    setManagement(false);
    setBioChemistry(false);
    setGeography(true);
    setPhysics(false);
}
const functionPhysics=()=>{
    setAll(false);
    setLaw(false);
    setEngineering(false);
    setMedical(false);
    setManagement(false);
    setBioChemistry(false);
    setGeography(false);
    setPhysics(true);
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
        <div id="textBook">
            <div className="topBackgroungTextBook">
                <div className="topBackgroungContent">
                    <p><span>Discover</span>The</p>
                    <p><span>Book</span>You</p>
                    <p><span>Need</span></p>
                </div>
                <div className="topBackgroundImage" >
                <img src={textbook1} alt="tb1" />
                </div>
            </div>
            <p className="titleTextBook">TEXT BOOKS</p>
            <div className="bodyTextBook">
                <div className="leftColoumTextBook">
                    <p className="categoriesTextBookTitle">CATEGORIES</p>
                    <div className="categoriesContentTextBook">
                        <p onClick={functionAll}>All</p>
                        <p onClick={functionLaw}>Law</p>
                        <p onClick={functionEngineering}>Engineering</p>
                        <p onClick={functionMedical}>Medical</p>
                        <p onClick={functionManagement}>Management</p>
                        <p onClick={functionBioChemistry}>Bio-Chemistry</p>
                        <p onClick={functionGeography}>Geography</p>
                        <p onClick={functionPhysics}>Physics</p>
                    </div>

                </div>
                <div className="rightPartTextBook">
                    <div id="rightPartTextBookTop">
                        <div>{
                                all?<span>All</span>:law?<span>Law</span>:engineering?<span>Engineering</span>:medical?<span>Medical</span>:management?<span>Management</span>:
                                bioChemistry?<span>Bio-Chemistry</span>:geography?<span>Geography</span>:physics?<span>Physics</span>:<span>All</span>
                            }
                           
                        </div>
                        <div><p onClick={functionAddedOnCart}>My Cart<FontAwesomeIcon icon={faShoppingCart}/>(<span id="countBook">{count}</span>)</p></div>
                    </div>
                    {
                        all?<TextBookAll  bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID}/>:law?<Law bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID} />:
                        engineering?<Engineering bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID}/>:medical?<Medical bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID}/>:management?<Management  bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID} />
                        :bioChemistry?<BioChemistry bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID}/>:geography?<Geography bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID} />
                        :physics?<Physics bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID} />:<TextBookAll  bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID}/>


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

export default TextBook;
