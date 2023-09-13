import React ,{useState} from 'react';
import './recommendation.css';
import './recommendationCards.css';
import recommendation1 from '../../assests/recommendation1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen,faTimes} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-modal';
import RecommendationCard from './recommendationCards';
import reading from '../../assests/reading.jpg';


const Recommendation=(props)=>{
    let loginVerify=props.data;
    const[recommendationModal,setrecommendationModal]=useState(false);
    const[name1,setName1]=useState();
    const[name2,setName2]=useState();
    const[nameOfBook,setNameOfBook]=useState();
    const[nameOfWriter,setNameOfWriter]=useState();
    const[review,setReview]=useState();
    const[searchWord,SearchWord]=useState();

    const[newlyAddedRecommendation]=useState({"name":"",nameOfWriter:"",nameOfBook:"",review:""})
    const[recommendationPresent,setRecommendationPresent]=useState(false);


    async function writeRecommendation(e){
        e.preventDefault();
        if(typeof(loginVerify)==="number"){
            const userName= await axios.get(`http://127.0.0.1:8000/account/rest-auth/userdetail/${loginVerify}`);
            let firstName=userName.data.firstName;
            let lastName=userName.data.lastName;
            setName1(firstName.concat(" ",lastName));
            setrecommendationModal(true);

        }
        else{
            setName1("");
            setrecommendationModal(true);

        }

        
    }
    async function submitRecommendation(e){
        e.preventDefault();
        let recommendations=new FormData();
        if(typeof(name2)!=="undefined"){
            recommendations.append("name",name2)
            //newlyAddedRecommendation.push(name2)
            newlyAddedRecommendation.name=name2;

        }
        else{
            recommendations.append("name",name1);
            newlyAddedRecommendation.name=name1;


            

            
        }
        recommendations.append("bookName",nameOfBook);
        recommendations.append("nameOfWriterRecommendation",nameOfWriter);
        recommendations.append("review",review);
       newlyAddedRecommendation.push(nameOfBook)
       newlyAddedRecommendation.push(nameOfWriter)
        newlyAddedRecommendation.push(review)
        newlyAddedRecommendation.nameOfWriter=nameOfWriter;
        newlyAddedRecommendation.nameOfBook=nameOfBook;
        newlyAddedRecommendation.review=review;




        console.log(newlyAddedRecommendation)

        await axios.post('http://127.0.0.1:8000/account/rest-auth/recommendationOfBook/',recommendations,{
            headers: {
                'content-type': 'multipart/form-data'
            },
            mode: 'no-cors'
          })
          .then(setrecommendationModal(false),setName2(),setNameOfBook(),setNameOfWriter(),setReview())
          .then(setRecommendationPresent(true))
          


    }
    const showRecommendations=()=>{
        //return newlyAddedRecommendation[0].map(recommendations=>{
            return(
                <div id="recommendationInformation">
                    <div>
                        <div id="topOfRecommendationCard">
                        <div id="nameOFReviewer">
                            <div style={{marginRight:"5%"}}><img src={reading} alt="read"/></div>
                            <div><span>{newlyAddedRecommendation.name}</span></div>
                            </div>
                        <div id="dateToday">Today</div>


                        </div>
                        <div id="bodyOfRecommendation">
                            <p><span>Book/Text Book : </span>{newlyAddedRecommendation.nameOfBook}</p>
                            <p><span>Writer : </span>{newlyAddedRecommendation.nameOfWriter}</p>
                            <p><span>Review :</span>{newlyAddedRecommendation.review}</p>


                        </div>
                        
                    </div>
                </div>
            )

        }
    
    async function searchWorkFunction(){
        console.log(searchWord)
    }
    
    
    return(
        <div id="recommendation">
            <div id="topOfRecommendation">
                <div id="topOfRecommendationContent">
                    <p>We <span>Highly</span></p>
                    <p>Value <span>Your</span></p>
                    <p><span>Recommendations</span></p>
                 </div>
                <div id="topOfRecommendationImage">
                    <img src={recommendation1} alt="recom1"/>
                </div>
            </div>
            <div id="SearchAndADDButton">
                <div id="searchButton">
                    <div><input placeholder="Search For Books and TextBooks" onChange={(e)=>{SearchWord(e.target.value)}} size="50" /></div>
                    <div><button onClick={searchWorkFunction}>Search</button></div>

                </div>
                <div id="addButton">
                    <button onClick={writeRecommendation}>
                        <div >Write</div>
                        <div><FontAwesomeIcon icon={faPen} id="writeIcon"/></div>
                        </button>
                </div>

            </div>
            <div id="recommendationCards">
                <RecommendationCard/>
                <div id="recommendationCardStyle">
            {
                recommendationPresent?showRecommendations():null
            }


        </div>

            </div>
    
                <Modal className="recommendationModal" isOpen={recommendationModal}>
                    <div id="topOfModal">
                        <div>
                            <p>Your Recommendation</p>
                        </div>
                        <div id="CancelModalRecommendation">
                            <FontAwesomeIcon onClick={()=>{setrecommendationModal(false)}} icon={faTimes}/>
                        </div>

                    </div>
                    <div id="bodyOfModal">
                        <label>Your Name :</label>
                        <br/>
                        <input type="text" size="50" defaultValue={name1} onChange={(e)=>{e.preventDefault();setName2(e.target.value)}}/>
                        <br/>
                        <br/>
                        <label>Name of Book/TextBook :</label>
                        <br/>
                        <input type="text" size="50" name="nameOFBook" onChange={(e)=>{e.preventDefault();setNameOfBook(e.target.value)}}/>
                        <br/>
                        <br/>
                        <label>Name of Writer :</label>
                        <br/>
                        <input type="text" size="50" name="nameOfWriter" onChange={(e)=>{e.preventDefault();setNameOfWriter(e.target.value)}}/>
                        <br/>
                        <br/>
                        <label>Please Write :</label>
                        <br/>
                        <textarea type="text" size="50"  onChange={(e)=>{e.preventDefault();setReview(e.target.value)}}/>
                        <br/>
                        <br/>
                        <button onClick={submitRecommendation}>Submit</button>

                        

                    </div>

                </Modal>
                
            </div>
    )
}
export default Recommendation;
