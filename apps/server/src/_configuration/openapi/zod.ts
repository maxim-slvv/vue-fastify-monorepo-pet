import { zodToJsonSchema } from 'zod-to-json-schema'
import type { ZodTypeAny } from 'zod'

export function createResponseSchema(schema: ZodTypeAny): { response: Record<number, unknown> } {
  return {
    response: {
      200: zodToJsonSchema(schema, { $refStrategy: 'none', target: 'openApi3' }),
    },
  }
}

export function createFullSchema(
  params?: { schema: ZodTypeAny; name: string },
  body?: { schema: ZodTypeAny; name: string },
  response?: { schema: ZodTypeAny; name: string },
): Record<string, unknown> {
  return {
    ...(params && {
      params: zodToJsonSchema(params.schema, { $refStrategy: 'none', target: 'openApi3' }),
    }),
    ...(body && {
      body: zodToJsonSchema(body.schema, { $refStrategy: 'none', target: 'openApi3' }),
    }),
    ...(response && {
      response: {
        200: zodToJsonSchema(response.schema, { $refStrategy: 'none', target: 'openApi3' }),
      },
    }),
  }
}

export function createResponseWithExample(
  schema: ZodTypeAny,
  example: unknown,
): {
  response: Record<
    number,
    {
      description: string
      content: { 'application/json': { schema: ZodTypeAny; example: unknown } }
    }
  >
} {
  return {
    response: {
      200: {
        description: 'Successful response',
        content: {
          'application/json': {
            schema,
            example,
          },
        },
      },
    },
  }
}
