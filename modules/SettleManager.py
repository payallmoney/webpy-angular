#coding:utf-8
import web
import utils
import json
urls = (
  "/add.json","settlemanager_add_json",
  "/add","settlemanager_add",
  "", "settlemanager"
)
class settlemanager:
    def GET(self):
        return utils.render_template('settlemanager.html')
class settlemanager_add:
    def GET(self):
        return utils.render_template('settlemanager_add.html')
class settlemanager_add_json:
    returnobj = {"total":6,"rows":[   
            {"name":"供货方","value":"云南众烁建材有限公司","group":"供货方","editor":"text"},   
            {"name":"经办人","value":"","group":"供货方","editor":"text"}, 
            {"name":"供货日期","value":"","group":"供货方","editor":"datebox"},             
            {"name":"收货方","value":"","group":"收货方","editor":"text"},   
            {"name":"经办人","value":"","group":"收货方","editor":"text"},
            {"name":"收货日期","value":"","group":"收货方","editor":"datebox"}
        ]}
    def GET(self):
        web.header('Content-Type', 'application/json')
        return json.dumps(self.returnobj)
    def POST(self):
        web.header('Content-Type', 'application/json')
        return json.dumps(self.returnobj)
app_settlemanager = web.application(urls, locals())