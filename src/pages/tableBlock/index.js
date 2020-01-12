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
  if (nodeName === 'div' && node.classList.contains('braft_table_block_container')) {
    const blockData = JSON.parse(node.dataset.blockData)

    return {
      type: BLOCK_TYPE,
      data: {
        blockData
      }
    }
  }
}

// 自定义block输出转换器，用于将不同的block转换成不同的html内容，通常与blockImportFn中定义的输入转换规则相对应
const tableBlockExportFn = (contentState, block) => {
  if (block.type === BLOCK_TYPE) {
    const blockData = block.data
    return (
      <div className="braft_table_block_container" data-block-data={JSON.stringify(blockData)}></div>
    )
  }

  if (block.type === 'atomic') {
    let ranges = block.entityRanges.length  >  0 ? block.entityRanges[0] : -1;
    if (ranges !== -1 ){
      let entity = contentState.getEntity(contentState.getBlockForKey(block.key).getEntityAt(0))
      if (entity.getType() === BLOCK_TYPE) {
        let blockData = entity.getData();
        console.log(blockData);

        // 需要提供一个接口来单独保存blockData
        return (
          <div className="braft_table_block_container" data-block-data={JSON.stringify(blockData)}></div>
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
      console.log(11111);
      blockData = this.props.block.getData().get('blockData');
    }

    const entity = _get(thisProps, 'block.getEntityAt') && this.props.block.getEntityAt(0)
    if (this.props.contentState && entity) {
      console.log(22222);
      blockData = this.props.contentState.getEntity(this.props.block.getEntityAt(0)).getData()
    }

    // const typeVerifier = Object.prototype.toString.call;

    // 入参的类型判断，blockData 必须要是个二维数组
    if (blockData !== null) {
      // debugger;
      if (getType(blockData) !== 'Object') {
        throw new Error ('blockData should be an object')
      }

      const { tableData } = blockData;

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
    }
    
    const { removeButtonVisible } = this.state;

    // 允许自定义单元格的内容，通过传入 tdRender 属性就行
    const tdRender = (item) => {
      if (item.tdRender) {
        return item.tdRender(item.data)
      }
      return item.data
    }

    const tableCellRender = (data) => {
      return data.map((item, index) => {
        if (getType(item) === 'Object') {

          if (item.data) {
            return (
              <td
                key={shortid.generate()}
                className={classNames({
                  'header': item.isHeader,
                })} {...item.tdExtarAttributes}>
                  {
                    tdRender(item)
                  }
                </td>
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
              {tableCellRender(item)}
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
            }
          </tbody>
        </table>
      </div>
    )
  }
}