import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from "firebase/auth";
import { auth } from '../firebase';
import "./signup.css";

const SignUp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
      e.preventDefault()

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });


    }

  return (
    <main >        
        <section>
            <div>
                <div className='signup-box'>
                    <br></br>                  
                    <h1> Sign Up </h1>                                                                            
                    <form>                                                                                            
                        <div>
                            <input 
                                className='email-box'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Email address"                                
                            />
                        </div>
                        <br></br>
                        <div>
                            <input
                                className='email-box'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"              
                            />
                        </div>                                             
                        <br></br>
                        <button
                            className='signup-button'
                            type="submit" 
                            onClick={onSubmit}                        
                        >  
                            Sign up                                
                        </button>

                    </form>

                    <p>
                        Already have an account?{' '}
                        <NavLink to="/" >
                            Sign in
                        </NavLink>
                    </p>
                    <br></br>                   
                </div>
            </div>
        </section>
    </main>
  )
}

export default SignUp