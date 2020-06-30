// 获取当前时间
export function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const week = now.getDay();
  return getDay(year, month, day, week);
}

// 获取相对年份月份
export function getRelativeMonth(year, month, diffMonth) {
  const m1 = year * 12 + month + diffMonth;
  const d1 = parseInt(m1 / 12) - (m1 < 0 ? 1 : 0);
  const d2 = m1 % 12;
  const m = d2 > 0 ? d2 : 12 + d2;
  const y = m < 12 ? d1 : d1 - 1;
  return {year: y, month: m};
}

// 获取某天是周几(0-6)
export function getWeek(year, month, day) {
  const diffDay = (Date.UTC(year, month - 1, day) / 86400000);
  const week = (4 + diffDay) % 7;
  return week >= 0 ? week : week + 4 + 7;
}

// 获取某个月几天(周天0)
export function getMonthDayNum(year, month) {
  return (Date.UTC(year, month, 1) - Date.UTC(year, month - 1, 1)) / 86400000;
}

// 获取日历数组
export function getCalendar(year, month, firstDayOfWeek = 1) {
  // 每个月的信息
  const m1YearMonth = getRelativeMonth(year, month, -1);
  const m1DayNum = getMonthDayNum(m1YearMonth.year, m1YearMonth.month);
  const m2DayNum = getMonthDayNum(year, month);
  const m2Week = getWeek(year, month, 1);
  const m3YearMonth = getRelativeMonth(year, month, 1);
  // 当月第一天距离该周起始的天数
  const m2WeekDiff = (m2Week - firstDayOfWeek + 7) % 7;
  // 日期数组
  const dayArr = [];
  let varWeek = firstDayOfWeek;
  // 上一月
  for (let i = m1DayNum - m2WeekDiff + 1; i <= m1DayNum; i++) {
    dayArr.push(getDay(m1YearMonth.year, m1YearMonth.month, i, varWeek));
    varWeek = (varWeek + 1) % 7;
  }
  // 当月
  for (let i = 1; i <= m2DayNum; i++) {
    dayArr.push(getDay(year, month, i, varWeek));
    varWeek = (varWeek + 1) % 7;
  }
  // 下一月
  for (let i = 1; i <= 7*6 - m2WeekDiff - m2DayNum; i++) {
    dayArr.push(getDay(m3YearMonth.year, m3YearMonth.month, i, varWeek));
    varWeek = (varWeek + 1) % 7;
  }
  // 星期菜单
  const weekArr = [];
  varWeek = firstDayOfWeek;
  for (let i = 1; i <= 7; i++) {
    weekArr.push(varWeek);
    varWeek = (varWeek + 1) % 7;
  }
  return {year, month, dayArr, weekArr};
}

// 获取某天的信息
export function getDay(Y, m, d, w) {
  const M = (m < 10 ? '0' : '') + m;
  const D = (d < 10 ? '0' : '') + d;
  const v = `${Y}${M}${D}`;
  return {
    Y, // 年
    m, // 月
    d, // 日
    w, // 周(0-6)
    M, // 月(带0)
    D, // 日(带0)
    v, // 年月日
  };
}

// 获取多语言.年
export function getLangYear(region) {
  const arr = {
    'default': '',
    'cn': '年',
    'tw': '年',
    'hk': '年',
    'mo': '年',
    'jp': '年',
    'us': '',
  };
  return region in arr ? arr[region] : arr['default'];
}

// 获取多语言.月枚举
export function getLangEnumMonth(region) {
  const arr = {
    'default': ['', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    'cn': ['', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    'tw': ['', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    'hk': ['', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    'mo': ['', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    'jp': ['', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    'us': ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  };
  return region in arr ? arr[region] : arr['default'];
}

// 获取多语言.周枚举
export function getLangEnumWeek(region) {
  const arr = {
    'default': ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    'cn': ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    'tw': ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
    'hk': ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
    'mo': ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
    'jp': ['日', '月', '火', '水', '木', '金', '土'],
    'us': ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
  };
  return region in arr ? arr[region] : arr['default'];
}

// 获取多语言.年
export function getLangJiaBan(region) {
  const arr = {
    'default': ['假', '班', '公'],
    'cn': ['假', '班', '公'],
    'tw': ['假', '班', '公'],
    'hk': ['假', '班', '公'],
    'mo': ['假', '班', '公'],
    'jp': ['休', '', ''],
    'us': ['', ''],
  };
  return region in arr ? arr[region] : arr['default'];
}
