const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const KoaOracle = require('koa-oracledb');
const oracledb = require('oracledb');

// OracleDB Configs.
oracledb.outFormat = oracledb.OBJECT;
oracledb.maxRows = 9999;

// Logging Middleware.
app.use(async function (ctx, next){
    var start = new Date;
    await next();
    var ms = new Date - start;
    console.log('%s %s - %s', ctx.method, ctx.url, ms);
});

// Connection Pool.
var db = new KoaOracle({
    user:          process.env.NODE_ORACLEDB_USER,
    password:      process.env.NODE_ORACLEDB_PASSWORD,
    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING
});

// Router configs.
var router = new Router();
router.use(db.middleware());

router.get('/', async function (ctx, next) {
    ctx.body = await ctx.db.execute('SELECT 1 FROM DUAL');
});

// App routes.
app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000, () => {
    console.log('Listening on port 3000.');
});
