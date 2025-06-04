// import the Genkit and Google AI plugin libraries
import { gemma34b } from "./../../common/models";
import { genkit } from "genkit";

// configure a Genkit instance
const ai = genkit({
  plugins: [gemma34b()],
});

async function main() {
  // make a generation request
  const llmResponse = await ai.generate({
    model: "ollama/gemma3:4b",
    prompt: "Tell me a joke.",
  });
  console.log(llmResponse.text);
}

main();
