
from lbapp.factories.base import BaseFactory
from lbapp.views.base import BaseView

def make_base_routes(config):


    config.add_route('get_base', 'base/{base}/get', factory=BaseFactory)
    config.add_view(view=BaseView, attr='get_base', route_name='get_base', request_method='GET', permission='view')

    config.add_route('create_base', 'base/new', factory=BaseFactory, permission='view')
    config.add_view(view=BaseView, attr='get_bases', route_name='create_base', request_method='GET', renderer='templates/routes/form.pt' ,permission='view')
    config.add_view(view=BaseView, attr='create_base', route_name='create_base', request_method='POST', permission='view')

    config.add_route('create_doc_json', 'base/new/json', factory=BaseFactory)
    config.add_view(view=BaseView, attr='get_json_base', route_name='create_doc_json', request_method='GET', renderer='templates/routes/new2.pt', permission='view')
    config.add_view(view=BaseView, attr='create_doc_json', route_name='create_doc_json', request_method='POST', permission='view')

    config.add_route('create_base_json', 'base/new/doc', factory=BaseFactory)
    config.add_view(view=BaseView, attr='create_base_json', route_name='create_base_json', request_method='POST', permission='view')


    config.add_route('doc_download', 'base/{base}/download', factory=BaseFactory)
    config.add_view(view=BaseView, attr='doc_download', route_name='doc_download', request_method='GET', permission='view')

    config.add_route('create_reg_json', 'base/new/reg', factory=BaseFactory)
    config.add_view(view=BaseView, attr='get_json_reg', route_name='create_reg_json', request_method='GET', renderer='templates/routes/new_reg.pt', permission='view')
    config.add_view(view=BaseView, attr='create_reg_json', route_name='create_reg_json', request_method='POST', permission='view')

    config.add_route('create_registry', 'base/{base}/doc', factory=BaseFactory)
    config.add_view(view=BaseView, attr='create_reg', route_name='create_registry', request_method='POST', permission='view')

    config.add_route('edit_base', 'base/{base}/edit', factory=BaseFactory, permission='view')
    config.add_view(view=BaseView, attr='get_base_json', route_name='edit_base', request_method='GET', renderer='templates/routes/edit.pt', permission='view')
    config.add_view(view=BaseView, attr='edit_base', route_name='edit_base', request_method='POST', permission='view')

    config.add_route('delete_base', 'base/{base}/delete', factory=BaseFactory)
    config.add_view(view=BaseView, attr='delete_base', route_name='delete_base', request_method='DELETE', permission='view')

    config.add_route('list_bases', 'base/list', factory=BaseFactory)
    config.add_view(view=BaseView, attr='list_bases', route_name='list_bases', request_method='GET', renderer='templates/routes/list-bases-metro.pt', permission='view')

    config.add_route('list_bases_table', 'base/table', factory=BaseFactory)
    config.add_view(view=BaseView, attr='list_bases_table', route_name='list_bases_table', request_method='GET', renderer='templates/routes/list-bases-table.pt', permission='view')


    config.add_route('config_base', 'base/{base}/config', factory=BaseFactory)
    config.add_view(view=BaseView, attr='config_base', route_name='config_base', request_method='PUT', permission='view')
    config.add_view(view=BaseView, attr='config_base', route_name='config_base', request_method='GET', renderer='templates/routes/config.pt', permission='view')

    config.add_route('get_registries', 'base/{base}/reg', factory=BaseFactory)
    config.add_view(view=BaseView, attr='get_registries', route_name='get_registries', request_method='GET', permission='view')

    config.add_route('explore_base', 'base/{base}/explore', factory=BaseFactory)
    config.add_view(route_name='explore_base', request_method='GET', renderer='templates/routes/explore.pt', permission='view')
    #config.add_view(view=BaseView, attr='update_reg_path', route_name='explore_base', request_method='PUT', permission='view')
    config.add_view(view=BaseView, attr='update_reg', route_name='explore_base', request_method='PUT', permission='view')

    config.add_route('delete_reg_path', 'base/{base}/explore/{id}/{path:.*}', factory=BaseFactory)
    config.add_view(view=BaseView, attr='delete_reg_path', route_name='delete_reg_path', request_method='DELETE', permission='view')
    config.add_route('delete_reg', 'base/{base}/explore/{id}', factory=BaseFactory)
    config.add_view(view=BaseView, attr='delete_reg', route_name='delete_reg', request_method='DELETE', permission='view')

    config.add_route('share_base', 'base/share', factory=BaseFactory)
    config.add_view(view=BaseView, attr='share_base', route_name='share_base', request_method='POST', permission='view')
 
