let utils = {
  unique: function (arr) {
    let hash = {},
        i = arr.length,
        key, res = []
    while (i--) {
      key = arr[i]
      if (hash[key]) continue
        hash[key] = 1
        res.push(key)
    }
    return res
  }
}

export default utils
