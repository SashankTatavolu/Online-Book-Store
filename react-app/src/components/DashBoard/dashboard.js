import React, { useState } from 'react';
import './dashboard.css';
import {useLocation} from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpenText,faPhone,faPlus,faTimes } from '@fortawesome/free-solid-svg-icons'
import App1 from '../../App1';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {API_URL} from '../../constant/index';
import Modal from 'react-modal';
import notestaking from '../../assests/notestaking.jpg';







const DashBoard=(props)=>{
    
    let location =useLocation();
    let idOfUser=location.id;
    let loginStatus=location.isLogged;
    const[firstName,setfirstName]=useState("");
        const[lastName,setlastName]=useState("");
        const[email,setemail]=useState("");
        const[phoneNumber,setphoneNumber]=useState("");
        const[password,setpassword]=useState("");
        const[picture,setPicture]=useState();
        const [showPW,setshowPW]=useState(false);
        const[editFirstName,seteditFirstName]=useState(null);
        const[editLastName,seteditLastName]=useState(null);
        const[editEmail,seteditEmail]=useState(null);
        const[setEmailEdited]=useState(false);
        const[editPhoneNumber,seteditPhoneNumber]=useState(null);
        const[editPassword,seteditPassword]=useState(null);
        const[editPicture,seteditPicture]=useState(null);
        const[picEdit,setPicEdit]=useState(false);
        const[addBook,setAddBook]=useState(false);
        const[addTextBook,setAddTextBook]=useState(false);
        const[addNotes,setAddNotes]=useState(false);
        const[selectTypeBook,setSelecetTypeBook]=useState(null);
        const[book,setNameBook]=useState("Book")
        const[textBook]=useState("TextBook")
        const[nameOfWriter,setNameOfWriter]=useState(null);
        const[labelPriceBook,setLabelPriceBook]=useState(null);
        const[bookImage,setBookImage]=useState();
        const[nameOfBook,setNameOfBook]=useState(null);
        const[dateOfPublication,setDateOfPublication]=useState(null);
        const[conditionBook,setConditionBook]=useState(null);
        const[setSelectTypeNote]=useState(null);
        const[setTitleOfNote]=useState(null);
        const[setPriceOfNote]=useState(null);
        const[setFaculty]=useState(null);
        const[setDetailOfNote]=useState(null);
        const[addedBookShow,setaddedBookShow]=useState(false);
        const[addedTextBookShow,setaddedTextBookShow]=useState(false);
        const[addedListBook,setaddedListBook]=useState({books:[]})
        const[addedListTextBook,setaddedListTextBook]=useState({textBooks:[]})
        const[selectNotesType,setselectNotesType]=useState(null);
        const[noteTitle,setnoteTitle]=useState(null);
        const[notePrice,setnotePrice]=useState(null);
        const[noteFaculty,setnoteFaculty]=useState(null);
        const[noteExplanation,setnoteExplanation]=useState(null);
        const[showAddedNotes,setshowAddedNotes]=useState(false);
        const[addedNotes,setaddedNotes]=useState({notes:[]})
        const[showEditOfBookModal,setshowEditOfBookModal]=useState(false);
        const[bookId,setBookId]=useState(null);
        const[uploadImage,setuploadImage]=useState(false);
        const[showEditTextBookModal,setshowEditTextBookModal]=useState(false);
        const[showEditNoteInfo,setshowEditNoteInfo]=useState(false);
        const[noteId,setNoteID]=useState(null);
        

        
        
        
        
    if(loginStatus===true){
        
       const getData= async()=>{
            const dataOfUser=await axios.get(`http://127.0.0.1:8000/account/rest-auth/userdetail/${idOfUser}`)
            setfirstName(dataOfUser.data.firstName);
            setlastName(dataOfUser.data.lastName);
            setemail(dataOfUser.data.email);
            setphoneNumber(dataOfUser.data.phoneNumber);
            setpassword(dataOfUser.data.password);
            setPicture(dataOfUser.data.dp);   
        }
        getData();
        const editTheProfile=(e)=>{
            e.preventDefault();

            document.getElementById('infoPersonal').style='display:none';
            document.getElementById('editAndUpdate').style='display:block';
        }
        const hideTheProfile=(e)=>{
            e.preventDefault();
            document.getElementById('infoPersonal').style='display:block';
            document.getElementById('editAndUpdate').style='display:none';
            setshowPW(false);}
        const showAddedOnListInfo=(e)=>{
            e.preventDefault();
            document.getElementById('showTheActivityInfo').style='display:block';
            listOfAddedBook(e);
            listOfAddedTextBook(e);
            listOfAddedNotes(e);
           // document.getElementById('noteRowInfo').style='display:show';
           // document.getElementById('textbookRowInfo').style='display:show';
           // document.getElementById('bookRowInfo').style='display:show'




        }
        const hideAddedOnListInfo=(e)=>{
            e.preventDefault();

            document.getElementById('showTheActivityInfo').style='display:none';
            setNameOfWriter('');
            setLabelPriceBook('');
            setBookImage();
            setNameOfBook('');
            setDateOfPublication('');
            setConditionBook('');

            
            
        }
        
        
        async function update(e){
            e.preventDefault();
            const dataOfUsers=await axios.get(API_URL);
            let numberOfData=dataOfUsers.data.length;
            for(var k=0;k<dataOfUsers.data.length;k++){
                let idOfLogger=dataOfUsers.data[k].id;
                let emailToCheck=dataOfUsers.data[k].email;
                if(emailToCheck===editEmail){
                    if(idOfUser!==idOfLogger){
                        alert("Email already exists.Try with new email");
                        break;}
                    else{
                        continue;
                    }
                }
                if(k+1===numberOfData){
                    let updateDataOfUser=new FormData();
                    let firstNameAfterUpdated;
                    let LastNameAfterUpdated;
                    let EmailAfterUpdated;
                    let phoneNumberAfterUpdated;
                    let imageAfterUpdated;
                    if(picEdit===true){
                        updateDataOfUser.append('dp',editPicture);
                        imageAfterUpdated=editPicture;

                    }
                    if(editFirstName===null){updateDataOfUser.append('firstName',firstName);firstNameAfterUpdated=firstName};
                    if(editFirstName!==null){updateDataOfUser.append('firstName',editFirstName);firstNameAfterUpdated=editFirstName};
                    if(editLastName!==null){updateDataOfUser.append('lastName',editLastName);LastNameAfterUpdated=editLastName};
                    if(editLastName===null){updateDataOfUser.append('lastName',lastName);LastNameAfterUpdated=lastName};
                    if(editEmail===null){updateDataOfUser.append('email',editEmail);EmailAfterUpdated=editEmail}
                    if(editEmail!==false){updateDataOfUser.append('email',email);EmailAfterUpdated=email}
                    if(editPhoneNumber===null){updateDataOfUser.append('phoneNumber',phoneNumber);phoneNumberAfterUpdated=phoneNumber}
                    if(editPhoneNumber!==null){updateDataOfUser.append('phoneNumber',editPhoneNumber);phoneNumberAfterUpdated=editPhoneNumber}
                    if(editPassword===null){updateDataOfUser.append('password',password);updateDataOfUser.append('confirmPassword',password)}
                    if(editPassword!==null){updateDataOfUser.append('password',editPassword);updateDataOfUser.append('confirmPassword',editPassword)}
                    //if(picEdit===true){}
                    //if(picEdit===false){updateDataOfUser.append('dp',picture);imageAfterUpdated=picture}


                    
                    axios.put(`http://127.0.0.1:8000/account/rest-auth/updateUser/${idOfUser}`,updateDataOfUser ,{
                        headers: {
                            'content-type': 'multipart/form-data'
                        },
                        mode: 'no-cors'
                      })
                    .then(
                        document.getElementById('names').innerText=`${firstNameAfterUpdated} ${LastNameAfterUpdated}`,
                        document.getElementById('emailUpdate').innerText=`${EmailAfterUpdated}`,
                        document.getElementById('phoneNumberUpdate').innerHTML=`${phoneNumberAfterUpdated}`,
                        document.getElementById('ppChange').src=`${imageAfterUpdated}`,
                        setPicEdit(false)

                    )
                    hideTheProfile(e);
                }   
            }}
            async function infoOfBook(e){
                e.preventDefault();

                let bookInfoForm=new FormData();
                bookInfoForm.append('book',book)
                bookInfoForm.append('typeOfBook',selectTypeBook);
                bookInfoForm.append('nameOfWriter',nameOfWriter);
                bookInfoForm.append('labelPriceBook',labelPriceBook);
                bookInfoForm.append('bookImage',bookImage);
                bookInfoForm.append('nameOfBook',nameOfBook);
                bookInfoForm.append('dateOfPublication',dateOfPublication);
                bookInfoForm.append('conditionBook',conditionBook);
                await axios.post(`http://127.0.0.1:8000/account/rest-auth/bookInfo/${idOfUser}`,bookInfoForm,{
                    headers: {
                        'content-type': 'multipart/form-data'
                    },
                    mode: 'no-cors'
                  })
                .then(alert("Information is uploaded"),
                setNameOfWriter(''),setLabelPriceBook(''),setBookImage(),setNameOfBook(''),setDateOfPublication(''),setConditionBook(''),
                setAddBook(false)

                
                )
                
            }
            async function listOfAddedBook(e){
                e.preventDefault();
                const response= await axios.get(`http://127.0.0.1:8000/account/rest-auth/bookAdded/${idOfUser}`)
                let bookData=response.data
                if(bookData.length===0){
                    setaddedBookShow(false);
                }
                else{
                setaddedListBook({books:bookData})
                setaddedBookShow(true);
                }
                
                }

                    
            const renderTableRows=()=>{
                return addedListBook.books.map(books =>{
                    return(
                        <tr key={books.id} id="bookRowInfo" style={{color:"rgb(236, 75, 134)",display:"show"}} >
                            <td style={{color:"palevioletred"}}>{books.id}</td>
                            <td style={{color:"palevioletred"}} >{books.nameOfBook}</td>
                            <td  style={{color:"palevioletred"}}>{books.nameOfWriter}</td>
                            <td><button  style={{padding:"14px 16px",backgroundColor:"rgb(235, 187, 204)",outline:"none",border:"none"}} id={books.id} onClick={(e)=>editBookInfo(e)} >Edit</button></td>
                            <td><button style={{padding:"14px 16px",backgroundColor:"rgb(235, 187, 204)",outline:"none",border:"none"}} id={books.id} onClick={(e)=>{e.preventDefault();deleteBookInfo(e);}}>Delete</button></td>
                        </tr>
                    )
                })


            }
            async function editBookInfo(e){
                let idOfBook=e.target.id;
                let getDataOfspecificBook=await axios.get(`http://127.0.0.1:8000/account/rest-auth/specificBookInfo/${idOfUser}/${idOfBook}`)
                setNameBook(getDataOfspecificBook.data['book'])
                setSelecetTypeBook(getDataOfspecificBook.data['typeOfBook'])
                setNameOfWriter(getDataOfspecificBook.data['nameOfWriter'])
                setLabelPriceBook(getDataOfspecificBook.data['labelPriceBook'])
                setBookImage(getDataOfspecificBook.data['bookImage'])
                setNameOfBook(getDataOfspecificBook.data['nameOfBook'])
                setDateOfPublication(getDataOfspecificBook.data['dateOfPublication'])
                setConditionBook(getDataOfspecificBook.data['conditionBook'])
                setBookId(idOfBook);
                setshowEditOfBookModal(true);



                
            }
            async function deleteBookInfo(e){
                let idOfBook=e.target.id;
                axios.delete(`http://127.0.0.1:8000/account/rest-auth/deleteDataOfBook/${idOfUser}/${idOfBook}`)
                .then(document.getElementById('bookRowInfo').style='display:none')
                .then(listOfAddedBook(e), listOfAddedTextBook(e),listOfAddedNotes(e))
                .then(document.getElementById('noteRowInfo').style='display:show')


            }
            async function deleteTextBookInfo(e){
                let idOfBook=e.target.id;
                axios.delete(`http://127.0.0.1:8000/account/rest-auth/deleteDataOfBook/${idOfUser}/${idOfBook}`)
                .then(document.getElementById('textbookRowInfo').style='display:none')
                .then(listOfAddedBook(e), listOfAddedTextBook(e),listOfAddedNotes(e))
                .then(document.getElementById('textbookRowInfo').style='display:show')


            }
        async function infoOfTextBook(e){
            e.preventDefault();
            let textBookInfo=new FormData();
            textBookInfo.append('book',textBook)
            textBookInfo.append('typeOfBook',selectTypeBook);
            textBookInfo.append('nameOfWriter',nameOfWriter);
            textBookInfo.append('labelPriceBook',labelPriceBook);
            textBookInfo.append('bookImage',bookImage);
            textBookInfo.append('nameOfBook',nameOfBook);
            textBookInfo.append('dateOfPublication',dateOfPublication);
            textBookInfo.append('conditionBook',conditionBook);
            await axios.post(`http://127.0.0.1:8000/account/rest-auth/bookInfo/${idOfUser}`,textBookInfo,{
                    headers: {
                        'content-type': 'multipart/form-data'
                    },
                    mode: 'no-cors'
                  })
            .then(alert("Information is uploaded"),
            setNameOfWriter(''),setLabelPriceBook(''),setBookImage(),setNameOfBook(''),setDateOfPublication(''),setConditionBook(''),
            setAddTextBook(false)

                
            )}
            async function listOfAddedTextBook(e){
                e.preventDefault();
                const addedTextBookList=await axios.get(`http://127.0.0.1:8000/account/rest-auth/listOfAddedTextBook/${idOfUser}`)
                let textBookData=addedTextBookList.data
                if(textBookData.length===0){
                    setaddedTextBookShow(false);
                }
                else{
                    setaddedListTextBook({textBooks:textBookData});
                    setaddedTextBookShow(true);
                }
            }
            const renderTableRowsOfTextBook=()=>{
                return addedListTextBook.textBooks.map(textBooks=>{
                    return(
                        <tr key={textBooks.id} id="textbookRowInfo" style={{color:"rgb(236, 75, 134)",display:"show"}}>
                            <td style={{color:"palevioletred"}}>{textBooks.id}</td>
                            <td style={{color:"palevioletred"}}>{textBooks.nameOfBook}</td>
                            <td style={{color:"palevioletred"}}>{textBooks.nameOfWriter}</td>
                            <td><button style={{padding:"14px 16px",backgroundColor:"rgb(235, 187, 204)",outline:"none",border:"none"}} id={textBooks.id} onClick={(e)=>{e.preventDefault();editTextBookInfo(e);}} >Edit</button></td>
                            <td><button style={{padding:"14px 16px",backgroundColor:"rgb(235, 187, 204)",outline:"none",border:"none"}} id={textBooks.id} onClick={(e)=>{e.preventDefault();deleteTextBookInfo(e);}}>Delete</button></td>
                        </tr>
                    )
                })
            }

            async function editTextBookInfo(e){
                let idOfTextBook=e.target.id;
                let getDataOfspecificTextBook = await axios.get(`http://127.0.0.1:8000/account/rest-auth/specificBookInfo/${idOfUser}/${idOfTextBook}`)
                setNameBook(getDataOfspecificTextBook.data['book'])
                setSelecetTypeBook(getDataOfspecificTextBook.data['typeOfBook'])
                setNameOfWriter(getDataOfspecificTextBook.data['nameOfWriter'])
                setLabelPriceBook(getDataOfspecificTextBook.data['labelPriceBook'])
                setBookImage(getDataOfspecificTextBook.data['bookImage'])
                setNameOfBook(getDataOfspecificTextBook.data['nameOfBook'])
                setDateOfPublication(getDataOfspecificTextBook.data['dateOfPublication'])
                setConditionBook(getDataOfspecificTextBook.data['conditionBook'])
                setBookId(idOfTextBook);
                setshowEditTextBookModal(true);



            }

            async function submitNotesInfo(e){
                e.preventDefault();
                let notedInfo=new FormData();
                notedInfo.append('notesType',selectNotesType);
                notedInfo.append('noteTitle',noteTitle);
                notedInfo.append('notePrice',notePrice);
                notedInfo.append('noteFaculty',noteFaculty);
                notedInfo.append('noteExplanation',noteExplanation);
                await axios.post(`http://127.0.0.1:8000/account/rest-auth/notesInfo/${idOfUser}`,notedInfo,{
                    headers: {
                        'content-type': 'multipart/form-data'
                    },
                    mode: 'no-cors'
                  })
            .then(alert("Information is uploaded"),
            setselectNotesType(''),setnoteTitle(''),setnotePrice(),setnoteFaculty(''),setnoteExplanation(''),setAddNotes(''),
            setAddTextBook(false))}

            async function listOfAddedNotes(e){
                e.preventDefault();
                const addedNotes=await axios.get(`http://127.0.0.1:8000/account/rest-auth/notesAdded/${idOfUser}`)
                let noteData=addedNotes.data

                if(noteData.length===0){
                    setshowAddedNotes(false);
                }
                else{
                    setaddedNotes({notes:noteData})
                    setshowAddedNotes(true);
                }
            }

            const renderTableRowsOfNote=()=>{
                return addedNotes.notes.map(note=>{
                    return(
                        <tr key={note.id} id="noteRowInfo" style={{color:"rgb(236, 75, 134)",display:"show"}}>
                            <td style={{color:"palevioletred"}}>{note.id}</td>
                            <td style={{color:"palevioletred"}}>{note.noteFaculty}</td>
                            <td style={{color:"palevioletred"}}>{note.noteTitle}</td>
                            <td><button style={{padding:"14px 16px",backgroundColor:"rgb(235, 187, 204)",outline:"none",border:"none"}} id={note.id} onClick={(e)=>{e.preventDefault();editNoteInfo(e);}}>Edit</button></td>
                            <td><button style={{padding:"14px 16px",backgroundColor:"rgb(235, 187, 204)",outline:"none",border:"none"}} id={note.id} onClick={(e)=>{e.preventDefault();deleteNoteInfo(e)}}>Delete</button></td>
                        </tr>
                    )
                })
            }
            async function editNoteInfo(e){
                e.preventDefault();
                let idOfNote=e.target.id
                setNoteID(idOfNote)
                let getDataOfSpecificNote=await axios.get(`http://127.0.0.1:8000/account/rest-auth/specificNoteInfo/${idOfUser}/${idOfNote}`)
                setselectNotesType(getDataOfSpecificNote.data['notesType'])
                setnoteTitle(getDataOfSpecificNote.data['noteTitle'])
                setnotePrice(getDataOfSpecificNote.data['notePrice'])
                setnoteFaculty(getDataOfSpecificNote.data['noteFaculty'])
                setnoteExplanation(getDataOfSpecificNote.data['noteExplanation'])
                setshowEditNoteInfo(true);

            }
            async function deleteNoteInfo(e){
                e.preventDefault();
                let idOFNote=e.target.id;
                axios.delete(`http://127.0.0.1:8000/account/rest-auth/deleteDataOfNote/${idOfUser}/${idOFNote}`)
                .then(document.getElementById('noteRowInfo').style='display:none')
                .then(listOfAddedBook(e), listOfAddedTextBook(e),listOfAddedNotes(e))
                .then(document.getElementById('bookRowInfo').style='display:show')


            }
            async function saveEditedNoteInfo(e){
                e.preventDefault();
                let notedInfo=new FormData();
                notedInfo.append('notesType',selectNotesType);
                notedInfo.append('noteTitle',noteTitle);
                notedInfo.append('notePrice',notePrice);
                notedInfo.append('noteFaculty',noteFaculty);
                notedInfo.append('noteExplanation',noteExplanation);
                axios.put(`http://127.0.0.1:8000/account/rest-auth/editDataOfNote/${idOfUser}/${noteId}`,notedInfo)
                .then(setshowEditNoteInfo(false),setSelectTypeNote(''),setTitleOfNote(''),setPriceOfNote(''),setFaculty(''),setDetailOfNote(''))
                .then(listOfAddedBook(e), listOfAddedTextBook(e),listOfAddedNotes(e))
                
            }


           

            async function editedDataOfBook(e){
                e.preventDefault();
                let editFormOfBook=new FormData();
                if(uploadImage===true){
                    editFormOfBook.append('bookImage',bookImage);
                    
                    
                    
                }
                
               // editFormOfBook.append('book',book)
                editFormOfBook.append('typeOfBook',selectTypeBook);
                editFormOfBook.append('nameOfWriter',nameOfWriter);
                editFormOfBook.append('labelPriceBook',labelPriceBook);
                //editFormOfBook.append('bookImage',bookImage);
                editFormOfBook.append('nameOfBook',nameOfBook);
                editFormOfBook.append('dateOfPublication',dateOfPublication);
                editFormOfBook.append('conditionBook',conditionBook);
                axios.put(`http://127.0.0.1:8000/account/rest-auth/editDataOfBook/${idOfUser}/${bookId}`,editFormOfBook,{
                    headers: {
                        'content-type': 'multipart/form-data'
                    },
                    mode: 'no-cors'
                  })
                .then(
                    setNameOfWriter(nameOfWriter),setLabelPriceBook(labelPriceBook),
                    setBookImage(bookImage),setNameOfBook(nameOfBook),setDateOfPublication(dateOfPublication),
                    setConditionBook(conditionBook),setSelecetTypeBook(null),setshowEditOfBookModal(false),setshowEditTextBookModal(false))
                .then(
                    listOfAddedBook(e), listOfAddedTextBook(e),listOfAddedNotes(e),setuploadImage(false)
                )

            }

            const ppUpload=(e)=>{
                e.preventDefault();
                document.getElementById("selectImage").click();

            }
            

            
            
            
            
            
        return(
                <div className="personalData">
                        <div className="personalInfo"  style={{display:"block"}}>
                            <div className="personalPhoto">
                                <img src={picture} id="ppChange" alt="pic"/>
                            </div>
                            <div id="infoPersonal">
                                <p id="names">{firstName} {lastName}</p>
                                <button onClick={editTheProfile}>Edit Profile</button>
                                <div className="otherInfo">
                                    <p><FontAwesomeIcon icon={faEnvelopeOpenText} style={{margin:"0 10px"}}/><span id="emailUpdate">{email}</span></p>
                                    <p style={{margin:"-2% 0"}}><FontAwesomeIcon icon={faPhone} style={{margin:"0 10px"}}/><span id="phoneNumberUpdate">{phoneNumber}</span></p>
                                </div>
                            </div>
                            <div id="editAndUpdate" style={{display:"none"}}>
                            <form  onSubmit={update} method="POST">

                               <button onClick={ppUpload}>Update Picture</button>
                               <input id='selectImage' hidden type="file" onChange={(e)=>{e.preventDefault();seteditPicture(e.target.files[0]);setPicEdit(true)}}  />
                                <br/>
                                <li> <span>First Name :</span> <input type="text" name="firstName" defaultValue={firstName}    onChange={e=>seteditFirstName(e.target.value)} required/></li>
                                    <br/>
                                    <li> <span>Last Name :</span> <input type="text" defaultValue={lastName} onChange={(e)=>seteditLastName(e.target.value)}/> </li>
                                    <br/>
                                    <li><span>Email:</span> <input type="email" defaultValue={email} onChange={(e)=>{seteditEmail(e.target.value);setEmailEdited(true)}}/></li>
                                    <br/>
                                    <li><span>PhoneNumber:</span><input type="phonenumber" defaultValue={phoneNumber} onChange={e=>seteditPhoneNumber(e.target.value)}/></li>
                                    <br/>
                                    <li><span >Password:</span><input id="pw" type={showPW?"text":"password"} style={showPW? {border:"1px solid plum",boxShadow:"none",margin:"0 50px",borderRadius:"0px",height:"26px"}:{border:"1px solid plum",boxShadow:"none",margin:"0 50px",borderRadius:"0px",height:"26px",textAlign:"left",padding:"1px"}} value={password} onChange={e=>seteditPassword(e.target.value)} /><FontAwesomeIcon icon={faEye} onClick={()=>setshowPW(!showPW)}  id="pw" style={showPW? {margin:"0px -20%",cursor:"pointer",color:"plum" }:{margin:"0px -20%",cursor:"pointer",color:"grey" }}  /></li>

                                    
                                    <br/>
                                    <div id="buttonsForSave">
                                    <span>
                                    <button type="submit" id="saveButton">Save</button>

                                    <button id="cancelButton" onClick={hideTheProfile }>Cancel</button></span>    
                                    
                                    
                                    </div>
                                    </form>


                            </div>
                            </div>
                    
                
                
                <div className="importExportInfo">
                    <div id="itemToBeAdded">
                        <button id="books" onClick={(e)=>{e.preventDefault();setAddBook(true)}}><FontAwesomeIcon icon={faPlus} /> Add Books</button>
                        <br/>
                        <button id="TextBook" onClick={(e)=>{e.preventDefault();setAddTextBook(true)}}><FontAwesomeIcon icon={faPlus} /> Add TextBook</button>
                        <br/>
                        
                        <button id="Notes" onClick={(e)=>{e.preventDefault();setAddNotes(true)}}><FontAwesomeIcon icon={faPlus} /> Add Notes</button>
                    </div>
                    <Modal isOpen={addBook} className="bookModal">
                        <div style={{height:"100%",width:"95%"}}>
                        <FontAwesomeIcon icon={faTimes} onClick={(e)=>{e.preventDefault();setAddBook(false)}} style={{color:"rgb(238, 16, 90)",fontSize:"35px",float:"right",cursor:"pointer",fontWeight:"bolder",marginTop:"10px"}}/>
                        <div className="bookTitle">
                            <p>PLEASE FILL THE DETAILS...</p>
                        </div>
                        <div className="bookDetailSpace">
                            <div className="bookDetailLeft">
                                <p>Select:</p>
                                <select style={{backgroundColor:"white",borderRadius:"0px",boxShadow:"none",border:"none",height:"auto"}} onChange={(e)=>{e.preventDefault();setSelecetTypeBook(e.target.value)}}   required>
                                <option value="" ></option>

                                <option value="Fiction" >Fiction</option>
                                <option value="NonFiction">Non-Fiction</option>
                                <option value="History">History</option>
                                <option value="Biography">Biography</option>
                                <option value="Kids">Kids</option>
                                <option value="SelfHelp">Self Help</option>
                                <option value="Comics">Comics</option>
                                </select>

                                <br/>
                                <br/>
                                <p>Name Of Writer : </p>
                                <input type="text" placeholder=" Robert Kiyosaki" value={nameOfWriter} onChange={(e)=>{e.preventDefault();setNameOfWriter(e.target.value)}} required/>
                                <br/>
                                <br/>
                                <p>Labelled Price :</p>
                                <input type="text" placeholder="Rs.200" value={labelPriceBook} onChange={(e)=>{e.preventDefault();setLabelPriceBook(e.target.value)}} required/>
                                <br/>
                                <br/>
                                <p>Upload Image:</p>
                                <input type="file" id="img" name="img" accept="image/*"  onChange={(e)=>{e.preventDefault();setBookImage(e.target.files[0])}} required/>
                                
                            </div>
                            <div className="bookDetailRight">
                                <p>Name Of Book:</p>
                                <input type="text" placeholder="Rich Dad Poor Dad" value={nameOfBook} onChange={(e)=>{e.preventDefault();setNameOfBook(e.target.value)}} required/>
                                <br/>
                                <br/>
                                <br/>
                                <p>Date of Publication:</p>
                                <input type="date" placeholder="5/12/1997" value={dateOfPublication} onChange={(e)=>{e.preventDefault();setDateOfPublication(e.target.value)}} required/>
                                <br/>
                                <br/>
                                <p>Condition :</p>
                                <textarea type="text" placeholder="Page no.15 is torn.Small foldings are present" value={conditionBook} onChange={(e)=>{e.preventDefault();setConditionBook(e.target.value)}}required/>
                                <br/>
                                <br/>
                                <p>Submit:</p>
                                <input type="submit" onClick={infoOfBook}/>
                                

                            </div>
                        </div>
                        </div>

                        




                    </Modal>
                    <Modal isOpen={addTextBook} className="textBookModal">
                        <div style={{height:"100%",width:"95%"}}>
                        <FontAwesomeIcon icon={faTimes} onClick={(e)=>{e.preventDefault();setAddTextBook(false)}} style={{color:"rgb(3, 145, 192)",fontSize:"35px",float:"right",cursor:"pointer",fontWeight:"bolder",marginTop:"10px"}}/>
                        <div className="textBookTitle">
                            <p>PLEASE FILL THE DETAILS...</p>
                        </div>
                        <form>
                            <div className="textBookDetailSpace">
                                <div className="textBookDetailLeft">
                                    <p>Select:</p>
                                    <select style={{backgroundColor:"white",borderRadius:"0px",boxShadow:"none",border:"1px solid lightblue",height:"auto"}} onChange={(e)=>{e.preventDefault();setSelecetTypeBook(e.target.value)}} required>
                                        <option value="Law">Law</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Medical">Medical</option>
                                        <option value="Management">Management</option>
                                        <option value="BioChemistry">BioChemistry</option>
                                        <option value="Geography">Geography</option>
                                        <option value="Physics">Physics</option>
                                    </select>
                                    <br/>
                                    <br/>
                                    <p>Name Of Writer : </p>
                                    <input type="text" placeholder="ABCD" value={nameOfWriter} onChange={(e)=>{e.preventDefault();setNameOfWriter(e.target.value)}} required/>
                                    <br/>
                                    <br/>
                                    <p>Labelled Price : </p>
                                    <input type="text" placeholder="Rs.200" value={labelPriceBook} onChange={(e)=>{e.preventDefault();setLabelPriceBook(e.target.value)}} required/>
                                    <br/>
                                    <br/>
                                    <p>Upload Image:</p>
                                    <input type="file" id="img" name="img" accept="image/*" onChange={(e)=>{e.preventDefault();setBookImage(e.target.files[0])}} required/>




                                </div>
                                <div className="textBookDetailRight">
                                    <p>Name Of Text Book:</p>
                                    <input type="text" placeholder="Statics" value={nameOfBook} onChange={(e)=>{e.preventDefault();setNameOfBook(e.target.value)}}/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <p>Date Of Publication : </p>
                                    <input type="date" placeholder="2/15/2005" value={dateOfPublication} onChange={(e)=>{e.preventDefault();setDateOfPublication(e.target.value)}}/>
                                    <br/>
                                    <br/>
                                    <p>Condition :</p>
                                    <textarea type="text" placeholder="Page no.15 is torn.Small foldings are present"value={conditionBook} onChange={(e)=>{e.preventDefault();setConditionBook(e.target.value)}} required/>
                                    <br/>
                                    <br/>
                                    <p>Submit:</p>
                                    <input type="submit" onClick={infoOfTextBook}/>
                                

                                    </div>
                            </div>
                        </form>

                        </div>

                    </Modal>
                    <Modal isOpen={addNotes} className="notesModal">
                        <div style={{height:"100%",width:"95%"}}>
                            <FontAwesomeIcon icon={faTimes} onClick={(e)=>{e.preventDefault();setAddNotes(false)}}  style={{color:"green",fontSize:"35px",float:"right",cursor:"pointer",fontWeight:"bolder",marginTop:"10px"}}/>
                            <div className="notesTitle">
                                <p>PLEASE FILL THE DETAIL...</p>
                            </div>
                            <form>
                                <div className="notesDetailSpace">
                                    <div className="notesDetailLeft">
                                        <p>Select : </p>
                                        <select style= {{backgroundColor:"white",borderRadius:"0px",boxShadow:"none",border:"1px solid green",height:"auto"}} onChange={(e)=>{e.preventDefault();setselectNotesType(e.target.value)}}>
                                            <option value=""></option>
                                            <option value="Hand-Written">Hand-Written</option>
                                            <option value="Printed">Printed</option>                                            
                                        </select>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <p>Enter Title Of Your Note : </p>
                                        <input type="text" placeholder="Statictic" value={noteTitle} onChange={(e)=>{e.preventDefault();setnoteTitle(e.target.value)}}/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <p>Price You Want TO Sell : </p>
                                        <input type="text" placeholder="Rs.200" value={notePrice} onChange={(e)=>{e.preventDefault();setnotePrice(e.target.value)}}/>
                                        <br/>
                                        <br/>
                                        <br/>
                                    </div>
                                    <div className="notesDetailSpaceRight">
                                        <p>Faculty : </p>
                                        <input type="text" placeholder="Management" value={noteFaculty} onChange={(e)=>{e.preventDefault();setnoteFaculty(e.target.value)}}/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <p>Please explain in detail</p>
                                        <textarea type="text" placeholder="All the important topics are discussed here in detail from exam point of view." value={noteExplanation} onChange={(e)=>{e.preventDefault();setnoteExplanation(e.target.value)}}/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <p>Submit:</p>
                                        <input type="submit" value="Submit" onClick={submitNotesInfo}/>
                                    </div>
                                </div>
                            </form>

                        </div>

                    </Modal>
                    <div id="activities">
                        <p>Your Activities</p>
                        <div id="activityOfBook">
                            <ul>
                                <li><button id="boughtBooks" >Bought Items</button></li>
                                <li><button id="soldBooks">Sold Items</button></li>
                                <li><button id="addedOnList" onClick={showAddedOnListInfo}>Added on list</button></li>
                            </ul>   
                        </div>
                    </div>
                    <div  id="showTheActivityInfo" style={{display:"none"}}>
                        <div id="addedOnListHeading">
                            <div>
                                <p style={{font:"25px"}}>Added On List</p>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faTimes} style={{float:"right",marginRight:"5px",cursor:"pointer",color:"yellowgreen"}} onClick={hideAddedOnListInfo}/>
                            </div>
                        </div>
                        <div id="addedOnListBody" style={{marginTop:"40px"}}>
                            <div id="addedOnListBook" >
                                <p style={{marginLeft:"5%",fontSize:"20px",color:"palevioletred",fontWeight:"600"}}><li>Books</li></p>

                                <table style={{width:"90%",marginLeft:"5%",marginRight:"20px"}}>
                                    <thead>
                                        <tr id="tableheading">
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Name Of Writer</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>

                                    </thead>
                                    
                                    
                                    <tbody>
                                        {
                                            addedBookShow?renderTableRows():null

                                        }
                                    </tbody>
                                    
                                </table>

                            </div>
                            <div id="addedOnListTextBook">
                            <p style={{marginLeft:"5%",marginTop:"30px",fontSize:"20px",color:"palevioletred",fontWeight:"600"}}><li>Text Books</li></p>
                            <table style={{width:"90%",marginLeft:"5%",marginRight:"20px"}}>
                                    <thead>
                                        <tr id="tableheading">
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Name Of Writer</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>

                                    </thead>
                                    
                                    
                                    <tbody>
                                        {
                                           addedTextBookShow?renderTableRowsOfTextBook():null
                                        }
                                                                           </tbody>
                                    
                                </table>


                            </div>
                            <div id="addedOnListNotes">
                            <p style={{marginLeft:"5%",marginTop:"30px",fontSize:"20px",color:"palevioletred",fontWeight:"600"}}><li>Notes</li></p>
                            <table style={{width:"90%",marginLeft:"5%"}}>
                                    <thead>
                                        <tr id="tableheading">
                                            <th>ID</th>
                                            <th>Faculty</th>
                                            <th>Title</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>

                                    </thead>
                                    
                                    
                                    <tbody>
                                        {
                                           showAddedNotes?renderTableRowsOfNote():null
                                        }
                                                                           </tbody>
                                    
                                </table>



                            </div>

                        </div>
                        </div>
                        
                </div>
                <Modal isOpen={showEditOfBookModal} className="bookEditModal" style={{padding:"0px",overflow:"hidden"}}>
                    <div style={{backgroundColor:"rgb(221, 158, 179)",overflow:"hidden",padding:"0px"}}>
                    <div id="ModalHead">
                                <div> Book Information</div>
                                <div><FontAwesomeIcon icon={faTimes} style={{cursor:"pointer"}} onClick={(e)=>{e.preventDefault();setshowEditOfBookModal(false)}}/></div>
                    </div>
                    <div style={{margin:"40px auto"}} id="dataOfEditBook">
                        <div id="editImageBook">
                        <img src={bookImage}  alt=" booki" style={{height:"80%" ,width:"80%",border:"2px solid purple",margin:"0 5%"}}/>
                    <br/>
                    <input type="file" id="bookImage"  accept="image/*"  style={{margin:"5% 0%",marginLeft:"5%"}}  onChange={(e)=>{e.preventDefault();setBookImage(e.target.files[0]);setuploadImage(true)}} required/>
                    
                                                
                    
                    

                        </div>
                            <div style={{margin:"0 5px "}} id="infoEditBook">
                            <label>Name</label>
                            <br/>
                            <input type="text" value={nameOfBook} onChange={(e)=>{e.preventDefault();setNameOfBook(e.target.value)}} required/>
                            <br/>
                            <br/>
                            <label>Writer</label>
                            <br/>
                            <input type="text" value={nameOfWriter} onChange={(e)=>{e.preventDefault();setNameOfWriter(e.target.value)}} required/>
                            <br/>
                            <br/>
                            <label>Price</label>
                            <br/>
                            <input  type="text" value={labelPriceBook} onChange={(e)=>{e.preventDefault();setLabelPriceBook(e.target.value)}} required/>
                            <br/>
                            <br/>
                            <label>Type</label>
                            <br/>
                            <select style={{backgroundColor:"white",borderRadius:"0px",boxShadow:"none",border:"none",height:"auto"}} onChange={(e)=>{e.preventDefault();setSelecetTypeBook(e.target.value)}}   required>
                                <option value={selectTypeBook} ></option>

                                <option value="Fiction" >Fiction</option>
                                <option value="NonFiction">Non-Fiction</option>
                                <option value="History">History</option>
                                <option value="Biography">Biography</option>
                                <option value="Kids">Kids</option>
                                <option value="SelfHelp">Self Help</option>
                                <option value="Comics">Comics</option>

                            </select>
                            <br/>
                            <br/>
                            <label>Publication Date</label>
                            <br/>
                            <input type="date" value={dateOfPublication} onChange={(e)=>{e.preventDefault();setDateOfPublication(e.target.value)}} required/>
                            <br/>
                            <br/>
                            <label>Condition</label>
                            <br/>
                            <input type="text" value={conditionBook} onChange={(e)=>{e.preventDefault();setConditionBook(e.target.value)}}required/>
                            <br/>
                            <br/>
                            <span style={{margin:"2px 5px"}}><button onClick={editedDataOfBook} style={{backgroundColor:"rgb(104, 150, 104)",border:"none",padding:"12px 12px"}}>Save</button></span>
                            
                            <span style={{margin:"2px 5px"}}><button style={{backgroundColor:"rgb(211, 69, 69)",border:"none",padding:"12px 12px"}} onClick={(e)=>{e.preventDefault();setshowEditOfBookModal(false)}}>Cancel</button></span>


                        </div>
                        
                    </div>
                    


                    </div>
                            
                        </Modal>
                        <Modal isOpen={showEditTextBookModal} className="textBookEditModal">
                            <div style={{backgroundColor:"rgb(221, 158, 179)"}}>
                            <div id="ModalHead">
                                <div> Text-Book Information</div>
                                <div><FontAwesomeIcon icon={faTimes} style={{cursor:"pointer"}} onClick={(e)=>{e.preventDefault();setshowEditTextBookModal(false)}}/></div>
                            </div>
                            <div style={{margin:"40px auto"}} id="dataOfEditBook">
                        <div id="editImageBook">
                        <img src={bookImage} alt="booki" style={{height:"80%" ,width:"80%",border:"2px solid purple",margin:"0 5%"}}/>
                    <br/>
                    <input type="file" id="bookImage"  accept="image/*"  style={{margin:"5% 0%",marginLeft:"5%"}}  onChange={(e)=>{e.preventDefault();setBookImage(e.target.files[0]);setuploadImage(true)}} required/>
                    
                                                
                    
                    

                        </div>
                            <div style={{margin:"0 5px "}} id="infoEditBook">
                            <label>Name</label>
                            <br/>
                            <input type="text" value={nameOfBook} onChange={(e)=>{e.preventDefault();setNameOfBook(e.target.value)}} required/>
                            <br/>
                            <br/>
                            <label>Writer</label>
                            <br/>
                            <input type="text" value={nameOfWriter} onChange={(e)=>{e.preventDefault();setNameOfWriter(e.target.value)}} required/>
                            <br/>
                            <br/>
                            <label>Price</label>
                            <br/>
                            <input  type="text" value={labelPriceBook} onChange={(e)=>{e.preventDefault();setLabelPriceBook(e.target.value)}} required/>
                            <br/>
                            <br/>
                            <label>Type</label>
                            <br/>
                            <select style={{backgroundColor:"white",borderRadius:"0px",boxShadow:"none",border:"none",height:"auto"}} onChange={(e)=>{e.preventDefault();setSelecetTypeBook(e.target.value)}}   required>
                                <option value={selectTypeBook} ></option>

                                <option value=""></option>
                                        <option value="Law">Law</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Medical">Medical</option>
                                        <option value="Management">Management</option>
                                        <option value="BioChemistry">BioChemistry</option>
                                        <option value="Geography">Geography</option>
                                        <option value="Physics">Physics</option>
                            </select>
                            <br/>
                            <br/>
                            <label>Publication Date</label>
                            <br/>
                            <input type="date" value={dateOfPublication} onChange={(e)=>{e.preventDefault();setDateOfPublication(e.target.value)}} required/>
                            <br/>
                            <br/>
                            <label>Condition</label>
                            <br/>
                            <input type="text" value={conditionBook} onChange={(e)=>{e.preventDefault();setConditionBook(e.target.value)}}required/>
                            <br/>
                            <br/>
                            <span style={{margin:"2px 5px"}}><button onClick={editedDataOfBook} style={{backgroundColor:"rgb(104, 150, 104)",border:"none",padding:"12px 12px"}}>Save</button></span>
                            
                            <span style={{margin:"2px 5px"}}><button style={{backgroundColor:"rgb(211, 69, 69)",border:"none",padding:"12px 12px"}} onClick={(e)=>{e.preventDefault();setshowEditTextBookModal(false)}}>Cancel</button></span>
                        </div>   
                    </div>
                </div>
            </Modal>
            <Modal isOpen={showEditNoteInfo} className="noteEditModal">
                <div style={{backgroundColor:"rgb(221, 158, 179)"}}>
                <div id="ModalHead">
                    <div> Note Information</div>
                    <div><FontAwesomeIcon icon={faTimes} style={{cursor:"pointer"}} onClick={(e)=>{e.preventDefault();setshowEditNoteInfo(false)}}/></div>
                </div>
                <div style={{margin:"40px auto"}} id="dataOfEditBook">
                <div id="editImageBook">
                        <img src={notestaking} alt="notest" style={{height:"80%" ,width:"80%",border:"2px solid purple",margin:"0 5%"}}/>
                    <br/>
                </div>
                        
                    <div style={{margin:"0 10px "}} id="infoEditBook">
                            <label>Name</label>
                            <br/>
                            <input type="text" value={noteTitle} onChange={(e)=>{e.preventDefault();setnoteTitle(e.target.value)}} required/>
                            <br/>
                            <br/>
                            <label>Price</label>
                            <br/>
                            <input  type="text"  value={notePrice} onChange={(e)=>{e.preventDefault();setnotePrice(e.target.value)}} required/>
                            <br/>
                            <br/>
                            <label>Type</label>
                            <br/>
                            <select style={{backgroundColor:"white",borderRadius:"0px",boxShadow:"none",border:"none",height:"auto"}} onChange={(e)=>{e.preventDefault();setselectNotesType(e.target.value)}}   required>

                                <option value="Hand-Written">Hand-Written</option>
                                <option value="Printed">Printed</option>
                            </select>
                            <br/>
                            <br/>
                            <label>Faculty</label>
                            <br/>
                            <input type="text"  value={noteFaculty} onChange={(e)=>{e.preventDefault();setnoteFaculty(e.target.value)}} required/>
                            <br/>
                            <br/>
                            <label>Condition</label>
                            <br/>
                            <textarea type="text" value={noteExplanation} onChange={(e)=>{e.preventDefault();setnoteExplanation(e.target.value)}}required/>
                            <br/>
                            <br/>
                            <span style={{margin:"2px 5px"}}><button  style={{backgroundColor:"rgb(104, 150, 104)",border:"none",padding:"12px 12px"}} onClick={(e)=>{e.preventDefault();saveEditedNoteInfo(e)}}>Save</button></span>
                            
                            <span style={{margin:"2px 5px"}}><button style={{backgroundColor:"rgb(211, 69, 69)",border:"none",padding:"12px 12px"}} onClick={(e)=>{e.preventDefault();setshowEditNoteInfo(false)}}>Cancel</button></span>
                        </div>   
                    </div>

                </div>

            </Modal>
                    
    
                
            </div>
            
        )
    }
    else{
       return(
           <div>
               <App1/>
               
           </div>
       ) 
    }

   };
export default DashBoard;
