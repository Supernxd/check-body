"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req, validParam) { return __awaiter(void 0, void 0, void 0, function () {
    var name, loc, type, required, validateFnArr, value, _i, validateFnArr_1, _a, fn, message, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                name = validParam.name, loc = validParam.loc, type = validParam.type, required = validParam.required, validateFnArr = validParam.validateFnArr;
                value = getValue(req, name, loc);
                if (value === null) {
                    if (required)
                        return [2 /*return*/, 'required params not found'];
                    return [2 /*return*/, 'OK'];
                }
                if (!checkType(value, type))
                    return [2 /*return*/, 'params Type Error'];
                if (!validateFnArr) return [3 /*break*/, 6];
                _i = 0, validateFnArr_1 = validateFnArr;
                _b.label = 1;
            case 1:
                if (!(_i < validateFnArr_1.length)) return [3 /*break*/, 6];
                _a = validateFnArr_1[_i], fn = _a.fn, message = _a.message;
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, fn(value)];
            case 3:
                if (!(_b.sent()))
                    return [2 /*return*/, message || name + " validate Fail"];
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                return [2 /*return*/, message || name + " validate Fail"];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/, 'OK'];
        }
    });
}); });
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
