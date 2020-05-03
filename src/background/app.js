import * as calendar from '..//lib/calendar';

// 今天日期
const today = calendar.getToday();

// 设置图表
chrome.browserAction.setIcon({
  path: {'32': '../icon/cal_' + today.D + '.png'},
});
