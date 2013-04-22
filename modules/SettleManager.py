#coding:utf-8
import web
import utils
import json
urls = (
  "/list","settlemanager_list",
  "/add","settlemanager_add",
  "", "settlemanager"
)
class settlemanager:
    def GET(self):
        return utils.render_template('settlemanager.html')
class settlemanager_add:
    def GET(self):
        return utils.render_template('settlemanager_add.html')
class settlemanager_list:
    returnobj = [{'name': "Moroni", 'age': 50},
                     {'name': "Tiancum", 'age': 43},
                     {'name': "Jacob", 'age': 27},
                     {'name': "Nephi", 'age': 29},
                     {'name': "Enos", 'age': 34}]
    def POST(self):
        web.header('Content-Type', 'application/json')
        return json.dumps(self.returnobj)
app_settlemanager = web.application(urls, locals())