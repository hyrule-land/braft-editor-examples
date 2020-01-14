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

const initialHtml = `<p>啊啊啊啊啊啊啊啊啊啊啊<em>啊啊啊啊啊啊啊啊</em></p><div class="braft_table_block_container" data-block-data="{&quot;tableData&quot;:[[&quot;坪山区&quot;,122333],[&quot;大鹏区&quot;,122333],[&quot;罗湖区&quot;,122333],[&quot;光明新区&quot;,122333],[&quot;南山区&quot;,122333],[&quot;龙华区&quot;,122333],[&quot;盐田区&quot;,122333],[&quot;宝安区&quot;,122333],[&quot;龙岗区&quot;,122333],[&quot;福田区&quot;,122333]],&quot;tableSize&quot;:&quot;small&quot;,&quot;tableExtarAttrs&quot;:{},&quot;containerExtarAttrs&quot;:{},&quot;tableStyle&quot;:{&quot;width&quot;:300},&quot;containerStyle&quot;:{&quot;display&quot;:&quot;flex&quot;,&quot;justifyContent&quot;:&quot;center&quot;,&quot;background&quot;:&quot;#fafafa&quot;,&quot;padding&quot;:30}}"> </div><p></p><div class="braft_table_block_container" data-block-data="{&quot;tableData&quot;:[[{&quot;data&quot;:&quot;坪山区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;罗湖区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;光明新区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;南山区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;龙华区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;盐田区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;宝安区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;龙岗区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;福田区&quot;,&quot;isHeader&quot;:true}],[&quot;aaaaa&quot;,&quot;123456&quot;,&quot;ejeajfaf&quot;,&quot;poijjkk&quot;,&quot;kkkkkk&quot;,&quot;dddddddaa&quot;,&quot;ooekfkkam&quot;,&quot;dpljjjjj&quot;,789]]}"> </div><p></p><div class="braft_table_block_container" data-block-data="{&quot;tableData&quot;:[[{&quot;data&quot;:&quot;坪山区&quot;,&quot;isHeader&quot;:true,&quot;tdExtarAttrs&quot;:{&quot;rowSpan&quot;:2}},&quot;大鹏区&quot;,&quot;罗湖区&quot;,&quot;光明新区&quot;,&quot;南山区&quot;,&quot;龙华区&quot;,&quot;盐田区&quot;,&quot;宝安区&quot;,&quot;龙岗区&quot;,&quot;福田区&quot;],[&quot;aaaaa&quot;,{&quot;data&quot;:&quot;aaaaffffff&quot;,&quot;isHeader&quot;:true,&quot;tdExtarAttrs&quot;:{&quot;colSpan&quot;:2},&quot;style&quot;:{&quot;background&quot;:&quot;#deedff&quot;,&quot;textAlign&quot;:&quot;left&quot;}},&quot;ejeajfaf&quot;,&quot;poijjkk&quot;,&quot;kkkkkk&quot;,{&quot;data&quot;:&quot;这是一个合并的单元格&quot;,&quot;tdExtarAttrs&quot;:{&quot;colSpan&quot;:4},&quot;style&quot;:{&quot;color&quot;:&quot;red&quot;,&quot;fontWeight&quot;:&quot;bold&quot;}}]]}"> </div><p></p><div class="braft_table_block_container" data-block-data="{&quot;tableData&quot;:[[&quot;坪山区&quot;,&quot;大鹏区&quot;,&quot;罗湖区&quot;,&quot;光明新区&quot;,&quot;南山区&quot;,&quot;龙华区&quot;,&quot;盐田区&quot;,&quot;宝安区&quot;,&quot;龙岗区&quot;,&quot;福田区&quot;],[&quot;aaaaa&quot;,&quot;123456&quot;,&quot;ejeajfaf&quot;,&quot;poijjkk&quot;,&quot;kkkkkk&quot;,&quot;dddddddaa&quot;,&quot;ooekfkkam&quot;,&quot;dpljjjjj&quot;,789,555555]],&quot;tableSize&quot;:&quot;middle&quot;}"> </div><p></p><p>顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶</p><div class="braft_table_block_container" data-block-data="{&quot;tableData&quot;:[[{&quot;data&quot;:&quot;坪山区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;罗湖区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;光明新区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;南山区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;龙华区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;盐田区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;宝安区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;龙岗区&quot;,&quot;isHeader&quot;:true},{&quot;data&quot;:&quot;福田区&quot;,&quot;isHeader&quot;:true}],[&quot;aaaaa&quot;,&quot;123456&quot;,&quot;ejeajfaf&quot;,&quot;poijjkk&quot;,&quot;kkkkkk&quot;,&quot;dddddddaa&quot;,&quot;ooekfkkam&quot;,&quot;dpljjjjj&quot;,789]]}"> </div><ol><li>ddd</li><li>55588w</li><li>qwerttttt</li><li>怕怕怕怕怕怕怕怕怕怕怕</li></ol><div class="braft_table_block_container" data-block-data="{&quot;tableData&quot;:[[&quot;坪山区&quot;,122333],[&quot;大鹏区&quot;,122333],[&quot;罗湖区&quot;,122333],[&quot;光明新区&quot;,122333],[&quot;南山区&quot;,122333],[&quot;龙华区&quot;,122333],[&quot;盐田区&quot;,122333],[&quot;宝安区&quot;,122333],[&quot;龙岗区&quot;,122333],[&quot;福田区&quot;,122333]],&quot;tableSize&quot;:&quot;small&quot;,&quot;tableExtarAttrs&quot;:{},&quot;containerExtarAttrs&quot;:{},&quot;tableStyle&quot;:{&quot;width&quot;:300},&quot;containerStyle&quot;:{&quot;display&quot;:&quot;flex&quot;,&quot;justifyContent&quot;:&quot;center&quot;,&quot;background&quot;:&quot;#fafafa&quot;,&quot;padding&quot;:30}}"> </div><p style="text-align:center;" size="0" _root="undefined" __ownerid="undefined" __hash="undefined" __altered="false"><em><strong><span style="color:#f39c12">顶顶顶顶顶顶顶顶顶顶顶啊啊啊啊啊啊啊啊啊啊啊啊啊啊</span></strong></em></p><div class="braft_table_block_container" data-block-data="{&quot;tableData&quot;:[[&quot;坪山区&quot;,122333],[&quot;大鹏区&quot;,122333],[&quot;罗湖区&quot;,122333],[&quot;光明新区&quot;,122333],[&quot;南山区&quot;,122333],[&quot;龙华区&quot;,122333],[&quot;盐田区&quot;,122333],[&quot;宝安区&quot;,122333],[&quot;龙岗区&quot;,122333],[&quot;福田区&quot;,122333]],&quot;tableSize&quot;:&quot;small&quot;,&quot;tableExtarAttrs&quot;:{},&quot;containerExtarAttrs&quot;:{},&quot;tableStyle&quot;:{&quot;width&quot;:300},&quot;containerStyle&quot;:{&quot;display&quot;:&quot;flex&quot;,&quot;justifyContent&quot;:&quot;center&quot;,&quot;background&quot;:&quot;#fafafa&quot;,&quot;padding&quot;:30}}"> </div><ol><li>顶顶顶顶顶顶顶顶顶顶顶顶</li><li>大啊</li><li>awwww</li></ol><blockquote>顶<strong><em><span style="color:#c0392b">顶顶顶顶地</span></em></strong>方a<br/></blockquote><p></p><p></p><p></p><p>啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</p><p></p><p>企鹅呃呃呃呃佛奥附加费紧急法案放进去就缺乏咳咳咳</p><div class="braft_table_block_container" data-block-data="{&quot;tableData&quot;:[[{&quot;data&quot;:&quot;坪山区&quot;,&quot;isHeader&quot;:true,&quot;tdExtarAttrs&quot;:{&quot;rowSpan&quot;:2}},&quot;大鹏区&quot;,&quot;罗湖区&quot;,&quot;光明新区&quot;,&quot;南山区&quot;,&quot;龙华区&quot;,&quot;盐田区&quot;,&quot;宝安区&quot;,&quot;龙岗区&quot;,&quot;福田区&quot;],[&quot;aaaaa&quot;,{&quot;data&quot;:&quot;aaaaffffff&quot;,&quot;isHeader&quot;:true,&quot;tdExtarAttrs&quot;:{&quot;colSpan&quot;:2},&quot;style&quot;:{&quot;background&quot;:&quot;#deedff&quot;,&quot;textAlign&quot;:&quot;left&quot;}},&quot;ejeajfaf&quot;,&quot;poijjkk&quot;,&quot;kkkkkk&quot;,{&quot;data&quot;:&quot;这是一个合并的单元格&quot;,&quot;tdExtarAttrs&quot;:{&quot;colSpan&quot;:4},&quot;style&quot;:{&quot;color&quot;:&quot;red&quot;,&quot;fontWeight&quot;:&quot;bold&quot;}}]]}"> </div><p></p>`

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
        tableData: tableData1,
        tableSize: 'middle',
      })
    })
  }

  // 插入一个竖向居中的表格
  insertTableBlock2 = () => {
    const { editorState } = this.state;
    this.setState({
      editorState: ContentUtils.insertAtomicBlock(editorState, BLOCK_TYPE, true, {
        tableData: tableData2,
        tableSize: 'small',
        // table 标签额外的属性
        tableExtarAttrs: {
        },
        // container 额外的属性
        containerExtarAttrs: {
        },
        // 表格 table 标签的 style
        tableStyle: {
          width: 300,
        },
        // 表格外层 container 的 style，可以用来设置表格的对齐（居中等等）
        containerStyle: {
          display: 'flex',
          justifyContent: 'center',
          background: '#fafafa',
          padding: 30
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
    
    const { editorState } = this.state;

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
          <p 
            style={{
              color: 'red',
              fontSize: '30px',
              textAlign: 'center'
          }}>该功能的非常灵活性，满足大家对于插入表格的大部分需求，每一个单元格都可以自定义</p>
          <p>支持 container 样式的自定义</p>
          <p>支持 table 样式的自定义</p>
          <p>支持每一个单元格样式的自定义（宽度/颜色等），甚至自定义单元格的 render 方法，支持合并单元格（rowSpan, colSpan）等等，设置 isHeader 属性，可以将单元格设置成表头的样式</p>
          <p>请确保 table 是一个 二维数组，二维数组的每一项对应一个单元格，所以可能需要自己写一个数据格式转换的方法</p>
          <p>每个单元格的数据，可以是字符串，数字，或者一个对象（数据请写在 data 属性里面）</p>
          <p>tableSize: 'default' | 'middle' | 'small'，作用跟 antd 的 table 的 size 属性一样</p>
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