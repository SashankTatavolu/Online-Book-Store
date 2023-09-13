import React, { useState } from 'react';
import './note.css'
import axios from 'axios';
import Modal from 'react-modal';
// import notebook from '../../assests/notebook.jpeg'
// import chemNote from '../../assests/chemNote.jpg'
import noteAndPen from '../../assests/noteAndPen.jfif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes,faHandPointRight} from '@fortawesome/free-solid-svg-icons';
import NoteAll from './noteall'
// import noteAndPen1 from '../../assests/noteAndPen 1.jfif';
import HandWritten from './handwritten';
import Printed from './printed';


const Notes=(props)=>{
    let loginVerify=props.data;

    const[count,setCount]=useState(0);
    const[all,setAll]=useState(false);
    const [handWritten, sethandWritten] = useState(false);
    const [printed, setprinted] = useState(false);
    const[openModalBook,setOpenModalBook]=useState(false);
    const[addBookID]=useState([]);
    const[bookInfo ]=useState([]);
    const[buyBookList,setBuyBookList]=useState(false);
    const[buyBookTotal,setBuyBookTotal]=useState(0);
    const[rejectedBookID,setRejecetdBookID]=useState(null)

    const functionAll=()=>{
        setAll(true);
        sethandWritten(false);
        setprinted(false);
    }
    const functionHandWritten=()=>{
        setAll(false);
        sethandWritten(true);
        setprinted(false);

    }
    const functionPrinted=()=>{
        setAll(false);
        sethandWritten(false);
        setprinted(true);

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
            console.log(addBookID)
            let bookIDS=addBookID;
            let total=0
           for(let i=0;i<bookIDS.length;i++){
             let bookInformation=await axios.get(`http://127.0.0.1:8000/account/rest-auth/getNote/${bookIDS[i]}`)
             bookInfo.push(bookInformation.data)
             
               }
              for(let i=0;i<bookInfo.length;i++){
                  for(let j=i+1;j<bookInfo.length;j++){
                      if(JSON.stringify(bookInfo[i])===JSON.stringify(bookInfo[j])){
                         bookInfo.splice(j,1)
                      }    
                  }
              }
              console.log(bookInfo)
              bookInfo.map(book=>{
                  total=total+book[0].notePrice
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
                            <td key={num}>{book[0].noteTitle}</td>
                            <td key={num}>{book[0].notePrice}</td>
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
        <div id="notes">
            <div className="topBackgroundNotes">
                <div className="topBackgroundNoteWrittenContent">
                    <div className="topBackgroundNoteWrittenContentStyles">
                    <p>Let <span>Us</span></p>
                    <p>Help <span>You</span></p>
                    <p>To<span>Find</span></p>
                    <p>Best<span>Notes</span></p>

                    </div>
                    
                </div>
               {/* <div className="topBackgroundNoteImage">
                    <img src={notebook}/>
    </div>*/}
    <div className="topBackgroundNoteImage">
    <img src={noteAndPen} alt="note"/>
    </div>
    </div>
    <p className="titleNotes">NOTES</p>
    <div className="bodyNote">
                <div className="leftColoumNote">
                    <p className="categoriesNoteTitle">CATEGORIES</p>
                    <div className="categoriesContentNote">
                        <p onClick={functionAll}>All</p>
                        <p onClick={functionHandWritten}>Hand Written</p>
                        <p onClick={functionPrinted}>Printed</p>
                        
                    </div>

                </div>
                <div className="rightPartNote">
                    <div id="rightPartNoteTop">
                        <div>
                            {
                                all?<span>All</span>:handWritten?<span>Hand Written</span>:printed?<span>Printed</span>:<span>All</span>
                            }
                           
                        </div>
                        <div><p onClick={functionAddedOnCart}>My Cart<FontAwesomeIcon icon={faShoppingCart}/>(<span id="countBook">{count}</span>)</p></div>
                    </div>
                    {
                        all?<NoteAll bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID} />:handWritten?<HandWritten bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID} />:printed?<Printed bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID} />
                        :<NoteAll bookFunction={getIDOfBook} loginStatus={loginVerify} rejectedBook={rejectedBookID} />
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

export default Notes;
