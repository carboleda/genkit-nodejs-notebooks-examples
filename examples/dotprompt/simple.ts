import { genkit } from "genkit";

// Import the model plugins you want to use.
import { googleAI } from "@genkit-ai/googleai";

const ai = genkit({
  // Initialize and configure the model plugins.
  plugins: [googleAI()],
});

const helloPrompt = ai.prompt("hello");

console.log(helloPrompt);

(async () => {
  const response = await helloPrompt({ name: "Carlos" });
  console.log(response);
})();
