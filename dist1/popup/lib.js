var lib = {
  // 获取当前时间
  getNow: function () {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
    }
  },
  // 获取相对年份月份
  getRelativeMonth: function (year, month, diffMonth) {
    let m1 = year * 12 + month + diffMonth;
    let d1 = parseInt(m1 / 12) - (m1 < 0 ? 1 : 0);
    let d2 = m1 % 12;
    let m = d2 > 0 ? d2 : 12 + d2;
    let y = m < 12 ? d1 : d1 - 1;
    return { year: y, month: m }
  },
  // 获取某天是周几
  getWeek: function (year, month, day) {
    const diffDay = (Date.UTC(year, month - 1, day) / 86400000);
    let week = (4 + diffDay) % 7;
    return week >= 0 ? week : week + 4 + 7;
  },
  // 获取某个月几天(周天0)
  getMonthDayNum: function (year, month) {
    return (Date.UTC(year, month, 1) - Date.UTC(year, month - 1, 1)) / 86400000;
  },
  // 获取日历数组
  getCalendar: function (year, month, firstDayOfWeek = 1) {
    // 今天
    const now = this.getNow();
    const curDayStamp = new Date(new Date().toLocaleDateString()).getTime();
    // 每个月的信息
    const f2YearMonth = this.getRelativeMonth(year, month, -2);
    const f2DayNum = this.getMonthDayNum(f2YearMonth.year, f2YearMonth.month);
    const f1YearMonth = this.getRelativeMonth(year, month, -1);
    const f1DayNum = this.getMonthDayNum(f1YearMonth.year, f1YearMonth.month);
    const z0DayNum = this.getMonthDayNum(year, month);
    const z0Week = this.getWeek(year, month, 1);
    const z1YearMonth = this.getRelativeMonth(year, month, 1);
    const z1DayNum = this.getMonthDayNum(z1YearMonth.year, z1YearMonth.month);
    const z2YearMonth = this.getRelativeMonth(year, month, 2);
    // 计算f2起始日期与z2结束日期
    let z0DiffWeek = (z0Week - firstDayOfWeek + 7) % 7;
    let f2StartDay = f2DayNum - (42 + z0DiffWeek - f1DayNum) + 1;
    let z2EndDay = 84 - z0DiffWeek - z0DayNum - z1DayNum;
    // 计算z1起始行距离顶部层数
    let z1Line = 6 + Math.ceil((z0DiffWeek + z0DayNum + 1) / 7) - 2;

    // 日期数组
    const dayArr = [];
    let varWeek = firstDayOfWeek;
    // 负2月
    for (let i = f2StartDay; i <= f2DayNum; i++) {
      const isToday = now.year === f2YearMonth.year && now.month === f2YearMonth.month  && now.day === i;
      dayArr.push({ seq: 1, isToday, year: f2YearMonth.year, month: f2YearMonth.month, day: i, week: varWeek });
      varWeek = (varWeek + 1) % 7;
    }
    // 负1月
    for (let i = 1; i <= f1DayNum; i++) {
      const isToday = now.year === f1YearMonth.year && now.month === f1YearMonth.month  && now.day === i;
      dayArr.push({ seq: 2, isToday, year: f1YearMonth.year, month: f1YearMonth.month, day: i, week: varWeek });
      varWeek = (varWeek + 1) % 7;
    }
    // 当月
    for (let i = 1; i <= z0DayNum; i++) {
      const isToday = now.year === year && now.month === month  && now.day === i;
      dayArr.push({ seq: 3, isToday, year, month, day: i, week: varWeek });
      varWeek = (varWeek + 1) % 7;
    }
    // 正1月
    for (let i = 1; i <= z1DayNum; i++) {
      const isToday = now.year === z1YearMonth.year && now.month === z1YearMonth.month  && now.day === i;
      dayArr.push({ seq: 4, isToday, year: z1YearMonth.year, month: z1YearMonth.month, day: i, week: varWeek });
      varWeek = (varWeek + 1) % 7;
    }
    // 正2月
    for (let i = 1; i <= z2EndDay; i++) {
      const isToday = now.year === z2YearMonth.year && now.month === z2YearMonth.month  && now.day === i;
      dayArr.push({ seq: 5, isToday, year: z2YearMonth.year, month: z2YearMonth.month, day: i, week: varWeek });
      varWeek = (varWeek + 1) % 7;
    }
    return { year, month, dayArr, z1Line }
  }
};