import React from 'react'
import './style.css';
import shoppingCart from '../../assests/shoppingcart.jpeg';
import Cards from './Card/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faHandHoldingUsd, faShoppingCart } from '@fortawesome/free-solid-svg-icons'



const AboutUS=(props)=>{
    function showMore(e){
        e.preventDefault();
        document.getElementById('ReadLess').style='display:block';
        document.getElementById('ReadMore').style='display:none';
        document.getElementById('moreParagraph').style='display:block';

    };

    function showLess(e){
        e.preventDefault();
        document.getElementById('ReadMore').style='display:block';
        document.getElementById('ReadLess').style='display:none';
        document.getElementById('moreParagraph').style='display:none';

    }

    
    return(
        <div>
        <div className="aboutUS">
            <div className="photo" style={{width:"60%"}}>
            <img src={shoppingCart} style={{height:"100%",width:"90%",margin:"0px 0px",borderRadius:"25px 60px" }} alt="images"/>
            </div>
            <div className="aboutShop" style={{width:"40%"}}>
                <h2 className="title2">ABOUT US</h2>
                <div className="paragraph" style={{textAlign:"left",margin:"20px 0"}}>
                    <p>Dear Readers,</p>
                    <p>My Book Store is an online bookstore with a strong system for client profiling. Online book sales and purchases are also available to customers at this bookstore. We have a huge selection of books in the genres of fiction, non-fiction, biographies, history, religions, self-help, and children's literature. We also transport a sizable stock of books on investments and management, computers, engineering, medicine, college, and school subjects that are scheduled across the country by various foundations.
                    </p>
                    <p id="moreParagraph" style={{display:"none"}}>
                    The creation of an online bookshop and the integration of a consumer profiling system into the online bookstore make up the two main components of our project. Our goal is to create a system that will assist clients in buying or selling books and processing payments. This website can also be used for commercial purposes, such as online book sales.
                    </p>
                    <button id="ReadMore" style={{display:"block"}} onClick={showMore}>Read More</button>
                    <button id="ReadLess" style={{display:"none"}} onClick={showLess}>Read Less</button>
                </div>
            </div>
        </div>
        
        <div className="services">
            <h2 className="title3">Our Services</h2>
            <div className="servicesTypes" >
                <Cards>
                    <span className="title4">Buy</span>
                    <FontAwesomeIcon icon={faShoppingCart}  style={{color:"lightseagreen",fontSize:"30px",margin:"0 30px"}}/>
                    <p className="cardsParagraph">User can buy new or used books,textbooks,notes at a resonable price.</p>
                </Cards>
                <Cards>
                    <span className="title4">Sell</span>
                    <FontAwesomeIcon icon={faHandHoldingUsd}  style={{color:"lightseagreen",fontSize:"30px",margin:"0 30px"}}/>
                    <p className="cardsParagraph">User can sell their used books,textbooks,notes at a resonable price.</p>

                </Cards>
                <Cards>
                    <span className="title4">Recommend</span>
                    <FontAwesomeIcon icon={faEdit}  style={{color:"lightseagreen",fontSize:"30px",margin:"0 30px"}}/>
                    <p className="cardsParagraph">User can recommend the items they read to others.</p>

                </Cards>
            </div>
            
            



            </div>
        </div>
    )
}

export default AboutUS;