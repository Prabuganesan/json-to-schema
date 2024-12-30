"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJsonWithSchema = exports.generateJsonSchema = void 0;
const ajv_1 = __importDefault(require("ajv"));
const generateJsonSchema = (jsonObject) => {
    const schema = {
        type: Array.isArray(jsonObject) ? "array" : "object",
        properties: {},
        required: [] // Initialize required as an empty array
    };
    const getType = (value) => {
        if (Array.isArray(value)) {
            return "array";
        }
        else if (value && typeof value === "object") {
            // Handle special object types (Date, RegExp, etc.)
            if (value instanceof Date) {
                return "string"; // Dates are represented as strings in JSON
            }
            else if (value instanceof RegExp) {
                return "string"; // Regular expressions are stored as strings
            }
            return "object"; // Generic object
        }
        else {
            return typeof value; // Primitive types (string, number, etc.)
        }
    };
    const processObject = (obj, required = []) => {
        const properties = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                const type = getType(value);
                properties[key] = { type };
                if (type === "object") {
                    // Recursively process nested objects and collect required fields for this level
                    properties[key].properties = processObject(value, []);
                    // If a nested object has required fields, add them to its own `required` field
                    if (properties[key].properties && Object.keys(properties[key].properties).length > 0) {
                        properties[key].required = Object.keys(properties[key].properties);
                    }
                }
                else if (type === "array") {
                    if (value.length > 0) {
                        // Check the type of the first element
                        const firstElementType = getType(value[0]);
                        if (firstElementType === "object") {
                            // Handle arrays of objects (nested objects)
                            properties[key].items = { type: "object", properties: processObject(value[0], []) };
                        }
                        else {
                            // Handle arrays of primitive types (string, number, etc.)
                            properties[key].items = { type: firstElementType };
                        }
                    }
                    else {
                        // Empty arrays - use "any" type for items
                        properties[key].items = { type: "any" };
                    }
                }
                // Mark required fields only if they exist (don't mark null or undefined values)
                if (value !== null && value !== undefined) {
                    required.push(key);
                }
            }
        }
        return properties;
    };
    if (Array.isArray(jsonObject)) {
        // If the root object is an array, handle array-specific logic
        schema.items = { type: getType(jsonObject[0]) }; // Assuming all items are of the same type
        if (jsonObject.length > 0 && typeof jsonObject[0] === "object") {
            schema.items = { type: "object", properties: processObject(jsonObject[0], []) };
        }
        else if (jsonObject.length > 0) {
            schema.items = { type: typeof jsonObject[0] };
        }
        else {
            schema.items = { type: "any" }; // Empty array, assign type "any"
        }
    }
    else {
        // Process object case
        schema.properties = processObject(jsonObject, schema.required);
    }
    // Remove duplicates in the required array (if any)
    schema.required = [...new Set(schema.required)];
    // If the root is an array, don't need properties and required
    if (Array.isArray(jsonObject)) {
        delete schema.properties;
        delete schema.required;
    }
    return schema;
};
exports.generateJsonSchema = generateJsonSchema;
//Validate JSON against a schema using Ajv
const validateJsonWithSchema = (jsonObject, schema) => {
    const ajv = new ajv_1.default();
    const validate = ajv.compile(schema);
    const isValid = validate(jsonObject);
    if (!isValid) {
        return {
            isValid: false,
            errors: validate.errors,
        };
    }
    return {
        isValid: true,
        errors: null,
    };
};
exports.validateJsonWithSchema = validateJsonWithSchema;
