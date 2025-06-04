import { genkit, z } from "genkit/beta";
import { googleAI } from "@genkit-ai/googleai";
import { gemma34b } from "./../../common/models";

// configure a Genkit instance
const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model("gemini-2.0-flash"),
});

// =============== TOOLS ===============
const getWeatherTool = ai.defineTool(
  {
    name: "getWeather",
    description: "Get the weather for a given location/city",
    inputSchema: z.object({
      city: z.string().describe("the city to get the weather for"),
    }),
    outputSchema: z.string().describe("the weather report"),
  },
  async (input) => {
    // Retrieve the menu from a database, website, etc.
    console.log("Fetching weather for city:", input.city);
    return "cloudy";
  }
);

const getGreetingTool = ai.defineTool(
  {
    name: "getGreetings",
    description: "Get a list of friendly greetings",
    outputSchema: z.array(z.string().describe("a friendly greeting")),
  },
  async () => {
    // Retrieve the menu from a database, website, etc.
    console.log("Fetching greeting");
    return [
      "Hello! How can I assist you today?",
      "Hi there! What can I do for you?",
      "Greetings! How may I help you?",
      "Hey! What do you need assistance with?",
      "Hello! How can I help you today?",
      "Hi there! What can I do for you?",
    ];
  }
);
// =============== AGENTS ===============

const greetingAgent = ai.definePrompt({
  name: "greetingAgent",
  description: "Handles simple greetings and hellos",
  system:
    "You are the Greeting Agent. Your ONLY task is to pick a friendly greeting from the list of greetings provided by the tool 'getGreetings' and send it to the user. Refrain from using greetings that are not in the list. Do not perform any other actions.",
  tools: [getGreetingTool],
});

const farewellAgent = ai.definePrompt({
  name: "farewellAgent",
  description: "Handles simple greetings and hellos",
  system:
    "You are the Farewell Agent. Your ONLY task is to provide a polite goodbye message. Do not perform any other actions.",
});

const rootAgent = ai.definePrompt({
  name: "weatherAgent_v2",
  description: "Handles simple greetings and hellos",
  system:
    "You are the main Weather Agent, coordinating a team. - Your main task: Provide weather using the `getWeather` tool. Handle its 'status' response ('report' or 'error_message'). - Delegation Rules: - If the user gives a simple greeting (like 'Hi', 'Hello'), delegate to `greetingAgent`. - If the user gives a simple farewell (like 'Bye', 'See you'), delegate to `farewellAgent`. - Handle weather requests yourself using `get_weather`. - For other queries, state clearly if you cannot handle them.",
  tools: [greetingAgent, farewellAgent, getWeatherTool],
});

// =============== CHAT ===============
const chat = ai.chat(rootAgent);
const print = (response: any) => console.log("Response:", response.text);
chat
  .send("Hello!")
  .then(print)
  .then(() => chat.send("What is the weather in New York?"))
  .then(print);
