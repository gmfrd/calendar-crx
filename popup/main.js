var app = {
  // 当前显示的年份与月份
  year: 0,
  month: 0,
  // 每周开始第一天
  firstDayOfWeek: 1,
  // 初始化
  init: function() {
    var now = lib.getNow();
    this.year = now.year;
    this.month = now.month;
    // 渲染日期头
    this.renderMeta();
  },
  // 渲染日期头
  renderMeta: function() {
    var week = this.firstDayOfWeek;
    var html = '';
    for (let i = 1; i <= 7; i++) {
      // chrome.i18n.getMessage("helloWorld")
      html += `<div class="item">${week5Name week}</div>`;
      week = (week + 1) % 7;
    }
    $('#dom-meta').html(html);
  },
};
$(function() {
  app.init();
});

/*
$(function() {
  const domList = $('#dom-list');

  const now = lib.getNow();
  let year = now.year;
  let month = now.month;
  let firstDayOfWeek = 1;

  domList.on('transitionend', function() {
    console.log('end');
    render(year, month, firstDayOfWeek);
  });
  // 重新渲染
  function render(year, month, firstDayOfWeek = 1) {
    const data = lib.getCalendar(year, month, firstDayOfWeek);
    domList.data('z1Line', data.z1Line);
    const dayArr = data.dayArr;
    let tpl = '';
    for (const v of dayArr) {
      // tpl += `<div class="item ${v.isNowMonth ? 'now-month' : ''} ${v.isCurDay ? 'cur-day' : ''}">${v.month}-${v.day}</div>`;
      tpl += `<div class="item seq${v.seq} ${v.seq === 3 ? 'now-month' : ''} ${v.isCurDay ? 'cur-day' : ''}">${v.month}</div>`;
    }
    domList.removeClass('animate');
    domList.html(tpl);
    domList.css('transform', '');
  }

  function renderView(year, month, firstDayOfWeek = 1, direction = 0) {
    if (direction === -1) {
      domList.addClass('animate');
      domList.css('transform', 'translate3d(0px, 0px, 0px)');
      domList.find('.seq3').removeClass('now-month');
      domList.find('.seq2').addClass('now-month');
    } else if (direction === 1) {
      domList.addClass('animate');
      domList.css('transform', `translate3d(0px, -${domList.data('z1Line') * 40}px, 0px)`);
      domList.find('.seq3').removeClass('now-month');
      domList.find('.seq4').addClass('now-month');
    } else if (direction === 0) {
      render(year, month, firstDayOfWeek);
    }
  }

  renderView(year, month, firstDayOfWeek, 0);

  $(function() {
    $('#dom-btn-pre').on('click', function() {
      const u = lib.getRelativeMonth(year, month, -1);
      year = u.year;
      month = u.month;
      renderView(year, month, firstDayOfWeek, -1);
    });
    $('#dom-btn-next').on('click', function() {
      const u = lib.getRelativeMonth(year, month, 1);
      year = u.year;
      month = u.month;
      renderView(year, month, firstDayOfWeek, 1);
    });
  });
});
*/