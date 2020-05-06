import fs from 'fs';
import Yaml from 'yaml';
import request from 'request';
import cheerio from 'cheerio';

// 获取日本节日(https://uic.jp/calendar/1950/)
// 参考：日本年号 http://www.benri.com/calendar/2050.html
// 参考：日本的日历pdt https://happylilac.net/yw1605261802.html
// 参考：2019年台日休假行事曆大統整 https://www.letsgojp.com/archives/344109/
async function getCNAll() {
  for (let y = 1950; y <= 2100; y++) {
    console.log(y);
    const obj = {};
    const url = 'https://uic.jp/calendar/'+y+'/';
    const res = await getData(url);
    if (res === false) {
      console.log({y});
      break;
    }
    const $ = cheerio.load(res.body);
    // 解析
    for (let m = 1; m <= 12; m++) {
      const M = (m < 10 ? '0' : '') + m;
      for (let d = 1; d <= 31; d++) {
        const D = (d < 10 ? '0' : '') + d;
        const v = `${y}-${M}-${D}`;
        let domTd = $('.body-' + v);
        if (domTd.length) {
          domTd = domTd[0];
          let event = $('.show_holiday', domTd).html();
          event = typeof event === 'string' && event !== '' ? [entityToString(event)] : [];
          let gzDate = $('.show_eto', domTd).html();
          gzDate = typeof gzDate === 'string' ? entityToString(gzDate) : '';
          let liuYao = $('.show_rokuyou', domTd).html();
          liuYao = typeof liuYao === 'string' ? entityToString(liuYao) : '';
          obj[`D${M}${D}`] = {
            event, // 事件
            status: 0, // 0正常1放假2调休
            gzDate, // 干支日
            liuYao, // 六曜
          };
        }
      }
    }
    fs.writeFileSync('./holiday/src/JP_'+y+'.yaml', Yaml.stringify(obj));
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

// 字符实体转字符串
function entityToString(entity) {
  const entities=entity.split(';');
  entities.pop();
  let tmp='';
  for (let i=0; i<entities.length; i++) {
    let num=entities[i].trim().slice(2);
    // 10进制还是16进制
    if (num[0]==='x') {
      num=parseInt(num.slice(1), 16);
    } else num=parseInt(num);
    tmp+=String.fromCharCode(num);
  }
  return tmp;
}

getCNAll();
