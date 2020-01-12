import React, { Component } from 'react';
import { ContentUtils } from 'braft-utils';
import classNames from 'classnames';
import { Button } from 'antd';
import shortid from 'shortid';
import _get from 'lodash/get';
import './index.less';

// 判断数据类型
function getType(obj){
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
}

const BLOCK_TYPE = 'braft_table_block';

const tableBlockImportFn = (nodeName, node) => {
}

// 自定义block输出转换器，用于将不同的block转换成不同的html内容，通常与blockImportFn中定义的输入转换规则相对应
const tableBlockExportFn = (contentState, block) => {
  // if (block.getType() === 'braft_table_block') {
  //   return {
  //     component: NewTableBlock,
  //     editable: false, 
  //     props: { editor, editorState }
  //   }
  // }

  // if (block.getType() === 'atomic'  ) {
  //   const entity = editorState.getCurrentContent().getEntity(block.getEntityAt(0))
  //   if(entity.getType() ===  "braft_table_block"){}
  // }


  if (block.type === BLOCK_TYPE) {
    const { dataB } = block.data

    return {
      start: `<div class="my-block-bar" data-b="${dataB}">`,
      end: '</div>'
    }

  }

  if (block.type === 'atomic') {
    let ranges = block.entityRanges.length  >  0 ? block.entityRanges[0] : -1;
    if (ranges !== -1 ){
      let entity = contentState.getEntity(contentState.getBlockForKey(block.key).getEntityAt(0))
      if (entity.getType() === BLOCK_TYPE) {
        let blockData = entity.getData();
        console.log(blockData);
        return (
          <div className="my-block-bar"></div>
        )
      }
    }
   }

}

export { tableBlockImportFn, tableBlockExportFn };

export default class TableBlock extends Component {
  state = {
    removeButtonVisible: false,
    newTableData: []
  }

  onTableMouseEnter = () => {
    this.setState({
      removeButtonVisible: true
    })
  }

  onTableMouseLeave = () => {
    this.setState({
      removeButtonVisible: false
    })
  }

  // 删除 block
  removeBlock = () => {
    this.props.blockProps.editor.setValue(ContentUtils.removeBlock(this.props.blockProps.editorState, this.props.block))
  }

  render () {

    const thisProps = this.props;
    let blockData = null;
    // const tableData = []

    if (_get(thisProps, 'block.getData')) {
      blockData = this.props.block.getData();
    }

    const entity = _get(thisProps, 'block.getEntityAt') && this.props.block.getEntityAt(0)
    if (this.props.contentState && entity) {
      blockData = this.props.contentState.getEntity(this.props.block.getEntityAt(0)).getData()
    }

    // const typeVerifier = Object.prototype.toString.call;

    // 入参的类型判断，blockData 必须要是个二维数组
    if (blockData !== null) {
      if (getType(blockData) !== 'Object') {
        throw new Error ('blockData should be an object')
      }

      const { tableData } = blockData;
      // debugger;
      if (!tableData) {
        throw new Error ('property "tableData" is required!');
      }
      if (getType(tableData) !== 'Array') {
        throw new Error ('property "tableData" should be an array');
      }
      tableData.forEach(item => {
        if (getType(item) !== 'Array') {
          throw new Error ('children of "tableData" should be an array');
        }
      })

      // this.setState({
      //   newTableData: tableData
      // })
    }
    
    const { removeButtonVisible } = this.state;

    const tdRender = (data) => {
      return data.map((item, index) => {
        if (getType(item) === 'Object') {
          // const { tdProperties = {} } = item;

          if (item.data) {
            return (
              <td
                key={shortid.generate()}
                className={classNames({
                  'header': item.isHeader,
                })} {...item.tdProperties}>{item.data}</td>
            )
          }
          return (
            <td key={shortid.generate()}></td>
          )
        }
        return (
          <td key={shortid.generate()}>{item}</td>
        )
      })
    }

    const tableRender = () => {
      if (blockData !== null && blockData.hasOwnProperty('tableData') && getType(blockData.tableData) === 'Array') {
        return blockData.tableData.map((item, index) => {
          return (
            <tr key={shortid.generate()}>
              {tdRender(item)}
            </tr>
          )
        })
      }
      return null
    }

    return (
      <div 
        className="braft_table_block_container"
        onMouseLeave={() =>this.onTableMouseLeave()}
        onMouseEnter={() =>this.onTableMouseEnter()}
      >
        <div className="removeButtonWrapper">
          <Button size="small" onClick={this.removeBlock} className="removeButton" style={{
            display: removeButtonVisible ? 'block' : 'none'
          }}>
            删除
          </Button>
        </div>        
        
        <table>
          <tbody>
            {
              tableRender()
              // blockData !== null
              // tableRender(blockData.tableData)
            }
          </tbody>
        </table>
      </div>
    )
  }
}