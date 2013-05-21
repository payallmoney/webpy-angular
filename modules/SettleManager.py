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
    def POST(self):
        data = web.input()
        print("???????");
        print(data);
        page = json.loads(data.page);
        print(page)
        max = utils.db.settles.find().count();
        skip = page['pageSize'] * (page['currentPage'] -1);
        if skip <0 :
            skip = 0
        print(skip);
        querydata = utils.db.settles.find().skip(skip).limit(page['pageSize'] )
        web.header('Content-Type', 'application/json')
        noOfPages = max/page['pageSize'];
        if max % page['pageSize'] >0:
            noOfPages += 1
        currentPage = page['currentPage'] if noOfPages >= page['currentPage']   else noOfPages
        ret = { "code":'true',
            'msg':'查询成功',
            "page":{
                    "noOfPages" : noOfPages,
                    "currentPage" : currentPage ,
                    "maxSize" : page['maxSize'],
                    "pageSize": page['pageSize'],
                    "maxNum" : max
                },
            "data":querydata
        }
        #print(dumps(ret))
        return dumps(ret)
app_settlemanager = web.application(urls, locals())