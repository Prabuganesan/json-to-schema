const { generateJsonSchema,validateJsonWithSchema } = require('./dist');

const jsonObject = {
  name: "John Doe",
  age: 30,
  isEmployed: true,
  address: {
    street: "123 Main St",
    city: "Somewhere",
    zipcodes: ["12345",'76565'],
    other:{test:"value"

    }
  },
  skills: ["JavaScript", "Node.js"]
};


const schema = generateJsonSchema(jsonObject);
console.log("Generated Schema:", JSON.stringify(schema, null, 2));

const validationResult = validateJsonWithSchema(jsonObject, schema);
if (validationResult.isValid) {
  console.log("JSON is valid against the schema!");
} else {
  console.error("Validation errors:", validationResult.errors);
}
