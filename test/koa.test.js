const request = require('supertest');
const { koaCheck } = require('../dist')
const testData = require('./testData')
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = new Router()


router
.all('/test', koaCheck(testData.test), async ctx => {
  ctx.body = 'Hello World'
})
.all('/test2', koaCheck(testData.test2), async ctx => {
  ctx.body = 'Hello World'
})
.all('/test3', koaCheck(testData.test3), async ctx => {
  ctx.body = 'Hello World'
})
.all('/test4', koaCheck(testData.test4), async ctx => {
  ctx.body = 'Hello World'
})
.all('/test5', koaCheck(testData.test5), async ctx => {
  ctx.body = 'Hello World'
})
.all('/test6', koaCheck(testData.test6), async ctx => {
  ctx.body = 'Hello World'
})

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

const koaAPP = app.listen(3000)
describe('---------- koa ----------', function () {
  it('type类型不符', done => {
    request(koaAPP)
    .get('/test')
    .query({id: 123})
    .expect(400)
    .expect('params Type Error')
    .end((err, res) => {
      if (err) throw err;
      done()
    })
  })
  it('非必传参数未传不做校验', done => {
    request(koaAPP)
    .get('/test')
    .expect(200)
    .expect('Hello World')
    .end((err, res) => {
      if (err) throw err;
      done()
    })
  })
  it('必传参数未传报错', done => {
    request(koaAPP)
    .get('/test2')
    .expect(400)
    .expect('required params not found')
    .end((err, res) => {
      if (err) throw err
      done()
    })
  })
  it('参数在body中', done => {
    request(koaAPP)
    .post('/test2')
    .send('id=123')
    .expect(200)
    .expect('Hello World')
    .end((err, res) => {
      if (err) throw err
      done()
    })
  })
  it('参数在header中', done => {
    request(koaAPP)
    .post('/test3')
    .set('token', 'abcdef')
    .expect(200)
    .expect('Hello World')
    .end((err, res) => {
      if (err) throw err
      done()
    })
  })
  it('参数不在指定位置中', done => {
    request(koaAPP)
    .post('/test3')
    .query({token: "abcdef"})
    .expect(400)
    .expect('required params not found')
    .end((err, res) => {
      if (err) throw err
      done()
    })
  })
  it('多参数匹配失败', done => {
    request(koaAPP)
    .post('/test4')
    .query({id: "abcdef"})
    .expect(400)
    .expect('required params not found')
    .end((err, res) => {
      if (err) throw err
      done()
    })
  })
  it('多参数匹配', done => {
    request(koaAPP)
    .post('/test4')
    .query({id: "abcdef"})
    .set('token', 'abcdefg')
    .expect(200)
    .end((err, res) => {
      if (err) throw err
      done()
    })
  })
  it('自定义判断', done => {
    request(koaAPP)
    .post('/test5')
    .send({num: 99})
    .expect(400)
    .expect('数据要大于100')
    .end((err, res) => {
      if (err) throw err
      done()
    })
  })
  it('自定义判断-多条', done => {
    request(koaAPP)
    .post('/test5')
    .send({num: 106})
    .expect(400)
    .expect('num validate Fail')
    .end((err, res) => {
      if (err) throw err
      done()
    })
  })
  it('自定义判断-成功', done => {
    request(koaAPP)
    .post('/test5')
    .send({num: 104})
    .expect(200)
    .expect('Hello World')
    .end((err, res) => {
      if (err) throw err
      done()
    })
  })
  it('Promise Reject', done => {
    request(koaAPP)
    .post('/test6')
    .send({num: 104})
    .expect(400)
    .expect('sleep 2 second')
    .end((err, res) => {
      if (err) throw err
      done()
    })
  })
  it('Promise Resolve', done => {
    request(koaAPP)
    .post('/test6')
    .send({num: 99})
    .expect(200)
    .expect('Hello World')
    .end((err, res) => {
      if (err) throw err
      done()
    })
  })
  it('参数非必传未传promise不检查', done => {
    request(koaAPP)
    .post('/test6')
    .expect(200)
    .expect('Hello World')
    .end((err, res) => {
      if (err) throw err
      done()
    })
  })
});

koaAPP.close()