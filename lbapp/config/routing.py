
def make_routes(config):

    from lbapp.factories.base import BaseFactory
    from lbapp.views.base import BaseView

    config.add_static_view('static', 'static', cache_max_age=3600)

    # Adiciona sempre rota para o site principal
    config.add_route('home', '/')
    config.add_route('master', 'master')

    config.add_route('create_base', 'base/new', factory=BaseFactory)
    config.add_view(view=BaseView, attr='get_bases', route_name='create_base', request_method='GET', renderer='templates/base/new.pt')
    config.add_view(view=BaseView, attr='create_base', route_name='create_base', request_method='POST')

    config.add_route('edit_base', 'base/{base}/edit', factory=BaseFactory)
    config.add_view(view=BaseView, attr='get_base_json', route_name='edit_base', request_method='GET', renderer='templates/base/edit.pt')
    config.add_view(view=BaseView, attr='edit_base', route_name='edit_base', request_method='POST')

    config.add_route('list_base', 'base/list', factory=BaseFactory)
    config.add_view(view=BaseView, attr='list_base', route_name='list_base', request_method='GET', renderer='templates/base/list.pt')
    config.add_view(view=BaseView, attr='delete_base', route_name='list_base', request_method='DELETE')

    config.add_route('config_base', 'config', factory=BaseFactory)
    config.add_view(view=BaseView, attr='edit_base', route_name='config_base', request_method='PUT')

    config.add_route('explore_base', 'base/{base}/explore', factory=BaseFactory)
    config.add_view(view=BaseView, attr='get_explorer_data', route_name='explore_base', request_method='GET', renderer='templates/base/explore.pt')
    config.add_view(view=BaseView, attr='explorer_override', route_name='explore_base', request_method='POST')

    # ** BASE **
    #config.add_route('explore_base', 'base/{base}/explore')

    config.add_route('delete_tmp_storage', 'base/{id}/tmp-storage/{storage}')
    config.add_route('tmp_storage', 'base/{id}/tmp-storage')

    # ** ERROR **
    config.add_route('error-404', 'error-404')
    config.add_route('error-500', 'error-500')

