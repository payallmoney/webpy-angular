#coding:utf-8
import web
import utils
import json
urls = (
  "", "cache",
)
class cache:
    def POST(self):
        cached = utils.mcache.get("codes")
        print("这里确认执行了多少次!!");
        web.header('Content-Type', 'application/json')
        return json.dumps(cached)

app_cache = web.application(urls, locals())