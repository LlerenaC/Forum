import { useEffect, useState } from "react";
import "./home.css";
import { CloseButton} from "@mantine/core";

const HomePage = () => {

    const [data, setData] = useState<Array<String>>([]);
    const [text, setText] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            fetch('http://localhost:8080/Post/get')
            .then(res => res.json())
            .then(data => setData(data.values()))
            .catch(error => console.error('Error fetching data:', error));
            console.log();
            };
            fetchPosts();
    }, []);
    

    // const postsToDisplay = () => {
    //     var arr = [
    //         'Post1',
    //         'Post2',
    //         'Post3'
    //     ]
    //     return arr
    // };


    const submit = async() => {
        await fetch(`http://localhost:8080/Post`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: text,
            }),
    })
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
                             
                                <input type="text" placeholder="Say Something..." name="text" value= {text} onChange={(e) => {setText(e.target.value)}}/> 
                                <button type="submit" onClick={submit}>Post</button>
                            
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
                        {data.map(item => 
                        <div className="Posts" key={data.indexOf(item)}>
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
