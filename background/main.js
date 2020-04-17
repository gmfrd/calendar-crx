chrome.browserAction.setBadgeText({text: new Date().getSeconds().toString()});
chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 1]});
chrome.browserAction.setTitle({title: 'this is title'});
console.log(chrome.browserAction.setIcon({
  path: {'32': './../icons/weather-pouring.png'}
}));
