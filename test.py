#coding:utf-8
from pymongo import MongoClient
connection = MongoClient()
db = connection.webpy
db.codes.insert({"type":"stone","code":"01","value":u"麻面板"})
db.codes.insert({"type":"size","code":"01","value":u"600×300×40"})
db.codes.insert({"type":"unit","code":"01","value":u"m²"})
db.codes.insert({"type":"sizeofstone","code":"01","value":u"01"})
db.codes.insert({"type":"unitofstone","code":"01","value":u"01"})