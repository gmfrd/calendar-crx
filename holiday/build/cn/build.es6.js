import fs from 'fs';
import Yaml from 'yaml';

for (let year = 1950; year <= 2050; year++) {
  const file = fs.readFileSync('./holiday/src/cn/'+year+'.yaml', 'utf8');
  const res = Yaml.parse(file);
  const keyArr = Object.keys(res);
  const list = {};
  for (const key of keyArr) {
    const v = res[key];
    list[key] = v;
  }
  fs.writeFileSync('./holiday/dist/cn/'+year+'.json', JSON.stringify(list));
}
