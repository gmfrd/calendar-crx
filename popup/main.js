var app = {
  // 当前显示的年月
  year: 0,
  month: 0,
  // 每周第一天周几
  firstDayOfWeek: 1,
  // 日历菜单dom
  domCalendarMenu: null,
  // 日历内容dom
  domCalendarList: null,
  // 当前日历数据
  calendarData: null,
  // 当前日历动画是否进行中
  calendarIsInAnimate: false,
  // 初始化
  init: function() {
    var now = lib.getNow();
    this.year = now.year;
    this.month = now.month;
    // dom
    this.domCalendarDate = $('#calendar-date');
    this.domCalendarMenu = $('#calendar-menu');
    this.domCalendarList = $('#calendar-list');
    this.domBtnPreMonth = $('#btn-pre-month');
    this.domBtnNextMonth = $('#btn-next-month');
    // 渲染日历星期菜单
    this.renderCalendarMenu();
    // 渲染日历内容
    this.renderCalendar();
    // 绑定日历上下月切换事件
    this.bindMonthChangeEvent();
  },
  // 渲染日历星期菜单
  renderCalendarMenu: function() {
    var week = this.firstDayOfWeek;
    var tpl = '';
    for (let i = 1; i <= 7; i++) {
      let classArr = ['item'];
      [0, 6].includes(week) && classArr.push('weekend');
      tpl += `<div class="${classArr.join(' ')}">`;
      tpl += `<div class="t1">${chrome.i18n.getMessage('week'+week)}</div>`;
      tpl += `</div>`;
      week = (week + 1) % 7;
    }
    this.domCalendarMenu.html(tpl);
  },
  // 渲染日历内容
  renderCalendar: function() {
    this.calendarIsInAnimate = false;
    this.calendarData = lib.getCalendar(this.year, this.month, this.firstDayOfWeek);
    let tpl = '';
    for (const v of this.calendarData.dayArr) {
      let classArr = ['item', 'seq' + v.seq];
      v.seq === 3 && classArr.push('now-month');
      v.isToday && classArr.push('today');
      [0, 6].includes(v.week) && classArr.push('weekend');
      tpl += `<div class="${classArr.join(' ')}">`;
      tpl += `<div class="t1">${v.day}</div>`;
      tpl += `<div class="t2">${chrome.i18n.getMessage('lDay27')}</div>`;
      if (v.day % 3 == 0) {
        // tpl += `<div class="t3">${chrome.i18n.getMessage('badageVacation')}</div>`;
        tpl += `<div class="t3"></div>`;
      }
      if (v.day % 3 == 1) {
        // tpl += `<div class="t3">${chrome.i18n.getMessage('badageVacation')}</div>`;
        tpl += `<div class="t4"></div>`;
      }
      if (v.day % 5 == 1) {
        // tpl += `<div class="t3">${chrome.i18n.getMessage('badageVacation')}</div>`;
        tpl += `<div class="t5"></div>`;
      }
      tpl += `</div>`;
    }
    this.domCalendarList.removeClass('animate');
    this.domCalendarList.html(tpl);
    this.domCalendarList.css('transform', '');
    this.domCalendarDate.html(`${this.calendarData.year}-${this.calendarData.month}`);
  },
  // 切换日历月份(上一月:-1,下一月:1)
  changeCalendarMonth: function(direction = 0) {
    if (this.calendarIsInAnimate) {
      this.domCalendarList.trigger('transitionend');
    } else {
      if (direction === -1) {
        this.calendarIsInAnimate = true;
        this.domCalendarList.addClass('animate');
        this.domCalendarList.css('transform', 'translate3d(0px, 0px, 0px)');
      } else if (direction === 1) {
        this.calendarIsInAnimate = true;
        this.domCalendarList.addClass('animate');
        this.domCalendarList.css('transform', `translate3d(0px, -${this.calendarData.z1Line * 40}px, 0px)`);
      }
    }
  },
  // 绑定日历上下月切换事件
  bindMonthChangeEvent: function() {
    var self = this;
    // 上月
    this.domBtnPreMonth.on('click', function() {
      const ym = lib.getRelativeMonth(self.year, self.month, -1);
      self.year = ym.year;
      self.month = ym.month;
      self.changeCalendarMonth(-1);
    });
    // 下月
    this.domBtnNextMonth.on('click', function() {
      const ym = lib.getRelativeMonth(self.year, self.month, 1);
      self.year = ym.year;
      self.month = ym.month;
      self.changeCalendarMonth(1);
    });
    self.domCalendarList.on('transitionend', function(e) {
      if (e.target === self.domCalendarList[0]) {
        console.log('1');
        self.renderCalendar();
      }
    });
  },
};
$(function() {
  app.init();
});
