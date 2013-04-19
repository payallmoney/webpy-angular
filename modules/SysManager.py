#coding:utf-8
import web
import utils
urls = (
  "", "sysmanager",
)
class sysmanager:
    def GET(self):
        return utils.render_template('sysmanager.html')

app_sysmanager = web.application(urls, locals())