from lbapp.factories import RequestFactory
from lbapp.exception import RequestError
from lbapp.lib import utils
import json

class UserFactory(RequestFactory):

    def __init__(self, request):
         self.request = request

    def login(self, **data):
        url = self.to_url(self.rest_url, 'user/login')
        response = self.send_request('post', url, data=data)
        self.cookies = response.cookies
        return response

    def logout(self, **data):
        url = self.to_url(self.rest_url, 'user/logout')
        response = self.send_request('post', url)
        self.cookies = response.cookies
        return response

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
