# Genkit Node.js Notebooks Examples

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Environment variables:**
   - Copy `.env.example` to `.env` and update with your credentials if required.
   - Some scripts has the `GENKIT_ENV=dev` environment variable that allows them to connect with Genkit UI.

3. You can start the Genkit UI by running `genkit ui:start` command.

4. **Recommended VSCode Extension:**
   - [Node.js REPL (TypeScript/JavaScript Notebooks)](https://marketplace.visualstudio.com/items?itemName=donjayamanne.typescript-notebook)


## Environment Variables

This project requires several environment variables to be set. Copy `.env.example` to `.env` and fill in the required values. Below is an explanation of each variable:

- **GEMINI_API_KEY**: Your API key for Google Gemini (Google AI) services. Required for accessing Gemini models. Get your API Key at https://aistudio.google.com/apikey
- **GCLOUD_LOCATION**: The Google Cloud location/region to use (e.g., `us-central1`).
- **GCLOUD_PROJECT**: Your Google Cloud project ID.
- **GOOGLE_APPLICATION_CREDENTIALS**: The absolute path to your Google Cloud service account JSON credentials file. This is required for authenticating with Vertex AI and other Google Cloud services. Create one at https://cloud.google.com/iam/docs/service-accounts-create

Make sure to keep your credentials secure and never commit your `.env` file to version control.


## Available Scripts

All scripts use [tsx](https://github.com/esbuild-kit/tsx) for TypeScript execution.

| Script          | Command                    | Description                                 | Genkit UI |
|-----------------|----------------------------|---------------------------------------------|-----------|
| Getting Started | `npm run gs`               | Runs the getting started example            | No        |
| Dotprompt       | `npm run dotprompt`        | Runs the dotprompt example.                 | Yes       |
| Agent           | `npm run agent`            | Runs the agent example                      | No        |
| Codereview      | `npm run codereview`       | Runs the AI code review example             | No        |


## Project Structure

- `examples/` — Example scripts for different Genkit features
- `notebooks/` — Interactive notebooks
- `prompts/` — Prompt templates
- `common/` — Shared models and utilities

---
For more details, see the source code in each example folder.
