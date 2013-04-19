#-*-coding:utf-8 -*-
import web
import modules.Login
import modules.SettleManager
import modules.CostManager
import modules.SysManager
import modules.Options
import utils
urls = (
  "/login.json", modules.Login.app_login,
  "/settlemanager", modules.SettleManager.app_settlemanager,
  "/costmanager", modules.CostManager.app_costmanager,
  "/sysmanager", modules.SysManager.app_sysmanager,
  "/options", modules.Options.app_options,
  "/(.*)", "index"
)

class index:
    def GET(self,url):
        raise web.redirect('/static/app/index.html')

app = web.application(urls, locals())

if __name__ == "__main__":
    app.run()