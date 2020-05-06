import fs from 'fs';
import Yaml from 'yaml';
import request from 'request';
import cheerio from 'cheerio';

// 获取美国节日(https://www.calendar-365.com/holidays/2050.html)
async function getCNAll() {
  for (let y = 1950; y <= 2100; y++) {
    console.log(y);
    const obj = {};
    const url = 'https://www.calendar-365.com/holidays/' + y + '.html';
    const res = await getData(url);
    if (res === false) {
      console.log({y});
      break;
    }
    const $ = cheerio.load(res.body);
    for (let i = 0; i < $('tbody tr').length; i++) {
      const tr = $('tbody tr').eq(i);
      const d1 = new Date(tr.find('.dtr').html());
      let M = d1.getMonth() + 1;
      M = (M < 10 ? '0' : '') + M;
      let D = d1.getDate();
      D = (D < 10 ? '0' : '') + D;
      let event = tr.find('.link_arrow').html();
      event = event.replace('&apos;', '\'').trim();
      const k = `D${M}${D}`;
      if (obj[k]) {
        obj[k].event.push(event);
      } else {
        obj[k] = {
          event: [event], // 事件
          status: 0, // 0正常1放假2调休
        };
      }
    }
    fs.writeFileSync('./holiday/src/US_'+y+'.yaml', Yaml.stringify(obj));
  }
}
async function getData(url) {
  return new Promise((resolve) => {
    request(url, function(err, decodedBody) {
      if (err) {
        resolve(false);
      } else {
        resolve(decodedBody);
      }
    });
  });
}

getCNAll();
