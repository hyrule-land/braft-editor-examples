const tableData1 = [
  [{
    data: '坪山区',
    isHeader: true,
    tdExtarAttributes: {
      rowSpan: 2
    }
  }, '大鹏区', '罗湖区', '光明新区', '南山区', '龙华区', '盐田区', '宝安区', '龙岗区', '福田区'],
  ['aaaaa', {
    data: 'aaaaffffff',
    isHeader: true,
    // 允许自定义 td 的属性
    tdExtarAttributes: {
      colSpan: 2,
      style: {
        background: 'cyan',
        textAlign: 'left'
      },
    },
    // 允许通过传入 tdRender 属性，来自定义单元格的内容
    tdRender: (data) => {
      debugger;
      return (
        <button>{data + 122333}</button>
      )
    }
  }, 'ejeajfaf', 'poijjkk', 'kkkkkk', 'dddddddaa', 'ooekfkkam', 'dpljjjjj']
]

export { tableData1 }

export default [
  ['坪山区', '大鹏区', '罗湖区', '光明新区', '南山区', '龙华区', '盐田区', '宝安区', '龙岗区', '福田区'],
  ['aaaaa', 'badjjjj', 'ejeajfaf', 'poijjkk', 'kkkkkk', 'dddddddaa', 'ooekfkkam', 'dpljjjjj', 'wwwwwwwwww', 'kkkkkkkk']
]