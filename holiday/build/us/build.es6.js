import fs from 'fs';
import Yaml from 'yaml';

for (let year = 1950; year <= 2100; year++) {
  const file = fs.readFileSync('./holiday/src/us/'+year+'.yaml', 'utf8');
  const res = Yaml.parse(file);
  const keyArr = Object.keys(res);
  const list = {};
  for (const key of keyArr) {
    const v = res[key];
    list[key] = v;
  }
  fs.writeFileSync('./holiday/dist/us/'+year+'.json', JSON.stringify(list));
}
