import { useEffect, useState } from "react";

interface Props{
    onChange: (fieldName: string, value: string | boolean) => void
}

interface Setup {
    headphone: string;
    dac: string;
    amp: string;
}

export default function SetupSelector({ onChange }: Props) {
    const [saveSetup, setSaveSetup] = useState(false);
    const [setups, setSetups] = useState<Setup[]>([]);
    const [headphone, setHeadphone] = useState('');
    const [dac, setDac] = useState('');
    const [amp, setAmp] = useState('');

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
        onChange(event.target.name, event.target.value);
    }

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>){
        const index: number = parseInt(event.target.value);
        setHeadphone(setups[index].headphone);
        setAmp(setups[index].amp);
        setDac(setups[index].dac);
    }
    
    function setChecked(event: React.MouseEvent<HTMLInputElement>){
        onChange(event.currentTarget.name, !saveSetup);
        setSaveSetup(!saveSetup);
    }

    useEffect(() => {
        const fecthMySetup = async () => {
            const accessString = localStorage.getItem('JWT');
            const res: Response = await fetch('http://localhost:8000/setups',{
                headers: { Authorization: `JWT ${accessString}` }
            });
            if(res.status !== 401){
                const data: Setup[] = await res.json();
                setSetups(data);
            }
        }
        fecthMySetup();
    }, []);
        
    return ( 
        <div className="flex flex-row flex-wrap justify-center ml-20 mt-20 mr -20">
            <select defaultValue={""} onChange={handleSelectChange} className="mx-5 select select-bordered w-full max-w-xs">
                <option disabled value="">Which setup are you using?</option>
                {
                    setups.length !== 0 ? setups.map((setup: Setup, index:number) => <option key={setup.headphone + "/" + setup.amp+ "/" + setup.dac} 
                    value={index}>
                    {setup.headphone + "/" + setup.amp+ "/" + setup.dac}</option>)
                    : null
                }
            </select>
            <label className="ml-5 label mr-3">
                <span className="label-text">Headphone:</span>
            </label>
            <input name="headphone" onChange={handleInputChange} value={headphone} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mr-5" />
            <label className="label ml-5 mr-3">
                <span className="label-text">Amplifier:</span>
            </label>
            <input  name="amp" onChange={handleInputChange} value={amp} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mr-5" />
            <label className="label ml-5 mr-3">
                <span className="label-text">DAC:</span>
            </label>
            <input  name="dac" onChange={handleInputChange} value={dac} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mr-5" />
            <label className="label cursor-pointer mx-5">
                <span className="label-text mr-3">Save setup?</span> 
                <input  name="saveSetup" onClick={setChecked} type="checkbox" className="checkbox" />
            </label>
        </div>
    )}