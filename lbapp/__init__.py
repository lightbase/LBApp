from pyramid.config import Configurator


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', 'home')
    config.add_route('teste', 'teste')
    config.add_route('listarbase', 'listarbase')
    config.add_route('criarbase', 'criarbase')
    config.add_route('conquer', 'conquer')
    config.scan()
    return config.make_wsgi_app()
