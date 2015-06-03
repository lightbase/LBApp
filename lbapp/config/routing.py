
def make_routes(config):

    from lbapp.config.routes.base import make_base_routes
    from lbapp.config.routes.user import make_user_routes

    # ** STATIC **
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_static_view('templates', 'templates', cache_max_age=3600)
    # ** HOME **
    config.add_route('home', '/')
    config.add_route('master', 'master')

    # ** BASE **
    make_base_routes(config)

    # ** USER **
    make_user_routes(config)

    config.add_route('delete_tmp_storage', 'base/{id}/tmp-storage/{storage}')
    config.add_route('tmp_storage', 'base/{id}/tmp-storage')

    # ** ERROR **
    config.add_route('error-404', 'error-404')
    config.add_route('error-500', 'error-500')

