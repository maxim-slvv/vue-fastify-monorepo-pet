import { zodToJsonSchema } from 'zod-to-json-schema'
import type { ZodTypeAny } from 'zod'

export function createResponseSchema(
  schema: ZodTypeAny,
  name: string,
): { response: Record<number, unknown> } {
  return {
    response: {
      200: zodToJsonSchema(schema, { name, $refStrategy: 'none', target: 'openApi3' }),
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
      params: zodToJsonSchema(params.schema, {
        name: params.name,
        $refStrategy: 'none',
        target: 'openApi3',
      }),
    }),
    ...(body && {
      body: zodToJsonSchema(body.schema, {
        name: body.name,
        $refStrategy: 'none',
        target: 'openApi3',
      }),
    }),
    ...(response && {
      response: {
        200: zodToJsonSchema(response.schema, {
          name: response.name,
          $refStrategy: 'none',
          target: 'openApi3',
        }),
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
    { content: { 'application/json': { schema: unknown; example: unknown } } }
  >
} {
  return {
    response: {
      200: {
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
