// npx ts-node index.ts
import chalk from "chalk";
import OpenAI from "openai";
import { createInterface, Interface } from "readline";
require("dotenv").config();

const openai = new OpenAI({
  organization: process.env.OPENAI_ORGANISATION,
  apiKey: process.env.OPENAI_API_KEY,
});

async function chatWithGpt3(prompt: string): Promise<string> {
  try {
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    return res.choices[0].message.content || "";
  } catch (err: any) {
    console.error(chalk.red(`An error occurred, errorMessage=${err.message}`));
    return "";
  }
}

async function userPrompt(readline: Interface): Promise<void> {
  let userInput = "";
  let processing = false;

  const prompt = chalk.green(
    "User Question (Type a blank line to stop input and process the question): "
  );

  const linePromise = new Promise<void>((resolve) => {
    const lineListener = (line: string) => {
      handleLine(line).catch((err) => {
        console.error(
          chalk.red(
            `An error occurred in the handleLine function, errorMessage=${err.message}`
          )
        );
      });
    };

    const handleLine = async (line: string): Promise<void> => {
      if (
        line.trim().toLowerCase() === "exit" ||
        line.trim().toLowerCase() === "quit" ||
        line.trim().toLowerCase() === "q"
      ) {
        console.log(chalk.green("Closing ChatGPT.."));
        resolve();
        return;
      }

      if (line.trim() === "") {
        if (userInput.trim() !== "") {
          if (!processing) {
            processing = true;
            console.log(chalk.green("Processing the question..."));
            await processQuestion(userInput);
            processing = false;
            readline.setPrompt(prompt);
            readline.prompt();
          }
        }
        userInput = "";
      } else {
        userInput += line + "\n";
        if (!processing) {
          readline.setPrompt("");
          readline.prompt();
        }
      }
    };

    readline.on("line", lineListener);

    readline.setPrompt(prompt);
    readline.prompt();

    readline.on("close", () => {
      resolve();
    });
  });

  await linePromise;
}

async function processQuestion(question: string): Promise<void> {
  try {
    const response: string = await chatWithGpt3(question);
    console.log(
      `${chalk.green("ChatGPT Response")}: ${chalk.yellow(response)}\n`
    );
  } catch (err: any) {
    console.error(
      chalk.red(`Error while processing, errorMessage=${err.message}`)
    );
  }
}

async function main(): Promise<void> {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    console.log(chalk.green("Type 'exit', 'quit', or 'q' to stop the chat."));
    await userPrompt(readline);
  } catch (err: any) {
    console.error(
      chalk.red(`An unexpected error occurred, errorMessage=${err.message}`)
    );
  } finally {
    readline.close();
  }
}

(async () => {
  await main();
})().catch((err) => {
  console.error(
    chalk.red(`An unexpected error occurred, errorMessage=${err.message}`)
  );
});
