import { useState } from "react";
import Navigation from "./Navigation";

export default function ABX (){

    const buttonA: string = "A"
    const buttonB: string = "B"

    const [isButtonASelected, setisButtonASelected] = useState(false);
    const [isButtonBSelected, setisButtonBSelected] = useState(false);

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
                <div className="card w-96 bg-primary text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-9xl">A</h2>
                        <div className="card-actions justify-end">
                            <label className="swap">
        
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" />
                            
                            {/* volume on icon */}
                            <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/></svg>
                            
                            {/* volume off icon */}
                            <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z"/></svg>
                            
                            </label>
                        </div>
                    </div>
                </div>
                {/*B*/}
                <div className="card w-96 bg-primary text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-9xl">B</h2>
                        <div className="card-actions justify-end">
                            <label className="swap">
        
                            <input type="checkbox" />
                            <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/></svg>
                            <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z"/></svg>
                            
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center">
                {/*X*/}
                <div className="card w-96 bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-9xl">X</h2>
                        <div className="card-actions justify-end">
                            <label className="swap">
            
                            <input type="checkbox" />
                            <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/></svg>
                            <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z"/></svg>
                            
                            </label>
                        </div>
                    </div>
                </div>
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