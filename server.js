const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const { router } = require('./routes');

const app = new Koa();

app.use(bodyParser());
app.use(serve(path.join(__dirname, 'public')));

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layouts/main',
    viewExt: 'ejs',
    cache: false,
    debug: false
});

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
