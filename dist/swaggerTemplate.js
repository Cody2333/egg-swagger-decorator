"use strict";
/**
 * init swagger definitions
 * @param {String} title
 * @param {String} description
 * @param {String} version
 * @param {Object} options other options for swagger definition
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (title, description, version, options = {}) => (Object.assign({
    info: { title, description, version },
    paths: {},
    responses: {},
}, {
    definitions: {},
    tags: [],
    swagger: '2.0',
    securityDefinitions: {
        ApiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization'
        }
    },
}, options));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhZ2dlclRlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3N3YWdnZXJUZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILGtCQUFlLENBQ2IsS0FBYSxFQUNiLFdBQW1CLEVBQ25CLE9BQWUsRUFDZixPQUFPLEdBQUcsRUFBRSxFQUNaLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQ2pCO0lBQ0UsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUU7SUFDckMsS0FBSyxFQUFFLEVBQUU7SUFDVCxTQUFTLEVBQUUsRUFBRTtDQUNkLEVBQ0Q7SUFDRSxXQUFXLEVBQUUsRUFBRTtJQUNmLElBQUksRUFBRSxFQUFFO0lBQ1IsT0FBTyxFQUFFLEtBQUs7SUFDZCxtQkFBbUIsRUFBRTtRQUNuQixVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsUUFBUTtZQUNkLEVBQUUsRUFBRSxRQUFRO1lBQ1osSUFBSSxFQUFFLGVBQWU7U0FDdEI7S0FDRjtDQUNGLEVBQ0QsT0FBTyxDQUVSLENBQUMsQ0FBQyJ9