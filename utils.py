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
    if cached == None or refresh == True:
        if cached != None:
            #清除缓存
            mcache.delete("codes")
        codes = db.codes.find().sort([("type",1),("code" , 1), ("value", 1) ])
        codemaps = {};
        mapcodes = [];
        for code in codes:
            #对部分内容进行特殊处理
            if code['type'].find("__") >=0:
                mapcodes.append(code)
                continue
            if code['type'] not in codemaps:
                codemaps[code['type']] = []
            #如果不存在,则将数据直接存储
            codemaps[code['type']].append({'code':code['code'],'value':code['value']});
        #对对照型数据进行处理
        for code in mapcodes:
            strs=code['type'].split("__");
            if strs[1] in codemaps:
                maps = None
                if code['value'].find("all") == 0:
                    maps = codemaps[strs[1]]
                elif code['value'].find("not") == 0:
                    maps = []
                    notstr = code['value'][code['value'].find(":")]
                    for item in codemaps[strs[1]]:
                        if notstr.find(item['code'])<0:
                            maps.append(item)
                elif code['value'].find("has") == 0:
                    maps = []
                    hasstr = code['value'][code['value'].find(":"):]
                    for item in codemaps[strs[1]]:
                        if hasstr.find(item['code'])>=0:
                            maps.append(item)
                codemaps[code['type']+code['code']] = maps
        print(codemaps)
        mcache.set("codes",codemaps)
initCache(True)
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