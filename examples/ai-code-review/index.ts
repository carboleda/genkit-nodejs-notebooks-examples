import { genkit, z } from "genkit";
import { googleAI, gemini20Flash } from "@genkit-ai/googleai";
import { llama3groq } from "../../common/models";
import { promisify } from "node:util";
import { exec } from "node:child_process";

const execAsync = promisify(exec);

const ai = genkit({
  plugins: [llama3groq(), googleAI()],
  model: gemini20Flash,
});

const ReviewOutputSchema = z.object({
  fileName: z.string().describe("The name of the file that was reviewed."),
  summary: z.string().describe("A brief summary of the code's functionality."),
  suggestions: z
    .array(
      z.object({
        suggestion: z.string().describe("A suggestion for improving the code."),
        reason: z.string().describe("The reason for the suggestion."),
        line: z
          .number()
          .optional()
          .describe("The line number where the suggestion applies."),
      })
    )
    .describe(
      "Suggestions for improving the code, such as performance optimizations, readability improvements, or best practices."
    ),
});
ai.defineSchema("ReviewOutputSchema", ReviewOutputSchema);
const codeReviewFilePrompt = ai.prompt("codeReview");

const getGitStatusTool = ai.defineTool(
  {
    name: "getGitStatusTool",
    description:
      "Generates a list of files with changes in the current git repository.",
    outputSchema: z
      .array(z.string().describe("File name of the changed file."))
      .describe("List of files with changes in the current git repository."),
  },
  async () => {
    const { stdout, stderr } = await execAsync("git status --short");

    if (stderr) {
      console.error("Error executing git diff:", stderr);
      return;
    }

    return stdout
      .split("\n")
      .filter(Boolean)
      .map((line) => line.split(" ").at(-1).trim());
  }
);

const codeReviewFileTool = ai.defineTool(
  {
    name: "codeReviewFileTool",
    description:
      "Reviews a code file and provides a summary and suggestions for improvement.",
    inputSchema: z.object({
      fileName: z.string().describe("The name of the file to review."),
    }),
    outputSchema: ReviewOutputSchema,
  },
  async ({ fileName }) => {
    console.log("Reviewing file:", fileName);
    const fileExtension = fileName.split(".").pop();
    const { stdout: diff, stderr } = await execAsync(
      `git diff HEAD ${fileName}`
    );

    // Generate a prompt for the AI to review the code
    // const prompt = `You are an AI code reviewer. Review the following code diff and provide a summary and suggestions for improvement:
    // Code diff for ${fileName}:
    // \`\`\`${fileExtension}
    // ${diff}
    // \`\`\`\`

    // Summary:
    // - Provide a brief summary of the code's functionality.
    // Suggestions:
    // - List any suggestions for improving the code, such as performance optimizations, readability improvements, or best practices.`;

    // // Call the AI model to generate the review
    // const { output: review } = await ai.generate({
    //   prompt,
    //   output: {
    //     schema: ReviewOutputSchema,
    //   },
    // });

    const { output: review } = await codeReviewFilePrompt({
      fileName,
      fileExtension,
      diff,
    });

    return review;
  }
);

// =============== USAGE EXAMPLE ===============
async function main() {
  const { stream, response } = ai.generateStream({
    prompt:
      "Make a code review of the changed files in the current git repository.",
    output: {
      schema: z.object({
        review: z
          .array(ReviewOutputSchema)
          .describe("List of code reviews for each changed file."),
      }),
    },
    tools: [getGitStatusTool, codeReviewFileTool],
  });

  // for await (const chunk of stream) {
  //   console.log(chunk.text);
  // }

  console.log("Code Review Results:", (await response).data.review);
}

main();
