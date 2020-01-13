
const tableData1 = [
  ['坪山区', '大鹏区', '罗湖区', '光明新区', '南山区', '龙华区', '盐田区', '宝安区', '龙岗区', '福田区'],
  ['aaaaa', '123456', 'ejeajfaf', 'poijjkk', 'kkkkkk', 'dddddddaa', 'ooekfkkam', 'dpljjjjj', 789, 555555]
]

const tableData2 = [
  ['坪山区', 122333],
  ['大鹏区', 122333],
  ['罗湖区', 122333],
  ['光明新区', 122333],
  ['南山区', 122333],
  ['龙华区', 122333],
  ['盐田区', 122333],
  ['宝安区', 122333],
  ['龙岗区', 122333],
  ['福田区', 122333],
]

const tableData3 = [
  [
    { data: '坪山区', isHeader: true },
    { data: '罗湖区', isHeader: true },
    { data: '光明新区', isHeader: true },
    { data: '南山区', isHeader: true },
    { data: '龙华区', isHeader: true },
    { data: '盐田区', isHeader: true },
    { data: '宝安区', isHeader: true },
    { data: '龙岗区', isHeader: true },
    { data: '福田区', isHeader: true }
  ],
  ['aaaaa', '123456', 'ejeajfaf', 'poijjkk', 'kkkkkk', 'dddddddaa', 'ooekfkkam', 'dpljjjjj', 789]
]

const tableData4 = [
  [{
    data: '坪山区',
    isHeader: true,
    tdExtarAttrs: {
      rowSpan: 2
    }
  }, '大鹏区', '罗湖区', '光明新区', '南山区', '龙华区', '盐田区', '宝安区', '龙岗区', '福田区'],
  ['aaaaa', {
    data: 'aaaaffffff',
    isHeader: true,
    // 允许自定义 td 的属性
    tdExtarAttrs: {
      colSpan: 2,
      style: {
        background: 'cyan',
        textAlign: 'left'
      },
    },
    // 允许通过传入 tdRender 属性，来自定义单元格的内容
    tdRender: (data) => {
      return (
        <button>{data + 122333}</button>
      )
    }
  }, 'ejeajfaf', 'poijjkk', 'kkkkkk', 'dddddddaa', 'ooekfkkam', 'dpljjjjj']
]

export { tableData1, tableData2, tableData3, tableData4 }

export default [
  ['坪山区', '大鹏区', '罗湖区', '光明新区', '南山区', '龙华区', '盐田区', '宝安区', '龙岗区', '福田区'],
  ['aaaaa', 'badjjjj', 'ejeajfaf', 'poijjkk', 'kkkkkk', 'dddddddaa', 'ooekfkkam', 'dpljjjjj', 'wwwwwwwwww', 'kkkkkkkk']
]