from pyramid.response import Response
from lbapp.lib import utils
import json

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
        return Response(response.text)

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
