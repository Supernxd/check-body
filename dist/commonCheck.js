"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req, validParam) {
    var name = validParam.name, loc = validParam.loc, type = validParam.type, required = validParam.required, validateFnArr = validParam.validateFnArr;
    var value = getValue(req, name, loc);
    if (value === null) {
        if (required)
            return 'required params not found';
        return 'OK';
    }
    if (!checkType(value, type))
        return 'params Type Error';
    if (validateFnArr) {
        for (var _i = 0, validateFnArr_1 = validateFnArr; _i < validateFnArr_1.length; _i++) {
            var _a = validateFnArr_1[_i], fn = _a.fn, message = _a.message;
            if (!fn(value))
                return message || name + " validate Fail";
        }
    }
    return 'OK';
});
var getValue = function (req, name, loc) {
    var paramValue = null;
    if (loc === 'body') {
        paramValue = req.body[name] || null;
    }
    else if (loc === 'query') {
        paramValue = req.query[name] || null;
    }
    else if (loc === 'head') {
        paramValue = req.headers[name] || null;
    }
    else {
        // 当所有值时默认从body和query中获取
        paramValue = req.body[name] || req.query[name] || null;
    }
    return paramValue;
};
var checkType = function (type, vaildType) {
    if (!vaildType || typeof type === vaildType)
        return true;
    return false;
};
