import { useEffect } from 'react';
import Navigation from './Navigation';
import ResultsTable from './ResultsTable';

function GlobalResults() {

  useEffect(() => {
    fetchResults();
}, []);

const fetchResults = async () => {
  const res = await fetch(`http://localhost:8000/globalresults`);
  const data = await res.json();

  if(res.status === 404){
      //navigate('/');
  }
}

  return (
    <div>
      <Navigation />
      <section className='mx-40 my-10'>
        <ResultsTable showUsers={true}/>
      </section>
    </div>
  );
}

export default GlobalResults;