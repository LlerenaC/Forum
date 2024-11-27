import { useEffect, useState } from "react";
import "./home.css";
import { CloseButton} from "@mantine/core";

const HomePage = () => {
    interface Data {
        text: {text: String};
        id: String;
    };

    const [data, setData] = useState<Data[]>([]);
    const [text, setText] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            fetch('http://localhost:8080/Post/get')
            .then(res => res.json())
            .then(data => setData(data.data))
            .catch(error => console.error('Error fetching data:', error));
            };
            fetchPosts();
    }, [data]);

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
        closePostPopup();
        window.location.reload();
    }

    const deletePost = async(id: String) => {
        await fetch(`http://localhost:8080/Post/delete/${id}`, {
            method: 'DELETE',
        });
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
            <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous"/>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
            </head>
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
                            <header>
                                <CloseButton className="CloseButton"variant="dark" onClick={closeAskPopup} style={{left: "96%", top: "13%"}}/>
                            </header><br></br>
                            <input className="Post-text-box" type="text" placeholder="Ask Something..." name="text" value= {text} onChange={(e) => {setText(e.target.value)}}/> 
                            <button type="submit" onClick={submit}>Post</button>
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
                            <header>
                                <CloseButton variant="dark" className="Hide-post" onClick={(e) => deletePost(item.id)}></CloseButton>
                            </header>
                            {item.text.text}
                        </div>)}
                    </div>
                    <div className="right-box">
                    <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#">Action</a></li>
    <li><a className="dropdown-item" href="#">Another action</a></li>
    <li><a className="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
                    </div>
            </div>
        </>
    );
};

export default HomePage;