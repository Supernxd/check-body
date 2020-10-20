exports.test = [{name: 'id', type: "number"}]
exports.test2 = [{name: 'id', required: true, type: "string"}]
exports.test3 = [{name: 'token', loc: 'head', required: true, type: "string"}]
exports.test4 = [
  {name: 'id', required: true, type: "string"},
  {name: 'token', loc: 'head', required: true, type: "string"}
]
exports.test5 = [
  {name: 'num', required: true, type: "number", validateFnArr: [
    {fn: value => value > 100, message: '数据要大于100'},
    {fn: value => value < 105} 
  ]}
]
const sleep = (value)=> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(value > 100)
        return reject(false)
      return resolve(true)
    }, 1000)
  })
}
exports.test6 = [
  {name: 'num', type: "number", validateFnArr: [
    {fn: sleep, message: 'sleep 2 second'}
  ]}
]
