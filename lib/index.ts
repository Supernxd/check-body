import check from './commonCheck'

// TODO express promise 改为all？
interface ParamOpt {
  name: string;
  loc?: 'body' | 'query' | 'head';
  type: 'string' | 'number' | 'object';
  required?: true | false;
  validateFnArr?: Array<validateFn>;
}

interface validateFn {
  fn: (paramValue: any) => boolean;
  message: string
}

export const expressCheck = (opts: Array<ParamOpt>): (req: any, res: any, next: any) => void => {
  return (req, res, next) => {
    let count=0
    for(const validParam of opts){
      check(req, validParam)
      .then(returnValue => {
        if(returnValue !== 'OK')
          return next({code: 400, msg: returnValue})
        if(++count === opts.length)
          next()
      })
      .catch(err => {
        return next({code: 400, msg: 'request fail'})
      })
    }
  }
}

export const koaCheck = (opts: Array<ParamOpt>): (ctx: any, next: any) => void => {
  return async (ctx, next) => {
    for(const validParam of opts){
      const returnValue = await check(ctx.request, validParam)
      if(returnValue !== 'OK') {
        ctx.body = returnValue
        ctx.status = 400
        return
      }
    }
    await next()
  }
}


