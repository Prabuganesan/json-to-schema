**json-to-schema**

json-to-schema is a lightweight and powerful utility that generates JSON Schema from a given JSON object. It automatically detects the structure of the JSON, including nested objects and arrays, and generates a corresponding schema that can be used for validation, documentation, and other purposes.

**Features**

*  Generates JSON Schema from any JSON object.
*  Handles nested objects and arrays efficiently.
*  Supports primitive types such as string, number, boolean, and more.
*  Automatically identifies required fields based on non-null/undefined values.
*  Handles edge cases such as Date and RegExp.

## ❤️ Support My Work!
Maintaining this package requires effort and dedication. If this project helped you, consider buying me a coffee or supporting me via PayPal. Every donation helps keep this project alive!  

[![Support via PayPal](https://img.shields.io/badge/Support-PayPal.me-blue?style=for-the-badge&logo=paypal)](https://paypal.me/prabuganesan)

**Installation**

You can install json-to-schema via npm:
```
npm install json-to-schema
```
**Usage**

## Generate schema Against a JSON
```
import { generateJsonSchema } from 'json-to-schema';

const jsonObject = {
  name: "John Doe",
  age: 30,
  isEmployed: true,
  address: {
    street: "123 Main St",
    city: "Somewhere",
    zipcode: "12345"
  },
  skills: ["JavaScript", "Node.js"]
};

const schema = generateJsonSchema(jsonObject);
console.log(JSON.stringify(schema, null, 2));
```

**Handling Arrays**

If your JSON object contains arrays, json-to-schema will handle them correctly by generating the items key instead of properties and required.

Example:
```
const jsonArray = [
  { "name": "John Doe", "age": 30 },
  { "name": "Jane Smith", "age": 28 }
];

const schema = generateJsonSchema(jsonArray);
console.log(JSON.stringify(schema, null, 2));
```
**Output Schema Example**

For the following input:
```
const jsonObject = {
  name: "John Doe",
  age: 30,
  isEmployed: true,
  address: {
    street: "123 Main St",
    city: "Somewhere",
    zipcode: "12345"
  },
  skills: ["JavaScript", "Node.js"]
};
```

The generated schema will look like:
```
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "number" },
    "isEmployed": { "type": "boolean" },
    "address": {
      "type": "object",
      "properties": {
        "street": { "type": "string" },
        "city": { "type": "string" },
        "zipcode": { "type": "string" }
      },
      "required": ["street", "city", "zipcode"]
    },
    "skills": {
      "type": "array",
      "items": { "type": "string" }
    }
  },
  "required": ["name", "age", "isEmployed", "address", "skills"]
}
```

**Supported Types**


*  Primitive Types: string, number, boolean, null, undefined
*  Objects: Handles nested objects and creates properties for them.
*  Arrays: Handles arrays and defines the items key, inferring the type of elements inside the array.

## Validate JSON Against a Schema

This package also supports validating JSON data against a schema using Ajv.

Example:

```
import { generateJsonSchema, validateJsonWithSchema } from "json-to-schema-generator";

const jsonObject = {
  name: "John Doe",
  age: 30,
  isEmployed: true,
};

const schema = generateJsonSchema(jsonObject);

const validationResult = validateJsonWithSchema(jsonObject, schema);
if (validationResult.isValid) {
  console.log("JSON is valid!");
} else {
  console.error("Validation errors:", validationResult.errors);
}
```

**License**

This project is licensed under the MIT License. See the LICENSE file for details.

