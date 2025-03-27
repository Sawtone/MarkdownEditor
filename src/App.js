import logo from './logo.svg';
import React from "react";
import { marked } from 'marked';
import './App.css';
// 这俩css引入有问题，暂时在public/index.html里面用CDN硬引入了(不引入好像对样式影响也不大)
import 'bootstrap/dist/css/bootstrap.min.css'
import "easymde/dist/easymde.min.css";
import FileSearch from "./Components/FileSearch.js";
import FileList from "./Components/FileList.js";
import BottomButton from './Components/BottomButton.js';
import TabList from './Components/TabList.js';  
import defaultFiles from "./utils/defaultFiles.js";
import {faPlus, faFileImport, faF} from '@fortawesome/free-solid-svg-icons';
import SimpleMDE from "react-simplemde-editor";

  
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
              <div>
                <SimpleMDE
                  onChange={(value) => {console.log(value);}}
                  value="## 选择或创建笔记开始编辑"
                  // option: https://github.com/Ionaru/easy-markdown-editor?tab=readme-ov-file#options-list
                  options={{
                    autofocus: true,
                    spellChecker: false,
                    minHeight: '423px', // default：300px
                    previewRender: (plainText) => {
                      return marked(plainText);  // 使用marked解析Markdown
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
