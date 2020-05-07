import * as storage from './storage';

// API接口地址
// const API_URI = 'http://127.0.0.1:8888/holiday/dist';
// const API_URI = 'https://diary8.com/holiday';
const API_URI = 'https://gaoming13.oss-cn-hangzhou.aliyuncs.com/holiday';

// 获取年份信息
// 国家地区:http://www1.jctrans.com/tool/dm.htm
export async function getCalRegionYearData(region, Y, force = false) {
  // 键名
  const cacheKey = 'CAL_' + region + '_' + Y;
  const pvKey = '_gm_pv_' + cacheKey;
  return new Promise((resolve) => {
    // 获取本地存储
    const res = storage.getItem(cacheKey);
    if (! force && res) {
      resolve(res.data);
      // 数据过旧(1周),更新
      if (Date.now() - res._addAt > 86400 * 7 * 1000) {
        getCalRegionYearData(region, Y, true);
      }
      return;
    }
    // 没有,开始网络请求
    if (window[pvKey]) {
      // 开始等待
      setTimeout(() => {
        getCalRegionYearData(region, Y).then((res) => {
          resolve(res);
        });
      }, 200);
    } else {
      // 获取接口数据
      window[pvKey] = true;
      getCalRegionYearDataDo(region, Y).then((data) => {
        resolve(data);
        window[pvKey] = false;
      });
    }
  });
}

// 获取年份信息
export async function getCalRegionYearDataDo(region, Y) {
  region = region.toUpperCase();
  // 键名
  const cacheKey = `CAL_${region}_${Y}`;
  return new Promise((resolve) => {
    const url = `${API_URI}/${region}_${Y}.json`;
    fetch(url).then((res) => {
      res.json().then((data) => {
        // 清除额外存储(保留60条,1.75M)
        storage.delLimitItem('CAL_', 60);
        // 保存该次值
        storage.setItem(cacheKey, data);
        resolve(data);
      }).catch((err) => {
        resolve(false);
      });
    }).catch((err) => {
      resolve(false);
    });
  });
}
