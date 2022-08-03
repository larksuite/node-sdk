/**
 * MIT License
 *
 * Copyright (c) 2022 Lark Technologies Pte. Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice, shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var get = require('lodash.get');
var axios = require('axios');
var crypto = require('crypto');
var identity = require('lodash.identity');
var pickBy = require('lodash.pickby');
var fs = require('fs');
var pick = require('lodash.pick');
var merge = require('lodash.merge');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var get__default = /*#__PURE__*/_interopDefaultLegacy(get);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var crypto__default = /*#__PURE__*/_interopDefaultLegacy(crypto);
var identity__default = /*#__PURE__*/_interopDefaultLegacy(identity);
var pickBy__default = /*#__PURE__*/_interopDefaultLegacy(pickBy);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var pick__default = /*#__PURE__*/_interopDefaultLegacy(pick);
var merge__default = /*#__PURE__*/_interopDefaultLegacy(merge);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

const httpInstance = axios__default["default"].create();
httpInstance.interceptors.response.use((resp) => resp.data);

exports.AppType = void 0;
(function (AppType) {
    AppType[AppType["SelfBuild"] = 0] = "SelfBuild";
    AppType[AppType["ISV"] = 1] = "ISV";
})(exports.AppType || (exports.AppType = {}));
exports.Domain = void 0;
(function (Domain) {
    Domain[Domain["Feishu"] = 0] = "Feishu";
    Domain[Domain["Lark"] = 1] = "Lark";
})(exports.Domain || (exports.Domain = {}));
exports.LoggerLevel = void 0;
(function (LoggerLevel) {
    LoggerLevel[LoggerLevel["fatal"] = 0] = "fatal";
    LoggerLevel[LoggerLevel["error"] = 1] = "error";
    LoggerLevel[LoggerLevel["warn"] = 2] = "warn";
    LoggerLevel[LoggerLevel["info"] = 3] = "info";
    LoggerLevel[LoggerLevel["debug"] = 4] = "debug";
    LoggerLevel[LoggerLevel["trace"] = 5] = "trace";
})(exports.LoggerLevel || (exports.LoggerLevel = {}));

const CEventType = Symbol('event-type');
const CTenantKey = Symbol('tenant-key');
const CAppTicket = Symbol('app-ticket');
const CTenantAccessToken = Symbol('tenant-access-token');
const CWithHelpdeskAuthorization = Symbol('with-helpdesk-authorization');
const CWithUserAccessToken = Symbol('with-user-access-token');

const string2Base64 = (content) => Buffer.from(content).toString('base64');

class DefaultCache {
    constructor() {
        this.values = new Map();
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.values.get(key);
            if (data) {
                const { value, expiredTime } = data;
                if (!expiredTime || expiredTime - new Date().getTime() > 0) {
                    return value;
                }
            }
            return undefined;
        });
    }
    set(key, value, expiredTime) {
        return __awaiter(this, void 0, void 0, function* () {
            this.values.set(key, {
                value,
                expiredTime,
            });
            return true;
        });
    }
}
const internalCache = new DefaultCache();

