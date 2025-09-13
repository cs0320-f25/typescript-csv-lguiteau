# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.
    - Empty lines/empty files
    - White space/blank space
    - Multiple commas/special characters
    - Different types of delimiters
    

- #### Step 2: Use an LLM to help expand your perspective.
    - LLM inital prompt: I’m working on a CSV parser in TypeScript that currently accepts a filename as input and converts rows into strings or objects. What are some missing features or edge cases that I should consider? What improvements would make it easier for other developers to use in different kinds of apps?
    - Initial edge case suggestions: 
        - Empty lines
        - Missing values
        - Add header normalization 
        - Inconsistent row length
        - Embedded quotes
        - Malformed lines
        - Support optional row mapping 

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    - Functionality: What might be broken or underspecified in the functionality, in terms of the CSV specification? 
        - Empty lines/Empty files (Both me and the LLM)
            User story: As a user of the applicationb, I am able to easily handle empty files and skip blank lines in a CSV so that I don't come across errors or invalid data when processing files that have missing content or whitespace. 
            Acceptance Criteria: 
             - The parser returns an empty array when the file is empty
             - Lines that are entirely blank are skipped
             - The parser does not through an error only if the file is completely empty

            
        - Inconsistent row length (LLM)
            User story: As a user of the application, I am able to detect rows of different lengths and throw an error so that I can avoid processing corrupt or incomplete data. 
            Acceptance Criteria:
             - The parser can identify through comparison whether a row contains the number of expected fields 
             - If a row does not meet the number of expected fields, an error is thrown
             - The error identifies which lines are not meeting expectations

    - Extensibility: What could the function do better from the perspective of a caller? Think in terms of validation, error handling, what the caller might need to do with the function, etc.

        - Add configuration of special characters (Both me ["multiple commas/special characters"] and LLM)
            User story: As a user/developer of the application, I am able to configure extra commas and/or special characters to make my CSV flexible and still be able to parse CSVs with different/custom rules. 
            Acceptance criteria: 
             - The user can determine which characters the parser should consider to be special characters
             - The user can determine which character should be used as the delimiter
             - The parser uses standard CSV rules if nothing is specified

        - Add header normalization (LLM)
            User story: As a user/developer of the application, I am able to normalize headers so that I am simplify the data and avoid future bugs.
            Acceptance criteria: 
             - The header is automatically normalized depending on user/developer prefence using a configuration option
             - An error is thrown if their is no configuration option when the parser is run
             - The parser stops running if the error is thrown

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

            My intial ideas were edge cases/enhancements such as: Empty lines/empty files, white space/blank space, multiple commas/special characters, and different types of delimiters; the LLM suggested numerous other edge cases an enhancements such as: empty lines, Missing values, inconsistent row length, embedded quotes, and malformed lines. For my first prompt change, I included that the CSV parser accepts a filename as input and converts rows into strings that recognizes and ignores missing values and/or inconsistent row lengths, to which the LLM suggested that I watch out for delimiters, header row support, and cosistent type coercion. On my second prompt change, I included that, similar to the first prompt change, the parser accepts a filename as input and converts rows into strings that recognizes and ignores missing values and/or inconsistent row lengths as well as recognizes embedded quotes, malformed lines, and empty lines. In response to this the LLM still suggested custom delimiters and header row support, but also introduces data type inference/schema support, quoted fields with line breaks, and row number tracking. Out of all of the suggestions, header row support, empty lines, and recognizing embedded quotes stuck with me the most because their necessity was more apparent, whereas the others seemed to be more optional. 

### Design Choices
- I have included various comments that explain my thinking/the logic behind some of the decisions I made while editing the parser.
- I decided to include error messages that describe the row the error is found on.
- I made several different CSVs for my various test cases for both Task A and for Task C in order to test different functionalities of my schemas


### 1340 Supplement

- #### 1. Correctness
I think that several things can make a CSV parser “correct”. Starting off, properly handling delimiters, meaning that the parser correctly splits on a comma (or whatever is specified for that particular CSV), preserving the order of the fields, consistent row structure, maintains all original character used in the input, and is able to handle malformed rows/input. 
- #### 2. Random, On-Demand Generation
If I had a function  that was able to produce random, on-demand CSVs, I would be able to test my parser against a large range of data and catch very small bugs. Therefore, this would be very helpful in finding edge cases, ensuring consistency, improving the range of possible input formats, and ensuring that my parser is robust enough. 
- #### 3. Overall experience, Bugs encountered and resolved
This sprint differed from previous assignments I have done in the sense that I felt as though it was pretty vague, which left a lot of the implementation and design choices up to me. I was surprised by how much I relied on the lecture notes and the handout to uncover how to solve some of the issues present in my code. I did encounter some bugs, and unfortunately I did not have the ability to fully fix them. One of the main bugs I encountered was with my error messaging; I'm pretty sure that my error code logic is performing correctly, but i'm not entirely sure if the user is able to "see" it or if I'm enountering the same issue the just logging the error to the console brings forth. Also, two of tests (initially made for TASK A) are not passing, and I cannot seem to figure out the reason as to why. 
. 
#### Errors/Bugs: I'm having some bugs with the error messaging. 
Initially, my tests passed, but once I implemented the error messaging, some of the tests started failing (empty file) and (white space), and I cannot seem to understand why. 
#### Tests:
#### How To…

#### Team members and contributions (include cs logins): 
I didn't have any team members.

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
I used Copilot only on the portions of the project that it was allowed (not Task C), and copilot helped with the first few tests I created before I disabled the feature for it to automatically fill in my code before I type it. (I'm not sure if I should go into more detail or exactly how to show my copilot history, but I can show my mentor my log if needed).
#### Total estimated time it took to complete project: 
14 hours
#### Link to GitHub Repo:  
