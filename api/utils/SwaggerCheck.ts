import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPI } from 'openapi-types';
import * as AJV from 'ajv';
import { ValidateType } from './ValidateTypes';

class SwaggerCheck {
	swaggerpath: string;
	apiDefinition: OpenAPI.Document<any> | undefined;
	ajv = new AJV.default({
		meta: true,
		coerceTypes: false,
		allErrors: true,
		unknownFormats: ['int32', 'int64', 'double'],
	});

	constructor(swaggerpath: string) {
		this.swaggerpath = swaggerpath;
		this.setUpSwaggerApi();
	}

	setUpSwaggerApi(): void {
		SwaggerParser.validate(this.swaggerpath, (err, api) => {
			if (err) throw err;
			else this.apiDefinition = api;
		});
	}

	validateSchema(endpoint: string, method: string, response: number, body: any): ValidateType[] {
		// Postman library Ajv
		const result: ValidateType[] = [];
		let schema = JSON.parse(JSON.stringify(this.apiDefinition));
		this.ajv.validateSchema(schema);
		schema = schema.paths[endpoint][method].responses[response].content['application/json'].schema;
		const valid = this.ajv.validate(schema, body);
		if (!valid) {
			this.ajv.errors?.forEach((error) => {
				console.log(`*** ${error.dataPath}: ${error.message} ->`.red, error.params, '** schemaPath:'.red, error.schemaPath);
				result.push({ message: error.message, argument: error.dataPath, stack: error.schemaPath });
			});
			return result;
		} else return result;
	}
}

export { SwaggerCheck };
