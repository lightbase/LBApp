
from pyramid.view import view_config
from pyramid.exceptions import NotFound
from pyramid.response import Response
import traceback

@view_config(context=NotFound, renderer='../templates/acev1/theme/error/error-404.pt')
def notfound_view(request):
    """ Customized NotFound view 
    """
    return {}

@view_config(route_name='error-404', renderer='../templates/acev1/theme/error/error-404.pt')
def notfound_view_routed(request):
    """ Customized NotFound view 
    """
    return {}

@view_config(context=Exception, renderer='../templates/acev1/theme/error/error-500.pt')
def error_view(exc, request):
    """ Customized Error view 
    """
    print(traceback.format_exc())
    if type(exc.args) is tuple:
        error_message = exc.args[0]
    else:
        error_message = exc.args

    return Response('%s' % error_message, status=500)
    return {'error_message': str(exc.args)}

@view_config(route_name='error-500', renderer='../templates/acev1/theme/error/error-500.pt')
def error_view_routed(exc, request):
    """ Customized Error view 
    """
    #print(traceback.format_exc())
    return {'error_message': ''}
