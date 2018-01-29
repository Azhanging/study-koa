/*
* index控制器
* */

const Router = require('koa-router');
const router = new Router();

//模型数据
const indexModel = require('../model/index');

const viewName = '/home/index';

/*首页*/
router.get('/', async (ctx, next) => {
  await ctx.render(`${viewName}/index`, {
    body: 'index'
  }, { ctx });
});

/*注册页*/
router.get('/register', async (ctx, next) => {
  await ctx.render(`${viewName}/register`, {});
}).post('/register', async (ctx, next) => {
  const status = await indexModel['register'](ctx);
  if (status) {
    ctx.body = ctx.$error('has username');
  } else {
    ctx.body = ctx.$success('register success', '/home/index');
  }
});

/*登录页*/
router.get('/login', async (ctx, next) => {
  await ctx.render(`${viewName}/login`, {});
}).post('/login', async (ctx, next) => {
  const status = await indexModel['login'](ctx);
  if (status) {
    ctx.body = ctx.$success('login success', '/home/index');
  } else {
    ctx.body = ctx.$error('login error');
  }
});


module.exports = router;