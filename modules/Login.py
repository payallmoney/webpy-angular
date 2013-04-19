#coding:utf-8
import web
import utils
import json
urls = (
  "", "Login_json",
)
class Login_json:
    def POST(self):
        data = web.input()
        print(data)
        param = {'username':data.username,'password':data.password}
        querylist = utils.db.users.find(param)
        print(querylist.count())
        flag = True if querylist.count()>0 else False 
        if flag:
            data["msg"] = u'密码正确'
            data["code"] = 'true'
        else:
            data["msg"] = u'密码错误'
            data["code"] = 'false'
        print(data)
        web.header('Content-Type', 'application/json')
        return json.dumps(data)

app_login = web.application(urls, locals())