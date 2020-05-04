// 获取存储值
export function getItem(key) {
  key = key.toUpperCase();
  let res = window.localStorage.getItem(key);
  if (typeof res !== 'string') {
    return false;
  }
  try {
    res = JSON.parse(res);
    if (typeof res['_addAt'] !== 'number') {
      return false;
    }
  } catch (e) {
    return false;
  }
  return res;
}

// 添加存储值
export function setItem(key, val) {
  key = key.toUpperCase();
  const data = JSON.stringify({
    _addAt: Date.now(),
    data: val,
  });
  window.localStorage.setItem(key, data);
}

// 删除存储值
export function delItem(key) {
  key = key.toUpperCase();
  window.localStorage.removeItem(key);
}

// 限制数量删除数据(老数据优先删除)
export function delLimitItem(keyPrefix, remainNum) {
  keyPrefix = keyPrefix.toUpperCase();
  const nowNum = window.localStorage.length;
  if (nowNum <= remainNum) {
    return;
  }
  // 获取所有键名，并按添加时间排序
  const arr = [];
  for (let i = 0; i < nowNum; i++) {
    const key = window.localStorage.key(i);
    if (key.indexOf(keyPrefix) === 0) {
      const v = getItem(key);
      arr.push({key, addAt: v ? v._addAt : 0});
    }
  }
  arr.sort((a, b) => a.addAt - b.addAt);
  // 删除老的数据
  for (let i = 0; i < nowNum - remainNum; i++) {
    delItem(arr[i].key);
  }
}
