"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _path = require("path");
const _fs = require("fs");
/**
 * eg. /api/{id} -> /api/:id
 * @param {String} path
 */
const convertPath = (path) => {
    const re = new RegExp('{(.*?)}', 'g');
    return path.replace(re, ':$1');
};
exports.convertPath = convertPath;
const getPath = (prefix, path) => `${prefix}${path}`.replace('//', '/');
exports.getPath = getPath;
/**
 * check if an object is an instance of SwaggerRouter
 * @param {Object} o
 */
const isSwaggerRouter = (o) => {
    if (!o) {
        return false;
    }
    return true;
};
exports.isSwaggerRouter = isSwaggerRouter;
/**
 * read all files in the dir
 * @param {String} dir
 * @param {Array} result
 * @param {Boolean} recursive
 * @returns {Array} an array containing file url
 */
const readSync = (dir, result = [], recursive = false) => {
    const files = _fs.readdirSync(dir);
    files.forEach((filename) => {
        const filedir = _path.join(dir, filename);
        const stat = _fs.statSync(filedir);
        if (stat.isFile())
            result.push(filedir);
        if (recursive && stat.isDirectory())
            readSync(filedir, result, true);
    });
    return result;
};
exports.readSync = readSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4QkFBOEI7QUFDOUIsMEJBQTBCO0FBQzFCOzs7R0FHRztBQUNILE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDM0IsTUFBTSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDakMsQ0FBQyxDQUFDO0FBa0NPLGtDQUFXO0FBaENwQixNQUFNLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFnQ2xELDBCQUFPO0FBN0I3Qjs7O0dBR0c7QUFDSCxNQUFNLGVBQWUsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQzVCLElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDTixPQUFPLEtBQUssQ0FBQztLQUNkO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUM7QUFvQjZCLDBDQUFlO0FBbEI5Qzs7Ozs7O0dBTUc7QUFDSCxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRSxTQUFjLEVBQUUsRUFBRSxTQUFTLEdBQUcsS0FBSyxFQUFFLEVBQUU7SUFDNUQsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDekIsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDMUMsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFBRSxRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2RSxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQUU4Qyw0QkFBUSJ9