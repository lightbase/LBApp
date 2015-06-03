
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

    print("Configurado : " + str(AUTH_ENABLED))
