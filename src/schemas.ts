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
    inStock: z.string().transform((s) => s.toLowerCase()==='true'), 
    //instead of doing z.boolean() because the CSV has the strings "true" and "false", we transform the string to a boolean instead 
    //because it kept recognizing my false as true since it's a non-empty string, and my parser was returning true for everything 
    //that wasn't an empty string

});
export type item = z.infer<typeof itemSchema>;

export const transcriptSchema = z.object({
    studentName: z.string(),
    studentId: z.coerce.number(),
    GPA: z.coerce.number().min(0).max(4),
    onTrack: z.string().transform((s) => s.toLowerCase()==='true'),
});
export type transcript = z.infer<typeof transcriptSchema>;


