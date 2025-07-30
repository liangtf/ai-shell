# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run start` - Run the CLI in development mode using jiti
- `npm run build` - Build the project using pkgroll
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Check code formatting with prettier and run eslint
- `npm run lint:fix` - Fix code formatting and linting issues
- `npm run release:patch` - Build, version bump, publish, and push with tags

### Testing
The codebase does not appear to have automated tests configured. Manual testing is done by running the CLI commands.

## Architecture

This is **AI Shell** - a CLI tool that converts natural language prompts into shell commands using AI APIs (OpenAI or Anthropic). The application is built with TypeScript and uses streaming responses for real-time interaction.

### Core Structure

- **`src/cli.ts`** - Main entry point that sets up the CLI using `cleye` library with commands and flags
- **`src/prompt.ts`** - Core prompt handling logic with interactive flows for script generation, revision, and execution
- **`src/commands/`** - Individual CLI commands:
  - `chat.ts` - Interactive chat mode for conversational AI assistance
  - `config.ts` - Configuration management (API keys, model settings, language)
  - `update.ts` - Self-update functionality
- **`src/helpers/`** - Utility modules for completion, config, error handling, i18n, and shell integration

### Key Architectural Patterns

1. **Multi-Provider Support**: Supports both OpenAI and Anthropic APIs with provider abstraction
2. **Streaming API Integration**: Uses streaming APIs with custom stream-to-iterable conversion for real-time response display
3. **Interactive CLI Flow**: Built on `@clack/prompts` for consistent user interactions with options to run, revise, edit, copy, or cancel generated scripts
4. **Configuration System**: File-based config storage in user's home directory (`.ai-shell`) with interactive UI for settings management
5. **Internationalization**: Supports 15 languages with dynamic language switching and localized examples
6. **Shell Integration**: Executes commands using `execa` with proper shell environment handling and history tracking

### Data Flow

1. User provides natural language prompt via CLI
2. Prompt is sent to selected AI provider (OpenAI or Anthropic) with streaming enabled
3. Generated script is displayed with explanation (unless silent mode)
4. User chooses to run, revise, edit, copy, or cancel
5. If running, script executes in user's shell with proper error handling
6. Executed commands are appended to shell history

### Configuration

The app uses a home directory config file (`.ai-shell`) to store:
- AI API key and endpoint
- AI provider selection (openai or anthropic)
- Model selection (defaults: gpt-4o-mini for OpenAI, claude-3-5-sonnet-20241022 for Anthropic)
- Language preference
- Silent mode setting

Configuration can be managed via `ai config` command with interactive UI or `ai config set KEY=VALUE` syntax.

### AI API Configuration

The API configuration supports both OpenAI and Anthropic providers:

**Storage**: Stored in `~/.ai-shell` config file in INI format as plain text

**Configuration Keys**:
- `AI_API_KEY` - API key for the selected provider
- `AI_PROVIDER` - Provider selection ("openai" or "anthropic")
- `AI_API_ENDPOINT` - Custom API endpoint (optional)

**Setting Methods**:
- CLI: `ai config set AI_API_KEY=<your token>` and `ai config set AI_PROVIDER=<provider>`
- Interactive UI: `ai config` → select provider and key options

**Usage Locations**:

- `src/helpers/config.ts:32` - Validation and parsing logic with provider support
- `src/helpers/completion.ts` - Provider abstraction for OpenAI and Anthropic APIs
- `src/prompt.ts` - Retrieved for main script generation functionality
- `src/commands/chat.ts` - Retrieved for chat mode functionality

**Key Implementation Details**:

- Required validation throws error if API key is missing
- Provider defaults to "openai" if not specified
- UI displays obfuscated key for privacy (supports both OpenAI and Anthropic key formats)
- Error messages are internationalized across 15 languages
- No encryption - stored as plain text in home directory
- Anthropic streaming is converted to OpenAI-compatible format for consistency
