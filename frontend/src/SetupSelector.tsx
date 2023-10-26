
export default function SetupSelector() {
    return ( 
        <div className="flex flex-row flex-wrap justify-center ml-20 mt-20 mr -20">
            <select className="mx-5 select select-bordered w-full max-w-xs">
                <option disabled selected>Which setup are you using?</option>
                <option>Han Solo</option>
                <option>Greedo</option>
            </select>
            <label className="ml-5 label mr-3">
                <span className="label-text">Headphone:</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mr-5" />
            <label className="label ml-5 mr-3">
                <span className="label-text">Amplifier:</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mr-5" />
            <label className="label ml-5 mr-3">
                <span className="label-text">DAC:</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mr-5" />
            <label className="label cursor-pointer mx-5">
                <span className="label-text mr-3">Save setup?</span> 
                <input type="checkbox" className="checkbox" />
            </label>
        </div>
    )}