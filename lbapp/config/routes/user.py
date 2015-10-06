
from lbapp.factories.user import UserFactory
from lbapp.views.user import UserView

def make_user_routes(config):
    config.add_route('login', 'login', factory=UserFactory)
    config.add_view(route_name='login', request_method='GET', renderer='templates/routes/login.pt')
    config.add_forbidden_view(renderer='templates/routes/login.pt')
    config.add_view(view=UserView, attr='login', route_name='login', request_method='POST')

    config.add_route('logout', 'logout', factory=UserFactory)
    config.add_view(view=UserView, attr='logout', route_name='logout', request_method='GET')

    config.add_route('register', 'register', factory=UserFactory)
    #config.add_view(route_name='register', request_method='GET', renderer='templates/routes/register.pt')
    config.add_view(view=UserView, attr='register', route_name='register', request_method='POST')

    config.add_route('profile', 'profile/{user}', factory=UserFactory)
    config.add_view(view=UserView, attr='profile', route_name='profile', request_method='GET', renderer='templates/user/profile.pt', permission='view')
    config.add_view(view=UserView, attr='update_user', route_name='profile', request_method='PUT', permission='view')
