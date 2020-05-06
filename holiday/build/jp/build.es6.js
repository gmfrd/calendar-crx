import fs from 'fs';
import Yaml from 'yaml';

for (let year = 1950; year <= 2050; year++) {
  const file = fs.readFileSync('./holiday/src/JP_'+year+'.yaml', 'utf8');
  const res = Yaml.parse(file);
  const keyArr = Object.keys(res);
  const list = {};
  for (const key of keyArr) {
    const v = res[key];
    list[key] = [
      v.event, // 事件
      v.status, // 0正常1假2班
      v.gzDate, // 干支日
      v.liuYao, // 六曜
    ];
  }
  fs.writeFileSync('./holiday/dist/JP_'+year+'.json', JSON.stringify(list));
}
