#coding:utf-8
import web
import utils
urls = (
  "/list", "costmanager_list",
  "", "costmanager",
)
class costmanager_list:
    def POST(self):
        web.header('Content-Type', 'application/json')
        return json.dumps([{name: "Moroni", age: 50},
                     {name: "Tiancum", age: 43},
                     {name: "Jacob", age: 27},
                     {name: "Nephi", age: 29},
                     {name: "Enos", age: 34}])
class costmanager:
    def POST(self):
        web.header('Content-Type', 'application/json')
        return json.dumps([{name: "Moroni", age: 50},
                     {name: "Tiancum", age: 43},
                     {name: "Jacob", age: 27},
                     {name: "Nephi", age: 29},
                     {name: "Enos", age: 34}])
app_costmanager = web.application(urls, locals())