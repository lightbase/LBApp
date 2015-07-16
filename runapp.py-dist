import os

from paste.deploy import loadapp
from waitress import serve

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 80))
    app = loadapp('config:/usr/local/lbneo/virtenvlb3.2/src/LBApp/heroku.ini', relative_to='.')
    serve(app, host='0.0.0.0', port=port)
