import { ollama } from "genkitx-ollama";

export const gemma34b = () =>
  ollama({
    models: [
      {
        name: "gemma3:4b",
        type: "generate",
      },
    ],
    serverAddress: "http://127.0.0.1:11434", // default local address
  });

export const llama3groq = () =>
  ollama({
    models: [
      {
        name: "llama3-groq-tool-use:8b",
        type: "generate",
      },
    ],
    serverAddress: "http://127.0.0.1:11434", // default local address
  });
