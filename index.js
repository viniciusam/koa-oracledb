const oracledb = require('oracledb');

// Properties are applicable to all connections and SQL executions.
// They can also be set or overridden at the individual execute() call level
//
// This script sets outFormat in the execute() call but it could be set here instead:
oracledb.outFormat = oracledb.OBJECT;
oracledb.maxRows = 9999;

oracledb.createPool({
  poolAlias:     "default",
  user:          process.env.NODE_ORACLEDB_USER,
  password:      process.env.NODE_ORACLEDB_PASSWORD,
  connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING
}, function(err, pool) {
  if (err) return console.error(err.message);
});

// Instance of oracledb configuration.
module.exports.oracledb = oracledb;

/**
 * Connects to db and set it into a context variable.
 */
module.exports.connect = async function (ctx, next) {
    try {
        ctx.db = await oracledb.getConnection();
        await next();
    } catch (err) {
        throw err;
    } finally {
        if (ctx.db) ctx.db.close;
    }
} 
