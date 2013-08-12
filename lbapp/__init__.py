from pyramid.config import Configurator


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('listarbase', 'listarbase')
    config.add_route('criarbase', 'criarbase')
    config.add_route('blank', 'blank')
    config.add_route('buttons', 'buttons')
    config.add_route('calendar', 'calendar')
    config.add_route('elements', 'elements')
    config.add_route('empty', 'empty')
    config.add_route('form-elements', 'form-elements')
    config.add_route('form-wizard', 'form-wizard')
    config.add_route('gallery', 'gallery')
    config.add_route('grid', 'grid')
    config.add_route('index', 'index')
    config.add_route('invoice', 'invoice')
    config.add_route('login', 'login')
    config.add_route('pricing', 'pricing')
    config.add_route('profile', 'profile')
    config.add_route('tables', 'tables')
    config.add_route('treeview', 'treeview')
    config.add_route('typography', 'typography')
    config.add_route('widgets', 'widgets')
    config.add_route('wysiwyg', 'wysiwyg')
    config.add_route('error-404', 'error-404')
    config.add_route('error-500', 'error-500')
    config.add_route('f', 'f')
    config.scan()
    return config.make_wsgi_app()
