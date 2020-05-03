
// 最小年限
const minYear = 1890;
// 1890-2100 年的农历数据
// [闰月所在月,0为没有闰月; 正月初一对应公历月; 正月初一对应公历日; 农历每月的天数的数组(需转换为二进制,得到每月大小，0=小月(29日),1=大月(30日))]
const lunarInfo = [[2, 1, 21, 22184], [0, 2, 9, 21936], [6, 1, 30, 9656], [0, 2, 17, 9584], [0, 2, 6, 21168], [5, 1, 26, 43344], [0, 2, 13, 59728], [0, 2, 2, 27296], [3, 1, 22, 44368], [0, 2, 10, 43856], [8, 1, 30, 19304], [0, 2, 19, 19168], [0, 2, 8, 42352], [5, 1, 29, 21096], [0, 2, 16, 53856], [0, 2, 4, 55632], [4, 1, 25, 27304], [0, 2, 13, 22176], [0, 2, 2, 39632], [2, 1, 22, 19176], [0, 2, 10, 19168], [6, 1, 30, 42200], [0, 2, 18, 42192], [0, 2, 6, 53840], [5, 1, 26, 54568], [0, 2, 14, 46400], [0, 2, 3, 54944], [2, 1, 23, 38608], [0, 2, 11, 38320], [7, 2, 1, 18872], [0, 2, 20, 18800], [0, 2, 8, 42160], [5, 1, 28, 45656], [0, 2, 16, 27216], [0, 2, 5, 27968], [4, 1, 24, 44456], [0, 2, 13, 11104], [0, 2, 2, 38256], [2, 1, 23, 18808], [0, 2, 10, 18800], [6, 1, 30, 25776], [0, 2, 17, 54432], [0, 2, 6, 59984], [5, 1, 26, 27976], [0, 2, 14, 23248], [0, 2, 4, 11104], [3, 1, 24, 37744], [0, 2, 11, 37600], [7, 1, 31, 51560], [0, 2, 19, 51536], [0, 2, 8, 54432], [6, 1, 27, 55888], [0, 2, 15, 46416], [0, 2, 5, 22176], [4, 1, 25, 43736], [0, 2, 13, 9680], [0, 2, 2, 37584], [2, 1, 22, 51544], [0, 2, 10, 43344], [7, 1, 29, 46248], [0, 2, 17, 27808], [0, 2, 6, 46416], [5, 1, 27, 21928], [0, 2, 14, 19872], [0, 2, 3, 42416], [3, 1, 24, 21176], [0, 2, 12, 21168], [8, 1, 31, 43344], [0, 2, 18, 59728], [0, 2, 8, 27296], [6, 1, 28, 44368], [0, 2, 15, 43856], [0, 2, 5, 19296], [4, 1, 25, 42352], [0, 2, 13, 42352], [0, 2, 2, 21088], [3, 1, 21, 59696], [0, 2, 9, 55632], [7, 1, 30, 23208], [0, 2, 17, 22176], [0, 2, 6, 38608], [5, 1, 27, 19176], [0, 2, 15, 19152], [0, 2, 3, 42192], [4, 1, 23, 53864], [0, 2, 11, 53840], [8, 1, 31, 54568], [0, 2, 18, 46400], [0, 2, 7, 46752], [6, 1, 28, 38608], [0, 2, 16, 38320], [0, 2, 5, 18864], [4, 1, 25, 42168], [0, 2, 13, 42160], [10, 2, 2, 45656], [0, 2, 20, 27216], [0, 2, 9, 27968], [6, 1, 29, 44448], [0, 2, 17, 43872], [0, 2, 6, 38256], [5, 1, 27, 18808], [0, 2, 15, 18800], [0, 2, 4, 25776], [3, 1, 23, 27216], [0, 2, 10, 59984], [8, 1, 31, 27432], [0, 2, 19, 23232], [0, 2, 7, 43872], [5, 1, 28, 37736], [0, 2, 16, 37600], [0, 2, 5, 51552], [4, 1, 24, 54440], [0, 2, 12, 54432], [0, 2, 1, 55888], [2, 1, 22, 23208], [0, 2, 9, 22176], [7, 1, 29, 43736], [0, 2, 18, 9680], [0, 2, 7, 37584], [5, 1, 26, 51544], [0, 2, 14, 43344], [0, 2, 3, 46240], [4, 1, 23, 46416], [0, 2, 10, 44368], [9, 1, 31, 21928], [0, 2, 19, 19360], [0, 2, 8, 42416], [6, 1, 28, 21176], [0, 2, 16, 21168], [0, 2, 5, 43312], [4, 1, 25, 29864], [0, 2, 12, 27296], [0, 2, 1, 44368], [2, 1, 22, 19880], [0, 2, 10, 19296], [6, 1, 29, 42352], [0, 2, 17, 42208], [0, 2, 6, 53856], [5, 1, 26, 59696], [0, 2, 13, 54576], [0, 2, 3, 23200], [3, 1, 23, 27472], [0, 2, 11, 38608], [11, 1, 31, 19176], [0, 2, 19, 19152], [0, 2, 8, 42192], [6, 1, 28, 53848], [0, 2, 15, 53840], [0, 2, 4, 54560], [5, 1, 24, 55968], [0, 2, 12, 46496], [0, 2, 1, 22224], [2, 1, 22, 19160], [0, 2, 10, 18864], [7, 1, 30, 42168], [0, 2, 17, 42160], [0, 2, 6, 43600], [5, 1, 26, 46376], [0, 2, 14, 27936], [0, 2, 2, 44448], [3, 1, 23, 21936], [0, 2, 11, 37744], [8, 2, 1, 18808], [0, 2, 19, 18800], [0, 2, 8, 25776], [6, 1, 28, 27216], [0, 2, 15, 59984], [0, 2, 4, 27424], [4, 1, 24, 43872], [0, 2, 12, 43744], [0, 2, 2, 37600], [3, 1, 21, 51568], [0, 2, 9, 51552], [7, 1, 29, 54440], [0, 2, 17, 54432], [0, 2, 5, 55888], [5, 1, 26, 23208], [0, 2, 14, 22176], [0, 2, 3, 42704], [4, 1, 23, 21224], [0, 2, 11, 21200], [8, 1, 31, 43352], [0, 2, 19, 43344], [0, 2, 7, 46240], [6, 1, 27, 46416], [0, 2, 15, 44368], [0, 2, 5, 21920], [4, 1, 24, 42448], [0, 2, 12, 42416], [0, 2, 2, 21168], [3, 1, 22, 43320], [0, 2, 9, 26928], [7, 1, 29, 29336], [0, 2, 17, 27296], [0, 2, 6, 44368], [5, 1, 26, 19880], [0, 2, 14, 19296], [0, 2, 3, 42352], [4, 1, 24, 21104], [0, 2, 10, 53856], [8, 1, 30, 59696], [0, 2, 18, 54560], [0, 2, 7, 55968], [6, 1, 27, 27472], [0, 2, 15, 22224], [0, 2, 5, 19168], [4, 1, 25, 42216], [0, 2, 12, 42192], [0, 2, 1, 53584], [2, 1, 21, 55592], [0, 2, 9, 54560]];
// 农历月名称
const enumLunarMonth = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
// 农历日名称
const enumLunarDate = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十', '卅一'];

