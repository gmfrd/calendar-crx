// import * as calendar from '../lib/calendar';

// // 设置图表
// setInterval(function() {
//   // 今天日期
//   const today = calendar.getToday();

//   // 报时
//   if (today.i === 59 && today.s >= 40) {
//     chrome.action.setIcon({
//       path: {'32': '../icon/alert.png'},
//     });
//     chrome.action.setBadgeText({text: today.S});
//   } else if (today.i === 0 && today.s <= 20) {
//     chrome.action.setIcon({
//       path: {'32': '../icon/alert.png'},
//     });
//     chrome.action.setBadgeText({text: today.H + ':00'});
//   } else {
//     chrome.action.setIcon({
//       path: {'32': '../icon/cal_' + today.d + '.png'},
//     });
//     chrome.action.setBadgeText({text: ''});
//   }
// }, 1000);
