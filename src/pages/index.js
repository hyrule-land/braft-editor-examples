import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import { Button } from 'antd';
import DiscountBlockComponent from './DiscountBlockComponent';

// 定义上文提到的 blockRenderFn  blockImportFn 
// 定义一个新的block类型：discount_coupon_render
const  blockRenderFn = (contentBlock, { editor, editorState }) => {
  if (contentBlock.getType() === 'atomic'  ) {
    const  entity = editorState.getCurrentContent().getEntity(contentBlock.getEntityAt(0))
    if(entity.getType() ===  "discount_coupon_render"){
      return {
        component: DiscountBlockComponent,
        editable: false, // editable并不代表组件内容实际可编辑，强烈建议设置为false
        props: { editor, editorState } // 传入的内容可以在组件中通过this.props.blockProps获取到
      }
    }
  }
}

// 自定义 html 转block的输入转换器，用于将符合规则的html内容转换成相应的block
const blockImportFn = (nodeName, node) => {
    
}

const discountBlockHtml = (address,text) => {
  return ` <div class="discount-coupon-element">
    <a href=${address} rel="noopener noreferrer" class="discount-coupon-container" target="_blank"
    >
      <div class="discount-coupon-item">
        ${text}
        <div class="discount-coupon-item-circle-second">
        </div>
      </div>
      <div class="discount-coupon-item-get">
        <p>点击</p>
        <p>领券</p>
      </div>
    </a>
  </div>`

}

const blockExportFn = (contentState, block) => {
  if (block.type === 'atomic') {
   let  ranges  = block.entityRanges.length  >  0 ? block.entityRanges[0] : -1;
   if(ranges  !== -1 ){
     let   entity = contentState.getEntity(contentState.getBlockForKey(block.key).getEntityAt(0))
     // console.log(contentState.getLastCreatedEntityKey())
     if(entity.getType() === "discount_coupon_render"){
       let  blockData = entity.getData()
       return  discountBlockHtml(blockData.discount_address,blockData.discount_text)
     }
   }
  }
  // 导入空格
  if(block.type === "unstyled" &&  !block.text.length){
    return `<p><br/></p>`
  }
  
}


export default class BasicDemo extends React.Component {

  state = {
    editorState:BraftEditor.createEditorState(null,
      { blockImportFn ,blockExportFn}),
    outputHTML: '<p></p>'
  }

  componentDidMount () {
    this.isLivinig = true
    // 3秒后更改编辑器内容
    // setTimeout(this.setEditorContentAsync, 3000)
  }

  componentWillUnmount () {
    this.isLivinig = false
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML()
    })
  }

  setEditorContentAsync = () => {
    this.isLivinig && this.setState({
      editorState: BraftEditor.createEditorState('<p>你好，<b>世界!</b><p>')
    })
  }

  test = () => {
    const { editorState } = this.state;
    debugger;

    let discount_text = "优惠券"
    let  link_address = "优惠券地址"
    this.setState({
      editorState: ContentUtils.insertAtomicBlock (editorState, 'discount_coupon_render', true, {
        discount_text: discount_text,
        discount_address: link_address
      })
    })
  }

  render () {

    const { editorState, outputHTML } = this.state

    return (
      <div>
        <Button onClick={this.test}>test</Button>
        <div className="editor-wrapper">
          <BraftEditor
            value={editorState}
            onChange={this.handleChange}

            blockRendererFn={blockRenderFn}
            converts={{ blockImportFn ,blockExportFn }}
            imageControls={['align-left','align-center','align-right','size','remove']}
            stripPastedStyles={false}
            lineHeights={[1.5, 1.75, 2, 2.5, 3, 4]}
          />
        </div>
        <h5>输出内容</h5>
        <div className="output-content">{outputHTML}</div>
      </div>
    )

  }

}