
from pyramid.view import view_config
from pyramid.exceptions import NotFound
import traceback

@view_config(context=NotFound, renderer='../templates/error/error-404.pt')
def notfound_view(request):
    """ Customized NotFound view 
    """
    return {}

@view_config(context=Exception, renderer='../templates/error/error-500.pt')
def error_view(exc, request):
    """ Customized Error view 
    """
    print(traceback.format_exc())
    return {}
