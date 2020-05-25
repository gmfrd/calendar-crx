import fs from 'fs';
import Yaml from 'yaml';

for (let year = 2018; year <= 2020; year++) {
  const file = fs.readFileSync('./holiday/src/tw/'+year+'.yaml', 'utf8');
  const res = Yaml.parse(file);
  const keyArr = Object.keys(res);
  const list = {};
  for (const key of keyArr) {
    const v = res[key];
    list[key] = v;
  }
  fs.writeFileSync('./holiday/dist/tw/'+year+'.json', JSON.stringify(list));
}
