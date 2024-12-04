import { useEffect, useState } from "react";
import "./home.css";
import { CloseButton} from "@mantine/core";
import {  signOut } from "firebase/auth";
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";


const HomePage = () => {
    interface Data {
        text: {text: String, photoURL: string, userName: string};
        id: String;
    };

    const [userName, setUserName] = useState<null | string>();
    const [photoURL, setPhotoURL] = useState<null | string>();
    const [data, setData] = useState<Data[]>([]);
    const [text, setText] = useState('');
    const auth = getAuth();
    const user = auth.currentUser;
    
    useEffect(() => {     
        if (user !== null) {
            user.providerData.forEach((profile) => {
            console.log("Sign-in provider: " + profile.providerId);
            console.log(profile.uid);
            setUserName(profile.displayName);
            console.log("  Email: " + profile.email);
            setPhotoURL(profile.photoURL);
            });
        }
    }, [user]);

    useEffect(() => {
        const fetchPosts = async () => {
            fetch('http://localhost:8080/Post/get')
            .then(res => res.json())
            .then(data => setData(data.data))
            .catch(error => console.error('Error fetching data:', error));
            };
            fetchPosts();
            console.log(data);
    }, []);

    const submit = async() => {
        await fetch(`http://localhost:8080/Post`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: text,
              photoURL: photoURL,
              userName: userName,
            }),
        })
        closePostPopup();
        window.location.reload();
    }

    const deletePost = async(id: String) => {
        await fetch(`http://localhost:8080/Post/delete/${id}`, {
            method: 'DELETE',
        });
        window.location.reload();
    }

    const [isOpenPost, setIsOpenPost] = useState(false);
    const openPostPopup = () => {
        setIsOpenPost(true);
    };

    const closePostPopup = () => {
        setIsOpenPost(false)
    };
    return(
        <>
            <div className="sc">
                    {isOpenPost && (
                        <div className="Post-popup">
                            <header>
                                <CloseButton className="CloseButton"variant="dark" onClick={closePostPopup} style={{left: "95%", top: "10%"}}/>
                            </header><br></br>
                                <textarea className="Post-text-box" placeholder="Say Something..." name="text" value= {text} onChange={(e) => {setText(e.target.value)}}/>    
                                <button style={{borderRadius:"10px", background: "lightslategray", color:"white", }}type="submit" onClick={submit}>Post</button> 
                        </div>
                    )}

                    {(isOpenPost) && (
                        <div className="overlay" onClick={closePostPopup}>

                        </div>
                    )}

                    {/* <div className="left-box">
                    
                    </div> */}
                    <div className="middle-box">
                        <header className="make-post">
                            <button className="Post-button" onClick={openPostPopup}>Post</button> 
                        </header>
                        {data.map(item => 
                        <div className="Posts" key={data.indexOf(item)}>
                            <header className="Post-popup-header">
                                {(item.text.photoURL != null) &&
                                    <img src={item.text.photoURL} className="Hide-post" style={{borderRadius: "50%", height: "20px"}}/>
                                } 
                                <p className="Hide-post" style={{left: "5%", bottom: "10%", position: "relative"}}>{item.text.userName}</p>
                                <CloseButton variant="dark" className="Hide-post" style={{boxShadow: "none", left: "87%"}} onClick={(e) => deletePost(item.id)}></CloseButton>

                            </header>
                            {item.text.text}
                        </div>)}
                    </div>
            </div>
        </>
    );
};

export default HomePage;