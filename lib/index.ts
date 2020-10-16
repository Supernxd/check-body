import check from './commonCheck'

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
    for(const validParam of opts){
      const returnValue = check(req, validParam)
      if(returnValue !== 'OK')
        return next({code: 400, msg: returnValue})
    }
    next()
  }
}

export const koaCheck = (opts: Array<ParamOpt>): (ctx: any, next: any) => void => {
  return async (ctx, next) => {
    for(const validParam of opts){
      const returnValue = check(ctx.request, validParam)
      if(returnValue !== 'OK') {
        ctx.body = returnValue
        ctx.status = 400
        return
      }
    }
    await next()
  }
}


