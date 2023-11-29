export default function CodecSelector() {
    return ( 
        <div className="flex flex-row flex-wrap justify-center mt-20">
            <select className="select select-bordered w-full max-w-xs mr-10 bg-accent">
                <option disabled selected>Codec 1</option>
                <option>Han Solo</option>
                <option>Greedo</option>
            </select>
            <select className="select select-bordered w-full max-w-xs bg-accent">
                <option disabled selected>Codec 2</option>
                <option>Han Solo</option>
                <option>Greedo</option>
            </select>
            <button className="btn btn-accent ml-10">Compare!</button>
        </div>
    )}