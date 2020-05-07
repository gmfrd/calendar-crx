import * as Term from './term';

// 天干
const enumGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
// 地支
const enumZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
// 对应地支十二生肖
const enumAnimal = {
  cn: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
  tw: ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'],
};

/**
 * 获取公历所在的干支年月
 * @param {int} year 公历年
 * @param {int} month 年历月
 * @param {int} day 年历日
 * @return {object}
 */
export function getGzYearMonth(year, month, day) {
  month = month - 1;
  // 立春是几号
  const term2 = Term.getTerm(year, 2);
  // 某月第一个节气开始日期
  const firstTerm = Term.getTerm(year, month * 2);
  // 干支所在年份
  const gzYear = (month > 1 || month == 1 && day >= term2) ? year+1 : year;
  // 干支所在月份（以节气为界）
  const gzMonth = day >= firstTerm ? month+1 : month;
  return {gzYear, gzMonth};
}

/**
 * 计算天干地支
 * @param {int} num 60进制中的位置(把60个天干地支，当成一个60进制的数)
 * @return {string}
 */
export function cyclical(num) {
  return enumGan[num%10] + enumZhi[num%12];
}

/**
 * 获取干支纪年
 * @param {int} gzYear 干支所在年
 * @param {int} offset 偏移量，默认为0，便于查询一个年跨两个干支纪年（以立春为分界线）
 * @return {string}
 */
export function getGzYearName(gzYear, offset) {
  offset = offset || 0;
  // 1890年1月小寒（小寒一般是1月5或6日）以前为己丑年，在60进制中排25
  return cyclical(gzYear - 1890 + 25 + offset);
}

/**
 * 获取干支纪月
 * @param {int} year 公历年
 * @param {int} gzMonth 干支所在月
 * @param {int} offset 偏移量，默认为0，便于查询一个月跨两个干支纪月（有立春的2月）
 * @return {string}
 */
export function getGzMonthName(year, gzMonth, offset) {
  offset = offset || 0;
  // 1890年1月小寒以前为丙子月，在60进制中排12
  return cyclical((year-1890)*12+gzMonth+12+offset);
}

/**
 * 获取干支纪日
 * @param {int} year 公历年
 * @param {int} month 公历月
 * @param {int} day 公历日
 * @return {string}
 */
export function getGzDayName(year, month, day) {
  // 当日与1890/1/1 相差天数
  // 1890/1/1与 1970/1/1 相差29219日, 1890/1/1 日柱为壬午日(60进制18)
  const dayCyclical = Date.UTC(year, month, day)/86400000+29219+18;
  return cyclical(dayCyclical);
};

/**
 * 获取干支年生肖
 * @param {int} gzYear 干支所在年(默认以立春前的公历年作为基数)
 * @param {string} lang 语言
 * @return {int}
*/
export function getAnimal(gzYear, lang = 'cn') {
  const num = gzYear - 1890 + 25;
  return enumAnimal[lang][num%12];
}

/**
 * 获取公历某天干支,生肖
 * @param {int} year 公历年
 * @param {int} month 公历月
 * @param {int} day 公历日
 * @param {string} lang 语言(en,cn,tw,jp)
 * @return {object}
 */
export function getDay(year, month, day, lang = 'cn') {
  // 干支年月
  const {gzYear, gzMonth} = getGzYearMonth(year, month, day);
  return {
    // 干支年名称
    gzYearName: getGzYearName(gzYear),
    // 干支月名称
    gzMonthName: getGzMonthName(year, gzMonth),
    // 干支日名称
    gzDayName: getGzDayName(year, month, day),
    // 生肖
    animal: getAnimal(gzYear, lang),
  };
}

