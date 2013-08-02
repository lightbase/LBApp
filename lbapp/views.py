from pyramid.view import view_config

@view_config(route_name='listarbase', renderer='templates/listarbase.pt')
def temp1(request):
    return {'project': 'LBApp'}
@view_config(route_name='criarbase', renderer='templates/criarbase.pt')
def temp2(request):
    return {'project': 'LBApp'}
@view_config(route_name='blank', renderer='templates/ace-ace/blank.pt')
def temp4(request):
    return {'project': 'LBApp'}
@view_config(route_name='buttons', renderer='templates/ace-ace/buttons.pt')
def temp5(request):
    return {'project': 'LBApp'}
@view_config(route_name='calendar', renderer='templates/ace-ace/calendar.pt')
def temp6(request):
    return {'project': 'LBApp'}
@view_config(route_name='elements', renderer='templates/ace-ace/elements.pt')
def temp7(request):
    return {'project': 'LBApp'}
@view_config(route_name='empty', renderer='templates/ace-ace/empty.pt')
def temp8(request):
    return {'project': 'LBApp'}
@view_config(route_name='form-elements', renderer='templates/ace-ace/form-elements.pt')
def temp9(request):
    return {'project': 'LBApp'}
@view_config(route_name='form-wizard', renderer='templates/ace-ace/form-wizard.pt')
def temp10(request):
    return {'project': 'LBApp'}
@view_config(route_name='gallery', renderer='templates/ace-ace/gallery.pt')
def temp11(request):
    return {'project': 'LBApp'}
@view_config(route_name='grid', renderer='templates/ace-ace/grid.pt')
def temp12(request):
    return {'project': 'LBApp'}
@view_config(route_name='index', renderer='templates/ace-ace/index.pt')
def temp13(request):
    return {'project': 'LBApp'}
@view_config(route_name='invoice', renderer='templates/ace-ace/invoice.pt')
def temp14(request):
    return {'project': 'LBApp'}
@view_config(route_name='login', renderer='templates/ace-ace/login.pt')
def temp15(request):
    return {'project': 'LBApp'}
@view_config(route_name='pricing', renderer='templates/ace-ace/pricing.pt')
def temp16(request):
    return {'project': 'LBApp'}
@view_config(route_name='profile', renderer='templates/ace-ace/profile.pt')
def temp17(request):
    return {'project': 'LBApp'}
@view_config(route_name='tables', renderer='templates/ace-ace/tables.pt')
def temp18(request):
    return {'project': 'LBApp'}
@view_config(route_name='treeview', renderer='templates/ace-ace/treeview.pt')
def temp19(request):
    return {'project': 'LBApp'}
@view_config(route_name='typography', renderer='templates/ace-ace/typography.pt')
def temp20(request):
    return {'project': 'LBApp'}
@view_config(route_name='widgets', renderer='templates/ace-ace/widgets.pt')
def temp21(request):
    return {'project': 'LBApp'}
@view_config(route_name='wysiwyg', renderer='templates/ace-ace/wysiwyg.pt')
def temp22(request):
    return {'project': 'LBApp'}
