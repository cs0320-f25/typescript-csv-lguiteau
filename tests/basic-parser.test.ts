import { parseCSV, parsedErrors } from "../src/basic-parser";
import * as path from "path";
import { myFirstSchema, transcriptSchema,itemSchema} from "../src/schemas";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const ITEM_CSV_PATH = path.join(__dirname, "../data/items.csv");
const TRANSCRIPT_CSV_PATH = path.join(__dirname, "../data/transcript.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH) as string[][];
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV empty file", async () =>{
  const EMPTY_SPACE_CSV = path.join(__dirname, "../data/empty.csv");
  const results = await parseCSV(EMPTY_SPACE_CSV)
  expect(results).toEqual([]);
});

test("parseCSV white space", async () =>{
  const WHITE_SPACE_CSV = path.join(__dirname, "../data/whitespace.csv");
  const results = await parseCSV(WHITE_SPACE_CSV)
  expect(results).toEqual([
    ["name", "age"],
    ["Laurianie","19"],
    ["Jonathan", "18"],
    ["Megan", "24"],
    ["Julie", ""]
  ]);
  expect(parsedErrors).toMatch("Validation error");
});

test("parseCSV extra commas", async () =>{
  const EXTRA_COMMAS_CSV = path.join(__dirname, "../data/extracommas.csv");
  const results = await parseCSV(EXTRA_COMMAS_CSV)
  expect(results).toEqual([
    ["name", "age"],
    ["Laurianie","19"],
    ["Jonathan", "18"],
    ["Megan", "24"],
    ["Julie", "", "", ""]
  ]);
});

test("parseCSV empty cells", async () =>{
  const EMPTY_CELLS_CSV = path.join(__dirname, "../data/emptycells.csv");
  const results = await parseCSV(EMPTY_CELLS_CSV)
  expect(results).toEqual([
    ["name", "age"],
    ["Laurianie","19"],
    ["Jonathan", ""],
    ["", "24"],
    ["Julie", ""]
  ]);
});

test("parseCSV spaces around commas", async () =>{
  const SPACES_AROUND_COMMAS_CSV = path.join(__dirname, "../data/spacesaroundcommas.csv");
  const results = await parseCSV(SPACES_AROUND_COMMAS_CSV)
  expect(results).toEqual([
    ["name", "age"],
    ["Laurianie","19"],
    ["Jonathan", "18"],
    ["Megan", "24"],
    ["Julie", "32"]
  ]);
});

//TESTING MY SCHEMAS HERE:

test("parseCSV myFirstSchema", async () => {
  const PEOPLE_CSV_PATH = path.join(__dirname,"../data/people.csv");
  const results = await parseCSV(PEOPLE_CSV_PATH, myFirstSchema);
  expect(results).toEqual([
    {name:"Alice",age:23},
    {name:"Charlie",age:25},
    {name:"Nim",age:22},
  ]);
});

test("parseCSV transcriptSchema third row invalid", async()=>{
  const results = await parseCSV(TRANSCRIPT_CSV_PATH, transcriptSchema);
  expect(results).toEqual([
    {studentName: "Jeff", studentId: 12345, GPA: 2.0, onTrack: false},
    {studentName: "Lena", studentId: 67890, GPA: 3.7, onTrack: true},
    //RACHEL'S ROW IS INVALID BECAUSE HER GPA IS 5.0 WHICH IS GRATER THAN THE MAX OF 4.0, SO HER ROW IS SKIPPED
    {studentName: "Drue", studentId: 24680, GPA: 1.2, onTrack: false},
  ]);
  expect(parsedErrors[0]).toMatch("Validation error");

});

test("parseCSV itemSchema", async()=>{
  const results = await parseCSV(ITEM_CSV_PATH, itemSchema);
  expect(results).toEqual([
    {name: "Yogurt", price: 2, quantity: 15, inStock: true},
    {name: "Laptop", price: 450, quantity: 200, inStock: true},
    {name: "Mirror", price: 32, quantity: 0, inStock: false},
    {name: "Perfume", price: 75, quantity: 0, inStock: false},

  ]);
});

test("parseCSV undefined schema returns array", async()=> {
  const results = await parseCSV(TRANSCRIPT_CSV_PATH, undefined);
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
  expect(results).toEqual([
    ["studentName", "studentId", "GPA", "onTrack"],
    ["Jeff", "12345", "2.0", "false"],
    ["Lena", "67890", "3.7", "true"],
    ["Rachel", "13579", "5.0", "true"],
    ["Drue", "24680", "1.2", "false"],

  ]);
});
