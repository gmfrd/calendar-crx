/**
 * 获取六曜
 * @param {int} lunarMonth 农历月
 * @param {int} lunarDay 农历日
 * @return {string} 六曜
 */
export function getDay(lunarMonth, lunarDay) {
  const arr = ['大安', '赤口', '先勝', '友引', '先負', '仏滅'];
  return arr[(lunarMonth + lunarDay) % 6];
}
