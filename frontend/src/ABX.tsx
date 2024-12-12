import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import Player from "./Player";

interface Song {
    title: string;
    artist: string;
    section: number;
    folderId: string;
    codecAUrl: string;
    codecBUrl: string;
}

export default function ABX (){

    const buttonA: string = "A"
    const buttonB: string = "B"
    const random: number = Math.floor(Math.random());

    const navigate = useNavigate();
    const [isButtonASelected, setisButtonASelected] = useState(false);
    const [isButtonBSelected, setisButtonBSelected] = useState(false);
    const [playerCurrentlyPlaying, setPlayerCurrentlyPlaying] = useState("");
    const [titleArtist, setTitleArtist] = useState("");
    const [codecAUrl, setCodecAUrl] = useState("");
    const [codecBUrl, setCodecBUrl] = useState("");

    const toggleButtons = (event: React.MouseEvent<HTMLButtonElement>, button: string) => {
        if (button === buttonA) {
            setisButtonASelected(!isButtonASelected);
            if (isButtonBSelected) {
                setisButtonBSelected(false);
            }
        } else {
            setisButtonBSelected(!isButtonBSelected);
            if (isButtonASelected) {
                setisButtonASelected(false);
            }
        }
      };

      const endTest = async () => {
        const playlistId = localStorage.getItem('playlistId');
        const res: Response = await fetch(`http://localhost:8000/playlist/${playlistId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
        });
        if(res.status !== 200) {
            //error
        }
        navigate('/results');
      };

      const nextSong = async () => {
        setPlayerCurrentlyPlaying("");
        let correctAnswer: Boolean = false;
        if((random === 1 && isButtonASelected === true) || (random !== 1 && isButtonBSelected === true)){
            correctAnswer = true;
        } else if (isButtonASelected === false && isButtonBSelected === false){
            console.log('Select an option');
            return
        }
        const playlistId = localStorage.getItem('playlistId');
        const userId = localStorage.getItem('user');
        const res: Response = await fetch(`http://localhost:8000/playlist/${playlistId}/testresult`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                correctAnswer: correctAnswer
            })
        });
        if(res.status === 200) {
            const res2: Response = await fetch(`http://localhost:8000/playlist/${playlistId}/deletefirstsong`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }
            });
            const data2 = await res2.json();
            if (data2.msg === "song deleted") {
                fetchNextSong();
            } else if (data2.msg === "playlist deleted") {
                navigate('/results');
            } else {
                
            }
        } else {
            console.log("couldnt post the results");
        }
      }

      const fetchNextSong = async () => {
        const playlistId = localStorage.getItem('playlistId');
        const res: Response = await fetch(`http://localhost:8000/playlist/${playlistId}/nextsong`);
        const data: Song = await res.json();
        setTitleArtist( data.title + " - " + data.artist);
        setCodecAUrl(data.codecAUrl);
        setCodecBUrl(data.codecBUrl);
    }

      useEffect(() => {
        fetchNextSong();
    }, []);

    return(
        <div>
            <Navigation />
            {/*A*/}
            <div className="flex flex-col items-center gap-x-48 m-12">
            <h1>Play each of the samples and try to identify whether sample X is the same as sample A or B</h1>
            <h2>Now playing: {titleArtist}</h2>
            </div>  
            <div className="flex flex-row justify-center gap-x-48 m-12">
                { codecAUrl === '' ? <></> :
                    <Player 
                        songUrl={codecAUrl}
                        name='A'
                        colour="primary"
                        checked={playerCurrentlyPlaying === "A"}
                        setPlayerCurrentlyPlaying={setPlayerCurrentlyPlaying}
                    />
                }
                {/*B*/}
                { codecBUrl === '' ? <></> :
                    <Player 
                        songUrl={codecBUrl}
                        name='B'
                        colour="primary"
                        checked={playerCurrentlyPlaying === "B"}
                        setPlayerCurrentlyPlaying={setPlayerCurrentlyPlaying}
                    />
                }
                
            </div>

            <div className="flex flex-col items-center">
                {/*X*/}
                { codecAUrl === '' && codecBUrl === '' ? <></> :
                    <Player 
                        songUrl= {random === 1 ? codecAUrl : codecBUrl}
                        name='X'
                        colour="neutral"
                        checked={playerCurrentlyPlaying === "X"}
                        setPlayerCurrentlyPlaying={setPlayerCurrentlyPlaying}
                    />
                }
                <h1 className="mt-10">Which sample sounds most similar to sample X? 
                    <button className={isButtonASelected ? "btn btn-info mx-3" : "btn btn-outline btn-info mx-3"} onClick={(event) => toggleButtons(event, buttonA)}>A</button>
                    <button className={isButtonBSelected ? "btn btn-info mx-3" : "btn btn-outline btn-info mx-3"} onClick={(event) => toggleButtons(event, buttonB)}>B</button>
                    <button className="btn" onClick={nextSong}>Continue
                    <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </button>
                </h1>
            </div>
            <div className="flex flex-col items-center">
            <button className="btn my-3 btn-error" onClick={endTest}>End Test</button>
            </div>
            
        </div>
    )

}