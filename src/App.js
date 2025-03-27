import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from "./Components/FileSearch.js";
import FileList from "./Components/FileList.js";
import BottomButton from './Components/BottomButton.js';
import TabList from './Components/TabList.js';  
import defaultFiles from "./utils/defaultFiles.js";
import {faPlus, faFileImport, faF} from '@fortawesome/free-solid-svg-icons';
  
function App() {
  return (
    <div className="App container-fluid vh-100">
      <div className="row g-0 h-100">
        <div className="col-12 col-md-4 bg-light border-end">
          <div className="d-flex flex-column h-100">
            <FileSearch
              title="Sawtone 的笔记仓库"
              onFileSearch={console.log}
              className="mb-3 shadow-sm"
            />
            
            <div className="flex-grow-1 overflow-auto">
              <FileList
                files={defaultFiles}
                onFileClick={console.log}
                onSaveEdit={console.log}
                onFileDelete={console.log}
              />
            </div>

            <div className="d-grid gap-3 p-3 border-top">
              <BottomButton
                text='新建笔记'
                colorClass='btn-primary'
                icon={faPlus}
                className="rounded-pill shadow-sm hover-scale" 
              />
              <BottomButton
                text='导入文件'
                colorClass='btn-outline-secondary'
                icon={faFileImport}
                className="rounded-pill shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-8 bg-white">
          <div className="h-100 d-flex flex-column">
            <TabList 
              files={defaultFiles}
              activeId="1"
              unsavedIds={["1", "2"]}
              onTabClick={(id) => {console.log(id);}}
              onCloseTab={(id) => {console.log('closing', id);}} 
              className="border-bottom"
            />
            <div className="flex-grow-1 p-4">
              <div className="editor-placeholder">
                <span className="text-muted">选择或创建笔记开始编辑</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
