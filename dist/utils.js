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
const readSync = (dir, result = [], recursive = true) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4QkFBOEI7QUFDOUIsMEJBQTBCO0FBQzFCOzs7R0FHRztBQUNILE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDM0IsTUFBTSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDakMsQ0FBQyxDQUFDO0FBZU8sa0NBQVc7QUFicEIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxNQUFlLEVBQUUsSUFBYSxFQUFFLEVBQUUsQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBYXBFLDBCQUFPO0FBWDdCLE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBVyxFQUFFLFNBQWMsRUFBRSxFQUFFLFlBQXFCLElBQUksRUFBRSxFQUFFO0lBQzVFLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ3pCLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkUsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUM7QUFFNkIsNEJBQVEifQ==