#coding:utf-8
from pymongo import MongoClient
import sys
connection = MongoClient()
db = connection.webpy
db.codes.remove()
db.codes.insert({"type":"stone","code":"01","value":u"麻面石"})
db.codes.insert({"type":"stone","code":"02","value":u"路沿石"})
db.codes.insert({"type":"size","code":"01","value":u"600×300×40"})
db.codes.insert({"type":"size","code":"02","value":u"500×200×100"})
db.codes.insert({"type":"unit","code":"01","value":u"m²"})
# db.codes.update(
   # { "type": 'sizeofstone' ,"code": '01' },
   # { '$set': {
             # 'value': 'all'
           # }
   # }
# )
# db.codes.update(
   # { "type": 'unitofstone' ,"code": '01' },
   # { '$set': {
             # 'value': 'all'
           # }
   # }
# )
db.codes.insert({"type":"stone__size","code":"01","value":u"all"})
db.codes.insert({"type":"stone__unit","code":"01","value":u"all"})
db.codes.insert({"type":"stone__size","code":"02","value":u"has:01"})
db.codes.insert({"type":"stone__unit","code":"02","value":u"not:01"})


print('完成');
quit();