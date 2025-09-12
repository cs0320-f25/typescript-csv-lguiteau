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

            My intial ideas were edge cases/enhancements such as: Empty lines/empty files, white space/blank space, multiple commas/special characters, and different types of delimiters. The LLM suggested numerous other edge cases an enhancements such as: Empty lines, missing values, add header normalization, inconsistent row length, embedded quotes, malformed lines, support optional row mapping. I 

### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project:
#### Link to GitHub Repo:  
