# Copycat Bot

This project is a Twitter bot that replies to mentions by echoing the message content minus the bot's Twitter handle. It is built using the ElizaOS framework.

## Prerequisites

- Bun runtime (https://bun.sh/)
- A Twitter developer account with API credentials (if applicable)
- Environment variables configured in a `.env` file as follows:

```bash
GOOGLE_GENERATIVE_AI_API_KEY= # Gemini API key

TWITTER_DRY_RUN=false
TWITTER_USERNAME= # Account username
TWITTER_PASSWORD= # Account password
TWITTER_EMAIL= # Account email

BOT_HANDLE=

ELIZA_LOG_LEVEL=info
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Rds2151/twitter-bot.git
cd twitter-bot
```

2. Install dependencies using Bun:

```bash
bun install
bun add @elizaos/plugin-twitter
```

## Configuration

Set the environment variables in a `.env` file in the project root as shown above. Make sure to fill in your Twitter account credentials and API keys.

## Running the Bot

To start the bot, run:

```bash
elizaos start --character characters/eliza.character.json
```