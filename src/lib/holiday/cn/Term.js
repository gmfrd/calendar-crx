// 二十四节气(太阳历)
const enumTerm = ['小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至'];

/**
 * 二十四节气数据
 * 节气点时间（单位是分钟）(从0小寒起算)
 */
const termInfo = [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758];

/**
 * 获取公历年的第n个节气为阳历几号
 * 31556925974.7为地球公转周期，是毫秒
 * 1890年的正小寒点：01-05 16:02:31，1890年为基准点
 * 由于农历24节气交节时刻采用近似算法，可能存在少量误差(30分钟内)
 * @param {int} year 公历年
 * @param {int} nth 第几个节气，从0小寒起算
 * @return {int} 阳历几号
 */
export function getTerm(year, nth) {
  const offDate = new Date((31556925974.7*(year-1890) + termInfo[nth]*60000) + Date.UTC(1890, 0, 5, 16, 2, 31));
  return offDate.getUTCDate();
}

/**
 * 获取公历年一年的二十四节气
 * @param {int} year 公历年
 * @return {array}
 */
export function getYearTerm(year) {
  const list = [];
  let month = 0;
  for (let i=0; i < 24; i++) {
    const day = getTerm(year, i);
    if (i%2==0) month++;
    list.push({
      ds: `${year}${(month < 10 ? '0' : '') + month}${(day < 10 ? '0' : '') + day}`,
      ho: enumTerm[i],
    });
  }
  return list;
}
