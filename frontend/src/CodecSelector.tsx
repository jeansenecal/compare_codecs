import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'

interface Codec {
    label: string,
    value: string
}

export default function CodecSelector() {
    const navigate = useNavigate();
    const [codecA, setCodecA] = useState('');
    const [userAge, setuserAge] = useState('');
    const [codecB, setCodecB] = useState('');
    const [codecs, setCodecs] = useState<Codec[]>([]);

    async function startComparison() {
        try {
            const res: Response = await fetch('http://localhost:8000/playlist', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    codecA,
                    codecB,
                    userAge,
                })
            });
            const data = await res.json();
            if(res.status === 500){
                console.log(data);
            }else if (res.status === 201){
                localStorage.setItem('playlistId', data.playlistId);
                navigate('/abx');
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchCodecs = async () => {
            const res: Response = await fetch('http://localhost:8000/codecs');
            const data: Codec[] = await res.json();
            setCodecs(data);
        }

        //Fetch userAge if user is logged in
        fetchCodecs();
    }, []);


    return (
        <>
        <div className="flex flex-row flex-wrap justify-center mt-20">
            
            <label className="label">
                <span className="label-text">Your age:</span>
            </label>
            <input type="text" placeholder="age" className="input input-bordered max-w-xs mr-10" name="age" value={userAge} onChange={(e) => setuserAge(e.target.value)}/>
            <select name="codecA" value={codecA} onChange={(e) => setCodecA(e.target.value)} className="select select-bordered w-full max-w-xs mr-10 bg-accent">
                <option disabled value="">Codec A</option>
                {
                    codecs.filter((codec) => codec.value !== codecB)
                    .map((codec) => <option key={codec.label} value={codec.value}>{codec.label}</option>)
                }
            </select>
            <select name="codecB" value={codecB} onChange={(e) => setCodecB(e.target.value)} className="select select-bordered w-full max-w-xs bg-accent">
                <option disabled value="">Codec B</option>
                {
                    codecs.filter((codec) => codec.value !== codecA)
                    .map((codec) => <option key={codec.label} value={codec.value}>{codec.label}</option>)
                }
            </select>
            <button className="btn btn-accent ml-10" onClick={startComparison}>Compare!</button>
        </div>
        </>
    )
}