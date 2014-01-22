
from requests.exceptions import HTTPError
from lbapp import config
from lbapp.exception import RequestError
import requests
import json

class RequestFactory():
    """ Base class Methods for requesting rest api
    """
    rest_url = config.REST_URL

    def to_json(self, obj):
        return json.dumps(obj, ensure_ascii=False)

    def to_url(self, *args):
        """ Make a list of args and join "/" between list elements
        """
        args = [arg for arg in args if arg is not None]
        return '/'.join(args)

    def send_request(self, method, url, **kwargs):
        """ Tries to return json response, raise RequestError if exception occurs.
        """
        # First get request method
        request_method = getattr(requests, method)
        # Make http request
        response = request_method(url, **kwargs)
        try:
            # Check if request has gone wrong
            response.raise_for_status()
            # Everything is alright, return response
            return response
        except HTTPError:
            # Something got wrong, raise error
            raise RequestError(response.text)

