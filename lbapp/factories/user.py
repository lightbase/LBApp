from lbapp.factories import RequestFactory
from lbapp.exception import RequestError
from lbapp.lib import utils
from pyramid.security import remember
from pyramid.security import forget 
from pyramid.response import Response
import json

class UserFactory(RequestFactory):

    def __init__(self, request):
         self.request = request

    def login(self, **data):
        url = self.to_url(self.rest_url, 'user/login')
        response = self.send_request('post', url, data=data)
        self.cookies = response.cookies
        id_user = data['nm_user']
        headers = remember(self.request, id_user)
        self.request.session['id_user'] = id_user
        self.request.session.changed()
        #response.cookies.update(headers)
        #response.headers = headers
        #return response
        return Response('OK', headers=headers)

    def logout(self, **data):
        headers = forget(self.request)
        if 'id_user' in self.request.session:
            del self.request.session['id_user']
            self.request.session.changed()
        url = self.to_url(self.rest_url, 'user/logout')
        response = self.send_request('post', url)
        self.cookies = response.cookies
        response.headers = headers
        #return response
        return Response(charset='utf8', headers=headers)

    def register(self, **data):
        url = self.to_url(self.rest_url, 'user')
        response = self.send_request('post', url, data=data)
        if utils.is_integer(response.text):
            return response
        else:
            raise RequestError(response.text)

    def get_profile(self, user):
        url = self.to_url(self.rest_url, 'user', user)
        response = self.send_request('get', url)
        return response.json()

    def put_profile(self, user, **data):
        url = self.to_url(self.rest_url, 'user', user)
        response = self.send_request('put', url, data=data)
        if utils.is_integer(response.text):
            return response
        else:
            raise RequestError(respnse.text)
