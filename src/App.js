import React from "react";
import './App.css';
// 这俩css引入有问题，暂时在public/index.html里面用CDN硬引入了(不引入好像对样式影响也不大)
import 'bootstrap/dist/css/bootstrap.min.css'
import "easymde/dist/easymde.min.css";
import {faPlus, faFileImport} from '@fortawesome/free-solid-svg-icons';

import { Container, Row, Col } from 'react-bootstrap';
import { FolderOpen } from 'lucide-react';

import FileSearch from "./Components/FileSearch.js";
import FileList from "./Components/FileList.js";
import BottomButton from './Components/BottomButton.js';
import TabList from './Components/TabList.js';  
import defaultFiles from "./utils/defaultFiles.js";

import { marked } from 'marked';
import SimpleMDE from "react-simplemde-editor";


function App() {
  return (
    <Container fluid className="App vh-100 p-0">
      <div className="container-border h-100 px-0">
        <Row className="h-100 g-0">
          <Col md={3} 
            className="bg-light border-end vh-100 d-flex flex-column" 
            style={{ backgroundColor: '#f8f9fa' }}
          >
            <div className="d-flex flex-column h-100 border-end">
              <div className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <FolderOpen size={24} className="text-primary me-2" />
                  <h5 className="mb-0 fw-semibold">Sawtone MD Editor</h5>
                </div>
                <FileSearch
                onFileSearch={(value) => {console.log(value);}}
                />
              </div>
              <div className="flex-grow-1 overflow-auto px-3">
                <FileList
                  files={defaultFiles}
                  onFileClick={console.log}
                  onSaveEdit={console.log}
                  onFileDelete={console.log}
                />
              </div>

              <div className="d-grid gap-2 p-4 bg-white border-top">
                <BottomButton
                  text='Create File'
                  colorClass='btn-primary'
                  icon={faPlus}
                  className="rounded-3 shadow-sm hover-scale" 
                />
                <BottomButton
                  text='Import File'
                  colorClass='btn-outline-dark'
                  icon={faFileImport}
                  className="rounded-3 shadow-sm hover-scale"
                />
              </div>
            </div>
          </Col>

          <Col md={9} className="vh-100 d-flex flex-column">
            <div className="border-bottom bg-white">
              <TabList 
                files={defaultFiles}
                activeId="1"
                unsavedIds={["1", "2"]}
                onTabClick={(id) => {console.log(id);}}
                onCloseTab={(id) => {console.log('closing', id);}} 
              />
            </div>            
            <div className="flex-grow-1 p-2">
              <div>
                <SimpleMDE
                  onChange={(value) => {console.log(value);}}
                  value="## 选择或创建笔记开始编辑"
                  // option: https://github.com/Ionaru/easy-markdown-editor?tab=readme-ov-file#options-list
                  options={{
                    autofocus: true,
                    spellChecker: false,
                    minHeight: '423px', // default：300px
                    styleSelectedText: true,
                    toolbar: [
                      "bold", "italic", "heading",
                      "|", 
                      "quote", "code", "unordered-list", "ordered-list", "table", 
                      "|", 
                      "link", "image", 
                      "|", 
                      "preview", "side-by-side", "fullscreen"
                    ],
                    previewRender: (plainText) => {
                      // 使用marked解析Markdown
                      return marked(plainText, {
                        // 转换换行符为<br>
                        breaks: true,
                        // 启用GitHub风格的Markdown
                        gfm: true,
                      });  
                    },
                  }}
                />
              </div>
            </div>
            
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default App;
