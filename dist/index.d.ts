interface JsonSchema {
    type: string;
    properties?: {
        [key: string]: any;
    };
    items?: {
        type: string;
        properties?: {
            [key: string]: any;
        };
    };
    required?: string[];
}
declare const generateJsonSchema: (jsonObject: any) => JsonSchema;
export { generateJsonSchema };