/**
 * 获取农历年份一年的每月的天数及一年的总天数
 * @param {int} lunarYear 农历年
 * @return {object}
 */
export function getLunarYearDays(lunarYear) {
  const yearData = lunarInfo[lunarYear-minYear];
  const leapMonth = yearData[0]; // 闰月
  const monthData = yearData[3].toString(2);
  const monthDataArr = monthData.split('');

  // 还原数据至16位,少于16位的在前面插入0（二进制存储时前面的0被忽略）
  for (let i = 0; i < 16 - monthDataArr.length; i++) {
    monthDataArr.unshift(0);
  }

  const len = leapMonth ? 13 : 12; // 该年有几个月
  let yearDays = 0;
  const monthDays = [];
  for (let i=0; i<len; i++) {
    if (monthDataArr[i]==0) {
      yearDays += 29;
      monthDays.push(29);
    } else {
      yearDays += 30;
      monthDays.push(30);
    }
  }

  return {
    yearDays: yearDays,
    monthDays: monthDays,
  };
}

/**
 * 通过间隔天数查找农历日期
 * @param {int} lunarYear 农历年
 * @param {int} between 间隔天数
 * @return {array}
 */
export function getLunarDateByBetween(lunarYear, between) {
  const lunarYearDays = getLunarYearDays(lunarYear);
  const end = between>0 ? between : lunarYearDays.yearDays - Math.abs(between);
  const monthDays = lunarYearDays.monthDays;
  let tempDays = 0;
  let month = 0;
  for (let i=0; i<monthDays.length; i++) {
    tempDays += monthDays[i];
    if (tempDays > end) {
      month = i;
      tempDays = tempDays-monthDays[i];
      break;
    }
  }
  return [lunarYear, month, end - tempDays + 1];
}

