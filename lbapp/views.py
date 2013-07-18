from pyramid.view import view_config


@view_config(route_name='pyramid', renderer='templates/mytemplate.pt')
def temp1(request):
    return {'project': 'LBApp'}
@view_config(route_name='teste', renderer='templates/acemaster.pt')
def temp2(request):
    return {'project': 'LBApp'}
@view_config(route_name='home', renderer='templates/home.pt')
def temp3(request):
    return {'project': 'LBApp'}
@view_config(route_name='criabase', renderer='templates/criadordebase.pt')
def temp4(request):
	return {'project': 'LBApp'}
