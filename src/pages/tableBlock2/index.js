import React, { Component } from 'react';
import { ContentUtils } from 'braft-utils';
import shortid from 'shortid';
import './index.less'

const tableBlockImportFn = (nodeName, node) => {
  return {
    type: 'table_block_render',
    data: {
      dataA: 'heleloaaa'
    }
  }
  // return node;
  // debugger;
}

const discountBlockHtml = (blockData) => {
  console.log(blockData);
  return ` <div class="discount-coupon-element">
    hello world
  </div>`
}

const tableBlockExportFn = (contentState, block) => {
  console.log(block)
  if (block.type === 'atomic') {
   let ranges = block.entityRanges.length  >  0 ? block.entityRanges[0] : -1;
   if (ranges !== -1 ){
     let entity = contentState.getEntity(contentState.getBlockForKey(block.key).getEntityAt(0))
     if (entity.getType() === "table_block_render") {
       let blockData = entity.getData()
       return  discountBlockHtml(blockData)
     }
   }
  }
  
  // 导入空格
  if (block.type === "unstyled" &&  !block.text.length) {
    return `<p><br/></p>`
  }
}

export { tableBlockImportFn, tableBlockExportFn };

export default class TableBlock extends Component {
  state = {
    showDelButton: false
  }

  onShowDelButton = () => {
    this.setState({
      showDelButton: true
    })
  }

  onHideDelButton = ()=>{
    this.setState({
      showDelButton: false
    })
  }
  // 注意：通过blockRendererFn定义的block，无法在编辑器中直接删除，需要在组件中增加删除按钮
  removeBarBlock = () => {
    this.props.blockProps.editor.setValue(ContentUtils.removeBlock(this.props.blockProps.editorState, this.props.block))
  }

  render () {
    const blockData  = this.props.contentState.getEntity(this.props.block.getEntityAt(0)).getData()

    const { data, direction } = blockData;

    console.log("blockData", blockData)

    return (
      <div className="tableContainer" >
        <table border="1">
          <tbody>
            <tr>
              {
                data.map(item => item.key).map(item => {
                  return (
                    <td key={shortid.generate()}>{item}</td>
                  )
                })
              }
            </tr>
            <tr>
              {
                data.map(item => item.value).map(item => {
                  return (
                    <td key={shortid.generate()}>{item}</td>
                  )
                })
              }
            </tr>
          </tbody>        
        </table>
        <button onClick={this.removeBarBlock}>delete</button>
      </div>
    )
  }
}