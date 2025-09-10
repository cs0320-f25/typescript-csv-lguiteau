import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
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
  const EMPTY_SPACE_CSV = path.join(__dirname, "data/empty.csv");
  const results = await parseCSV(EMPTY_SPACE_CSV)
  expect(results).toEqual([]);
});

test("parseCSV white space", async () =>{
  const WHITE_SPACE_CSV = path.join(__dirname, "data/whitespace.csv");
  const results = await parseCSV(WHITE_SPACE_CSV)
  expect(results).toEqual([
    ["name", "age"],
    ["Laurianie","19"],
    ["Jonathan", "18"],
    ["Megan", "24"],
    ["Julie", ""]
  ]);
});

test("parseCSV extra commas", async () =>{
  const EXTRA_COMMAS_CSV = path.join(__dirname, "data/extracommas.csv");
  const results = await parseCSV(EXTRA_COMMAS_CSV)
  expect(results).toEqual([
    ["name", "age"],
    ["Laurianie","19"],
    ["Jonathan", "18"],
    ["Megan", "24"],
    ["Julie", "", "", ""]
  ]);
});

test("parseCSV no new line at end", async () =>{
  const NO_NEWLINE_CSV = path.join(__dirname, "data/nonewline.csv");
  const results = await parseCSV(NO_NEWLINE_CSV)
  expect(results).toEqual([
    ["name", "age"],
    ["Laurianie","19"],
    ["Jonathan", "18"],
    ["Megan", "24"],
    ["Julie", ""]
  ]);
});

test("parseCSV single line file", async () =>{
  const SINGLE_LINE_CSV = path.join(__dirname, "data/singleline.csv");
  const results = await parseCSV(SINGLE_LINE_CSV)
  expect(results).toEqual([
    ["name", "age"],
  ]);
} );        

test("parseCSV single cell file", async () =>{
  const SINGLE_CELL_CSV = path.join(__dirname, "data/singlecell.csv");
  const results = await parseCSV(SINGLE_CELL_CSV)
  expect(results).toEqual([
    ["name"],
  ]);
});

test("parseCSV empty cells", async () =>{
  const EMPTY_CELLS_CSV = path.join(__dirname, "data/emptycells.csv");
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
  const SPACES_AROUND_COMMAS_CSV = path.join(__dirname, "data/spacesaroundcommas.csv");
  const results = await parseCSV(SPACES_AROUND_COMMAS_CSV)
  expect(results).toEqual([
    ["name", "age"],
    ["Laurianie","19"],
    ["Jonathan", "18"],
    ["Megan", "24"],
    ["Julie", ""]
  ]);
});

test("parseCSV mixed line endings", async () =>{
  const MIXED_LINE_ENDINGS_CSV = path.join(__dirname, "data/mixedlineendings.csv");
  const results = await parseCSV(MIXED_LINE_ENDINGS_CSV)
  expect(results).toEqual([
    ["name", "age"],
    ["Laurianie","19"],
    ["Jonathan", "18"],
    ["Megan", "24"],
    ["Julie", ""]
  ]);
});

test("parseCSV extra new lines", async () =>{
  const EXTRA_NEW_LINES_CSV = path.join(__dirname, "data/extranewlines.csv");
  const results = await parseCSV(EXTRA_NEW_LINES_CSV)
  expect(results).toEqual([
    ["name", "age"],
    ["Laurianie","19"],
    ["Jonathan", "18"],
    ["Megan", "24"],
    ["Julie", ""]
  ]);
}); 



