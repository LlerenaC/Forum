import { useEffect, useState } from "react";
import { WeatherResponse } from "@full-stack/types";
import { coinflip } from "@full-stack/common";
import { BACKEND_BASE_PATH } from "../constants/Navigation";
import { CloseButton } from "@mantine/core";
import "./weather.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Weather = () => {
    interface Data {
        text: {text: String};
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
            console.log("  Provider-specific UID: " + profile.uid);
            setUserName(profile.displayName);
            console.log("  Email: " + profile.email);
            setPhotoURL(profile.photoURL);
            });
        }
    }, [user]);

    useEffect(() => {
        const fetchPosts = async () => {
            fetch('http://localhost:8080/Question/get')
            .then(res => res.json())
            .then(data => setData(data.data))
            .catch(error => console.error('Error fetching data:', error));
            };
            fetchPosts();
    }, []);

    const submit = async() => {
        await fetch(`http://localhost:8080/Question`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: text,
            }),    
        })
        closePostPopup();
        window.location.reload();
    }

    const deletePost = async(id: String) => {
        await fetch(`http://localhost:8080/Question/delete/${id}`, {
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

    const [isOpenAsk, setIsOpenAsk] = useState(false);
    const openAskPopup = () => {
        setIsOpenAsk(true);
    };

    const closeAskPopup = () => {
        setIsOpenAsk(false);
    };


    return(
        <>
            <div className="sc">
                    {isOpenPost && (
                        <div className="Post-popup">
                            <div className="Post-popup-header">
                                <CloseButton variant="dark" onClick={closePostPopup} style={{left: "95%", top: "10%"}}/>
                            </div>
                            <textarea className="Post-text-box" placeholder="Say Something..." name="text" value= {text} onChange={(e) => {setText(e.target.value)}}/> 
                            <button style={{borderRadius:"10px", background: "lightblue", color:"white", }} type="submit">Post</button>
                        </div>
                    )}

                    {(isOpenPost || isOpenAsk) && (
                        <div className="overlay" onClick={(isOpenPost) ? closePostPopup:closeAskPopup}>

                        </div>
                    )}
                    
                    {isOpenAsk && (
                        <div className="Post-popup">
                            <header>
                                <CloseButton className="CloseButton"variant="dark" onClick={closeAskPopup} style={{left: "96%", top: "13%"}}/>
                            </header><br></br>
                            <textarea className="Post-text-box" placeholder="Ask Something..." name="text" value= {text} onChange={(e) => {setText(e.target.value)}}/> 
                            <button style={{borderRadius:"10px", background: "lightblue", color:"white", }} type="submit" onClick={submit}>Post</button>
                        </div>
                    )}
                    <div className="left-box">
                    
                    </div>
                    <div className="middle-box">
                        <div className="make-post">
                            <button className="Post-button" onClick={openAskPopup}>Ask a question</button>
                        </div>
                    {data.map(item => 
                        <div className="Questions" key={data.indexOf(item)}>
                            <header className="Post-popup-header">
                                {(photoURL != null) &&
                                    <img src={photoURL} className="Hide-post" style={{borderRadius: "50%", height: "20px"}}/>
                                }
                                 <p className="Hide-post" style={{left: "5%", bottom: "10%", position: "relative"}}>{userName}</p> 
                                <CloseButton variant="dark" className="Hide-post" style={{boxShadow: "none", left: "87%"}} onClick={(e) => deletePost(item.id)}></CloseButton>
                            </header>
                            {item.text.text}
                            <footer>
                                <button className="Answer-button">Answer</button>
                            </footer>
                        </div>)}
                    </div>
                    <div className="right-box">

                    </div>
            </div>
        </>
    );
};

export default Weather;
