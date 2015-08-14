# -*- coding: utf-8 -*-
import os

def set_globals(**settings):

    global REST_URL
    REST_URL = settings['rest_url']

    global AUTH_ENABLED
    AUTH_ENABLED = os.environ.get('AUTH_ENABLED', None)
    if AUTH_ENABLED is None:
        AUTH_ENABLED = bool(int(settings['auth.enabled']))
    else:
        AUTH_ENABLED = bool(int(AUTH_ENABLED))

    global LBGENERATOR_TOKEN_KEY
    LBGENERATOR_TOKEN_KEY = settings['lbgenerator.token_key']
    global LBGENERATOR_TOKEN_NAME
    LBGENERATOR_TOKEN_NAME = settings['lbgenerator.token_name']

    global LINK_LIGHTBASE
    LINK_LIGHTBASE = settings['link_lightbase']

    global SHARE_BASE_SUBJECT
    global SHARE_BASE_FILE
    SHARE_BASE_SUBJECT = settings['share_base_subject']
    SHARE_BASE_FILE = settings['share_base_file']
