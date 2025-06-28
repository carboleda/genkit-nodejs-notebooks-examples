# Genkit Node.js Notebooks Examples

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Environment variables:**
   - Copy `.env.example` to `.env` and update with your credentials if required.
   - Some scripts require the `GENKIT_ENV=dev` environment variable (see below).

3. **Recommended VSCode Extension:**
   - [Node.js REPL (TypeScript/JavaScript Notebooks)](https://marketplace.visualstudio.com/items?itemName=donjayamanne.typescript-notebook)

## Available Scripts

All scripts use [tsx](https://github.com/esbuild-kit/tsx) for TypeScript execution.

| Script      | Command                                                      | Description                                 |
|-------------|--------------------------------------------------------------|---------------------------------------------|
| Getting Started | `npm run gs`                                             | Runs the getting started example            |
| Genkit UI   | `genkit ui:start`                                            | Starts the Genkit UI                        |
| Dotprompt   | `npm run dotprompt`                                          | Runs the dotprompt example (with watch)     |
| Agent       | `npm run agent`                                              | Runs the agent example                      |

## How to Run Scripts

- **Run Getting Started Example:**
  ```sh
  npm run gs
  ```
- **Start Genkit UI:**
  ```sh
  genkit ui:start
  ```
- **Run Dotprompt Example:**
  ```sh
  npm run dotprompt
  ```
- **Run Agent Example:**
  ```sh
  npm run agent
  ```

## Project Structure

- `examples/` — Example scripts for different Genkit features
- `notebooks/` — Interactive notebooks
- `prompts/` — Prompt templates
- `common/` — Shared models and utilities

---
For more details, see the source code in each example folder.
