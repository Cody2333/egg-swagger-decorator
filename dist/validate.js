"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InputError extends Error {
    /**
     * Constructor
     * @param {string} field the error field in request parameters.
     */
    constructor(field) {
        super(`incorrect field: '${field}', please check again!`);
        this['field'] = field;
        this['status'] = 400;
    }
}
/**
 * validate the input values
 * @param {Object} input the input object, like request.query, request.body and so on.
 * @param {Object} expect the expect value, Ex: { name: { required: true, type: String }}
 */
function default_1(input, expect) {
    Object.keys(expect).forEach((key) => {
        if (expect[key] === undefined) {
            delete input[key];
            return;
        }
        // if this key is required but not in input.
        if (expect[key].required && input[key] === undefined) {
            throw new InputError(key);
        }
        // if this key is in input, but the type is wrong
        // first check the number type
        if (input[key] !== undefined && expect[key].type === 'number') {
            if (typeof input[key] === 'number') {
                return;
            }
            if (isNaN(Number(input[key]))) {
                throw new InputError(key);
            }
            input[key] = Number(input[key]);
            return;
        }
        // second check the boolean type
        if (input[key] !== undefined && expect[key].type === 'boolean') {
            if (typeof input[key] === 'boolean') {
                return;
            }
            if (input[key] === 'true') {
                input[key] = true;
                return;
            }
            if (input[key] === 'false') {
                input[key] = false;
                return;
            }
            throw new InputError(key);
        }
        // third check the string type
        if (input[key] !== undefined && expect[key].type === 'string') {
            if (typeof input[key] !== 'string') {
                input[key] = String(input[key]);
                return;
            }
            if (Array.isArray(expect[key].enum) && expect[key].enum.length) {
                if (!expect[key].enum.includes(input[key]))
                    throw new InputError(key);
            }
        }
        // forth check the object type
        if (input[key] !== undefined && expect[key].type === 'object') {
            if (typeof input[key] === 'object') {
                return;
            }
            throw new InputError(key);
        }
        // last check the array type
        if (input[key] !== undefined && expect[key].type === 'array') {
            if (input[key] instanceof Array) {
                return;
            }
            throw new InputError(key);
        }
        // if this key is not in input and need a default value
        if (input[key] === undefined && expect[key].default !== undefined) {
            input[key] = expect[key].default;
        }
    });
    return input;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvdmFsaWRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnQkFBaUIsU0FBUSxLQUFLO0lBQzVCOzs7T0FHRztJQUNILFlBQVksS0FBSztRQUNmLEtBQUssQ0FBQyxxQkFBcUIsS0FBSyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUN2QixDQUFDO0NBQ0Y7QUFFRDs7OztHQUlHO0FBQ0gsbUJBQXlCLEtBQUssRUFBRSxNQUFNO0lBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDbEMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQzdCLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLE9BQU87U0FDUjtRQUNELDRDQUE0QztRQUM1QyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUNwRCxNQUFNLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNCO1FBQ0QsaURBQWlEO1FBQ2pELDhCQUE4QjtRQUM5QixJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDN0QsSUFBSSxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0JBQ2xDLE9BQU87YUFDUjtZQUNELElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dC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