"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonpathmap2 = void 0;
var jsonpath_1 = __importDefault(require("jsonpath"));
//--------------------------------------------------------------------------------------------------
// Handling standard json path
//--------------------------------------------------------------------------------------------------
function jsonpathMapStep1(paramObject, target, isInsideArray) {
    var obj = JSON.parse(JSON.stringify(paramObject));
    var itemList = [];
    var subCallList = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                if (isInsideArray) {
                    obj[key] = jsonpathMapStep1(obj[key], target, isInsideArray);
                    subCallList.push({ key: key, data: obj[key] });
                }
                else {
                    if (Array.isArray(obj[key])) {
                        obj[key] = jsonpathMapStep1(obj[key], target, true);
                        subCallList.push({ key: key, data: obj[key] });
                    }
                    else {
                        obj[key] = jsonpathMapStep1(obj[key], target, false);
                        subCallList.push({ key: key, data: obj[key] });
                    }
                }
            }
            else if ((typeof obj[key] === 'string') && (obj[key].startsWith('$'))) { // Jsonpath query
                if (obj[key].indexOf('[!]') === -1) { // Custom step mode
                    if (isInsideArray) {
                        itemList.push({ key: key, target: target, query: obj[key] });
                    }
                    else {
                        var queryResult = jsonpath_1.default.query(target, obj[key]);
                        if (Array.isArray(queryResult)) {
                            obj[key] = queryResult[0];
                        }
                        else {
                            obj[key] = queryResult;
                        }
                    }
                }
            }
            else if ((typeof obj[key] === 'string') && (obj[key].startsWith('%.'))) { // Integer counter
                var myTarget = obj[key].replace('%.', '$.');
                obj[key] = jsonpath_1.default.query(target, myTarget).length;
            }
            else if ((typeof obj[key] === 'string') && (obj[key].startsWith('#.'))) { // String counter
                var myTarget = obj[key].replace('#.', '$.');
                obj[key] = jsonpath_1.default.query(target, myTarget).length.toString();
            }
        }
        else {
            throw new Error('NOT hasOwnProperty');
        }
    }
    if (itemList.length !== 0) { // Inside array mode handling
        var objectList_1 = [];
        var isFirst_1 = true;
        itemList.forEach(function (item) {
            var queryResult = jsonpath_1.default.query(item.target, item.query);
            if (isFirst_1) {
                queryResult.forEach(function (queryItem) {
                    var myObject = {};
                    if (itemList.length === 1 && item.key === '0') {
                        myObject = queryItem;
                    }
                    else {
                        myObject["".concat(item.key)] = queryItem;
                    }
                    objectList_1.push(myObject);
                });
                isFirst_1 = false;
            }
            else {
                queryResult.forEach(function (queryItem, index) {
                    objectList_1[index]["".concat(item.key)] = queryItem;
                });
            }
        });
        obj = objectList_1;
        obj.forEach(function (v) {
            subCallList.forEach(function (x) {
                v["".concat(x.key)] = x.data;
            });
        });
    }
    else {
        if (Array.isArray(obj) && Array.isArray(obj[0])) { // ArrayMode result cleanup
            obj = obj[0];
        }
    }
    return obj;
}
//--------------------------------------------------------------------------------------------------
// Handling Custom step
//--------------------------------------------------------------------------------------------------
function jsonpathMapStep2(paramObject, target, index, arrayCount) {
    var obj = JSON.parse(JSON.stringify(paramObject));
    var queryResult = [];
    var isFirst = true;
    var _loop_1 = function (key) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                if (Array.isArray(obj[key])) {
                    var count = arrayCount !== 0 ? arrayCount : obj[key].length;
                    obj[key] = jsonpathMapStep2(obj[key], target, index++, count);
                }
                else {
                    obj[key] = jsonpathMapStep2(obj[key], target, index++, arrayCount);
                }
            }
            else if ((typeof obj[key] === 'string') && (obj[key].indexOf('[!].') !== -1)) {
                var convertedQuery = obj[key].replace('[!].', "[".concat(index, "]."));
                var queryOutput = jsonpath_1.default.query(target, convertedQuery);
                if (isFirst) {
                    queryOutput.forEach(function (x) {
                        var myObject = {};
                        myObject["".concat(key)] = x;
                        queryResult.push(myObject);
                    });
                }
                else {
                    queryOutput.forEach(function (x, index) {
                        queryResult[index]["".concat(key)] = x;
                    });
                }
                isFirst = false;
            }
        }
        else {
            throw new Error('NOT hasOwnProperty');
        }
    };
    for (var key in obj) {
        _loop_1(key);
    }
    if (queryResult.length !== 0) {
        obj = queryResult;
    }
    else if (Array.isArray(obj) && Array.isArray(obj[0])) { // ArrayMode result cleanup
        obj = obj[0];
    }
    return obj;
}
//--------------------------------------------------------------------------------------------------
function jsonpathmap2(targetStructure, dataObject) {
    var result;
    result = jsonpathMapStep1(targetStructure, dataObject, false);
    if (JSON.stringify(result).indexOf('[!].') !== -1) { // Need custom operation
        result = jsonpathMapStep2(result, dataObject, 0, 0);
    }
    return result;
}
exports.jsonpathmap2 = jsonpathmap2;
//# sourceMappingURL=jsonpathmap2.js.map