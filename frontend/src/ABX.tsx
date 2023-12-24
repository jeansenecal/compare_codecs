import { useState } from "react";
import Navigation from "./Navigation";
import Player from "./Player";

export default function ABX (){

    const buttonA: string = "A"
    const buttonB: string = "B"

    const [isButtonASelected, setisButtonASelected] = useState(false);
    const [isButtonBSelected, setisButtonBSelected] = useState(false);
    const [playerCurrentlyPlaying, setPlayerCurrentlyPlaying] = useState("");

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

    return(
        <div>
            <Navigation />
            {/*A*/}
            <div className="flex flex-col items-center gap-x-48 m-12">
            <h1>Play each of the samples and try to identify whether sample X is the same as sample A or B</h1>
            <h2>Now playing: Song</h2>
            </div>  
            <div className="flex flex-row justify-center gap-x-48 m-12">
                <Player 
                    songUrl="https://res.cloudinary.com/dj6k5whza/video/upload/v1703205606/jpnow1wq6ku8bdruga6t.flac"
                    name='A'
                    colour="primary"
                    checked={playerCurrentlyPlaying === "A"}
                    setPlayerCurrentlyPlaying={setPlayerCurrentlyPlaying}
                />
                {/*B*/}
                <Player 
                    songUrl="https://res.cloudinary.com/dj6k5whza/video/upload/v1703205606/jpnow1wq6ku8bdruga6t.flac"
                    name='B'
                    colour="primary"
                    checked={playerCurrentlyPlaying === "B"}
                    setPlayerCurrentlyPlaying={setPlayerCurrentlyPlaying}
                />
            </div>

            <div className="flex flex-col items-center">
                {/*X*/}
                <Player 
                    songUrl="https://res.cloudinary.com/dj6k5whza/video/upload/v1703205606/jpnow1wq6ku8bdruga6t.flac"
                    name='X'
                    colour="neutral"
                    checked={playerCurrentlyPlaying === "X"}
                    setPlayerCurrentlyPlaying={setPlayerCurrentlyPlaying}
                />
                <h1 className="mt-10">Which sample sounds most similar to sample X? 
                    <button className={isButtonASelected ? "btn btn-info mx-3" : "btn btn-outline btn-info mx-3"} onClick={(event) => toggleButtons(event, buttonA)}>A</button>
                    <button className={isButtonBSelected ? "btn btn-info mx-3" : "btn btn-outline btn-info mx-3"} onClick={(event) => toggleButtons(event, buttonB)}>B</button>
                    <button className="btn">Continue
                    <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </button>
                </h1>
            </div>
            
        </div>
    )

}