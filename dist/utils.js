"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _path = require("path");
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
function loadSwaggerClassesToContext(app) {
    const opt = {
        call: false,
        caseStyle: 'lower',
        directory: _path.join(app.config.baseDir, 'app/controller'),
        typescript: true,
    };
    app.loader.loadToApp(opt.directory, 'swaggerControllerClasses', opt);
}
exports.loadSwaggerClassesToContext = loadSwaggerClassesToContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4QkFBOEI7QUFDOUI7OztHQUdHO0FBQ0gsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUMzQixNQUFNLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNqQyxDQUFDLENBQUM7QUFjTyxrQ0FBVztBQVpwQixNQUFNLE9BQU8sR0FBRyxDQUFDLE1BQWUsRUFBRSxJQUFhLEVBQUUsRUFBRSxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFZcEUsMEJBQU87QUFWN0IscUNBQXFDLEdBQWdCO0lBQ25ELE1BQU0sR0FBRyxHQUFHO1FBQ1YsSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsT0FBTztRQUNsQixTQUFTLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQztRQUMzRCxVQUFVLEVBQUUsSUFBSTtLQUNqQixDQUFDO0lBQ0YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSwwQkFBMEIsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN2RSxDQUFDO0FBRThCLGtFQUEyQiJ9