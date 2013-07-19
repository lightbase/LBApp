from pyramid.view import view_config
import urllib3

conn = urllib3.connection_from_url('http://neo.lightbase.cc/')

@view_config(route_name='teste', renderer='templates/hometeste.pt')
def temp1(request):
    return {'project': 'LBApp'}
@view_config(route_name='home', renderer='templates/home.pt')
def temp2(request):
    return {'project': 'LBApp'}
@view_config(route_name='listarbase', renderer='templates/listarbase.pt')
def temp3(request):


    
    req = conn.request_encode_url('GET', '/api/base', fields={'$$':'{"select":["nome_base","id_base"]}'})
    req = req.data

    return {'project': 'LBApp', 'req': req}


