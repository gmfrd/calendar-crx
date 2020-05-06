import fs from 'fs';
import Yaml from 'yaml';

for (let year = 1950; year <= 2100; year++) {
  const file = fs.readFileSync('./holiday/src/US_'+year+'.yaml', 'utf8');
  const res = Yaml.parse(file);
  const keyArr = Object.keys(res);
  const list = {};
  for (const key of keyArr) {
    const v = res[key];
    list[key] = [
      v.event, // 事件
      v.status, // 0正常1假2班
    ];
  }
  fs.writeFileSync('./holiday/dist/US_'+year+'.json', JSON.stringify(list));
}
