/*
* session 模块
* */
module.exports = (opts = {}) => {
	//获取配置信息
	const { key, store, field } = opts;
	return async (ctx, next) => {
		if(!ctx.app.context.$store) {
			ctx.app.context.$sessionStore = store;
		}
		//初始化
		if(!ctx.session) {
			ctx.session = {};
		}
		const cookies = ctx.cookies,
			id = cookies.get(key);
		//如果存在session的id，查看session是否过期了
		if(id) {
			//查看id是否过期了
			const session = await store.get(id);

			if(session) {
				//检查过期状态
				const checkStatus = store.check(session);
				//存在数据库,过期了
				if(checkStatus) {
					ctx.session = {};
				} else {
					//存在数据库，没过期，延迟时间
					ctx.session = session;
				}
				await store.set(key, ctx);
			} else {
				ctx.session = {};
			}
		} else {
			//当前的用户cookie不存在session id，生成新的id
			cookies.set(key, store.getID(24));
		}
		return next();
	}
};