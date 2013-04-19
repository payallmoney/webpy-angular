#coding:utf-8
import web
import utils
import json
urls = (
  "/drop.json", "options_drop",
)
class options_drop_json:
    returnobj = [{
			"label": 'java',
			"value": 'Java'
		},{
			"label": 'perl',
			"value": 'Perl'
		},{
			"label": 'ruby',
			"value": 'Ruby'
		}]
    def POST(self):
        web.header('Content-Type', 'application/json')
        return json.dumps(self.returnobj)

app_options = web.application(urls, locals())