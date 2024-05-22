# Simple ChatGPT Web API

A Fastify server integrated with OpenAI's ChatGPT to provide a user query endpoint.

## Installation

Clone the repository and install dependencies:

```bash
git clone https://your-repository-url-here.git
cd simple-chatgpt-web-api
npm install
```

## Usage

Start the server:

```bash
npm start
```

Server runs on `http://localhost:3000` or the port specified by the `PORT` environment variable.

## API Endpoint

- **POST /**: Send JSON with a `query` field.

Example using `curl`:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"query":"Hello, world!"}' http://localhost:3000/
```

Returns a ChatGPT response based on the provided query.

## Configuration

Set `OPENAI_API_KEY` in your environment variables.
