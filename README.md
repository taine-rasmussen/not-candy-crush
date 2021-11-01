# Fullstack Codethrough
Over the next couple of days we'll walk through a really simple full stack development tasks. 

We'll be building a simple music database where we keep a list of artists and a list of albums. Each album will be related to an artist by way of an `artist_id` field in the database.
## Getting Started

### From the command line

```bash
git clone https://github.com/kotare-2021/wk8-codethru 
cd wk8-codethru
npm install
npm run dev
```

You can find the server running on [http://localhost:3000](http://localhost:3000).

## Data
### Artists
| field | type | notes |
|---|---|---|
| id (PK) | integer | auto-increment |
| name | string |  |


### albums
| field | type | notes |
|---|---|---|
| id (PK) | integer | auto-increment |
| artist_id (FK) | integer |
| name | string | |
| spotify_id | string | get from Spotify UI |
| image | string | url to spotify album image |

## Tasks
To see a full list of tasks, check out the `TODO.example` file in this repo. You can use this todo list in your own branches by copying it to `TODO` (i.e. removing the `.example` extension) and installing the `Todo+` VS code extension by Fabio Spampinato via the command palette or the [VS Code marketplace](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-todo-plus). N.B. `TODO` is in your `.gitignore` so your TODO will be your own list and not shared with other contributors.