
def set_globals(**settings):

    global REST_URL
    #REST_URL = settings['rest_url']
    REST_URL = os.environ.get('DATABASE_URL', None)

