import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from "./Components/FileSearch.js";
import FileList from "./Components/FileList.js";
import BottomButton from './Components/BottomButton.js';
import defaultFiles from "./utils/defaultFiles.js";
import {faPlus, faFileImport, faF} from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="App container-fluid">
      {/*栅格布局 grid*/}
      <div className="row no-gutters">
        <div className="col-3 bg-dark-subtle align-items-center px-0">
          <FileSearch
            title="Sawtone 的笔记仓库"
            onFileSearch={(value)=>{console.log('Search: ' + value)}}
          />
          <FileList
            files={defaultFiles}
            onFileClick={(id)=>{console.log(id)}}
            onSaveEdit={(id, newValue)=>{console.log(id); console.log(newValue)}}
            onFileDelete={(id)=>{console.log('delete', id)}}
          />
          <div className="row no-gutters">
            <div className="col d-flex">
              <BottomButton
                text='新建'
                colorClass='btn-primary'
                icon={faPlus}
                className="flex-grow-1"
              />
            </div>
            <div className="col d-flex">
              <BottomButton
                text='导入'
                colorClass='btn-success'
                icon={faFileImport}
                className="flex-grow-1"
              />
            </div>
          </div>
        </div>
        <div className="col-9 bg-danger-subtle align-items-center px-0">

          

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
