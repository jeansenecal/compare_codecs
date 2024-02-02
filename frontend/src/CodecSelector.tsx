import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import SetupSelector from './SetupSelector';

interface Codec {
    label: string,
    value: string
}

export default function CodecSelector() {
    const [codecA, setCodecA] = useState('');
    const [codecB, setCodecB] = useState('');
    const [headphones, setHeadphones] = useState('');
    const [amp, setAmp] = useState('');
    const [dac, setDac] = useState('');
    const [saveSetup, setSaveSetup] = useState(false);
    const [codecs, setCodecs] = useState<Codec[]>([]);

    function startComparison(): void {
        console.log("Comparison started");
    }

    function handleFieldChange(fieldName: string, value: string | boolean): void{
        console.log(`F = ${fieldName} V = ${value}`);
        if (typeof value === 'string'){
            if(fieldName === 'headphones'){
                setHeadphones(value);
            }else if(fieldName === 'amp'){
                setAmp(value);
            }else if(fieldName === 'dac'){
                setDac(value);
            }
        }else if(fieldName === 'saveSetup'){
            setSaveSetup(value);
        }
    }

    useEffect(() => {
        const fecthCodecs = async () => {
            const res: Response = await fetch('http://localhost:8000/codecs');
            const data: Codec[] = await res.json();
            setCodecs(data);
        }
        fecthCodecs();
    }, []);


    return (
        <>
        <SetupSelector onChange={handleFieldChange} />
        <div className="flex flex-row flex-wrap justify-center mt-20">
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
            <Link to="/abx">Test</Link>
        </div>
        </>
    )}