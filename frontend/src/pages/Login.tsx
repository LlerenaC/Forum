import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from "firebase/auth";
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });

    }

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    return(
        <>
            <main>        
                <section>
                    <div className='signup-box'>
                        <br></br>                                            
                        <h1> Login </h1>                       

                        <form>                                              
                            <div>
                                <input
                                    className='email-box'
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                                <br></br>
                            <div>
                                <input
                                    className='email-box'
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                                <br></br>
                            <div>
                                <button   
                                    className='signup-button'                                 
                                    onClick={onLogin}                                        
                                >      
                                    Login                                                                  
                                </button>
                            </div>
                            <br></br>
                            <button className='signup-button' onClick={(e) => signInWithPopup(auth, provider)
                                .then((result) => {
                                    // This gives you a Google Access Token. You can use it to access the Google API.
                                    const credential = GoogleAuthProvider.credentialFromResult(result);
                                    const token = credential.accessToken;
                                    // The signed-in user info.
                                    const user = result.user;
                                    // IdP data available using getAdditionalUserInfo(result)
                                    // ...
                                    navigate("/home")
                                }).catch((error) => {
                                    // Handle Errors here.
                                    const errorCode = error.code;
                                    const errorMessage = error.message;
                                    // The email of the user's account used.
                                    const email = error.customData.email;
                                    // The AuthCredential type that was used.
                                    const credential = GoogleAuthProvider.credentialFromError(error);
                                    // ...
                                })}> 
                                <img src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png" style={{height: "20px"}}/> Log In with Google 
                            </button>                               
                        </form>

                        <p className="text-sm text-white text-center">
                            No account yet? {' '}
                            <NavLink to="/signup">
                                Sign up
                            </NavLink>
                        </p>
                        <br></br>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Login