/**
 * 根据距离正月初一的天数计算农历日期
 * @param {int} year 公历年
 * @param {int} month 公历月(0开始)
 * @param {int} day 公历日
 * @return {array}
 */
export function getLunarByBetween(year, month, day) {
  const yearData = lunarInfo[year - minYear];
  const zenMonth = yearData[1];
  const zenDay = yearData[2];
  const between = (new Date(year, month, day).getTime() - new Date(year, zenMonth - 1, zenDay).getTime()) / 86400000;
  if (between == 0) {
    // 正月初一
    return [year, 0, 1];
  } else {
    const lunarYear = between>0 ? year : year - 1;
    return getLunarDateByBetween(lunarYear, between);
  }
}

/**
 * 计算农历日期离正月初一有多少天
 * @param {int} lunarYear 农历年
 * @param {int} lunarMonth 农历月(0-12,有闰月)
 * @param {int} lunarDay 农历日
 * @return {int} 天数
 */
export function getDaysBetweenZheng(lunarYear, lunarMonth, lunarDay) {
  const lunarYearDays = getLunarYearDays(lulunarMonthnarYear);
  const monthDays = lunarYearDays.monthDays;
  let days = 0;
  for (let i=0; i < monthDays.length; i++) {
    if (i < lunarMonth) {
      days += monthDays[i];
    } else {
      break;
    }
  }
  return days + lunarDay - 1;
}

/**
 * 获取农历年闰月所在月
 * @param {int} lunarYear 农历年
 * @return {string} 闰月所在月
 */
export function getLeapMonth(lunarYear) {
  return lunarInfo[lunarYear - minYear][0];
}

/**
 * 公历转农历
 * @param {int} year 公历年
 * @param {int} month 公历月
 * @param {int} day 公历日
 * @return {object} 农历信息
 */
export function solarToLunar(year, month, day) {
  month = month - 1;

  // 农历日期
  const lunarDate = getLunarByBetween(year, month, day);
  // 几月是闰月
  const lunarLeapMonth = getLeapMonth(lunarDate[0]);
  // 农历月名字
  let lunarMonthName = '';
  if (lunarLeapMonth > 0 && lunarDate[1] == lunarLeapMonth) {
    lunarMonthName = '闰' + enumLunarMonth[lunarDate[1] - 1] + '月';
  } else if (lunarLeapMonth > 0 && lunarDate[1] > lunarLeapMonth) {
    lunarMonthName = enumLunarMonth[lunarDate[1] - 1] + '月';
  } else {
    lunarMonthName = enumLunarMonth[lunarDate[1]]+'月';
  }
  return {
    // 农历年
    lunarYear: lunarDate[0],
    // 农历月
    lunarMonth: lunarDate[1] + 1,
    // 农历日
    lunarDay: lunarDate[2],
    // 农历月名字
    lunarMonthName: lunarMonthName,
    // 农历日名字
    lunarDayName: enumLunarDate[lunarDate[2] - 1],
    // 润几月
    lunarLeapMonth: lunarLeapMonth,
  };
}