class AESCipher {
    constructor(key) {
        const hash = crypto__default["default"].createHash('sha256');
        hash.update(key);
        this.key = hash.digest();
    }
    decrypt(encrypt) {
        const encryptBuffer = Buffer.from(encrypt, 'base64');
        const decipher = crypto__default["default"].createDecipheriv('aes-256-cbc', this.key, encryptBuffer.slice(0, 16));
        let decrypted = decipher.update(encryptBuffer.slice(16).toString('hex'), 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}

const formatDomain = (domain) => {
    switch (domain) {
        case exports.Domain.Feishu:
            return 'https://open.feishu.cn';
        case exports.Domain.Lark:
            return 'https://open.larksuite.com';
        default:
            return domain;
    }
};

const fillApiPath = (apiPath, pathSupplement = {}) => apiPath.replace(/:([^/]+)/g, (_, $1) => {
    if (pathSupplement[$1] !== undefined) {
        return pathSupplement[$1];
    }
    throw new Error(`request miss ${$1} path argument`);
});

const assert = (predication, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const isInvoke = typeof predication === 'function' ? predication() : predication;
    if (isInvoke) {
        yield callback();
    }
});

const formatUrl = (url) => (url ? url.replace(/^\//, '') : '');

const formatErrors = (e) => {
    if (e instanceof axios.AxiosError) {
        const { message, response, request, config } = pick__default["default"](e, [
            'message',
            'response',
            'request',
            'config',
        ]);
        const filteredErrorInfo = {
            message,
            config: pick__default["default"](config, ['data', 'url', 'params', 'method']),
            request: pick__default["default"](request, ['protocol', 'host', 'path', 'method']),
            response: pick__default["default"](response, ['data', 'status', 'statusText']),
        };
        const errors = [filteredErrorInfo];
        const specificError = get__default["default"](e, 'response.data');
        if (specificError) {
            errors.push(specificError);
        }
        return errors;
    }
    return [e];
};

// auto gen
class Client$1 {
    constructor() {
        this.acs = {
            user: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=user&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/acs/v1/users/:user_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=user&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/acs/v1/users/:user_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=user&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/acs/v1/users`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=user&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/acs/v1/users`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            accessRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=access_record&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/acs/v1/access_records`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=access_record&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/acs/v1/access_records`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            device: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=device&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/acs/v1/devices`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            accessRecordAccessPhoto: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=access_record.access_photo&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/acs/v1/access_records/:access_record_id/access_photo`, path),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return {
                        writeFile: (filePath) => __awaiter(this, void 0, void 0, function* () {
                            yield res.pipe(fs__default["default"].createWriteStream(filePath));
                        }),
                    };
                }),
            },
            userFace: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=user.face&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/acs/v1/users/:user_id/face`, path),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return {
                        writeFile: (filePath) => __awaiter(this, void 0, void 0, function* () {
                            yield res.pipe(fs__default["default"].createWriteStream(filePath));
                        }),
                    };
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=acs&resource=user.face&apiName=update&version=v1 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/acs/v1/users/:user_id/face`, path),
                        method: "PUT",
                        data,
                        params,
                        headers: Object.assign(Object.assign({}, headers), { "Content-Type": "multipart/form-data" }),
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return get__default["default"](res, "data", {});
                }),
            },
        };
        this.admin = {
            adminDeptStat: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=admin_dept_stat&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/admin/v1/admin_dept_stats`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            password: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=password&apiName=reset&version=v1 click to debug }
                 */
                reset: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/admin/v1/password/reset`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            adminUserStat: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=admin_user_stat&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/admin/v1/admin_user_stats`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.application = {
            applicationAppVersion: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_version&apiName=patch&version=v6 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/application/v6/applications/:app_id/app_versions/:version_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_version&apiName=get&version=v6 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/application/v6/applications/:app_id/app_versions/:version_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            application: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=patch&version=v6 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/application/v6/applications/:app_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=underauditlist&version=v6 click to debug }
                 */
                underauditlistWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/application/v6/applications/underauditlist`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=underauditlist&version=v6 click to debug }
                 */
                underauditlist: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/application/v6/applications/underauditlist`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=get&version=v6 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/application/v6/applications/:app_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            applicationAppUsage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_usage&apiName=overview&version=v6 click to debug }
                 */
                overview: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/application/v6/applications/:app_id/app_usage/overview`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            applicationFeedback: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.feedback&apiName=patch&version=v6 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/application/v6/applications/:app_id/feedbacks/:feedback_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.feedback&apiName=list&version=v6 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/application/v6/applications/:app_id/feedbacks`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.approval = {
            instance: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=add_sign&version=v4 click to debug }
                 */
                addSign: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/instances/add_sign`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=preview&version=v4 click to debug }
                 */
                preview: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/instances/preview`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=create&version=v4 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/instances`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=cc&version=v4 click to debug }
                 */
                cc: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/instances/cc`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=list&version=v4 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/approval/v4/instances`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=list&version=v4 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/instances`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=cancel&version=v4 click to debug }
                 */
                cancel: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/instances/cancel`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=get&version=v4 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/instances/:instance_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=specified_rollback&version=v4 click to debug }
                 */
                specifiedRollback: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/instances/specified_rollback`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=query&version=v4 click to debug }
                 */
                queryWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/approval/v4/instances/query`, path),
                            method: "POST",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=query&version=v4 click to debug }
                 */
                query: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/instances/query`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=search_cc&version=v4 click to debug }
                 */
                searchCc: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/instances/search_cc`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            task: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=query&version=v4 click to debug }
                 */
                queryWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/approval/v4/tasks/query`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=query&version=v4 click to debug }
                 */
                query: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/tasks/query`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=reject&version=v4 click to debug }
                 */
                reject: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/tasks/reject`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=approve&version=v4 click to debug }
                 */
                approve: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/tasks/approve`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=transfer&version=v4 click to debug }
                 */
                transfer: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/tasks/transfer`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=search&version=v4 click to debug }
                 */
                search: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/tasks/search`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            approval: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=approval&apiName=unsubscribe&version=v4 click to debug }
                 */
                unsubscribe: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/approvals/:approval_code/unsubscribe`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=approval&apiName=subscribe&version=v4 click to debug }
                 */
                subscribe: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/approvals/:approval_code/subscribe`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=approval&apiName=get&version=v4 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/approvals/:approval_code`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=approval&apiName=create&version=v4 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/approvals`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            instanceComment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance.comment&apiName=create&version=v4 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/instances/:instance_id/comments`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance.comment&apiName=delete&version=v4 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/instances/:instance_id/comments/:comment_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance.comment&apiName=remove&version=v4 click to debug }
                 */
                remove: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/instances/:instance_id/comments/remove`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance.comment&apiName=list&version=v4 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/approval/v4/instances/:instance_id/comments`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance.comment&apiName=list&version=v4 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/instances/:instance_id/comments`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            externalTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_task&apiName=list&version=v4 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/approval/v4/external_tasks`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_task&apiName=list&version=v4 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/external_tasks`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            externalInstance: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_instance&apiName=check&version=v4 click to debug }
                 */
                check: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/external_instances/check`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_instance&apiName=create&version=v4 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/external_instances`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            externalApproval: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_approval&apiName=create&version=v4 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/approval/v4/external_approvals`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.attendance = {
            file: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=file&apiName=upload&version=v1 click to debug }
                 */
                upload: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/files/upload`, path),
                        method: "POST",
                        data,
                        params,
                        headers: Object.assign(Object.assign({}, headers), { "Content-Type": "multipart/form-data" }),
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return get__default["default"](res, "data", {});
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=file&apiName=download&version=v1 click to debug }
                 */
                download: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/files/:file_id/download`, path),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return {
                        writeFile: (filePath) => __awaiter(this, void 0, void 0, function* () {
                            yield res.pipe(fs__default["default"].createWriteStream(filePath));
                        }),
                    };
                }),
            },
            userSetting: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_setting&apiName=query&version=v1 click to debug }
                 */
                query: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/user_settings/query`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_setting&apiName=modify&version=v1 click to debug }
                 */
                modify: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/user_settings/modify`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            userStatsView: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_stats_view&apiName=update&version=v1 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/user_stats_views/:user_stats_view_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_stats_view&apiName=query&version=v1 click to debug }
                 */
                query: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/user_stats_views/query`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            userDailyShift: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_daily_shift&apiName=query&version=v1 click to debug }
                 */
                query: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/user_daily_shifts/query`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_daily_shift&apiName=batch_create&version=v1 click to debug }
                 */
                batchCreate: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/user_daily_shifts/batch_create`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            userTaskRemedy: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_task_remedy&apiName=query_user_allowed_remedys&version=v1 click to debug }
                 */
                queryUserAllowedRemedys: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/user_task_remedys/query_user_allowed_remedys`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_task_remedy&apiName=query&version=v1 click to debug }
                 */
                query: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/user_task_remedys/query`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_task_remedy&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/user_task_remedys`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            userStatsField: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_stats_field&apiName=query&version=v1 click to debug }
                 */
                query: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/user_stats_fields/query`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            group: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=group&apiName=search&version=v1 click to debug }
                 */
                search: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/groups/search`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=group&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/attendance/v1/groups`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=group&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/groups`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=group&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/groups/:group_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=group&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/groups`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=group&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/groups/:group_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            shift: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=shift&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/shifts/:shift_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=shift&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/shifts`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=shift&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/shifts/:shift_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=shift&apiName=query&version=v1 click to debug }
                 */
                query: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/shifts/query`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=shift&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/attendance/v1/shifts`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=shift&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/shifts`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            userApproval: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_approval&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/user_approvals`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_approval&apiName=query&version=v1 click to debug }
                 */
                query: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/user_approvals/query`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            userFlow: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_flow&apiName=query&version=v1 click to debug }
                 */
                query: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/user_flows/query`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_flow&apiName=batch_create&version=v1 click to debug }
                 */
                batchCreate: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/user_flows/batch_create`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_flow&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/user_flows/:user_flow_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            userTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_task&apiName=query&version=v1 click to debug }
                 */
                query: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/user_tasks/query`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            approvalInfo: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=approval_info&apiName=process&version=v1 click to debug }
                 */
                process: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/approval_infos/process`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            userStatsData: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_stats_data&apiName=query&version=v1 click to debug }
                 */
                query: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/attendance/v1/user_stats_datas/query`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.aweme_ecosystem = {};
        this.baike = {
            entity: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=match&version=v1 click to debug }
                 */
                match: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/baike/v1/entities/match`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=highlight&version=v1 click to debug }
                 */
                highlight: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/baike/v1/entities/highlight`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/baike/v1/entities`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=update&version=v1 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/baike/v1/entities/:entity_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=search&version=v1 click to debug }
                 */
                searchWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/baike/v1/entities/search`, path),
                            method: "POST",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=search&version=v1 click to debug }
                 */
                search: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/baike/v1/entities/search`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/baike/v1/entities/:entity_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/baike/v1/entities`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/baike/v1/entities`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            classification: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=classification&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/baike/v1/classifications`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=classification&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/baike/v1/classifications`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            draft: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=draft&apiName=update&version=v1 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/baike/v1/drafts/:draft_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=draft&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/baike/v1/drafts`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.block = {
            entity: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=block&resource=entity&apiName=create&version=v2 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/block/v2/entities`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=block&resource=entity&apiName=update&version=v2 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/block/v2/entities/:block_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            message: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=block&resource=message&apiName=create&version=v2 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/block/v2/message`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.calendar = {
            calendarAcl: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=create&version=v4 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=delete&version=v4 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls/:acl_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=list&version=v4 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=list&version=v4 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=subscription&version=v4 click to debug }
                 */
                subscription: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls/subscription`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            calendarEventAttendee: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=list&version=v4 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=list&version=v4 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=create&version=v4 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=batch_delete&version=v4 click to debug }
                 */
                batchDelete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/batch_delete`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            calendarEvent: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=subscription&version=v4 click to debug }
                 */
                subscription: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/subscription`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=get&version=v4 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=patch&version=v4 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=create&version=v4 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=search&version=v4 click to debug }
                 */
                searchWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/search`, path),
                            method: "POST",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=search&version=v4 click to debug }
                 */
                search: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/search`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=list&version=v4 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=delete&version=v4 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            calendar: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=create&version=v4 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=delete&version=v4 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=get&version=v4 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=patch&version=v4 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=search&version=v4 click to debug }
                 */
                searchWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/search`, path),
                            method: "POST",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=search&version=v4 click to debug }
                 */
                search: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/search`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=subscribe&version=v4 click to debug }
                 */
                subscribe: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/subscribe`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=subscription&version=v4 click to debug }
                 */
                subscription: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/subscription`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=unsubscribe&version=v4 click to debug }
                 */
                unsubscribe: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/unsubscribe`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=list&version=v4 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=primary&version=v4 click to debug }
                 */
                primary: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/primary`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            timeoffEvent: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=timeoff_event&apiName=delete&version=v4 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/timeoff_events/:timeoff_event_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=timeoff_event&apiName=create&version=v4 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/timeoff_events`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            setting: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=setting&apiName=generate_caldav_conf&version=v4 click to debug }
                 */
                generateCaldavConf: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/settings/generate_caldav_conf`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            freebusy: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=freebusy&apiName=list&version=v4 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/freebusy/list`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            calendarEventAttendeeChatMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee.chat_member&apiName=list&version=v4 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/:attendee_id/chat_members`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee.chat_member&apiName=list&version=v4 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/:attendee_id/chat_members`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            exchangeBinding: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=exchange_binding&apiName=delete&version=v4 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/exchange_bindings/:exchange_binding_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=exchange_binding&apiName=create&version=v4 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/exchange_bindings`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=exchange_binding&apiName=get&version=v4 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/calendar/v4/exchange_bindings/:exchange_binding_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.comment_sdk = {};
        this.contact = {
            customAttr: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=custom_attr&apiName=list&version=v3 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/contact/v3/custom_attrs`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=custom_attr&apiName=list&version=v3 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/custom_attrs`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            department: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=unbind_department_chat&version=v3 click to debug }
                 */
                unbindDepartmentChat: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/departments/unbind_department_chat`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=delete&version=v3 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/departments/:department_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=list&version=v3 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/contact/v3/departments`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=list&version=v3 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/departments`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=children&version=v3 click to debug }
                 */
                childrenWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/contact/v3/departments/:department_id/children`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=children&version=v3 click to debug }
                 */
                children: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/departments/:department_id/children`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=search&version=v3 click to debug }
                 */
                searchWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/contact/v3/departments/search`, path),
                            method: "POST",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=search&version=v3 click to debug }
                 */
                search: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/departments/search`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=parent&version=v3 click to debug }
                 */
                parentWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/contact/v3/departments/parent`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=parent&version=v3 click to debug }
                 */
                parent: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/departments/parent`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=get&version=v3 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/departments/:department_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=patch&version=v3 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/departments/:department_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=update&version=v3 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/departments/:department_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=department&apiName=create&version=v3 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/departments`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            employeeTypeEnum: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=delete&version=v3 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/employee_type_enums/:enum_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=update&version=v3 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/employee_type_enums/:enum_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=list&version=v3 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/contact/v3/employee_type_enums`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=list&version=v3 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/employee_type_enums`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=employee_type_enum&apiName=create&version=v3 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/employee_type_enums`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            group: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=create&version=v3 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/group`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=delete&version=v3 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/group/:group_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=patch&version=v3 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/group/:group_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=get&version=v3 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/group/:group_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=simplelist&version=v3 click to debug }
                 */
                simplelistWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/contact/v3/group/simplelist`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=simplelist&version=v3 click to debug }
                 */
                simplelist: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/group/simplelist`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group&apiName=member_belong&version=v3 click to debug }
                 */
                memberBelong: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/group/member_belong`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            unit: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=create&version=v3 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/unit`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=list&version=v3 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/unit`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=delete&version=v3 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/unit/:unit_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=unbind_department&version=v3 click to debug }
                 */
                unbindDepartment: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/unit/unbind_department`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=list_department&version=v3 click to debug }
                 */
                listDepartment: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/unit/list_department`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=patch&version=v3 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/unit/:unit_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=get&version=v3 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/unit/:unit_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=unit&apiName=bind_department&version=v3 click to debug }
                 */
                bindDepartment: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/unit/bind_department`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            scope: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=scope&apiName=list&version=v3 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/contact/v3/scopes`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=scope&apiName=list&version=v3 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/scopes`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            user: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=batch_get_id&version=v3 click to debug }
                 */
                batchGetId: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/users/batch_get_id`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=list&version=v3 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/contact/v3/users`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=list&version=v3 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/users`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=get&version=v3 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/users/:user_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=find_by_department&version=v3 click to debug }
                 */
                findByDepartmentWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/contact/v3/users/find_by_department`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=find_by_department&version=v3 click to debug }
                 */
                findByDepartment: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/users/find_by_department`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=patch&version=v3 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/users/:user_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=update&version=v3 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/users/:user_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=delete&version=v3 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/users/:user_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=user&apiName=create&version=v3 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/users`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            groupMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=batch_remove&version=v3 click to debug }
                 */
                batchRemove: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/group/:group_id/member/batch_remove`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=simplelist&version=v3 click to debug }
                 */
                simplelist: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/group/:group_id/member/simplelist`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=batch_add&version=v3 click to debug }
                 */
                batchAdd: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/group/:group_id/member/batch_add`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=add&version=v3 click to debug }
                 */
                add: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/group/:group_id/member/add`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=contact&resource=group.member&apiName=remove&version=v3 click to debug }
                 */
                remove: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/contact/v3/group/:group_id/member/remove`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.content_check = {};
        this.contract = {};
        this.corehr = {};
        this.docs_tool = {};
        this.docx = {
            document: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docx&resource=document&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/docx/v1/documents/:document_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docx&resource=document&apiName=raw_content&version=v1 click to debug }
                 */
                rawContent: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/docx/v1/documents/:document_id/raw_content`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docx&resource=document&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/docx/v1/documents`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            documentBlockChildren: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docx&resource=document.block.children&apiName=batch_delete&version=v1 click to debug }
                 */
                batchDelete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/docx/v1/documents/:document_id/blocks/:block_id/children/batch_delete`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docx&resource=document.block.children&apiName=get&version=v1 click to debug }
                 */
                getWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/docx/v1/documents/:document_id/blocks/:block_id/children`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docx&resource=document.block.children&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/docx/v1/documents/:document_id/blocks/:block_id/children`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docx&resource=document.block.children&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/docx/v1/documents/:document_id/blocks/:block_id/children`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            documentBlock: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docx&resource=document.block&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/docx/v1/documents/:document_id/blocks/:block_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docx&resource=document.block&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/docx/v1/documents/:document_id/blocks`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docx&resource=document.block&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/docx/v1/documents/:document_id/blocks`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docx&resource=document.block&apiName=batch_update&version=v1 click to debug }
                 */
                batchUpdate: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/docx/v1/documents/:document_id/blocks/batch_update`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docx&resource=document.block&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/docx/v1/documents/:document_id/blocks/:block_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.drive = {
            importTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=import_task&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/import_tasks`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=import_task&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/import_tasks/:ticket`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            media: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=download&version=v1 click to debug }
                 */
                download: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/medias/:file_token/download`, path),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return {
                        writeFile: (filePath) => __awaiter(this, void 0, void 0, function* () {
                            yield res.pipe(fs__default["default"].createWriteStream(filePath));
                        }),
                    };
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_finish&version=v1 click to debug }
                 */
                uploadFinish: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/medias/upload_finish`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_part&version=v1 click to debug }
                 */
                uploadPart: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/medias/upload_part`, path),
                        method: "POST",
                        data,
                        params,
                        headers: Object.assign(Object.assign({}, headers), { "Content-Type": "multipart/form-data" }),
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return get__default["default"](res, "data", {});
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=batch_get_tmp_download_url&version=v1 click to debug }
                 */
                batchGetTmpDownloadUrl: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/medias/batch_get_tmp_download_url`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_prepare&version=v1 click to debug }
                 */
                uploadPrepare: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/medias/upload_prepare`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_all&version=v1 click to debug }
                 */
                uploadAll: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/medias/upload_all`, path),
                        method: "POST",
                        data,
                        params,
                        headers: Object.assign(Object.assign({}, headers), { "Content-Type": "multipart/form-data" }),
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return get__default["default"](res, "data", {});
                }),
            },
            fileStatistics: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.statistics&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/:file_token/statistics`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            fileSubscription: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.subscription&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/:file_token/subscriptions`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.subscription&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/:file_token/subscriptions/:subscription_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.subscription&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/:file_token/subscriptions/:subscription_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            file: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=download&version=v1 click to debug }
                 */
                download: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/:file_token/download`, path),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return {
                        writeFile: (filePath) => __awaiter(this, void 0, void 0, function* () {
                            yield res.pipe(fs__default["default"].createWriteStream(filePath));
                        }),
                    };
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/:file_token`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=task_check&version=v1 click to debug }
                 */
                taskCheck: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/task_check`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=subscribe&version=v1 click to debug }
                 */
                subscribe: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/:file_token/subscribe`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=move&version=v1 click to debug }
                 */
                move: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/:file_token/move`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=create_folder&version=v1 click to debug }
                 */
                createFolder: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/create_folder`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=copy&version=v1 click to debug }
                 */
                copy: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/:file_token/copy`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_finish&version=v1 click to debug }
                 */
                uploadFinish: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/upload_finish`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_part&version=v1 click to debug }
                 */
                uploadPart: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/upload_part`, path),
                        method: "POST",
                        data,
                        params,
                        headers: Object.assign(Object.assign({}, headers), { "Content-Type": "multipart/form-data" }),
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return get__default["default"](res, "data", {});
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_prepare&version=v1 click to debug }
                 */
                uploadPrepare: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/upload_prepare`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_all&version=v1 click to debug }
                 */
                uploadAll: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/upload_all`, path),
                        method: "POST",
                        data,
                        params,
                        headers: Object.assign(Object.assign({}, headers), { "Content-Type": "multipart/form-data" }),
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return get__default["default"](res, "data", {});
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/drive/v1/files`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            exportTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=export_task&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/export_tasks`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=export_task&apiName=download&version=v1 click to debug }
                 */
                download: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/export_tasks/file/:file_token/download`, path),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return {
                        writeFile: (filePath) => __awaiter(this, void 0, void 0, function* () {
                            yield res.pipe(fs__default["default"].createWriteStream(filePath));
                        }),
                    };
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=export_task&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/export_tasks/:ticket`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            fileCommentReply: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment.reply&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/:file_token/comments/:comment_id/replies/:reply_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment.reply&apiName=update&version=v1 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/:file_token/comments/:comment_id/replies/:reply_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            fileComment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/:file_token/comments/:comment_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/:file_token/comments`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/:file_token/comments/:comment_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/:file_token/comments`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/files/:file_token/comments`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            permissionPublic: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/permissions/:token/public`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/permissions/:token/public`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            permissionMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/permissions/:token/members/:member_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=update&version=v1 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/permissions/:token/members/:member_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/permissions/:token/members`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            meta: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=meta&apiName=batch_query&version=v1 click to debug }
                 */
                batchQuery: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/drive/v1/metas/batch_query`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.edu = {};
        this.ehr = {
            attachment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=ehr&resource=attachment&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/ehr/v1/attachments/:token`, path),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return {
                        writeFile: (filePath) => __awaiter(this, void 0, void 0, function* () {
                            yield res.pipe(fs__default["default"].createWriteStream(filePath));
                        }),
                    };
                }),
            },
            employee: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=ehr&resource=employee&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/ehr/v1/employees`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=ehr&resource=employee&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/ehr/v1/employees`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.elearning = {};
        this.event = {
            outboundIp: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=event&resource=outbound_ip&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/event/v1/outbound_ip`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=event&resource=outbound_ip&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/event/v1/outbound_ip`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.exam = {};
        this.face_detection = {
            image: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=face_detection&resource=image&apiName=detect_face_attributes&version=v1 click to debug }
                 */
                detectFaceAttributes: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/face_detection/v1/image/detect_face_attributes`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.feelgood = {};
        this.helpdesk = {
            ticketCustomizedField: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket_customized_field&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/ticket_customized_fields`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket_customized_field&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/ticket_customized_fields/:ticket_customized_field_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket_customized_field&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/ticket_customized_fields/:ticket_customized_field_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket_customized_field&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/ticket_customized_fields/:ticket_customized_field_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket_customized_field&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/ticket_customized_fields`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket_customized_field&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/ticket_customized_fields`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            ticket: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=update&version=v1 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/tickets/:ticket_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=ticket_image&version=v1 click to debug }
                 */
                ticketImage: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/ticket_images`, path),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return {
                        writeFile: (filePath) => __awaiter(this, void 0, void 0, function* () {
                            yield res.pipe(fs__default["default"].createWriteStream(filePath));
                        }),
                    };
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=answer_user_query&version=v1 click to debug }
                 */
                answerUserQuery: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/tickets/:ticket_id/answer_user_query`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=start_service&version=v1 click to debug }
                 */
                startService: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/start_service`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=customized_fields&version=v1 click to debug }
                 */
                customizedFields: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/customized_fields`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/tickets/:ticket_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/tickets`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            agentSchedules: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent.schedules&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/agents/:agent_id/schedules`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent.schedules&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/agents/:agent_id/schedules`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent.schedules&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/agents/:agent_id/schedules`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            ticketMessage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket.message&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/tickets/:ticket_id/messages`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=ticket.message&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/tickets/:ticket_id/messages`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            faq: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=faq_image&version=v1 click to debug }
                 */
                faqImage: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/faqs/:id/image/:image_key`, path),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return {
                        writeFile: (filePath) => __awaiter(this, void 0, void 0, function* () {
                            yield res.pipe(fs__default["default"].createWriteStream(filePath));
                        }),
                    };
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/faqs/:id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/faqs/:id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/faqs`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/faqs/:id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/faqs`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/faqs`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=search&version=v1 click to debug }
                 */
                searchWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/faqs/search`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=faq&apiName=search&version=v1 click to debug }
                 */
                search: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/faqs/search`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            agentSkillRule: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_skill_rule&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/agent_skill_rules`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            agentSkill: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_skill&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/agent_skills/:agent_skill_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_skill&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/agent_skills/:agent_skill_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_skill&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/agent_skills/:agent_skill_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_skill&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/agent_skills`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_skill&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/agent_skills`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            event: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=event&apiName=subscribe&version=v1 click to debug }
                 */
                subscribe: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/events/subscribe`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=event&apiName=unsubscribe&version=v1 click to debug }
                 */
                unsubscribe: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/events/unsubscribe`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            notification: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=execute_send&version=v1 click to debug }
                 */
                executeSend: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id/execute_send`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=preview&version=v1 click to debug }
                 */
                preview: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id/preview`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/notifications`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=cancel_send&version=v1 click to debug }
                 */
                cancelSend: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id/cancel_send`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=cancel_approve&version=v1 click to debug }
                 */
                cancelApprove: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id/cancel_approve`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=notification&apiName=submit_approve&version=v1 click to debug }
                 */
                submitApprove: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/notifications/:notification_id/submit_approve`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            agent: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/agents/:agent_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent&apiName=agent_email&version=v1 click to debug }
                 */
                agentEmail: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/agent_emails`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            category: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=category&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/categories/:id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=category&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/categories`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=category&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/categories`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=category&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/categories/:id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=category&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/categories/:id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            agentSchedule: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_schedule&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/agent_schedules`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=agent_schedule&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/agent_schedules`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            botMessage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=helpdesk&resource=bot.message&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/helpdesk/v1/message`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.hire = {
            attachment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=attachment&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/attachments/:attachment_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=attachment&apiName=preview&version=v1 click to debug }
                 */
                preview: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/attachments/:attachment_id/preview`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            jobProcess: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job_process&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/job_processes`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            application: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application&apiName=terminate&version=v1 click to debug }
                 */
                terminate: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/applications/:application_id/terminate`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application&apiName=offer&version=v1 click to debug }
                 */
                offer: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/applications/:application_id/offer`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/applications`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application&apiName=transfer_onboard&version=v1 click to debug }
                 */
                transferOnboard: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/applications/:application_id/transfer_onboard`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/applications`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/applications/:application_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            offerSchema: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=offer_schema&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/offer_schemas/:offer_schema_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            job: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/jobs/:job_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            jobManager: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job.manager&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/jobs/:job_id/managers/:manager_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            note: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=note&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/notes/:note_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=note&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/notes`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=note&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/notes`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=note&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/notes/:note_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            referral: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=referral&apiName=get_by_application&version=v1 click to debug }
                 */
                getByApplication: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/referrals/get_by_application`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            employee: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=employee&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/employees/:employee_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=employee&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/employees/:employee_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=employee&apiName=get_by_application&version=v1 click to debug }
                 */
                getByApplication: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/employees/get_by_application`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            talent: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=talent&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/talents/:talent_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            resumeSource: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=resume_source&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/hire/v1/resume_sources`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=resume_source&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/resume_sources`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            applicationInterview: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application.interview&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/hire/v1/applications/:application_id/interviews`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.human_authentication = {
            identity: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=human_authentication&resource=identity&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/human_authentication/v1/identities`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.im = {
            message: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/im/v1/messages`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/messages`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/messages/:message_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/messages/:message_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=read_users&version=v1 click to debug }
                 */
                readUsers: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/messages/:message_id/read_users`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=urgent_app&version=v1 click to debug }
                 */
                urgentApp: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/messages/:message_id/urgent_app`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=urgent_phone&version=v1 click to debug }
                 */
                urgentPhone: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/messages/:message_id/urgent_phone`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=urgent_sms&version=v1 click to debug }
                 */
                urgentSms: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/messages/:message_id/urgent_sms`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=reply&version=v1 click to debug }
                 */
                reply: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/messages/:message_id/reply`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/messages`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/messages/:message_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            image: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=image&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/images/:image_key`, path),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return {
                        writeFile: (filePath) => __awaiter(this, void 0, void 0, function* () {
                            yield res.pipe(fs__default["default"].createWriteStream(filePath));
                        }),
                    };
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=image&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/images`, path),
                        method: "POST",
                        data,
                        params,
                        headers: Object.assign(Object.assign({}, headers), { "Content-Type": "multipart/form-data" }),
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return get__default["default"](res, "data", {});
                }),
            },
            batchMessage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=batch_message&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/batch_messages/:batch_message_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=batch_message&apiName=read_user&version=v1 click to debug }
                 */
                readUser: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/batch_messages/:batch_message_id/read_user`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=batch_message&apiName=get_progress&version=v1 click to debug }
                 */
                getProgress: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/batch_messages/:batch_message_id/get_progress`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            chat: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/im/v1/chats`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=search&version=v1 click to debug }
                 */
                searchWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/search`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=search&version=v1 click to debug }
                 */
                search: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/search`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat&apiName=update&version=v1 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            chatModeration: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.moderation&apiName=get&version=v1 click to debug }
                 */
                getWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/moderation`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.moderation&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/moderation`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.moderation&apiName=update&version=v1 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/moderation`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            chatAnnouncement: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.announcement&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/announcement`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.announcement&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/announcement`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            chatMembers: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.members&apiName=get&version=v1 click to debug }
                 */
                getWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/members`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.members&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/members`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.members&apiName=is_in_chat&version=v1 click to debug }
                 */
                isInChat: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/members/is_in_chat`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.members&apiName=me_join&version=v1 click to debug }
                 */
                meJoin: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/members/me_join`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.members&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/members`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.members&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/members`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            file: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=file&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/files`, path),
                        method: "POST",
                        data,
                        params,
                        headers: Object.assign(Object.assign({}, headers), { "Content-Type": "multipart/form-data" }),
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return get__default["default"](res, "data", {});
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=file&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/files/:file_key`, path),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return {
                        writeFile: (filePath) => __awaiter(this, void 0, void 0, function* () {
                            yield res.pipe(fs__default["default"].createWriteStream(filePath));
                        }),
                    };
                }),
            },
            chatTopNotice: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.top_notice&apiName=delete_top_notice&version=v1 click to debug }
                 */
                deleteTopNotice: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/top_notice/delete_top_notice`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.top_notice&apiName=put_top_notice&version=v1 click to debug }
                 */
                putTopNotice: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/top_notice/put_top_notice`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            chatManagers: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.managers&apiName=delete_managers&version=v1 click to debug }
                 */
                deleteManagers: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/managers/delete_managers`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.managers&apiName=add_managers&version=v1 click to debug }
                 */
                addManagers: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/managers/add_managers`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            messageReaction: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message.reaction&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/messages/:message_id/reactions`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message.reaction&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/messages/:message_id/reactions/:reaction_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message.reaction&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/im/v1/messages/:message_id/reactions`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message.reaction&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/messages/:message_id/reactions`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            messageResource: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=message.resource&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/messages/:message_id/resources/:file_key`, path),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return {
                        writeFile: (filePath) => __awaiter(this, void 0, void 0, function* () {
                            yield res.pipe(fs__default["default"].createWriteStream(filePath));
                        }),
                    };
                }),
            },
            chatTab: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.tab&apiName=list_tabs&version=v1 click to debug }
                 */
                listTabs: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/chat_tabs/list_tabs`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.tab&apiName=sort_tabs&version=v1 click to debug }
                 */
                sortTabs: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/chat_tabs/sort_tabs`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.tab&apiName=delete_tabs&version=v1 click to debug }
                 */
                deleteTabs: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/chat_tabs/delete_tabs`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.tab&apiName=update_tabs&version=v1 click to debug }
                 */
                updateTabs: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/chat_tabs/update_tabs`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=im&resource=chat.tab&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/im/v1/chats/:chat_id/chat_tabs`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.mail = {
            publicMailbox: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/mail/v1/public_mailboxes`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/public_mailboxes`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/public_mailboxes`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox&apiName=update&version=v1 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            publicMailboxMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members/:member_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members/:member_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.member&apiName=clear&version=v1 click to debug }
                 */
                clear: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/members/clear`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            mailgroupPermissionMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.permission_member&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.permission_member&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.permission_member&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.permission_member&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members/:permission_member_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.permission_member&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/permission_members/:permission_member_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            mailgroup: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup&apiName=update&version=v1 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            publicMailboxAlias: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.alias&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/aliases/:alias_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.alias&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/aliases`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=public_mailbox.alias&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/public_mailboxes/:public_mailbox_id/aliases`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            mailgroupMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.member&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/members/:member_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.member&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/members`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.member&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/members/:member_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.member&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/members`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.member&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/members`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            mailgroupAlias: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.alias&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/aliases/:alias_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.alias&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/aliases`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=mailgroup.alias&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/mailgroups/:mailgroup_id/aliases`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            userMailbox: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            userMailboxAlias: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.alias&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/aliases/:alias_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.alias&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/aliases`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.alias&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/aliases`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user_mailbox.alias&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/user_mailboxes/:user_mailbox_id/aliases`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            user: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=mail&resource=user&apiName=query&version=v1 click to debug }
                 */
                query: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/mail/v1/users/query`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.mdm = {};
        this.meeting_room = {};
        this.moments = {};
        this.okr = {
            progressRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/okr/v1/progress_records/:progress_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/okr/v1/progress_records/:progress_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=update&version=v1 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/okr/v1/progress_records/:progress_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/okr/v1/progress_records`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            image: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=image&apiName=upload&version=v1 click to debug }
                 */
                upload: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const res = yield httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/okr/v1/images/upload`, path),
                        method: "POST",
                        data,
                        params,
                        headers: Object.assign(Object.assign({}, headers), { "Content-Type": "multipart/form-data" }),
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                    return get__default["default"](res, "data", {});
                }),
            },
            period: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=period&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/okr/v1/periods`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            okr: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr&apiName=batch_get&version=v1 click to debug }
                 */
                batchGet: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/okr/v1/okrs/batch_get`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            userOkr: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=user.okr&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/okr/v1/users/:user_id/okrs`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.optical_char_recognition = {
            image: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=optical_char_recognition&resource=image&apiName=basic_recognize&version=v1 click to debug }
                 */
                basicRecognize: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/optical_char_recognition/v1/image/basic_recognize`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.passport = {
            session: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=passport&resource=session&apiName=query&version=v1 click to debug }
                 */
                query: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/passport/v1/sessions/query`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.people_admin = {};
        this.people_bytedance = {};
        this.performance = {};
        this.report = {};
        this.search_in_app = {};
        this.search = {
            schema: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=get&version=v2 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/search/v2/schemas/:schema_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=delete&version=v2 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/search/v2/schemas/:schema_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=patch&version=v2 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/search/v2/schemas/:schema_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=schema&apiName=create&version=v2 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/search/v2/schemas`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            dataSource: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=delete&version=v2 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/search/v2/data_sources/:data_source_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=get&version=v2 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/search/v2/data_sources/:data_source_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=list&version=v2 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/search/v2/data_sources`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=list&version=v2 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/search/v2/data_sources`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=create&version=v2 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/search/v2/data_sources`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source&apiName=patch&version=v2 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/search/v2/data_sources/:data_source_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            dataSourceItem: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source.item&apiName=delete&version=v2 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/search/v2/data_sources/:data_source_id/items/:item_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source.item&apiName=create&version=v2 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/search/v2/data_sources/:data_source_id/items`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=search&resource=data_source.item&apiName=get&version=v2 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/search/v2/data_sources/:data_source_id/items/:item_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.security_and_compliance = {};
        this.sheets = {
            spreadsheetSheetFloatImage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=delete&version=v3 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images/:float_image_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=patch&version=v3 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images/:float_image_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=get&version=v3 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images/:float_image_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=create&version=v3 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.float_image&apiName=query&version=v3 click to debug }
                 */
                query: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/float_images/query`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            spreadsheetSheetFilter: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=update&version=v3 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=create&version=v3 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=get&version=v3 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter&apiName=delete&version=v3 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            spreadsheetSheetFilterView: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=get&version=v3 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=create&version=v3 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=query&version=v3 click to debug }
                 */
                query: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/query`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=patch&version=v3 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view&apiName=delete&version=v3 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            spreadsheetSheetFilterViewCondition: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=get&version=v3 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions/:condition_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=delete&version=v3 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions/:condition_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=create&version=v3 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=update&version=v3 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions/:condition_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet.filter_view.condition&apiName=query&version=v3 click to debug }
                 */
                query: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/filter_views/:filter_view_id/conditions/query`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            spreadsheetSheet: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=move_dimension&version=v3 click to debug }
                 */
                moveDimension: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/move_dimension`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=find&version=v3 click to debug }
                 */
                find: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/find`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet.sheet&apiName=replace&version=v3 click to debug }
                 */
                replace: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/:sheet_id/replace`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            spreadsheet: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=sheets&resource=spreadsheet&apiName=create&version=v3 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/sheets/v3/spreadsheets`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.speech_to_text = {
            speech: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=speech_to_text&resource=speech&apiName=stream_recognize&version=v1 click to debug }
                 */
                streamRecognize: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/speech_to_text/v1/speech/stream_recognize`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=speech_to_text&resource=speech&apiName=file_recognize&version=v1 click to debug }
                 */
                fileRecognize: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/speech_to_text/v1/speech/file_recognize`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.spend = {};
        this.sup_project = {};
        this.task = {
            task: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=complete&version=v1 click to debug }
                 */
                complete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/complete`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=uncomplete&version=v1 click to debug }
                 */
                uncomplete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/uncomplete`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=batch_delete_follower&version=v1 click to debug }
                 */
                batchDeleteFollower: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/batch_delete_follower`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=batch_delete_collaborator&version=v1 click to debug }
                 */
                batchDeleteCollaborator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/batch_delete_collaborator`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            taskReminder: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.reminder&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/reminders`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.reminder&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/reminders`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.reminder&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/reminders`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.reminder&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/reminders/:reminder_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            taskComment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/comments/:comment_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/comments/:comment_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/comments`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/comments`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=update&version=v1 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/comments/:comment_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.comment&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/comments`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            taskCollaborator: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.collaborator&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/collaborators`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.collaborator&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/collaborators`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.collaborator&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/collaborators`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.collaborator&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/collaborators/:collaborator_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            taskFollower: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.follower&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/followers`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.follower&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/followers`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.follower&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/followers`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=task&resource=task.follower&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/task/v1/tasks/:task_id/followers/:follower_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.tenant = {
            tenant: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=tenant&resource=tenant&apiName=query&version=v2 click to debug }
                 */
                query: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/tenant/v2/tenant/query`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.translation = {
            text: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=translation&resource=text&apiName=detect&version=v1 click to debug }
                 */
                detect: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/translation/v1/text/detect`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=translation&resource=text&apiName=translate&version=v1 click to debug }
                 */
                translate: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/translation/v1/text/translate`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.unified_kms_log = {};
        this.vc = {
            reserve: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/reserves/:reserve_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve&apiName=apply&version=v1 click to debug }
                 */
                apply: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/reserves/apply`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve&apiName=update&version=v1 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/reserves/:reserve_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/reserves/:reserve_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve&apiName=get_active_meeting&version=v1 click to debug }
                 */
                getActiveMeeting: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/reserves/:reserve_id/get_active_meeting`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            report: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=report&apiName=get_top_user&version=v1 click to debug }
                 */
                getTopUser: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/reports/get_top_user`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=report&apiName=get_daily&version=v1 click to debug }
                 */
                getDaily: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/reports/get_daily`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            meetingRecording: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting.recording&apiName=set_permission&version=v1 click to debug }
                 */
                setPermission: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/meetings/:meeting_id/recording/set_permission`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting.recording&apiName=stop&version=v1 click to debug }
                 */
                stop: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/meetings/:meeting_id/recording/stop`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting.recording&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/meetings/:meeting_id/recording`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting.recording&apiName=start&version=v1 click to debug }
                 */
                start: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/meetings/:meeting_id/recording/start`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            meeting: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=kickout&version=v1 click to debug }
                 */
                kickout: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/meetings/:meeting_id/kickout`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=end&version=v1 click to debug }
                 */
                end: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/meetings/:meeting_id/end`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/meetings/:meeting_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=invite&version=v1 click to debug }
                 */
                invite: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/meetings/:meeting_id/invite`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=set_host&version=v1 click to debug }
                 */
                setHost: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/meetings/:meeting_id/set_host`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=list_by_no&version=v1 click to debug }
                 */
                listByNoWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/vc/v1/meetings/list_by_no`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=list_by_no&version=v1 click to debug }
                 */
                listByNo: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/meetings/list_by_no`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            roomConfig: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_config&apiName=query&version=v1 click to debug }
                 */
                query: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/room_configs/query`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_config&apiName=set&version=v1 click to debug }
                 */
                set: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/room_configs/set`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            export: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=export&apiName=meeting_list&version=v1 click to debug }
                 */
                meetingList: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/exports/meeting_list`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=export&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/exports/:task_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=export&apiName=participant_quality_list&version=v1 click to debug }
                 */
                participantQualityList: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/exports/participant_quality_list`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=export&apiName=resource_reservation_list&version=v1 click to debug }
                 */
                resourceReservationList: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/exports/resource_reservation_list`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=export&apiName=participant_list&version=v1 click to debug }
                 */
                participantList: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/vc/v1/exports/participant_list`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.wiki = {
            space: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space&apiName=create&version=v2 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/wiki/v2/spaces`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space&apiName=get&version=v2 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/wiki/v2/spaces/:space_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space&apiName=list&version=v2 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/wiki/v2/spaces`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space&apiName=list&version=v2 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/wiki/v2/spaces`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space&apiName=get_node&version=v2 click to debug }
                 */
                getNode: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/wiki/v2/spaces/get_node`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            spaceSetting: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.setting&apiName=update&version=v2 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/wiki/v2/spaces/:space_id/setting`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            spaceMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.member&apiName=create&version=v2 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/wiki/v2/spaces/:space_id/members`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.member&apiName=delete&version=v2 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/wiki/v2/spaces/:space_id/members/:member_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            spaceNode: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.node&apiName=move_docs_to_wiki&version=v2 click to debug }
                 */
                moveDocsToWiki: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes/move_docs_to_wiki`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.node&apiName=move&version=v2 click to debug }
                 */
                move: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/move`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.node&apiName=list&version=v2 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.node&apiName=list&version=v2 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.node&apiName=create&version=v2 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.node&apiName=copy&version=v2 click to debug }
                 */
                copy: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/copy`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=space.node&apiName=update_title&version=v2 click to debug }
                 */
                updateTitle: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/update_title`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            task: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=wiki&resource=task&apiName=get&version=v2 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/wiki/v2/tasks/:task_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
        this.workplace = {};
        this.bitable = {
            appTableField: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields/:field_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=update&version=v1 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields/:field_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            appTable: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=batch_delete&version=v1 click to debug }
                 */
                batchDelete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/batch_delete`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=batch_create&version=v1 click to debug }
                 */
                batchCreate: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/batch_create`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            appTableView: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            app: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app&apiName=update&version=v1 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            appRole: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/roles`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/roles`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=update&version=v1 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/roles`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            appRoleMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/:member_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=batch_create&version=v1 click to debug }
                 */
                batchCreate: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/batch_create`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=batch_delete&version=v1 click to debug }
                 */
                batchDelete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/batch_delete`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            appTableFormField: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form.field&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id/fields/:field_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form.field&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id/fields`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form.field&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id/fields`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            appTableForm: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form&apiName=patch&version=v1 click to debug }
                 */
                patch: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id`, path),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            appTableRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=get&version=v1 click to debug }
                 */
                get: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=update&version=v1 click to debug }
                 */
                update: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id`, path),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=batch_update&version=v1 click to debug }
                 */
                batchUpdate: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_update`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=delete&version=v1 click to debug }
                 */
                delete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id`, path),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=create&version=v1 click to debug }
                 */
                create: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=batch_delete&version=v1 click to debug }
                 */
                batchDelete: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_delete`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=batch_create&version=v1 click to debug }
                 */
                batchCreate: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_create`, path),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
            appDashboard: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.dashboard&apiName=list&version=v1 click to debug }
                 */
                listWithIterator: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    const sendRequest = (innerPayload) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield httpInstance
                            .request({
                            url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/dashboards`, path),
                            method: "GET",
                            headers: pickBy__default["default"](innerPayload.headers, identity__default["default"]),
                            params: pickBy__default["default"](innerPayload.params, identity__default["default"]),
                        })
                            .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                        return res;
                    });
                    const Iterable = {
                        [Symbol.asyncIterator]() {
                            return __asyncGenerator(this, arguments, function* _a() {
                                let hasMore = true;
                                let pageToken;
                                while (hasMore) {
                                    try {
                                        const res = yield __await(sendRequest({
                                            headers,
                                            params: Object.assign(Object.assign({}, params), { page_token: pageToken }),
                                            data,
                                        }));
                                        const _b = get__default["default"](res, "data") || {}, { 
                                        // @ts-ignore
                                        has_more, 
                                        // @ts-ignore
                                        page_token, 
                                        // @ts-ignore
                                        next_page_token } = _b, rest = __rest(_b, ["has_more", "page_token", "next_page_token"]);
                                        yield yield __await(rest);
                                        hasMore = Boolean(has_more);
                                        pageToken = page_token || next_page_token;
                                    }
                                    catch (e) {
                                        yield yield __await(null);
                                        break;
                                    }
                                }
                            });
                        },
                    };
                    return Iterable;
                }),
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.dashboard&apiName=list&version=v1 click to debug }
                 */
                list: (payload, options) => __awaiter(this, void 0, void 0, function* () {
                    const { headers, params, data, path } = yield this.formatPayload(payload, options);
                    return httpInstance
                        .request({
                        url: fillApiPath(`${this.domain}/open-apis/bitable/v1/apps/:app_token/dashboards`, path),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                        .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                }),
            },
        };
    }
}

const defaultLogger = {
    error: (...msg) => {
        console.log('[error]:', ...msg);
    },
    warn: (...msg) => {
        console.warn('[warn]:', ...msg);
    },
    info: (...msg) => {
        console.info('[info]:', ...msg);
    },
    debug: (...msg) => {
        console.debug('[debug]:', ...msg);
    },
    trace: (...msg) => {
        console.trace('[trace]:', ...msg);
    },
};

class LoggerProxy {
    constructor(level, logger) {
        this.level = level;
        this.logger = logger;
    }
    error(...msg) {
        if (this.level >= exports.LoggerLevel.error) {
            this.logger.error(msg);
        }
    }
    warn(...msg) {
        if (this.level >= exports.LoggerLevel.warn) {
            this.logger.warn(msg);
        }
    }
    info(...msg) {
        if (this.level >= exports.LoggerLevel.info) {
            this.logger.info(msg);
        }
    }
    debug(...msg) {
        if (this.level >= exports.LoggerLevel.debug) {
            this.logger.debug(msg);
        }
    }
    trace(...msg) {
        if (this.level >= exports.LoggerLevel.trace) {
            this.logger.trace(msg);
        }
    }
}

class AppTicketManager {
    constructor(params) {
        this.appId = params.appId;
        this.appSecret = params.appSecret;
        this.cache = params.cache;
        this.domain = params.domain;
        this.logger = params.logger;
        this.appType = params.appType;
        this.logger.debug('app ticket manager is ready');
        this.checkAppTicket();
    }
    checkAppTicket() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.appType === exports.AppType.ISV) {
                const appTicket = yield ((_a = this.cache) === null || _a === void 0 ? void 0 : _a.get(CAppTicket));
                if (!appTicket) {
                    this.requestAppTicket();
                }
            }
        });
    }
    requestAppTicket() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('request app ticket');
            yield httpInstance
                .post(`${this.domain}/open-apis/auth/v3/app_ticket/resend`, {
                app_id: this.appId,
                app_secret: this.appSecret,
            })
                .catch((e) => {
                this.logger.error(e);
            });
        });
    }
    getAppTicket() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const appTicket = yield ((_a = this.cache) === null || _a === void 0 ? void 0 : _a.get(CAppTicket));
            if (appTicket) {
                this.logger.debug('use cache app ticket');
                return appTicket;
            }
            yield this.requestAppTicket();
            return undefined;
        });
    }
}

class TokenManager {
    constructor(params) {
        this.appId = params.appId;
        this.appSecret = params.appSecret;
        this.cache = params.cache;
        this.domain = params.domain;
        this.logger = params.logger;
        this.appType = params.appType;
        this.appTicketManager = new AppTicketManager({
            appId: this.appId,
            appSecret: this.appSecret,
            cache: this.cache,
            domain: this.domain,
            logger: this.logger,
            appType: this.appType,
        });
        this.logger.debug('token manager is ready');
    }
    getCustomTenantAccessToken() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const cachedTernantAccessToken = yield ((_a = this.cache) === null || _a === void 0 ? void 0 : _a.get(CTenantAccessToken));
            if (cachedTernantAccessToken) {
                this.logger.debug('use cache token');
                return cachedTernantAccessToken;
            }
            this.logger.debug('request token');
            // @ts-ignore
            const { tenant_access_token, expire } = yield httpInstance
                .post(`${this.domain}/open-apis/auth/v3/tenant_access_token/internal`, {
                app_id: this.appId,
                app_secret: this.appSecret,
            })
                .catch((e) => {
                this.logger.error(e);
            });
            yield ((_b = this.cache) === null || _b === void 0 ? void 0 : _b.set(CTenantAccessToken, tenant_access_token, new Date().getTime() + expire * 1000));
            return tenant_access_token;
        });
    }
    getMarketTenantAccessToken(tenantKey) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!tenantKey) {
                this.logger.error('market app request need tenant key');
                return undefined;
            }
            const ternantAccessToken = yield ((_a = this.cache) === null || _a === void 0 ? void 0 : _a.get(`larkMarketAccessToken${tenantKey}`));
            if (ternantAccessToken) {
                this.logger.debug('use cache token');
                return ternantAccessToken;
            }
            this.logger.debug('get app ticket');
            const appTicket = yield this.appTicketManager.getAppTicket();
            if (!appTicket) {
                this.logger.warn('no app ticket');
                return undefined;
            }
            this.logger.debug('get app access token');
            // 获取app_access_token
            // @ts-ignore
            const { app_access_token } = yield httpInstance
                .post(`${this.domain}/open-apis/auth/v3/app_access_token`, {
                app_id: this.appId,
                app_secret: this.appSecret,
                app_ticket: appTicket,
            })
                .catch((e) => {
                this.logger.error(e);
            });
            this.logger.debug('get tenant access token');
            // 获取tenant_access_token
            // @ts-ignore
            const { tenant_access_token, expire } = yield httpInstance
                .post(`${this.domain}/open-apis/auth/v3/tenant_access_token`, {
                app_access_token,
                tenant_key: tenantKey,
            })
                .catch((e) => {
                this.logger.error(e);
            });
            // 设置tenant_access_token
            yield this.cache.set(`larkMarketAccessToken${tenantKey}`, tenant_access_token, new Date().getTime() + expire * 1000);
            return tenant_access_token;
        });
    }
    getTernantAccessToken(params) {
        return __awaiter(this, void 0, void 0, function* () {
            assert(this.appType === exports.AppType.SelfBuild, () => __awaiter(this, void 0, void 0, function* () {
                this.logger.debug('get custom app token');
            }));
            assert(this.appType === exports.AppType.ISV, () => __awaiter(this, void 0, void 0, function* () {
                this.logger.debug('get market app token ');
            }));
            // prettier-ignore
            const ternantAccessToken = this.appType === exports.AppType.SelfBuild
                ? yield this.getCustomTenantAccessToken()
                : yield this.getMarketTenantAccessToken(get__default["default"](params, CTenantKey));
            return ternantAccessToken;
        });
    }
}

class Client extends Client$1 {
    constructor(params) {
        super();
        this.appId = '';
        this.appSecret = '';
        this.helpDeskId = '';
        this.helpDeskToken = '';
        this.appType = exports.AppType.SelfBuild;
        this.logger = new LoggerProxy(params.loggerLevel || exports.LoggerLevel.info, params.logger || defaultLogger);
        this.appId = params.appId;
        this.appSecret = params.appSecret;
        assert(!this.appId, () => this.logger.error('appId is needed'));
        assert(!this.appSecret, () => this.logger.error('appSecret is needed'));
        this.helpDeskId = params.helpDeskId;
        this.helpDeskToken = params.helpDeskToken;
        this.appType = get__default["default"](params, 'appType', exports.AppType.SelfBuild);
        this.domain = formatDomain(params.domain || exports.Domain.Feishu);
        this.logger.debug(`use domain url: ${this.domain}`);
        this.cache = params.cache || internalCache;
        this.tokenManager = new TokenManager({
            appId: this.appId,
            appSecret: this.appSecret,
            cache: this.cache,
            domain: this.domain,
            logger: this.logger,
            appType: this.appType,
        });
        this.logger.info('client ready');
    }
    formatPayload(payload, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const targetOptions = [
                'lark',
                'params',
                'data',
                'headers',
                'path',
            ].reduce((acc, key) => {
                acc[key] = get__default["default"](options, key, {});
                return acc;
            }, {});
            const userAccessToken = get__default["default"](targetOptions.lark, CWithUserAccessToken);
            if (userAccessToken) {
                this.logger.debug('use passed token');
                targetOptions.headers.Authorization = `Bearer ${userAccessToken}`;
            }
            else if (!this.disableTokenCache) {
                const tenantAccessToken = yield this.tokenManager.getTernantAccessToken({
                    [CTenantKey]: get__default["default"](targetOptions.lark, CTenantKey),
                });
                if (tenantAccessToken) {
                    targetOptions.headers.Authorization = `Bearer ${tenantAccessToken}`;
                }
                else {
                    this.logger.warn('failed to obtain token');
                }
            }
            // helpDeskCredential
            const withHelpDeskCredential = get__default["default"](targetOptions.lark, CWithHelpdeskAuthorization);
            if (withHelpDeskCredential) {
                this.logger.debug('generate help desk credential');
                const helpDeskCredential = string2Base64(`${this.helpDeskId}:${this.helpDeskToken}`);
                targetOptions.headers['X-Lark-Helpdesk-Authorization'] = `Bearer ${helpDeskCredential}`;
            }
            return {
                params: Object.assign(Object.assign({}, get__default["default"](payload, 'params', {})), targetOptions.params),
                headers: Object.assign(Object.assign({}, get__default["default"](payload, 'headers', {})), targetOptions.headers),
                data: Object.assign(Object.assign({}, get__default["default"](payload, 'data', {})), targetOptions.data),
                path: Object.assign(Object.assign({}, get__default["default"](payload, 'path', {})), targetOptions.path),
            };
        });
    }
    request(payload, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, params, headers, url } = payload, rest = __rest(payload, ["data", "params", "headers", "url"]);
            const formatPayload = yield this.formatPayload({
                data,
                params,
                headers,
            }, options);
            this.logger.trace(`send request [${payload.method}]: ${payload.url}`);
            const res = yield httpInstance
                .request(Object.assign(Object.assign({}, rest), {
                url: `${this.domain}/${formatUrl(url)}`,
                headers: formatPayload.headers,
                data: formatPayload.data,
                params: formatPayload.params,
            }))
                .catch((e) => {
                this.logger.error(e);
            });
            return res;
        });
    }
}

const withAll = (withList) => withList.reduce((acc, cur) => merge__default["default"](acc, cur), {});
const withTenantKey = (tenantKey) => ({
    lark: {
        [CTenantKey]: tenantKey,
    },
});
const withHelpDeskCredential = () => ({
    lark: {
        [CWithHelpdeskAuthorization]: true,
    },
});
const withTenantToken = (tenantAccessToken) => ({
    headers: {
        Authorization: `Bearer ${tenantAccessToken}`,
    },
});
const withUserAccessToken = (userAccessToken) => ({
    lark: {
        [CWithUserAccessToken]: userAccessToken,
    },
});

class RequestHandle {
    constructor(params) {
        const { encryptKey, verificationToken, logger } = params;
        this.verificationToken = verificationToken;
        this.encryptKey = encryptKey;
        this.logger = logger;
        if (encryptKey) {
            this.aesCipher = new AESCipher(encryptKey);
        }
    }
    parse(data) {
        const targetData = (() => {
            var _a;
            if ('encrypt' in data) {
                try {
                    return JSON.parse((_a = this.aesCipher) === null || _a === void 0 ? void 0 : _a.decrypt(data.encrypt));
                }
                catch (e) {
                    this.logger.error('parse encrypt data failed');
                    return '';
                }
            }
            return data;
        })();
        // v1和v2版事件的区别：https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM
        if ('schema' in targetData) {
            return Object.assign(Object.assign({ [CEventType]: get__default["default"](targetData, 'header.event_type') }, get__default["default"](targetData, 'header', {})), get__default["default"](targetData, 'event', {}));
        }
        const { event } = targetData, rest = __rest(targetData, ["event"]);
        return Object.assign(Object.assign({ [CEventType]: get__default["default"](targetData, 'event.type') }, event), rest);
    }
    checkIsCardEventValidated(data) {
        const { 'x-lark-request-timestamp': timestamp, 'x-lark-request-nonce': nonce, 'x-lark-signature': signature, } = data.headers;
        if (!this.verificationToken) {
            return true;
        }
        const computedSignature = crypto__default["default"]
            .createHash('sha1')
            .update(timestamp +
            nonce +
            this.verificationToken +
            JSON.stringify(data))
            .digest('hex');
        return computedSignature === signature;
    }
    checkIsEventValidated(data) {
        if (!this.encryptKey) {
            return true;
        }
        const { 'x-lark-request-timestamp': timestamp, 'x-lark-request-nonce': nonce, 'x-lark-signature': signature, } = data.headers;
        const content = timestamp + nonce + this.encryptKey + JSON.stringify(data);
        const computedSignature = crypto__default["default"]
            .createHash('sha256')
            .update(content)
            .digest('hex');
        return computedSignature === signature;
    }
}

const CAppTicketHandle = 'app_ticket';
class EventDispatcher {
    constructor(params) {
        this.verificationToken = '';
        this.encryptKey = '';
        this.handles = new Map();
        const { encryptKey, verificationToken } = params;
        this.encryptKey = encryptKey || '';
        this.verificationToken = verificationToken || '';
        this.logger = new LoggerProxy(params.loggerLevel || exports.LoggerLevel.info, params.logger || defaultLogger);
        this.requestHandle = new RequestHandle({
            encryptKey,
            verificationToken,
            logger: this.logger,
        });
        this.cache = params.cache || internalCache;
        this.registerAppTicketHandle();
        this.logger.info('event-dispatch is ready');
    }
    registerAppTicketHandle() {
        this.register({
            app_ticket: (data) => __awaiter(this, void 0, void 0, function* () {
                const { app_ticket } = data;
                if (app_ticket) {
                    yield this.cache.set(CAppTicket, app_ticket);
                    this.logger.debug('set app ticket');
                }
                else {
                    this.logger.warn('response not include app ticket');
                }
            }),
        });
    }
    register(handles) {
        Object.keys(handles).forEach((key) => {
            if (this.handles.has(key) && key !== CAppTicketHandle) {
                this.logger.error(`this ${key} handle is registered`);
            }
            this.handles.set(key, handles[key]);
            this.logger.debug(`register ${key} handle`);
        });
        return this;
    }
    invoke(data) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = this.requestHandle) === null || _a === void 0 ? void 0 : _a.checkIsEventValidated(data))) {
                this.logger.warn('verification failed event');
                return undefined;
            }
            const targetData = (_b = this.requestHandle) === null || _b === void 0 ? void 0 : _b.parse(data);
            const type = targetData[CEventType];
            if (this.handles.has(type)) {
                const ret = yield this.handles.get(type)(targetData);
                this.logger.debug(`execute ${type} handle`);
                return ret;
            }
            this.logger.warn(`no ${type} handle`);
            return `no ${type} event handle`;
        });
    }
}

class CardActionHandler {
    constructor(params, cardHandler) {
        this.verificationToken = '';
        this.encryptKey = '';
        this.handles = new Map();
        const { verificationToken, encryptKey } = params;
        this.encryptKey = encryptKey || '';
        this.verificationToken = verificationToken || '';
        this.cardHandler = cardHandler;
        this.logger = new LoggerProxy(params.loggerLevel || exports.LoggerLevel.info, params.logger || defaultLogger);
        this.requestHandle = new RequestHandle({
            encryptKey,
            verificationToken,
            logger: this.logger,
        });
        this.cache = params.cache || internalCache;
        this.registerAppTicketHandle();
        this.logger.info('card-action-handle is ready');
    }
    registerAppTicketHandle() {
        this.register({
            app_ticket: (data) => __awaiter(this, void 0, void 0, function* () {
                const { app_ticket } = data;
                if (app_ticket) {
                    yield this.cache.set(CAppTicket, app_ticket);
                    this.logger.debug('set app ticket');
                }
                else {
                    this.logger.warn('response not include app ticket');
                }
            }),
        });
    }
    register(handles) {
        Object.keys(handles).forEach((key) => {
            this.handles.set(key, handles[key]);
            this.logger.debug(`register ${key} handle`);
        });
        return this;
    }
    invoke(data) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = this.requestHandle) === null || _a === void 0 ? void 0 : _a.checkIsCardEventValidated(data))) {
                this.logger.warn('verification failed event');
                return undefined;
            }
            const targetData = (_b = this.requestHandle) === null || _b === void 0 ? void 0 : _b.parse(data);
            const type = targetData[CEventType];
            if (this.handles.has(type)) {
                try {
                    const ret = yield this.handles.get(type)(targetData);
                    return ret;
                }
                catch (e) {
                    this.logger.error(e);
                    return undefined;
                }
            }
            try {
                const result = yield this.cardHandler(targetData);
                this.logger.debug('execute card handle');
                return result;
            }
            catch (e) {
                this.logger.error(e);
            }
            return undefined;
        });
    }
}

const pickRequestData = (req) => new Promise((resolve) => {
    let chunks = '';
    req.on('data', (chunk) => {
        chunks += chunk;
    });
    req.on('end', () => {
        try {
            const data = JSON.parse(chunks);
            resolve(data);
        }
        catch (e) {
            resolve('');
        }
    });
});

const adaptDefault = (path, dispatcher) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.url !== path) {
        return;
    }
    const data = Object.assign(Object.create({
        headers: req.headers,
    }), yield pickRequestData(req));
    const value = yield dispatcher.invoke(data);
    // event don't need response
    if (dispatcher instanceof CardActionHandler) {
        res.end(JSON.stringify(value));
    }
    res.end('');
});

const adaptExpress = (dispatcher, options) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqData = yield (() => __awaiter(void 0, void 0, void 0, function* () {
        if (req.body) {
            return req.body;
        }
        if (!req.complete) {
            const incomingdata = yield pickRequestData(req);
            return incomingdata;
        }
        get__default["default"](options, 'logger', defaultLogger).error('unable to obtain request body, if parsed it in other middleware, please manually set in ctx.request.body');
        return null;
    }))();
    const data = Object.assign(Object.create({
        headers: req.headers,
    }), reqData);
    const value = yield dispatcher.invoke(data);
    // event don't need response
    if (dispatcher instanceof CardActionHandler) {
        res.json(value);
    }
    res.end('');
});

const adaptKoa = (path, dispatcher, options) => (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { originalUrl, req, request } = ctx;
    if (originalUrl === path) {
        const reqData = yield (() => __awaiter(void 0, void 0, void 0, function* () {
            if (request.body) {
                return request.body;
            }
            if (!req.complete) {
                const incomingdata = yield pickRequestData(req);
                return incomingdata;
            }
            get__default["default"](options, 'logger', defaultLogger).error('unable to obtain request body, if parsed it in other middleware, please manually set in ctx.request.body');
            return null;
        }))();
        const data = Object.assign(Object.create({
            headers: req.headers,
        }), reqData);
        const value = yield dispatcher.invoke(data);
        // event don't need response
        if (dispatcher instanceof CardActionHandler) {
            ctx.body = JSON.stringify(value);
        }
        else {
            ctx.body = '';
        }
    }
    yield next();
});

const adaptKoaRouter = (dispatcher, options) => (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { req, request } = ctx;
    const reqData = yield (() => __awaiter(void 0, void 0, void 0, function* () {
        if (request.body) {
            return request.body;
        }
        if (!req.complete) {
            const incomingdata = yield pickRequestData(req);
            return incomingdata;
        }
        get__default["default"](options, 'logger', defaultLogger).error('unable to obtain request body, if parsed it in other middleware, please manually set in ctx.request.body');
        return null;
    }))();
    const data = Object.assign(Object.create({
        headers: req.headers,
    }), reqData);
    const value = yield dispatcher.invoke(data);
    // event don't need response
    if (dispatcher instanceof CardActionHandler) {
        ctx.body = JSON.stringify(value);
    }
    else {
        ctx.body = '';
    }
    yield next();
});

exports.AESCipher = AESCipher;
exports.CardActionHandler = CardActionHandler;
exports.Client = Client;
exports.EventDispatcher = EventDispatcher;
exports.adaptDefault = adaptDefault;
exports.adaptExpress = adaptExpress;
exports.adaptKoa = adaptKoa;
exports.adaptKoaRouter = adaptKoaRouter;
exports.withAll = withAll;
exports.withHelpDeskCredential = withHelpDeskCredential;
exports.withTenantKey = withTenantKey;
exports.withTenantToken = withTenantToken;
exports.withUserAccessToken = withUserAccessToken;
