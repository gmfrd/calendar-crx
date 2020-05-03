import fs from 'fs';
import Yaml from 'yaml';

for (let year = 1950; year <= 2050; year++) {
  const file = fs.readFileSync('./holiday/src/CN_'+year+'.yaml', 'utf8');
  const res = Yaml.parse(file);
  const keyArr = Object.keys(res);
  const list = {};
  for (const key of keyArr) {
    const v = res[key];
    list[key] = [
      v.event,
      v.status,
      v.animal,
      v.gzYear,
      v.gzMonth,
      v.gzDate,
      v.lMonth,
      v.lDate,
      v.suit,
      v.avoid,
    ];
  }
  fs.writeFileSync('./holiday/dist/CN_'+year+'.json', JSON.stringify(list));
}
