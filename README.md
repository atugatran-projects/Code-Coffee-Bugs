## Usage

### Start a Project With `create-kaboom`

The fastest way to start a Kaboom game is with [`create-kaboom`](https://github.com/replit/kaboom/tree/master/pkgs/create)

```sh
npm init kaboom mygame
```

This will create a directory called `mygame` for you, containing all the files we need

```sh
cd mygame
npm run dev
```

Then open http://localhost:5173 and edit `src/game.js`

### Install as NPM Package

```sh
npm install kaboom
```

```js
import kaboom from "kaboom"

kaboom()

add([
    text("oh hi"),
    pos(80, 40),
])
```

also works with CommonJS

```js
const kaboom = require("kaboom")
```

Note that you'll need to use a bundler like `esbuild` or `webpack` to use Kaboom with NPM

### Browser CDN

This exports a global `kaboom` function

```html
<script src="https://unpkg.com/kaboom/dist/kaboom.js"></script>
<script>
kaboom()
</script>
```

or use with es modules

```html
<script type="module">
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs"
kaboom()
</script>
```

works all CDNs that supports NPM packages, e.g. jsdelivr, skypack

## Dev

1. `npm install` to install dev packages
1. `npm run dev` to start dev server
1. go to http://localhost:8000/ and pick an example
1. edit examples in `examples/` to test
