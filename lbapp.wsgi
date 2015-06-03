from pyramid.paster import get_app
application = get_app(
  '/usr/local/pgfndocs-rest-1.0/lightbase-neo/src/LBApp/production.ini', 'main')
