import React, { Component } from 'react';
import { ContentUtils } from 'braft-utils';
import styles from './DiscountBlockComponent.less'

export default class DiscountBlockComponent extends Component {
  constructor(props) {
    super(props);
    this.state={
      showDelButton: false
    }
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
    const  blockData  = this.props.contentState.getEntity(this.props.block.getEntityAt(0)).getData()
    // console.log("blockData",blockData )
    return (
      <span>###jfkakfaoafjfj###</span>
    )
  }
}