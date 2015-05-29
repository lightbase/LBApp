
from pyramid.config import Configurator
from lbapp.config import set_globals
from lbapp.config import routing
from lbapp.views.user import user_callback
from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.authentication import AuthTktAuthenticationPolicy

import uuid

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    set_globals(**settings)

    config = Configurator(settings=settings)

    config.include('pyramid_chameleon')

    routing.make_routes(config)

    secret = str(uuid.uuid4())

    from . import config as global_config

    # Configure Authentication and Authorization policy
    if global_config.AUTH_ENABLED is True:
        authn_policy = AuthTktAuthenticationPolicy(secret,
        callback=user_callback, hashalg='sha512')
        authz_policy = ACLAuthorizationPolicy()

        config.set_authentication_policy(authn_policy)
        config.set_authorization_policy(authz_policy)

    config.scan()

    return config.make_wsgi_app()


