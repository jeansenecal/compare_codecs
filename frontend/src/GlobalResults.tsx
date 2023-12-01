import './index.css';
import Navigation from './Navigation';
import ResultsTable from './ResultsTable';

function GlobalResults() {
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