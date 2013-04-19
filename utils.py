#-*-coding:utf-8 -*-
import os
from jinja2 import Environment,FileSystemLoader

urls = ("/.*", "hello")
from pymongo import MongoClient
connection = MongoClient()
db = connection.webpy

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