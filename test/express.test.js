const request = require('supertest');

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { expressCheck } = require('../dist')
const testData = require('./testData')

app.use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())

app
.all('/test', expressCheck(testData.test), (req, res) => {
  res.send('Hello World')
})
.all('/test2', expressCheck(testData.test2),  (req, res) => {
  res.send('Hello World')
})
.all('/test3', expressCheck(testData.test3), (req, res) => {
  res.send('Hello World')
})
.all('/test4', expressCheck(testData.test4), (req, res) => {
  res.send('Hello World')
})
.all('/test5', expressCheck(testData.test5), (req, res) => {
  res.send('Hello World')
})
.all('/test6', expressCheck(testData.test6), (req, res) => {
  res.send('Hello World')
})
.use((err, req, res, next) => {
  res.status(err.code || 500).send(err.msg || 'Something broke!')
})

describe('---------- express ----------', function () {
  it('type类型不符', done => {
    request(app)
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
    request(app)
    .get('/test')
    .expect(200)
    .expect('Hello World')
    .end((err, res) => {
      if (err) throw err;
      done()
    })
  })
  it('必传参数未传报错', done => {
    request(app)
    .get('/test2')
    .expect(400)
    .expect('required params not found')
    .end((err, res) => {
      if (err) throw err
      done()
    })
  })
  it('参数在body中', done => {
    request(app)
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
    request(app)
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
    request(app)
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
    request(app)
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
    request(app)
    .post('/test4')
    .query({id: "abcdef"})
    .set('token', 'abcdefg')
    .expect(200)
    .expect('Hello World')
    .end((err, res) => {
      if (err) throw err
      done()
    })
  })
  it('自定义判断', done => {
    request(app)
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
    request(app)
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
    request(app)
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
    request(app)
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
    request(app)
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
    request(app)
    .post('/test6')
    .expect(200)
    .expect('Hello World')
    .end((err, res) => {
      if (err) throw err
      done()
    })
  })
});