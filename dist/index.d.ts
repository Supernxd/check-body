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
export declare const expressCheck: (opts: Array<ParamOpt>) => (req: any, res: any, next: any) => void;
export declare const koaCheck: (opts: Array<ParamOpt>) => (ctx: any, next: any) => void;
export {};
