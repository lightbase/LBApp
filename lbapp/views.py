from pyramid.view import view_config

@view_config(route_name='teste', renderer='templates/hometeste.pt')
def temp1(request):
    return {'project': 'LBApp'}
@view_config(route_name='home', renderer='templates/home.pt')
def temp2(request):
    return {'project': 'LBApp'}
@view_config(route_name='listarbase', renderer='templates/listarbase.pt')
def temp3(request):
    return {'project': 'LBApp'}
@view_config(route_name='criarbase', renderer='templates/criarbase.pt')
def temp4(request):
    return {'project': 'LBApp'}
@view_config(route_name='conquer', renderer='templates/ui_elements_nestable.pt')
def temp5(request):
    return {'project': 'LBApp'}
@view_config(route_name='nestable', renderer='templates/nestable.pt')
def temp5(request):
    return {'project': 'LBApp'}
