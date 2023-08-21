# Short description

This is a simple script that allows you to use ChatGPT directly from you terminal.
This means a couple of things:

1. You can debug your code questions/errors directly from the terminal, which is faster and improves your coding performance
2. You don't need to access search engines or any browser to debug your confusions

# All you need is

- Latest node and npm installed
- A ChatGPT account, you'll need to take the Organisation ID and the API Key from there, create a `.env` file in the directory and paste the Organisation ID into the `OPENAI_ORGANISATION` variable and the API Key into the `OPENAI_API_KEY` variable
- A nice terminal that you prefer to use
- You can use either `npm` or `yarn`, I personally use `yarn` and if you want to do the same, check out this documentation: https://classic.yarnpkg.com/lang/en/docs/getting-started/
- Run `yarn` or `npm install` from the directory to install all the dependencies
- To run the script, run `npx ts-node index.ts`

# Considerations

- The script can be imported into your codebase somewhere in utils or lib so that it's easier to run directly from your directory.

- If there are any suggestions for improvements or issues, please let me know directly or through this link: https://github.com/gitcroissant/terminal-chatgpt/issues
