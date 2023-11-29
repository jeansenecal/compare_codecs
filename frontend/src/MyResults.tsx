import './index.css';
import Navigation from './Navigation';
import ResultsTable from './ResultsTable';

function MyResults() {
  return (
    <div>
      <Navigation />
      <section className='mx-40 my-10'>
        <ResultsTable/>
      </section>
    </div>
  );
}

export default MyResults;