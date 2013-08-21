from pyramid.config import Configurator
from lbapp.config import routing


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    global rest_url
    rest_url = settings['rest_url']

    config = Configurator(settings=settings)
    routing.make_routes(config)
    config.scan('lbapp')

    return config.make_wsgi_app()
