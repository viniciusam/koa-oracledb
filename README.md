## koa-oracledb
node-oracledb middleware for Koa v2

[![NPM](https://nodei.co/npm/koa-oracledb.png)](https://nodei.co/npm/koa-oracledb/)

## Install

    npm install koa-oracledb --save

## Usage

```
const Koa = require('koa');
const app = new Koa();
const KoaOracle = require('koa-oracledb');

var db = new KoaOracle({
    user:          process.env.NODE_ORACLEDB_USER,
    password:      process.env.NODE_ORACLEDB_PASSWORD,
    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING
});
app.use(db.middleware());
```

or

```
const Router = require('koa-router');
const KoaOracle = require('koa-oracledb');

var poolV1 = new KoaOracle({
    user:          process.env.NODE_ORACLEDB_USER,
    password:      process.env.NODE_ORACLEDB_PASSWORD,
    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING
});
var router = new Router({ prefix: '/v1' });
router.use(poolV1.middleware());
```

## Example
You can find a full example on examples/example.js.

## License

MIT
