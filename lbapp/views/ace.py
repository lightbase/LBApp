
from pyramid.view import view_config

@view_config(route_name='home', renderer='../templates/index.pt')
def temp0(request):
    return {'project': 'LBApp'}
