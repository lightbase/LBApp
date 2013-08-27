from pyramid.view import view_config

@view_config(route_name='listarbase', renderer='templates/listarbase.pt')
def temp1(request):
    return {'project': 'LBApp'}
@view_config(route_name='criarbase', renderer='templates/criarbase.pt')
def temp2(request):
    return {'project': 'LBApp'}
@view_config(route_name='buttons', renderer='../templates/buttons.pt')
def temp5(request):
    return {'project': 'LBApp'}
@view_config(route_name='calendar', renderer='../templates/calendar.pt')
def temp6(request):
    return {'project': 'LBApp'}
@view_config(route_name='elements', renderer='../templates/elements.pt')
def temp7(request):
    return {'project': 'LBApp'}
@view_config(route_name='empty', renderer='../templates/empty.pt')
def temp8(request):
    return {'project': 'LBApp'}
@view_config(route_name='form-elements', renderer='../templates/form-elements.pt')
def temp9(request):
    return {'project': 'LBApp'}
@view_config(route_name='form-wizard', renderer='../templates/form-wizard.pt')
def temp10(request):
    return {'project': 'LBApp'}
@view_config(route_name='gallery', renderer='../templates/gallery.pt')
def temp11(request):
    return {'project': 'LBApp'}
@view_config(route_name='grid', renderer='../templates/grid.pt')
def temp12(request):
    return {'project': 'LBApp'}
@view_config(route_name='index', renderer='../templates/index.pt')
def temp13(request):
    return {'project': 'LBApp'}
@view_config(route_name='invoice', renderer='../templates/invoice.pt')
def temp14(request):
    return {'project': 'LBApp'}
@view_config(route_name='login', renderer='../templates/login.pt')
def temp15(request):
    return {'project': 'LBApp'}
@view_config(route_name='pricing', renderer='../templates/pricing.pt')
def temp16(request):
    return {'project': 'LBApp'}
@view_config(route_name='profile', renderer='../templates/profile.pt')
def temp17(request):
    return {'project': 'LBApp'}
@view_config(route_name='tables', renderer='../templates/tables.pt')
def temp18(request):
    return {'project': 'LBApp'}
@view_config(route_name='treeview', renderer='../templates/treeview.pt')
def temp19(request):
    return {'project': 'LBApp'}
@view_config(route_name='typography', renderer='../templates/typography.pt')
def temp20(request):
    return {'project': 'LBApp'}
@view_config(route_name='widgets', renderer='../templates/widgets.pt')
def temp21(request):
    return {'project': 'LBApp'}
@view_config(route_name='wysiwyg', renderer='../templates/wysiwyg.pt')
def temp22(request):
    return {'project': 'LBApp'}
@view_config(route_name='f', renderer='../templates/form-wizard2.pt')
def temp25(request):
    return {'project': 'LBApp'}
@view_config(route_name='jqgrid', renderer='../templates/jqgrid.pt')
def temp26(request):
    return {'project': 'LBApp'}
