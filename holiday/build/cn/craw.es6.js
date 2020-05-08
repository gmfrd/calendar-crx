import fs from 'fs';
import Yaml from 'yaml';
import request from 'request';
import iconv from 'iconv-lite';

// 获取中国节日(百度搜索日历的控件)
async function getCNAll() {
  for (let year = 1950; year <= 2100; year++) {
    const obj = {};
    for (let month = 1; month <= 12; month++) {
      console.log(`${year}-${month}-->`);
      const url = 'https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?tn=wisetpl&format=json&resource_id=39043&query='+year+'%E5%B9%B4'+month+'%E6%9C%88';
      let res = await getData(url);
      if (res === false) {
        console.log({year, month});
        break;
      }
      res = JSON.parse(res);
      for (const v of res.data[0].almanac) {
        if (v.month == month) {
          const dKey = (month < 10 ? '0' : '') + month + '' + (v.day < 10 ? '0' : '') + v.day;
          // 节日
          let event = '';
          if (typeof v.value === 'string' && v.value !== '') {
            event = v.value;
          }
          event = event.trim();
          // 是否放假
          let jia = 0;
          if (['1', '2'].includes(v.jia)) {
            jia = parseInt(v.jia);
          }
          // 保存数据
          if (event !== '' || jia !== 0) {
            obj['D'+dKey] = {
              event: [event],
              jia, // 0正常1放假2调休
            };
          }
        }
      }
    }
    console.log(Object.keys(obj).length);
    fs.writeFileSync('./holiday/src/cn/'+year+'.yaml', Yaml.stringify(obj));
  }
}
async function getData(url) {
  return new Promise((resolve) => {
    request(url)
        .pipe(iconv.decodeStream('gbk'))
        .collect(function(err, decodedBody) {
          if (err) {
            resolve(false);
          } else {
            resolve(decodedBody);
          }
        });
  });
}

getCNAll();
