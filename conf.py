import sys
import os
import shlex

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
sys.path.insert(0, os.path.abspath('..'))
import recommonmark
from recommonmark.parser import CommonMarkParser
from recommonmark.transform import AutoStructify

from recommonmark.states import DummyStateMachine
# Monkey patch to fix recommonmark 0.4 doc reference issues.
orig_run_role = DummyStateMachine.run_role
def run_role(self, name, options=None, content=None):
    if name == 'doc':
        name = 'any'
    return orig_run_role(self, name, options, content)
DummyStateMachine.run_role = run_role

source_parsers = {
    '.md': CommonMarkParser,
}

source_suffix = ['.rst', '.md']

extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.napoleon',
    'sphinx.ext.mathjax',
]

templates_path = ['docs/_templates']

html_static_path = ['docs/_static']

exclude_patterns = ['_build']

language = None

default_role = None

master_doc = 'toctrees'

project = u'Open Visualisation Environment'
copyright = u'2018, Data Science Institute'
author = u'Senaka Fernando'

github_doc_root = 'https://github.com/ove/ove-docs/tree/master/'

pygments_style = 'sphinx'

todo_include_todos = False

html_theme = 'sphinx_rtd_theme'

# app setup hook
def setup(app):
    app.add_javascript('js/github_url.js')
    app.add_config_value('recommonmark_config', {
        'url_resolver': lambda url: github_doc_root + url,
        'auto_toc_tree_section': 'Table of contents',
    }, True)
    app.add_transform(AutoStructify)
