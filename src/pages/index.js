import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import { Button } from 'antd';
import TableBlock, { tableBlockImportFn, tableBlockExportFn } from './tableBlock/index';
import tableData from './tableData';

// 定义上文提到的 blockRenderFn  tableBlockImportFn 
// 定义一个新的block类型：table_block_render
const blockRenderFn = (contentBlock, { editor, editorState }) => {
  if (contentBlock.getType() === 'atomic'  ) {
    const entity = editorState.getCurrentContent().getEntity(contentBlock.getEntityAt(0))
    if(entity.getType() ===  "table_block_render"){
      return {
        component: TableBlock,
        editable: false, // editable并不代表组件内容实际可编辑，强烈建议设置为false
        props: { editor, editorState } // 传入的内容可以在组件中通过this.props.blockProps获取到
      }
    }
  }
}

export default class BasicDemo extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState(null,
      {
        blockImportFn: tableBlockImportFn,
        blockExportFn: tableBlockExportFn
      })
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML()
    })
  }

  test = () => {    
  }

  insertTableBlock = () => {
    const { editorState } = this.state;
    this.setState({
      editorState: ContentUtils.insertAtomicBlock(editorState, 'table_block_render', true, {
        data: tableData,
        direction: 'row',
        width: 500,
        align: 'center'
      })
    })
  }

  logOutputHtml = () => {
    const { editorState } = this.state;
    console.log(editorState.toHTML());
  }

  test2 = () => {
    const abc = ContentUtils;
    console.log(abc);
    
    const { editorState } = this.state;
    debugger;
    // this.setState({
    //   editorState: ContentUtils.insertHTML(editorState, dom)
    // })

    const styleMap = {
      'STRIKETHROUGH': {
        textDecoration: 'line-through',
      },
    };
    

    const textDom = `##数据项##`

    this.setState({
      editorState: ContentUtils.insertText(editorState, textDom, null, {
        type: 'EMOTICON',
        mutability: 'IMMUTABLE',
        data: {
        }
      })
    })
  }

  render () {

    const { editorState, outputHTML } = this.state

    return (
      <div>
        <Button onClick={this.insertTableBlock}>insert table block</Button>
        <Button onClick={this.test}>test</Button>

        <Button onClick={this.test2}>插入数据项</Button>
        <Button onClick={this.logOutputHtml}>打印 html</Button>
        <div className="editor-wrapper">
          <BraftEditor
            value={editorState}
            onChange={this.handleChange}
            blockRendererFn={blockRenderFn}
            converts={{
              blockImportFn: tableBlockImportFn,
              blockExportFn: tableBlockExportFn
            }}
            imageControls={['align-left','align-center','align-right','size','remove']}
            stripPastedStyles={false}
            lineHeights={[1.5, 1.75, 2, 2.5, 3, 4]}
          />
        </div>
        <h5>输出的 html 字符串内容:</h5>
        <div className="output-content">{outputHTML}</div>
      </div>
    )

  }

}