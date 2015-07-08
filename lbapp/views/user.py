from pyramid.response import Response
from lbapp.lib import utils
from lbapp.lib import email
import json
import logging

log = logging.getLogger(__name__)

class UserView():

    def __init__(self, factory, request):
        self.factory = factory
        self.request = request

    def login(self):
        data = dict(
            nm_user = self.request.params['nm_user'],
            passwd_user= self.request.params['passwd_user']
        )
        if '@' in data['nm_user']:
            data['email_user'] = data['nm_user']
            del data['nm_user']

        response = self.factory.login(**data)
        #return Response(response.text)
        return response

    def logout(self):
        response = self.factory.logout()
        return response

    def register(self):
        data = dict(
            id_user = self.request.params.get('id_user'),
            name_user = self.request.params.get('name_user'),
            email_user = self.request.params.get('email_user'),
            passwd_user= self.request.params.get('passwd_user')
        )

        print("Criando usuário :" + data['id_user'])
        response = self.factory.register(**data)
        # Envia email de boas vindas
        subject_email = "Bem Vindo ao Lightbase"
        msg_welcome  = "Olá {name_user}, seja bem vindo ao Lightbase!"
        body_email = msg_welcome.format(name_user=data['name_user'])
        email.send_email(data['email_user'], subject_email,
                   body_email)
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
