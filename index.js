const Koa = require('koa');
const router = require('koa-router')();
const serve = require('koa-static');
const views = require('koa-views');
const { join } = require('path');
const app = new Koa;

router.get('/', route);

app.use(serve('./public'));
app.use(views(join(__dirname, 'server', 'views'), { extension: 'html' }));
app.use(router.routes());

async function route(ctx) {
  return ctx.render('index')
    .catch(err => {
      ctx.status = err.status || 500;
      ctx.body = { message: err.message, status: ctx.status, stack: err.stack };
      ctx.app.emit('error', err, ctx);
    });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, _ => console.log(`Listening on port ${PORT}`));