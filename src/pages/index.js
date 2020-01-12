import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import { Button } from 'antd';
import { tableData1 } from './tableData';
import TableBlock, { tableBlockImportFn, tableBlockExportFn } from './tableBlock/index'

const blockRenderFn = (block, { editor, editorState }) => {
  if (block.getType() === 'braft_table_block') {
    return {
      component: TableBlock,
      editable: false, 
      props: { editor, editorState }
    }
  }

  if (block.getType() === 'atomic'  ) {
    const entity = editorState.getCurrentContent().getEntity(block.getEntityAt(0))
    if(entity.getType() ===  "braft_table_block"){
      return {
        component: TableBlock,
        editable: false,
        props: { editor, editorState }
      }
    }
  }
}

const initialHtml = `<p>hahahahah</p><div class="braft_table_block_container" data-block-data="{&quot;tableData&quot;:[[{&quot;data&quot;:&quot;坪山区&quot;,&quot;isHeader&quot;:true,&quot;tdProperties&quot;:{&quot;rowSpan&quot;:2}},&quot;大鹏区&quot;,&quot;罗湖区&quot;,&quot;光明新区&quot;,&quot;南山区&quot;,&quot;龙华区&quot;,&quot;盐田区&quot;,&quot;宝安区&quot;,&quot;龙岗区&quot;,&quot;福田区&quot;],[&quot;aaaaa&quot;,{&quot;data&quot;:&quot;aaaaffffff&quot;,&quot;isHeader&quot;:true,&quot;tdProperties&quot;:{&quot;colSpan&quot;:2}},&quot;ejeajfaf&quot;,&quot;poijjkk&quot;,&quot;kkkkkk&quot;,&quot;dddddddaa&quot;,&quot;ooekfkkam&quot;,&quot;dpljjjjj&quot;,&quot;wwwwwwwwww&quot;,&quot;kkkkkkkk&quot;]],&quot;width&quot;:500,&quot;align&quot;:&quot;center&quot;}"> </div><p></p><div class="braft_table_block_container" data-block-data="{&quot;tableData&quot;:[[{&quot;data&quot;:&quot;坪山区&quot;,&quot;isHeader&quot;:true,&quot;tdProperties&quot;:{&quot;rowSpan&quot;:2}},&quot;大鹏区&quot;,&quot;罗湖区&quot;,&quot;光明新区&quot;,&quot;南山区&quot;,&quot;龙华区&quot;,&quot;盐田区&quot;,&quot;宝安区&quot;,&quot;龙岗区&quot;,&quot;福田区&quot;],[&quot;aaaaa&quot;,{&quot;data&quot;:&quot;aaaaffffff&quot;,&quot;isHeader&quot;:true,&quot;tdProperties&quot;:{&quot;colSpan&quot;:2}},&quot;ejeajfaf&quot;,&quot;poijjkk&quot;,&quot;kkkkkk&quot;,&quot;dddddddaa&quot;,&quot;ooekfkkam&quot;,&quot;dpljjjjj&quot;,&quot;wwwwwwwwww&quot;,&quot;kkkkkkkk&quot;]],&quot;width&quot;:500,&quot;align&quot;:&quot;center&quot;}"> </div><p></p><div class="braft_table_block_container" data-block-data="{&quot;tableData&quot;:[[{&quot;data&quot;:&quot;坪山区&quot;,&quot;isHeader&quot;:true,&quot;tdProperties&quot;:{&quot;rowSpan&quot;:2}},&quot;大鹏区&quot;,&quot;罗湖区&quot;,&quot;光明新区&quot;,&quot;南山区&quot;,&quot;龙华区&quot;,&quot;盐田区&quot;,&quot;宝安区&quot;,&quot;龙岗区&quot;,&quot;福田区&quot;],[&quot;aaaaa&quot;,{&quot;data&quot;:&quot;aaaaffffff&quot;,&quot;isHeader&quot;:true,&quot;tdProperties&quot;:{&quot;colSpan&quot;:2}},&quot;ejeajfaf&quot;,&quot;poijjkk&quot;,&quot;kkkkkk&quot;,&quot;dddddddaa&quot;,&quot;ooekfkkam&quot;,&quot;dpljjjjj&quot;,&quot;wwwwwwwwww&quot;,&quot;kkkkkkkk&quot;]],&quot;width&quot;:500,&quot;align&quot;:&quot;center&quot;}"> </div><p></p>`;

export default class BasicDemo extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState(initialHtml,
      {
        blockImportFn: tableBlockImportFn,
        blockExportFn: tableBlockExportFn
      })
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML()
    })
  }

  // 插入表格
  insertTableBlock = () => {
    const { editorState } = this.state;
    this.setState({
      editorState: ContentUtils.insertAtomicBlock(editorState, 'braft_table_block', true, {
        tableData: tableData1,
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
        <div style={{
          padding: '50px 150px'
        }}>
          <TableBlock />
        </div>

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