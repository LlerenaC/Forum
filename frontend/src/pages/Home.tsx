import { useState } from "react";
import "./home.css";
import { CloseButton} from "@mantine/core";

const HomePage = () => {
    const postsToDisplay = () => {
        var arr = [
            'Post1',
            'Post2',
            'Post3'
        ]
        return arr
    };

    const [text, setText] = useState('');

    const submit = () => {
        fetch('http://localhost:8080/Posts')
        .then(response => response.json())
        .then(res => console.log(res))
    //     e.preventDefault();
    //     fetch('http://localhost:5173/', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             text,
    //             completed: false
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(() => {
    //         console.log(e.message)
    //     })
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
                            <div>
                                <form onSubmit={submit}>   
                                    <input type="text" placeholder="Say Something..." name="text" value= {text} onChange={(e) => {setText(e.target.value)}}/> 
                                <button type="submit">Post</button>
                                </form>
                            </div>
                        </div>
                    )}

                    {(isOpenPost || isOpenAsk) && (
                        <div className="overlay" onClick={(isOpenPost) ? closePostPopup:closeAskPopup}>

                        </div>
                    )}
                    
                    {isOpenAsk && (
                        <div className="Post-popup">
                            <div className="Post-popup-header">
                                <CloseButton variant="dark" onClick={closeAskPopup} style={{left: "95%", top: "10%"}}/>
                            </div>
                            <input>
                            </input>
                        </div>
                    )}
                    <div className="left-box">

                    </div>
                    <div className="middle-box">
                        <div className="make-post">
                            <button className="Post-button" onClick={openPostPopup}>Post</button> 
                            <button className="Post-button" onClick={openAskPopup}>Ask a question</button>
                        </div>
                        {postsToDisplay().map(item => 
                        <div className="Posts"key={postsToDisplay().indexOf(item)}>
                            {item}
                        </div>)}
                    </div>
                    <div className="right-box">

                    </div>
            </div>
        </>
    );
};

export default HomePage;
