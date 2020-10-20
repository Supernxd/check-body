
interface needRequest {
  body?: object;
  query?: object;
  headers?: object;
}

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

export default async (req: needRequest, validParam: ParamOpt): Promise<string> => {
  const { name, loc, type, required, validateFnArr } = validParam
  const value = getValue(req, name, loc)

  if(value === null) {
    if(required)
      return 'required params not found'
    return 'OK'
  }   

  if(!checkType(value, type)) 
    return 'params Type Error' 

  if(validateFnArr) {
    for(const { fn, message } of validateFnArr) {
      try {
        if(!await fn(value))
          return message || `${name} validate Fail`
      } catch (error) {
        return message || `${name} validate Fail`
      }
    }
  }
  return 'OK'
}

const getValue = (req: any, name: string, loc?: string): any => {
  let paramValue = null 
  if(loc === 'body') {
    paramValue = req.body[name] || null 
  } else if(loc === 'query') {
    paramValue = req.query[name] || null 
  } else if(loc === 'head') {
    paramValue = req.headers[name] || null 
  } else {
    // 当所有值时默认从body和query中获取
    paramValue = req.body[name] || req.query[name] || null 
  }
  return paramValue
}

const checkType = (type: any, vaildType: string): boolean => {
  if(!vaildType || typeof type === vaildType)
    return true
  return false
}