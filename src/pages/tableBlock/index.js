import React, { Component } from 'react';
import { ContentUtils } from 'braft-utils';
import classNames from 'classnames';
import { Button } from 'antd';
import shortid from 'shortid';
import _get from 'lodash/get';
import './index.less';

const BLOCK_TYPE = 'braft_table_block';

// 判断数据类型
function getType (obj) {
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
}

const tableBlockImportFn = (nodeName, node) => {
  if (nodeName === 'div' && node.classList.contains('braft_table_block_container')) {
    let blockData = JSON.parse(node.dataset.blockData)

    // 不知道在哪个地方的问题导致对象嵌套了一层，原因不好找，暂时这样子处理
    if (blockData.blockData) {
      blockData = blockData.blockData;
    }

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
    let blockData = block.data;

    // 不知道在哪个地方的问题导致对象嵌套了一层，原因不好找，暂时这样子处理
    if (blockData.blockData) {
      blockData = blockData.blockData;
    }
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

        // 不知道在哪个地方的问题导致对象嵌套了一层，原因不好找，暂时这样子处理
        if (blockData.blockData) {
          blockData = blockData.blockData;
        }

        // 也可以提供一个接口来单独保存blockData
        return (
          <div className="braft_table_block_container" data-block-data={JSON.stringify(blockData)}></div>
        )
      }
    }
   }
}

export { BLOCK_TYPE, tableBlockImportFn, tableBlockExportFn };

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
    const { removeButtonVisible } = this.state;
    const thisProps = this.props;

    let blockData = null;

    if (_get(thisProps, 'block.getData')) {
      blockData = this.props.block.getData().get('blockData');
    }

    const entity = _get(thisProps, 'block.getEntityAt') && this.props.block.getEntityAt(0)
    if (this.props.contentState && entity) {
      blockData = this.props.contentState.getEntity(this.props.block.getEntityAt(0)).getData()
    }

    // 入参的类型判断，blockData 必须要是个二维数组
    // if (blockData !== null) {
    //   // debugger;
    //   if (getType(blockData) !== 'Object') {
    //     throw new Error ('blockData should be an object')
    //   }

    //   const { tableData } = blockData;

    //   if (!tableData) {
    //     throw new Error ('property "tableData" is required!');
    //   }
    //   if (getType(tableData) !== 'Array') {
    //     throw new Error ('property "tableData" should be an array');
    //   }
    //   tableData.forEach(item => {
    //     if (getType(item) !== 'Array') {
    //       throw new Error ('children of "tableData" should be an array');
    //     }
    //   })
    // }

    // 允许自定义单元格的内容，通过传入 tdRender 属性就行
    const tdRender = (item) => {
      if (item.tdRender) {
        return item.tdRender(item.data)
      }
      return item.data
    }

    const tableCellRender = (data) => {
      if (getType(blockData.tableData) === 'Array') {
        return data.map((item, index) => {
          if (getType(item) === 'Object') {
  
            if (item.data) {
              return (
                <td
                  key={shortid.generate()}
                  className={classNames({
                    'header': item.isHeader,
                  })} {...item.tdExtarAttrs} style={{
                    ...item.style
                  }}>
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
      } else {
        return null
      }      
    }

    const trRender = (tableData) => {
      return tableData.map((item, index) => {
        return (
          <tr key={shortid.generate()}>
            {tableCellRender(item)}
          </tr>
        )
      })
    }

    const tableRender = () => {
      if (blockData !== null && blockData.hasOwnProperty('tableData') && getType(blockData.tableData) === 'Array') {
        const { tableSize, containerExtarAttrs, tableExtarAttrs, tableData, tableStyle, containerStyle } = blockData;

        let tableSizeClassName = 'size_default'
        if (tableSize) {
          if (tableSize === 'default') {
            tableSizeClassName = 'size_default';
          }
          if (tableSize === 'middle') {
            tableSizeClassName = 'size_middle';
          }
          if (tableSize === 'small') {
            tableSizeClassName = 'size_small';
          }
        }

        return (
          <div
            className="braft_table_block_container"
            onMouseLeave={() =>this.onTableMouseLeave()}
            onMouseEnter={() =>this.onTableMouseEnter()}
            {...containerExtarAttrs}
            style={{
              ...containerStyle
            }}
          >
            <div className="removeButtonWrapper">
              <Button size="small" onClick={this.removeBlock} className="removeButton" style={{
                display: removeButtonVisible ? 'block' : 'none'
              }}>
                删除
              </Button>
            </div>        
            
            <table
              {...tableExtarAttrs}
              className={classNames({
                [tableSizeClassName]: true,
              })}
              style={{
                ...tableStyle
              }}
            >
              <tbody>
                {
                  trRender(tableData)
                }
              </tbody>
            </table>
          </div>
        )
      }
      return null
    }

    return tableRender()
  }
}