# Genkit Node.js Notebooks Examples

## Project Structure

- `examples/` — Example scripts for different Genkit features
- `notebooks/` — Interactive notebooks
- `prompts/` — Prompt templates
- `common/` — Shared models and utilities

## Setup

1. **Setup Genkit**
   > https://genkit.dev/docs/get-started/#install-genkit-packages

1. **Install Node.js REPL (TypeScript/JavaScript Notebooks) VSCode Extension:**
   > [Node.js REPL (TypeScript/JavaScript Notebooks)](https://marketplace.visualstudio.com/items?itemName=donjayamanne.typescript-notebook)

   *This is extension is required to execute the Notebooks*

1. **Install dependencies:**
   ```sh
   npm install
   ```

1. **Environment variables:**
- Copy `.env.example` to `.env` and update with your credentials if required.
- Some scripts has the `GENKIT_ENV=dev` environment variable that allows them to connect with Genkit UI.

## Environment Variables

This project requires several environment variables to be set. Copy `.env.example` to `.env` and fill in the required values. Below is an explanation of each variable:

- **GEMINI_API_KEY**: Your API key for Google Gemini (Google AI) services. Required for accessing Gemini models. Get your API Key at https://aistudio.google.com/apikey
- **OPENAI_API_KEY**: Your API key for OpenAI services. Required for accessing OpenAI models. Get your API Key at https://platform.openai.com/signup
- **TAVILY_API_KEY**: Your API key for Tavily services. Required for accessing Tavily features. Get your API Key at https://www.tavily.com/
- **WEATHERSTACK_API_KEY**: Your API key for Weatherstack services. Required for accessing weather data. Get your API Key at https://weatherstack.com/
- **GCLOUD_LOCATION**: The Google Cloud location/region to use (e.g., `us-central1`).
- **GCLOUD_PROJECT**: Your Google Cloud project ID.
- **GOOGLE_APPLICATION_CREDENTIALS**: The absolute path to your Google Cloud service account JSON credentials file. This is required for authenticating with Vertex AI and other Google Cloud services. Create one at https://cloud.google.com/iam/docs/service-accounts-create

Make sure to keep your credentials secure and never commit your `.env` file to version control.


## Available Scripts

All scripts use [tsx](https://github.com/esbuild-kit/tsx) for TypeScript execution.

| Script          | Command                    | Description                                 | Genkit UI |
|-----------------|----------------------------|---------------------------------------------|-----------|
| Agent           | `npm run agent`            | Runs the agent example                      | No        |
| Codereview      | `npm run codereview`       | Runs the AI code review example             | No        |
| Travelflow      | `npm run travelflow`       | Runs the travel flow example                | No        |


## Running the Notebooks and Examples

- Open each Notebook and run cell by cell or all at once

- You can start the Genkit UI by running `genkit ui:start` command. Alternative, you can start the Genkit UI and the run the script in one command by running `genkit start -- YOUR_SCRIPT`.

   > E.g: `genkit start -- npm run travelflow`

   See Travelflow in [Available Scripts](#Available-Scripts) section.

- Run the flows using the command line
   > `genkit flow:run travelItinerary '{"travelPlan": "I will travel to Cali, Colombia the next week"}'`
