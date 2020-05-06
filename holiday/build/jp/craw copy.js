const y = 1950;
const obj = {};
for (let m = 1; m <= 12; m++) {
  const M = (m < 10 ? '0' : '') + m;
  for (let d = 1; d <= 31; d++) {
    const D = (d < 10 ? '0' : '') + d;
    const v = `${y}-${M}-${D}`;
    let domTd = $('td.body-' + v);
    if (domTd.length) {
      domTd = domTd[0];
      let event = $('.show_holiday', domTd).html();
      event = typeof event === 'string' && event !== '' ? [event] : [];
      let gzDate = $('.show_eto', domTd).html();
      gzDate = typeof gzDate === 'string' ? gzDate : '';
      let liuYao = $('.show_rokuyou', domTd).html();
      liuYao = typeof liuYao === 'string' ? liuYao : '';
      obj[`D${M}${D}`] = {
        event,
        status: 0, // 0正常1放假2调休
        gzDate,
        liuYao,
      };
    }
  }
}
console.log(obj);
