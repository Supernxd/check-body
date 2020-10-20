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
    message: string;
}
declare const _default: (req: needRequest, validParam: ParamOpt) => Promise<string>;
export default _default;
