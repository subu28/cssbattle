import './style.css';
import Nav from '../nav';
import Editor from '../Editor';
import Output from '../Output';

const App = () => {
  return (
    <>
      <Nav/>
      <div className="flex">
        <Editor/>
        <Output/>
      </div>
    </>
  );
};

export default App;