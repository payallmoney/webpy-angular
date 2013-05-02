#-*-coding:utf-8 -*-
import os
import memcache
from jinja2 import Environment,FileSystemLoader

urls = ("/.*", "hello")
from pymongo import MongoClient
connection = MongoClient()
db = connection.webpy
mcache = memcache.Client(['127.0.0.1:11211'],debug=0)


def initCache(refresh=False):
    cached = mcache.get("codes")
    print cached
    if cached == None or refresh == True:
        if cached != None:
            #清除缓存
            mcache.delete("codes")
        codes = db.codes.find().sort([("type",1),("code" , 1), ("value", 1) ])
        codemaps = {};
        for code in codes:
            if code['type'] not in codemaps:
                codemaps[code['type']] = {}
            if code['code'] in codemaps[code['type']]:
                value = codemaps[code['type']][code['code']]
                #这里只应该是数组和字符两种情况
                if type(value) == str:
                    #如果是字符串,则将结果变成数组,重新存储
                    newvalue = [value,code['value']]
                    codemaps[code['type']][code['code']] = newvalue
                elif type(value) == list:
                    #如果是数组,则将数据放入末尾
                    codemaps[code['type']][code['code']].append(code['value'])
            else:
                #如果不存在,则将数据直接存储
                codemaps[code['type']][code['code']] = code['value']
        print(codemaps)
        mcache.set("codes",codemaps)
initCache()
def render_template(template_name, **context):
    extensions = context.pop('extensions', [])
    globals = context.pop('globals', {})

    jinja_env = Environment(
            loader=FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates')),
            extensions=extensions,
            )
    jinja_env.globals.update(globals)

    #jinja_env.update_template_context(context)
    return jinja_env.get_template(template_name).render(context)