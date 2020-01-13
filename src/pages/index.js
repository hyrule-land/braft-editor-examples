import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import { Button } from 'antd';
import { tableData1, tableData2, tableData3, tableData4 } from './tableData';
import TableBlock, { tableBlockImportFn, tableBlockExportFn, BLOCK_TYPE } from './tableBlock/index'

const blockRenderFn = (block, { editor, editorState }) => {
  if (block.getType() === BLOCK_TYPE) {
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

const initialHtml = `<blockquote>这是测试内</blockquote><p></p><div class="braft_table_block_container" data-block-data="{&quot;tableData&quot;:[[&quot;坪山区&quot;,&quot;大鹏区&quot;,&quot;罗湖区&quot;,&quot;光明新区&quot;,&quot;南山区&quot;,&quot;龙华区&quot;,&quot;盐田区&quot;,&quot;宝安区&quot;,&quot;龙岗区&quot;,&quot;福田区&quot;],[&quot;aaaaa&quot;,&quot;123456&quot;,&quot;ejeajfaf&quot;,&quot;poijjkk&quot;,&quot;kkkkkk&quot;,&quot;dddddddaa&quot;,&quot;ooekfkkam&quot;,&quot;dpljjjjj&quot;,789,555555]]}"> </div><p></p><p>中间插入<span style="color:#c0392b"><strong>的一些文本</strong></span></p><p></p><p></p><div class="braft_table_block_container" data-block-data="{&quot;tableData&quot;:[[&quot;坪山区&quot;,122333],[&quot;大鹏区&quot;,122333],[&quot;罗湖区&quot;,122333],[&quot;光明新区&quot;,122333],[&quot;南山区&quot;,122333],[&quot;龙华区&quot;,122333],[&quot;盐田区&quot;,122333],[&quot;宝安区&quot;,122333],[&quot;龙岗区&quot;,122333],[&quot;福田区&quot;,122333]],&quot;tableExtarAttrs&quot;:{&quot;style&quot;:{&quot;width&quot;:300}},&quot;containerExtarAttrs&quot;:{&quot;style&quot;:{&quot;display&quot;:&quot;flex&quot;,&quot;justifyContent&quot;:&quot;center&quot;,&quot;background&quot;:&quot;#fafafa&quot;,&quot;padding&quot;:30}}}"> </div><p></p><p></p><ol><li>对对对对</li></ol><div class="braft_table_block_container" data-block-data="{&quot;tableData&quot;:[[{&quot;data&quot;:&quot;坪山区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;罗湖区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;光明新区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;南山区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;龙华区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;盐田区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;宝安区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;龙岗区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;福田区&quot;,&quot;isHeader&quot;:true}],[&quot;aaaaa&quot;,&quot;123456&quot;,&quot;ejeajfaf&quot;,&quot;poijjkk&quot;,&quot;kkkkkk&quot;,&quot;dddddddaa&quot;,&quot;ooekfkkam&quot;,&quot;dpljjjjj&quot;,789]]}"> </div><p>啊啊啊啊</p><p></p><p></p><div class="braft_table_block_container" data-block-data="{&quot;tableData&quot;:[[{&quot;data&quot;:&quot;坪山区&quot;,&quot;isHeader&quot;:true,&quot;tdExtarAttrs&quot;:{&quot;rowSpan&quot;:2}},&quot;大鹏区&quot;,&quot;罗湖区&quot;,&quot;光明新区&quot;,&quot;南山区&quot;,&quot;龙华区&quot;,&quot;盐田区&quot;,&quot;宝安区&quot;,&quot;龙岗区&quot;,&quot;福田区&quot;],[&quot;aaaaa&quot;,{&quot;data&quot;:&quot;aaaaffffff&quot;,&quot;isHeader&quot;:true,&quot;tdExtarAttrs&quot;:{&quot;colSpan&quot;:2,&quot;style&quot;:{&quot;background&quot;:&quot;cyan&quot;,&quot;textAlign&quot;:&quot;left&quot;}}},&quot;ejeajfaf&quot;,&quot;poijjkk&quot;,&quot;kkkkkk&quot;,&quot;dddddddaa&quot;,&quot;ooekfkkam&quot;,&quot;dpljjjjj&quot;]]}"> </div><p></p>`;

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

  // 插入一个简单的表格
  // tableData 需要是一个二维数组
  insertTableBlock1 = () => {
    const { editorState } = this.state;
    this.setState({
      editorState: ContentUtils.insertAtomicBlock(editorState, BLOCK_TYPE, true, {
        tableData: tableData1
      })
    })
  }

  // 插入一个竖向居中的表格
  insertTableBlock2 = () => {
    const { editorState } = this.state;
    this.setState({
      editorState: ContentUtils.insertAtomicBlock(editorState, BLOCK_TYPE, true, {
        tableData: tableData2,
        tableExtarAttrs: {
          style: {
            width: 300,
          }
        },
        containerExtarAttrs: {
          style: {
            display: 'flex',
            justifyContent: 'center',
            background: '#fafafa',
            padding: 30
          }
        }
      })
    })
  }

  // 插入一个带表头的表格
  // tableData 需要是一个二维数组，然后在需要数据项里面设置属性 isHeader: true
  insertTableBlock3 = () => {
    const { editorState } = this.state;
    this.setState({
      editorState: ContentUtils.insertAtomicBlock(editorState, BLOCK_TYPE, true, {
        tableData: tableData3
      })
    })
  }

  insertTableBlock4 = () => {
    const { editorState } = this.state;
    this.setState({
      editorState: ContentUtils.insertAtomicBlock(editorState, BLOCK_TYPE, true, {
        tableData: tableData4
      })
    })
  }

  logOutputHtml = () => {
    const { editorState } = this.state;
    console.log(editorState.toHTML());
  }

  test2 = () => {
    const abc = ContentUtils;
    // console.log(abc);
    
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
        <div>
          <TableBlock />
        </div>

        <div style={{
          marginBottom: 30,
          padding: 20
        }}>
          <p>支持 container 样式的自定义</p>
          <p>支持 table 样式的自定义</p>
          <p>支持每一个单元格样式的自定义（宽度/颜色等），或者单元格 render 的自定义，支持合并单元格等等，设置 isHeader 属性，可以将单元格设置成表头的样式</p>
          <p>请确保 table 是一个 二维数组，所以可能需要自己写一个数据格式转换的方法</p>
          <Button type="primary" onClick={this.insertTableBlock1} style={{ marginRight: 20 }}>插入一个简单的表格</Button>
          <Button type="primary" onClick={this.insertTableBlock2} style={{ marginRight: 20 }}>插入一个竖向居中的表格</Button>
          <Button type="primary" onClick={this.insertTableBlock3} style={{ marginRight: 20 }}>插入一个带表头的表格</Button>
          <Button type="primary" onClick={this.insertTableBlock4} style={{ marginRight: 20 }}>插入一个超级复杂的表格（支持样式的自定义）</Button>
          <Button onClick={this.logOutputHtml}>在控制台打印 html</Button>
        </div>

        {/* <Button onClick={this.test2}>插入数据项</Button> */}
        
        <div className="editor-wrapper" style={{
          border: '1px solid #e8e8e8',
          margin: 30,
        }}>
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

        <div style={{
          border: '1px solid #e8e8e8',
          margin: 30,
          padding: 20
        }}>
          <h1>输出的 html 字符串内容:</h1>
          <div className="output-content">{outputHTML}</div>
        </div>
        
      </div>
    )

  }

}