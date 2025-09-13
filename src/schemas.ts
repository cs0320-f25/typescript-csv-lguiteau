import {object, z} from "zod";

export const myFirstSchema = z.object({
    name: z.string(),
    age: z.coerce.number().positive(),
});

export type firstSchema = z.infer<typeof myFirstSchema>;

export const itemSchema = z.object({
    name: z.string(),
    price: z.coerce.number().positive(),
    quantity: z.coerce.number(),
    inStock: z.boolean().default(true),
});
export type item = z.infer<typeof itemSchema>;

export const transcriptSchema = z.object({
    studentName: z.string(),
    studentId: z.number().int(),
    GPA: z.coerce.number().min(0).max(4),
    onTrack: z.coerce.boolean().default(true),
});
export type transcript = z.infer<typeof transcriptSchema>;


