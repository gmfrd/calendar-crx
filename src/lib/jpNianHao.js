/**
 * 获取日本年号
 * @param {int} Y 公历年
 * @return {string} 年号
 */
export function getYear(Y) {
  const daiArr = [
    {start: 1926, name: '昭和'},
    {start: 1989, name: '平成'},
    {start: 2019, name: '令和'},
  ];
  let d1 = null;
  for (const dai of daiArr) {
    if (Y >= dai.start) {
      d1 = dai;
    }
  }
  if (d1 === null) {
    return '';
  }
  const diff = Y - d1.start + 1;
  return d1.name + (diff === 1 ? '元' : diff) + '年';
}
