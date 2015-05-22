
from requests.exceptions import HTTPError
from lbapp import config
from lbapp.exception import RequestError
from pyramid.security import Allow, Deny, Everyone
import requests
import json

SESSION_COOKIES = None

class RequestFactory():
    """ Base class Methods for requesting rest api
    """
    __acl__ = [
                (Allow, 'admin', 'view'),
             ]
    rest_url = config.REST_URL

    def to_json(self, obj):
        return json.dumps(obj, ensure_ascii=False)

    def to_url(self, *args):
        """ Make a list of args and join "/" between list elements
        """
        args = [arg for arg in args if arg is not None]
        return '/'.join(args)

    @property
    def cookies(self):
        session_cookies = getattr(self, '_cookies', None)
        if not session_cookies:
            self._cookies = SESSION_COOKIES
        return self._cookies
        
    @cookies.setter
    def cookies(self, c):
        self._cookies = c
        globals()['SESSION_COOKIES'] = c

    def send_request(self, method, url, **kwargs):
        """ Tries to return json response, raise RequestError if exception occurs.
        """
        # First get request method
        request_method = getattr(requests, method)
        print("Realizando requisição LBGenerator...")
        print("Method : + " + str(request_method))
        print("Args : " + str(kwargs))
        #print("Cookies : " + str(self.cookies))
        print("")
        # Make http request
        response = request_method(url, cookies=self.cookies, **kwargs)
        try:
            # Check if request has gone wrong
            response.raise_for_status()
            # Everything is alright, return response
            return response
        except HTTPError as e:
            print("Something gone wrong...")
            print(str(e))
            # Something got wrong, raise error
            raise RequestError(response.text)

    def get_search(self, **search):
        """ Return a search pattern
        """
        return {'$$': json.dumps(search)}


