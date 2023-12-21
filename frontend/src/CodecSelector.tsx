import { Link } from "react-router-dom";

export default function CodecSelector() {
    return ( 
        <div className="flex flex-row flex-wrap justify-center mt-20">
            <select defaultValue="" className="select select-bordered w-full max-w-xs mr-10 bg-accent">
                <option disabled value="">Codec 1</option>
                <option>Han Solo</option>
                <option>Greedo</option>
            </select>
            <select defaultValue="" className="select select-bordered w-full max-w-xs bg-accent">
                <option disabled value="">Codec 2</option>
                <option>Han Solo</option>
                <option>Greedo</option>
            </select>
            <button className="btn btn-accent ml-10">Compare!</button>
            <Link to="/abx">Test</Link>
        </div>
    )}