#coding:utf-8
import web
import utils
import json
from bson.json_util import dumps
urls = (
  "/list","settlemanager_list",
  "/add","settlemanager_add",
  "", "settlemanager"
)
class settlemanager:
    def POST(self):
        return utils.render_template('settlemanager.html')
class settlemanager_add:
    def POST(self):
        data = web.input()
        print(data)
        if "_id" in data:
            param = {'_id':data['_id']}
            settle = utils.db.settles.findOne(param)
            if settle:
                utils.db.settles.update({'_id':data['_id']},{ '$set': data})
            else:
                utils.db.settles.insert(data)
        else:
            utils.db.settles.insert(data)
        print(data)
        data["msg"] = u'保存成功!'
        data["code"] = 'true'
        web.header('Content-Type', 'application/json')
        return dumps(data)
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