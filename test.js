const { generateJsonSchema } = require('./dist');

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

console.log(JSON.stringify(generateJsonSchema(jsonObject),null,2));
