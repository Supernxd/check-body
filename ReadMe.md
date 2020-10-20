# check-body
 express/koa body,query,headers param checker middleware

### expressCheck([options])
  returns middleware to check params what options defined

``` javascript
  const sleep = (value)=> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(value > 100)
          return reject(false)
        return resolve(true)
      }, 1000)
    })
  }

  const options = [
    {
      name: 'num', 
      required: true, 
      loc: 'query',
      type: "number", 
      validateFnArr: [
        {fn: value => value > 100, message: '数据要大于100'},
        {fn: value => value < 105}, 
      ]
    },
    {
      name: 'id', 
      loc: 'query',
      type: "number", 
      validateFnArr: [
        {fn: sleep, message: 'sleep 2 second'}
      ]
    }
  ]
```

#### options
  name: Key values retrieved from request

  loc: Key values retrieved location: `body` | `head` | `query`

  type: values Type: like `string` | `number` 

  required: 

  validateFnArr: Array of validate function

##### validateFn
  fn: validate function | Promise
  * validateFunction now support Promise function but not recommend

  message: validate function fail return message
   

### example


#### express
``` javascript

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { expressCheck } = require('check-body')

app
.use(bodyParser.urlencoded({ extended: false }))
.use(bodyParser.json())
.all('/', expressCheck([options]), (req, res) => {
  res.send('Hello World')
})
.use((err, req, res, next) => {
  res.status(err.code || 500).send(err.msg || 'Something broke!')
})

app.listen(3000)
```

#### koa
``` javascript

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = new Router()
const { koaCheck } = require('check-body')


router
.all('/test', koaCheck([options]), async ctx => {
  ctx.body = 'Hello World'
})

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

const koaAPP = app.listen(3000)
```