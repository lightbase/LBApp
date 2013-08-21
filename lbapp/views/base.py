from pyramid.view import view_config
from lbapp import rest_url


@view_config(route_name='create_base', renderer='../templates/base/new.pt')
def create_base(request):
    return {'json_base': 'json_base'}

@view_config(route_name='edit_base', renderer='../templates/base/edit.pt')
def edit_base(request):
    return {'json_base': 'json_base'}

@view_config(route_name='list_base', renderer='../templates/base/list.pt')
def edit_base(request):
    return {'json_base': 'json_base'}



