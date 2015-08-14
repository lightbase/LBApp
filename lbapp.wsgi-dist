from pyramid.paster import get_app
application = get_app(
  '/srv/lightbase-neo/src/branches/1.0/LBApp/development.ini', 'main')

import lbapp.monitor
lbapp.monitor.start(interval=1.0)
