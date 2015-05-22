from pyramid.response import Response
from lbapp.lib import utils
import json
import logging

log = logging.getLogger(__name__)

class UserView():

    def __init__(self, factory, request):
        self.factory = factory
        self.request = request

    def login(self):
        url_forwarder = self.request.params['url_forwarder']
        data = dict(
            nm_user = self.request.params['nm_user'],
            passwd_user= self.request.params['passwd_user']
        )
        if '@' in data['nm_user']:
            data['email_user'] = data['nm_user']
            del data['nm_user']

        response = self.factory.login(**data)
        print("Redirecionar : "+ str(url_forwarder))
        response.url = url_forwarder
        #return Response(response.text)
        return response

    def logout(self):
        response = self.factory.logout()
        return Response(response.text)

    def register(self):
        data = dict(
            nm_user = self.request.params['nm_user'],
            email_user = self.request.params['email_user'],
            passwd_user= self.request.params['passwd_user']
        )
        response = self.factory.register(**data)
        return Response(response.text)

    def profile(self):
        user = self.request.matchdict['user']
        data = self.factory.get_profile(user)
        return {
            'nm_user': data['nm_user'],
            'email_user': data['email_user'],
            'passwd_user' : data['passwd_user']
        }

    def update_user(self):
        user = self.request.matchdict['user']
        data = dict(
            nm_user = self.request.params['nm_user'],
            email_user = self.request.params['email_user'],
            passwd_user = self.request.params['passwd_user']
        )
        response = self.factory.put_profile(user, **data)
        return Response(response.text)

USERS = {'admin':'12345', 'viewer':'viewer'}
GROUPS = {'admin':['group:admins']} 

def user_callback(id_user, request):

    print('0000000000Usuário recebido :' + id_user)
    log.debug('0000000000Usuário recebido :' + id_user)
    #user = request.sesion['user']
    if id_user is not None:
        return ['admin']
    else:
        return None
