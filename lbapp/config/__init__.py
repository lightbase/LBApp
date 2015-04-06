import os

def set_globals(**settings):

    global REST_URL
    REST_URL = os.environ.get('REST_URL', None) 
    if REST_URL is None:
    	REST_URL = settings['rest_url']
