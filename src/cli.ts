import { cli } from 'cleye';
import { red } from 'kolorist';
import { version } from '../package.json';
import config from './commands/config';
import update from './commands/update';
import chat from './commands/chat';
import { commandName } from './helpers/constants';
import { handleCliError } from './helpers/error';
import { prompt } from './prompt';

cli(
  {
    name: commandName,
    version: version,
    flags: {
      prompt: {
        type: String,
        description: 'Prompt to run',
        alias: 'p',
      },
      explain: {
        type: Boolean,
        description: 'Show detailed explanations (verbose mode)',
        alias: 'e',
      },
    },
    commands: [config, chat, update],
  },
  (argv) => {
    // Default to silent mode, but -e/--explain flag enables verbose mode
    const silentMode = !argv.flags.explain;
    const promptText = argv._.join(' ');

    if (promptText.trim() === 'update') {
      update.callback?.(argv);
    } else {
      prompt({ usePrompt: promptText, silentMode }).catch((error) => {
        console.error(`\n${red('✖')} ${error.message}`);
        handleCliError(error);
        process.exit(1);
      });
    }
  }
);
