<h2 align="center">
   <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fb5b9997cec2c4fffb3e5c5e9bb4fed7d">
      <img width="300" alt="AI Shell logo" src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fb7f9d2d9911a4199a9d26f8ba210b3f8">
    </picture>
</h2>

<h4 align="center">
   A CLI that converts natural language to shell commands.
</h4>
<p align="center">
   <a href="https://www.npmjs.com/package/@builder.io/ai-shell"><img src="https://img.shields.io/npm/v/@builder.io/ai-shell" alt="Current version"></a>
</p>

<p align="center">
   <img alt="Gif Demo" src="https://user-images.githubusercontent.com/844291/230413167-773845e7-4c9f-44a5-909c-02802b5e49f6.gif" >
<p>

<p align="center">
   Inspired by the <a href="https://githubnext.com/projects/copilot-cli">GitHub Copilot X CLI</a>, but open source for everyone.
</p>

<br>

# AI Shell

## Setup

> The minimum supported version of Node.js is v14

1. Install _ai shell_:

   ```sh
   npm install -g @builder.io/ai-shell
   ```

2. Get your API key from either:
   - [OpenAI](https://platform.openai.com/account/api-keys) for GPT models
   - [Anthropic](https://console.anthropic.com/) for Claude models

   > Note: You'll need to create an account and set up billing with your chosen provider.

3. Configure ai-shell with your API key and provider:

   ```sh
   # For OpenAI (default)
   ai config set AI_API_KEY=<your openai token>
   ai config set AI_PROVIDER=openai
   
   # For Anthropic Claude
   ai config set AI_API_KEY=<your anthropic token>
   ai config set AI_PROVIDER=anthropic
   ```

   This will create a `.ai-shell` file in your home directory.

## Usage

```bash
ai <prompt>
```

For example:

```bash
ai list all log files
```

Then you will get an output like this, where you can choose to run the suggested command, revise the command via a prompt, or cancel:

```bash
◇  Your script:
│
│  find . -name "*.log"
│
◆  Run this script?
│  ● ✅ Yes (Lets go!)
│  ○ 📝 Revise
│  ○ ❌ Cancel
└
```

To see detailed explanations, use the `-e` flag:

```bash
ai -e list all log files
```

This will show:

```bash
◇  Your script:
│
│  find . -name "*.log"
│
◇  Explanation:
│
│  1. Searches for all files with the extension ".log" in the current directory and any subdirectories.
│
◆  Run this script?
│  ● ✅ Yes (Lets go!)
│  ○ 📝 Revise
│  ○ ❌ Cancel
└
```

### Command flags

AI Shell supports several command-line flags:

- `-e, --explain`: Show detailed explanations (verbose mode)  
- `-p, --prompt <string>`: Specify prompt directly as argument
- `--version`: Show version information
- `--help`: Show help information

### Special characters

Note that some shells handle certain characters like the `?` or `*` or things that look like file paths specially. If you are getting strange behaviors, you can wrap the prompt in quotes to avoid issues, like below:

```bash
ai 'what is my ip address'
```

### Chat mode

![Chat demo](https://user-images.githubusercontent.com/844291/232889699-e13fb3fe-1659-4583-80ee-6c58d1bcbd06.gif)

```bash
ai chat
```

With this mode, you can engage in a conversation with the AI and receive helpful responses in a natural, conversational manner directly through the CLI:

```sh
┌  Starting new conversation
│
◇  You:
│  how do I serve a redirect in express
│
◇  AI Shell:

In Express, you can use the `redirect()` method to serve a redirect. The `redirect()` method takes one argument, which is the URL that you want to redirect to.

Here's an example:

\`\`\`js
app.get('/oldurl', (req, res) => {
  res.redirect('/newurl');
});
\`\`\`
```

### Explanation mode (show detailed explanations)

By default, AI Shell runs in silent mode (shows only the generated command). You can enable detailed explanations using the `-e` or `--explain` flag:

```bash
ai -e list all log files
```

or save verbose mode as a preference using this command:

```bash
ai config set SILENT_MODE=false
```

### Custom API endpoint

You can set a custom API endpoint (useful for proxies or alternative endpoints):

```sh
# For OpenAI (default: https://api.openai.com/v1)
ai config set AI_API_ENDPOINT=<your proxy endpoint>

# For Anthropic (default: https://api.anthropic.com)
ai config set AI_API_ENDPOINT=<your proxy endpoint>
```

### Set Language

![Language UI](https://user-images.githubusercontent.com/1784873/235330029-0a3b394c-d797-41d6-8717-9a6b487f1ae8.gif)

The AI Shell's default language is English, but you can easily switch to your preferred language by using the corresponding language keys, as shown below:

| Language            | Key     |
| ------------------- | ------- |
| English             | en      |
| Simplified Chinese  | zh-Hans |
| Traditional Chinese | zh-Hant |
| Spanish             | es      |
| Japanese            | jp      |
| Korean              | ko      |
| French              | fr      |
| German              | de      |
| Russian             | ru      |
| Ukrainian           | uk      |
| Vietnamese          | vi      |
| Arabic              | ar      |
| Portuguese          | pt      |
| Turkish             | tr      |

For instance, if you want to switch to Simplified Chinese, you can do so by setting the LANGUAGE value to zh-Hans:

```sh
ai config set LANGUAGE=zh-Hans
```

This will set your language to Simplified Chinese.

### Config UI

To use a more visual interface to view and set config options you can type:

```bash
ai config
```

To get an interactive UI like below:

```bash
◆  Set config:
│  ○ AI API Key
│  ○ AI Provider
│  ○ AI API Endpoint
│  ○ Silent Mode
│  ● Model (gpt-4o-mini)
│  ○ Language
│  ○ Cancel
└
```

### Upgrading

Check the installed version with:

```bash
ai --version
```

If it's not the [latest version](https://github.com/BuilderIO/ai-shell/tags), run:

```bash
npm update -g @builder.io/ai-shell
```

Or just use AI shell:

```bash
ai update
```

## Common Issues

### 429 error

Some users are reporting a 429 error from their AI provider. This is due to incorrect billing setup or excessive quota usage.

**For OpenAI:** Please follow [this guide](https://help.openai.com/en/articles/6891831-error-code-429-you-exceeded-your-current-quota-please-check-your-plan-and-billing-details) to fix it. You can activate billing at [this link](https://platform.openai.com/account/billing/overview).

**For Anthropic:** Check your usage and billing at [Anthropic Console](https://console.anthropic.com/).

## Motivation

I am not a bash wizard, and am dying for access to the copilot CLI, and got impatient.

## Contributing

If you want to help fix a bug or implement a feature in [Issues](https://github.com/BuilderIO/ai-shell/issues) (tip: look out for the `help wanted` label), checkout the [Contribution Guide](CONTRIBUTING.md) to learn how to setup the project.

## Supported AI Providers

- **OpenAI**: GPT-4, GPT-4o, GPT-4o-mini, and other OpenAI models
- **Anthropic**: Claude 3.5 Sonnet, Claude 3 Haiku, Claude 3 Opus

## Credit

- Thanks to GitHub Copilot for their amazing tools and the idea for this.
- Thanks to Hassan and his work on [aicommits](https://github.com/Nutlope/aicommits), which inspired the workflow and some parts of the code and flows
- Thanks to Anthropic for providing Claude AI capabilities

<br><br>

<p align="center">
   <a href="https://www.builder.io/m/developers">
      <picture>
         <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/844291/230786554-eb225eeb-2f6b-4286-b8c2-535b1131744a.png">
         <img width="250" alt="Made with love by Builder.io" src="https://user-images.githubusercontent.com/844291/230786555-a58479e4-75f3-4222-a6eb-74c5af953eac.png">
       </picture>
   </a>
</p>
