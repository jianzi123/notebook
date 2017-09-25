"""Tornado handlers for the tree view."""

# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.

from tornado import web
import os
from ..base.handlers import IPythonHandler, path_regex
from ..utils import url_path_join, url_escape
import json

class TreeHandler(IPythonHandler):
    """Render the tree view, listing notebooks, etc."""

    def generate_breadcrumbs(self, path):
        breadcrumbs = [(url_path_join(self.base_url, 'tree'), '')]
        parts = path.split('/')
        for i in range(len(parts)):
            if parts[i]:
                link = url_path_join(self.base_url, 'tree',
                    url_escape(url_path_join(*parts[:i+1])),
                )
                breadcrumbs.append((link, parts[i]))
        return breadcrumbs

    def generate_page_title(self, path):
        comps = path.split('/')
        if len(comps) > 3:
            for i in range(len(comps)-2):
                comps.pop(0)
        page_title = url_path_join(*comps)
        if page_title:
            return page_title+'/'
        else:
            return 'Home'

    @web.authenticated
    def get(self, path=''):
        print("get tree: path; ", path)
        self.log.info("get tree %s", path)
        self.log.warn("get tree %s", path)
        path = path.strip('/')
        cm = self.contents_manager
        
        if cm.dir_exists(path=path):
            if cm.is_hidden(path):
                self.log.info("Refusing to serve hidden directory, via 404 Error")
                raise web.HTTPError(404)
            breadcrumbs = self.generate_breadcrumbs(path)
            page_title = self.generate_page_title(path)
            self.write(self.render_template('tree.html',
                page_title=page_title,
                notebook_path=path,
                breadcrumbs=breadcrumbs,
                terminals_available=self.settings['terminals_available'],
                server_root=self.settings['server_root_dir'],
            ))
        elif cm.file_exists(path):
            # it's not a directory, we have redirecting to do
            model = cm.get(path, content=False)
            # redirect to /api/notebooks if it's a notebook, otherwise /api/files
            service = 'notebooks' if model['type'] == 'notebook' else 'files'
            url = url_path_join(
                self.base_url, service, url_escape(path),
            )
            self.log.debug("Redirecting %s to %s", self.request.path, url)
            self.redirect(url)
        else:
            raise web.HTTPError(404)


class DataHandler(IPythonHandler):
    """get static data"""

    @web.authenticated
    def get(self):
        # data = [
        #     {'title': "移动互联网分析",
        #     'table': ("用户使用APP信息", "用户搜索关键字汇总信息", "用户互联网账号信息"),},
        #      {'title': "移动互联网分析",
        #       'table': ("用户使用APP信息", "用户搜索关键字汇总信息", "用户互联网账号信息"), },
        #      ]
        data = [{'title': "移动互联网分析",
            'table': ("用户使用APP信息", "用户搜索关键字汇总信息", "用户互联网账号信息"),
            'table_detail':[
            {'para':['deivce_number', 'prod_id'],
            'para_detail': [{'type':'str',
            'explain':'telephone',
            'example':'1234321',
            }, {'type':'str1',
            'explain':'telephone222',
            'example':'1234321000',}
            ]}],
            },]
        # data = {
        #     'title': "移动互联网分析",
        #    'table': ("用户使用APP信息", "用户搜索关键字汇总信息", "用户互联网账号信息"),
        # }
        dJson = json.dumps(data)
        self.log.info(dJson)
        self.write(dJson)

#-----------------------------------------------------------------------------
# URL to handler mappings
#-----------------------------------------------------------------------------


default_handlers = [
    (r"/tree%s" % path_regex, TreeHandler),
    (r"/tree", TreeHandler),
    (r"/data", DataHandler)
    ]
