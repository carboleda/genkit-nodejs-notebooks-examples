import { genkit, z } from "genkit";
import { googleAI, gemini20Flash } from "@genkit-ai/googleai";
const { tavily } = require("@tavily/core");

const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash,
});

// ====== DEFINE TOOLS ======
const getWeather = ai.defineTool(
  {
    name: "getWeather",
    description: "Get weather information for a specific location",
    inputSchema: z.object({
      location: z.string().describe("The location name, e.g., San Francisco"),
    }),
    outputSchema: z.string().describe("The weather information"),
  },
  async ({ location }) => {
    const response = await fetch(
      `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${location}`
    );
    const data = await response.json();
    return JSON.stringify(data.current);
  }
);

const getPopularAttractionsTool = ai.defineTool(
  {
    name: "getPopularAttractions",
    description: "Get popular attractions for a specific location",
    inputSchema: z.object({
      location: z.string().describe("The location name, e.g., San Francisco"),
    }),
    outputSchema: z.string().array().describe("List of popular attractions"),
  },
  async ({ location }): Promise<string[]> => {
    const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });
    const response = await tvly.search(
      `What are the popular attractions in ${location}?`,
      {
        maxResults: 2,
        includeRawContent: true,
      }
    );

    return response.results
      .map((result: any) => result.rawContent)
      .filter(Boolean);
  }
);

// ====== DEFINE FLOW ======
export const travelPlanFlow = ai.defineFlow(
  {
    name: "travelItinerary",
    inputSchema: z.object({
      travelPlan: z
        .string()
        .describe("The travel plan description to a specific location"),
    }),
    outputSchema: z.string().describe("The travel smart itinerary"),
  },
  async ({ travelPlan }, { sendChunk }): Promise<string> => {
    const { stream, response } = ai.generateStream({
      system: `Generate a travel itinerary where the user is traveling to a specific location,
      provide detailed information about the trip and give recommendations for activities, restaurants, and more.
      Inform the current weather information for the destination and let the user know that the weather is subject to change.`,
      prompt: travelPlan,
      tools: [getPopularAttractionsTool, getWeather],
    });

    for await (const chunk of stream) {
      sendChunk(chunk);
    }

    return (await response).text;
  }
);

/**
Example prompt:
I'm planning a 4 days trip to Lima, Peru to attend a tech event, I'll have some nights and a whole free day.
Give me some recommendations of what do in Lima and nearby locations
*/

// Running flows from the command line
// genkit flow:run travelItinerary '{"travelPlan": "I will travel to Medellin, Colombia the next week"}'
