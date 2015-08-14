from pyramid.paster import get_app
application = get_app(
  'development.ini', 'main')

import lbapp.monitor
lbapp.monitor.start(interval=1.0)
