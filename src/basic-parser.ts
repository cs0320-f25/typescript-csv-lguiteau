import * as fs from "fs";
import { parse } from "path";
import * as readline from "readline";
import { z, ZodType, ZodSafeParseResult, ZodError} from "zod";


/**
 * This is a JSDoc comment. Similar to JavaDoc, it documents a public-facing
 * function for others to use. Most modern editors will show the comment when 
 * mousing over this function name. Try it in run-parser.ts!
 * 
 * File I/O in TypeScript is "asynchronous", meaning that we can't just
 * read the file and return its contents. You'll learn more about this 
 * in class. For now, just leave the "async" and "await" where they are. 
 * You shouldn't need to alter them.
 * 
 * @param path The path to the file being loaded.
 * @returns a "promise" to produce a 2-d array of cell values
 */

export const parsedErrors: string[] = [] //made a global variable so that I don't have to change the return type of the parseCSV function


export async function parseCSV<T>(path: string, schema?: ZodType<T>): Promise<string[][] | T[] > {
  // This initial block of code reads from a file in Node.js. The "rl"
  // value can be iterated over in a "for" loop. 

  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // handle different line endings
  });

  
  const ogRows: string[][] = []; // (for no schema) initializing an empty array of arrays that hold the original rows (an arrary of string arrays) 
  const parsedRows: T[] = []; // (for schema) initializing an empty array to store the parsed rows/objects
  // const errors: string[] = [];
  let headers: string [] | null = null; //initializing headers as an array of strings or null 

  parsedErrors.length = 0; //clearing the parsedErrors array before each run
  
  // We add the "await" here because file I/O is asynchronous. 
  // We need to force TypeScript to _wait_ for a row before moving on. 
  // More on this in class soon!
  for await (const line of rl) {
    const values = line.split(",").map((v) => v.trim());

    if (!headers){ //first iteration is when headers is null, so I assign the first row values to headers
      headers = values.map(v => v.replace(/^\uFEFF/, "")); //if headers is null then set it to the first row of values and strip any BOM characters
      
      if (!schema){
        ogRows.push(values); //if there is no schema, push the values to the original rows array
        continue; //makes sure the ehader row is handled separately and not parsed as an object
      }
    }

    if(schema == undefined){
      ogRows.push(values); //if there is no schema, push the values to the original rows array
    } 

    else { //if there is a schema, parse the values into objects and put into the parsedRows array using the headers
      const newObject: {[key: string]: unknown} = {}; //creating a newobject that with hold the key-value pairs for each header and its subsequent value
      headers.forEach((header, i) =>{
        newObject[header] = values[i]|| ""; //assigning each header to its corresponding value, if there is no value assign it to an empty string
      });


      const results: ZodSafeParseResult<T> = schema.safeParse(newObject); //this parses the newObject using the schema and returns a ZodSafeParseResult object

    if (results.success){ //if the parsing was successful, push the parsed object to the parsedRows array}
      parsedRows.push(results.data);
    }
    else{
      let rowInfo = "";
      for (const key in newObject){
            rowInfo += key + ":" + newObject[key] + ", ";
          }
      let errorMessage = results.error.issues.map(issue => issue.message).join(",");
      parsedErrors.push("Validation error(s) in row {" + rowInfo + "} : " + errorMessage);   

    }     
  }
}
if (!schema){return ogRows;}
return parsedRows 
}
