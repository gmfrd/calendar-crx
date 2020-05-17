export default {
  // 获取语言项
  t: function(id) {
    if (window.chrome && window.chrome.i18n) {
      return window.chrome.i18n.getMessage(id);
    } else {
      return id;
    }
  },
};
