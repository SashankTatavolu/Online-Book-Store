import React, { useState} from 'react'
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faTimes,faBars,faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import {API_URL} from '../../constant/index';
import GoogleLogin from 'react-google-login';
//import pp from '../../assests/pp.jpg';
import {Link} from 'react-router-dom'; 




const Header=(props)=>{
    const [openSignup,setopenSignup]=useState(false);
    const [openLogin,setopenLogin]=useState(false);
    const[firstName,setfirstName]=useState("");
    const[lastName,setlastName]=useState("");
    const[email,setemail]=useState("");
    const[phoneNumber,setphoneNumber]=useState("");
    const[password,setpassword]=useState("");
    const[repassword,setrepassword]=useState("");
    const[isLogged,setIsLogged]=useState(false);
    const[loginPassword,setLoginPassword]=useState("");
    const[loginEmail,setLoginEmail]=useState("");
    const[picture,setPicture]=useState();
    const[dropdown,setDropDown]=useState(false);
    const[idOfUser,setIdOfUser]=useState();
    
    

    
    const onOpenModalSignup=(e)=>{
        e.preventDefault();
        setopenSignup(true);

    };
    const closeSignupModal=(e)=>{
        e.preventDefault();
        setopenSignup(false);

    };
    const openLoginPage=(e)=>{
        e.preventDefault();
        setopenLogin(true);
    }

    const closeLoginModal=(e)=>{
        e.preventDefault();
        setopenLogin(false);


    }
    
    async function validation(e){
        e.preventDefault();
        const checkGoogleEmail=async()=>{
            var checkEmail="";
            const res=await axios.get("http://127.0.0.1:8000/account/rest-auth/google/")
            for (var i = 0; i < res.data.length; i++) {
                let googleEmail=res.data[i].email;
                if (email=== googleEmail) {
                    checkEmail="emailExist";
                    break;
                    }}
            if(checkEmail==="emailExist"){
                    setemail("")
                    alert("Email already exists.Try with new Email.");        
                }else{ 
                    Submitted(checkEmail);
                    } 
                    }
        var checkEmail=""
        const res= await axios.get(API_URL);
        for (var i = 0; i < res.data.length; i++) {
        let userEmail = res.data[i].email;
        if (email === userEmail) {
            checkEmail="emailExist";
            break;
            }
        }
        if(checkEmail==="emailExist"){
            setemail("")
            alert("Email already exists.Try with new Email.");        
        }else{ 
            checkGoogleEmail();
        }
        
    }
    
    const Submitted=(checkEmail)=>{
        if(password!==repassword){
            alert("Enter same password")
            }
        else{
            let formdata=new FormData();
        formdata.append('firstName',firstName);
        formdata.append('lastName',lastName);
        formdata.append('email',email);
        formdata.append('phoneNumber',phoneNumber);
            formdata.append('password',password);
            formdata.append( 'confirmPassword',repassword)
            axios.post(
            API_URL,formdata
            ).then(alert(`${formdata.get("firstName")}, your account is created.You can login now.`),setfirstName(""),setlastName(""),setemail(""),setphoneNumber(""),setpassword(""),setrepassword(""),setopenSignup(false))
            .catch(err=>console.log(err));
            }
        }
        

        const responseGoogle = (response) => {
            const checkEmail=async()=>{
                var checkEmail=""
            const res= await axios.get(API_URL);
            for (var i = 0; i < res.data.length; i++) {
                let userEmail = res.data[i].email;
                    if (email === userEmail) {
                    checkEmail="emailExist";
                    break;
                    }
                    }
            if(checkEmail==="emailExist"){
                alert("Email already exists.Try with new Email.");        
            }else{ 
                checkEmailGoogle();
            }}

            const checkEmailGoogle=async()=>{
                var checkEmail="";
                const res=await axios.get("http://127.0.0.1:8000/account/rest-auth/google/")
                let googleEmail=response.profileObj.email;
                for (var i = 0; i < res.data.length; i++) {
                    let userEmail = res.data[i].email;
                    if (googleEmail === userEmail) {
                        checkEmail="emailExist";
                        break;
                        }}
            if(checkEmail==="emailExist"){
                alert("Email already exists.Try with new Email.");        
            }else{ 
                googleLogin();
                } 
            }
            const googleLogin = async (accesstoken) => {
                let googleData=new FormData();
                googleData.append("accessToken",response.accessToken)
                googleData.append("googleID",response.googleId)
                googleData.append("name",response.profileObj.name)
                googleData.append("email",response.profileObj.email)
                googleData.append("imageUrl",response.profileObj.imageUrl)
 };
                checkEmail();
                
            }
            const failure=()=>{
                alert("Faliure to signup")
            }

            async function loginInformation(e){
                e.preventDefault();
                const checkInfo=await axios.get(API_URL);
                for(var k=0;k<checkInfo.data.length;k++){
                    let savedEmail=checkInfo.data[k].email;
                    let savedPassword=checkInfo.data[k].password;
                    setPicture(checkInfo.data[k].dp);
                    setIdOfUser(checkInfo.data[k].id);
                    let ids=checkInfo.data[k].id;

                    

                    if(loginEmail===savedEmail){
                        if(loginPassword===savedPassword){
                            //alert("You are logged in");
                            setopenLogin(false);
                            document.getElementById('icon').style='display:none';
                            document.getElementById('loginIcon').style='display:block';
                            setIsLogged(true);
                            props.setUserIDOFLogin(ids);


                            break;
                        }
                        else{
                            alert("password error");
                            setLoginPassword("");
                            break;
                        }
                        break;
                    }
                    
                }
            } 

            const logoutCalled=()=>{
                document.getElementById('loginIcon').style='display:none';
                document.getElementById('icon').style='display:block';
                setIsLogged(false);
                window.location.reload(false);

            }

            
            
            

    



    return(

        <div className="content">

            <nav className="navbar navbar-light bg-light justify-content-between">
            <h1>My Book Shop</h1>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        <div className="dropdown">
                            <div className="dropbtn click" >
                            <div id="icon" style={{display:"block"}}>
                            <FontAwesomeIcon  icon={faUser}   style={{color:"plum",fontSize:"25px",margin:"0 30px",cursor:'pointer'}} />
                            <div className="dropdown-content" style={isLogged?{display:"none"}:{display:"default"}} >
                            <li ><button onClick={onOpenModalSignup} className="Signup">SignUp</button></li>
                            <li ><button onClick={openLoginPage}    className="login">Login</button></li>
                            </div>
                            </div>

                            </div>                            
                            
                        <div id="loginIcon" style={{display:"none"}}>
                            
                               <img src={picture} alt="pic" onClick={()=>setDropDown(!dropdown)} style={{height:"35px",width:"35px",borderRadius:"15px",borderColor:"3px solid plum",margin:"0 30px",cursor:'pointer'}}/>
                               {
                                   dropdown?
                                   <div className="loginDropdown"   >
                                       <li >
                                           <div>
                                           <Link to={{pathname:'/dashboard',id:idOfUser,isLogged:true }} onClick={()=>{setDropDown(false)}} ><FontAwesomeIcon icon={faBars} style={{margin:"0 5px"}}/>DashBoard</Link>
                                           </div>
                                           
                                           </li>
                                        <li>
                                            <div id="logoutButton">
                                                <Link to={{pathname:'/'}} onClick={()=>{setDropDown(false);logoutCalled()}}><FontAwesomeIcon icon={faSignOutAlt} style={{margin:"0 5px"}} />Logout</Link>
                                            </div>
                                            
                                            </li>
                                      
                                           
                               </div>:null

                               } 
                                
                            </div>
                            
                        <Modal isOpen={openSignup} onClose={closeSignupModal} className="insideModal">
                        <FontAwesomeIcon icon={faTimes} onClick={closeSignupModal}   style={{color:"purple",fontSize:"25px",float:"Right",cursor:'pointer'}}/>
                            <div className="wholeModal">
                                <div className="leftSide">
                                    <p>Already a Memeber?</p>
                                    <button>Login</button>
                                </div>
                                <div className="rightSide">
                                    <div className="titleModal">
                                        <h3>SIGN UP</h3>
                                    </div>
                                    <form onSubmit={validation}>

                                    <div className="bodyModal">
                                        <div className="signupLeft">
                                            <li>
                                                <input type="text" placeholder="First Name" value={firstName} onChange={e=>setfirstName(e.target.value)} required/>
                                            </li>
                                            <li>
                                                <input type="text" placeholder="Your Email"  value={email} onChange={e=>setemail(e.target.value)}  required/>
                                            </li>
                                            <li>
                                                <input type="password" placeholder="Password"  value={password} onChange={e=>setpassword(e.target.value)} required/>
                                            </li>
                                        </div>
                                        <div className="signupRight">
                                        <li>
                                                <input type="text" placeholder="Last Name"  value={lastName} onChange={e=>setlastName(e.target.value)} required/>
                                            </li>
                                            <li>
                                                <input type="text" placeholder="Your Phone Number"  value={phoneNumber} onChange={e=>setphoneNumber(e.target.value)} required/>
                                            </li>
                                            <li>
                                                <input type="password" placeholder="Confirm Password" value={repassword}  onChange={e=>setrepassword(e.target.value)} required/>
                                            </li>
                                        </div>
                                    </div>
                                    <div className="footModal">
                                    <input type="submit" value="Submit"/>
                                    </div>
                                    </form>

                                    <div className="footModal">
                                        <p style={{fontSize:'20px',color:'purple',wordSpacing:'0.5px',margin:"3% auto",fontSize:'20px'}}>OR</p>
                                        <GoogleLogin  clientId="229306783056-ca4em5q6572nu8g0g579oujf8kg33iat.apps.googleusercontent.com" buttonText="SIGN UP WITH GOOGLE"  onSuccess={responseGoogle}
                                        onFailure={failure} className="google" style={{outline:"none"}} />

                                        <br/>
                                        <br/>
                                        </div>


                                </div>
                            </div>


                        </Modal>

                        <Modal isOpen={openLogin} className="modalLogin" onClose={closeLoginModal} style={{height:"auto",overflow:"visible"}}>
                        <div style={{textAlign:"center",color:"palegoldenrod",fontSize:"30px",fontFamily:"Georgia",letterSpacing:"2px",margin:"0px"}}>WELCOME BACK!
                        <FontAwesomeIcon icon={faTimes} onClick={closeLoginModal}  style={{color:"purple",fontSize:"25px",float:"Right",cursor:'pointer'}}/>
                        </div>
                        <div className="wholeLoginModal">
                            <div className="loginLeftSide">
                                <div className="loginTitle">LOGIN</div>
                                <form onSubmit={loginInformation}>
                                <div className="loginBody" style={{marginTop:"10%"}}>
                                    <li>
                                        <input type="text" placeholder="Your Email" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)}  required/>
                                    </li>
                                    <br/>
                                    <li>
                                    <input type="password" placeholder="Your Password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)}  required/>
                                    </li>
                                    <br/>

                                </div>
                                <input type="submit" value="Login"/>
                                </form>


                                <div className="loginFoot" style={{margin:"10% auto"}}>
                                <p style={{fontSize:'20px',color:'purple',wordSpacing:'0.5px',margin:"3% auto",fontSize:'20px'}}>OR</p>
                                <button className="google" style={{outline:"none"}}>GOOGLE</button>      
                                </div>
                            </div>
                            <div className="loginModalFoot">
                                <p>Have you Signed Up?</p>
                                <button>SignUp</button>
                            </div>
                        </div>

                        </Modal>
                        </div>
                    </form>
            </nav>

        </div>
    )
}

export default Header;
