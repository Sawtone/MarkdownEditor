import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from "./Components/FileSearch.js";
import FileList from "./Components/FileList.js";
import defaultFiles from "./utils/defaultFiles.js";

function App() {
  return (
    <div className="App container-fluid">
      {/*栅格布局 grid*/}
      <div className="row" >
        <div className="col-5 bg-dark-subtle align-items-center">
          <FileSearch
            title="My Document :D"
            onFileSearch={(value)=>{console.log(value)}}
          />
          <FileList
            files={defaultFiles}
            onFileClick={(id)=>{console.log(id)}}
            onFileDelete={(id)=>{console.log('delete', id)}}
          />
        </div>
        <div className="col-7 bg-danger-subtle align-items-center">

          

        </div>
      </div>












      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.js</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
    </div>
  );
}

export default App;
