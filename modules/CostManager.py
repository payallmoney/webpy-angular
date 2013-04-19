#coding:utf-8
import web
import utils
urls = (
  "", "costmanager",
)
class costmanager:
    def GET(self):
        return utils.render_template('costmanager.html')

app_costmanager = web.application(urls, locals())