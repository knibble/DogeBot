# DogeBot <img src="https://files.catbox.moe/j3s2rq.png" align="right">

> Multi-Purpose Discord Bot (Currently in Development)

## Development

### Getting Started

- Set up a `config.json` file with this format on `src/config/`

```json
{
  "api": {
    "token": "hidden"
  },
  "bot": {
    "prefix": ":}",
    "owner": "ownerId",
    "owners": ["ownerId"],
    "id": "id",
    "secret": "secret",
    "token": "toket"
  },
  "env": {
    "debug": "false",
    "type": "prod",
    "log_level": "info",
    "database": "./database.sqlite"
  }
}
```

- Run the server locally (and watch changes):

```bash
$ npm run watch
```
