import { newsRowSchema, z } from './schema.ts'

export type NewsTableRow = z.infer<typeof newsRowSchema>
