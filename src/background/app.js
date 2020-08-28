import * as calendar from '../lib/calendar';

// 设置图表
setInterval(function() {
  // 今天日期
  const today = calendar.getToday();

  // 报时
  if (today.i === 59 && today.s >= 40) {
    chrome.browserAction.setIcon({
      path: {'32': '../icon/alert.png'},
    });
    chrome.browserAction.setBadgeText({text: today.S});
  } else if (today.i === 0 && today.s <= 20) {
    chrome.browserAction.setIcon({
      path: {'32': '../icon/alert.png'},
    });
    chrome.browserAction.setBadgeText({text: today.H + ':00'});
  } else {
    chrome.browserAction.setIcon({
      path: {'32': '../icon/cal_' + today.d + '.png'},
    });
    chrome.browserAction.setBadgeText({text: ''});
  }
}, 1000);

console.log('12313');
