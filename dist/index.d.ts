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
declare const validateJsonWithSchema: (jsonObject: any, schema: any) => {
    isValid: boolean;
    errors: import("ajv").ErrorObject<string, Record<string, any>, unknown>[] | null | undefined;
};
export { generateJsonSchema, validateJsonWithSchema };
