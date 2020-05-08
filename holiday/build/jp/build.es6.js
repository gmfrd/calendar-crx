import fs from 'fs';
import Yaml from 'yaml';

for (let year = 1950; year <= 2100; year++) {
  const file = fs.readFileSync('./holiday/src/jp/'+year+'.yaml', 'utf8');
  const res = Yaml.parse(file);
  const keyArr = Object.keys(res);
  const list = {};
  for (const key of keyArr) {
    const v = res[key];
    list[key] = [
      v.event, // 事件
      v.jia, // 0正常1假2班
    ];
  }
  fs.writeFileSync('./holiday/dist/jp/'+year+'.json', JSON.stringify(list));
}
