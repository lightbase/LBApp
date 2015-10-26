import codecs
import json
import os
from .. import config as global_config
from lbapp.lib import utils
from lbapp.lib import email
#from lbapp.factories.user import BaseFactory
from lbapp.factories.user import UserFactory
from pyramid.response import Response
from pyramid.httpexceptions import HTTPFound

class BaseView():

    def __init__(self, factory, request):
        self.factory = factory
        self.request = request

    def get_bases(self):
        """ Get list of bases names
        """
        bases = self.factory.get_bases()
        return {'base_names': self.factory.to_json(bases)}

    def get_base(self):
        response = self.factory.get_base()
        return Response(response.text)

    def get_base_json(self):
        """ Get base json
        """
        # attr='struct'
        response = self.factory.get_base()
        return {'base_json': response.text}

    def list_bases(self):
        """ Get all bases 
        """
        theme = 'acev2'
        
        if self.request.params:
            results = self.factory.list_base(**self.request.params)
            return Response(json.dumps(results))

        return {'theme': theme}
        
    def list_bases_table(self):
        """ Get all bases 
        """
        theme = 'acev2'
        
        if self.request.params:
            results = self.factory.list_base(**self.request.params)
            return Response(json.dumps(results))

        return {'theme': theme}

    def create_base(self):
        """ Create base
        """
        data = dict(self.request.params)
        app_user = self.request.session.get('id_app_user', None)
        data['id_app_user'] = app_user
        response = self.factory.create_base(data)
        return Response(response.text)

    def config_base(self):
        if self.request.params:
            data = {'json_base': self.request.params['json_base']}
            response = self.factory.edit_base(data)
            return Response(response.text)
        return self.get_base_json()

    def edit_base(self):
        """ Edit base
            option ´´update´´: update base
            option ´´create´´: delete and recreate base
        """
        option = self.request.params.get('option') or 'update'
        data = {'json_base': self.request.params['json_base']}

        if option == 'update':
            response = self.factory.edit_base(data)
            return Response(response.text)

        elif option == 'create':
            self.factory.delete_base()
            response = self.factory.create_base(data)
            return Response(response.text)

    def delete_base(self):
        """ Delete base
        """
        response = self.factory.delete_base()
        return Response(response.text)

    def get_registries(self):
        """ Get base registries
        """
        iSortCol = self.request.params.get("iSortCol_0")
        sSearch = self.request.params.get("sSearch") or '%'
        if iSortCol == '0':
            sort_column = 'id_doc'
        else:
            sort_column = self.request.params.get('mDataProp_' + iSortCol, 'id_doc').split('.')[-1]

        search = self.factory.get_search(
            select = ['*'],
            order_by = {self.request.params.get("sSortDir_0"): [sort_column]},
            limit = self.request.params.get('iDisplayLength'),
            offset = self.request.params.get('iDisplayStart'),
            literal = "Upper(document::text) like '%"+ sSearch.upper() +"%'"
        )
        registries = self.factory.get_registries(search)
        response = {
            "aaData": registries['results'],
            "sEcho": self.request.params.get('sEcho'),
            "iTotalRecords": registries['limit'],
            "iTotalDisplayRecords": registries['result_count'],
        }
        return Response(json.dumps(response))

    def create_reg(self):
        """ Create registry 
        """
        data = {'value': self.request.params['value']}
        response = self.factory.create_registry(data)
        return Response(response.text, status=response.status_code)

    def create_reg_path(self):
        """ Create registry path
        """
        id = self.request.matchdict['id']
        path = self.request.params['path']
        data = {'value': self.request.params['value']}
        response = self.factory.create_registry_path(id, path, data)
        return Response(response.text, status=response.status_code)

    def update_reg_path(self):
        """ Update registry path
        """
        required = ['pk', 'name', 'value']
        for req in required:
            if not req in self.request.params:
                raise Exception('Required param %s not found in request' % req)
        id = self.request.params['pk']
        name = self.request.params['name']
        value = self.request.params['value']
        response = self.factory.update_reg_path(id, name, value)
        return Response(response.text, status=response.status_code)

    def delete_reg(self):
        """ Delete registry 
        """
        id = self.request.matchdict['id']
        response = self.factory.delete_registry(id)
        return Response(response.text, status=response.status_code)

    def delete_reg_path(self):
        """ Delete registry path
        """
        id = self.request.matchdict['id']
        path = self.request.matchdict['path']
        response = self.factory.delete_registry_path(id, path)
        return Response(response.text, status=response.status_code)

    def get_json_base(self):

        return [ ]

    def create_doc_json(self):
        params = self.request.params
        file = params['doc']
        json_base = file.file.read()
        base_json = json_base.decode('utf-8')
        if base_json.startswith('.'):
           base_json[1:]
        json_base = json.loads(base_json)
        nm_base = json_base['metadata']['name']
        data = {'json_base': base_json}
        response = self.factory.create_json_doc(data)
        if(response == '1'):
            return HTTPFound(location=self.request.route_url('home')+'base/'+ nm_base + '/edit')
        else:
            return HTTPFound(location=self.request.route_url('error-404'))

    def create_base_json(self):
        data = {'json_base': self.request.params['json_base']}
        response = self.factory.create_json_base(data)
        return Response(response.text)

    def get_json_reg(self):

        return [ ]

    def create_reg_json(self):

        return [ ]

    def doc_download(self):
        base = self.request.matchdict['base']
        data = self.factory.download_doc(base)
        return Response(
            content_type='text/plain',
            content_disposition='attachment;filename='+base+'.txt',
            app_iter=[data]

        )

    def share_base(self):
        basename = self.request.params['base']
        username = self.request.params['usernames']
        print("Base Compartilhar : " + str(basename))
        print("User Compartilhar : " + str(username))
        self.factory.share_base(basename, username)
        userFactory = UserFactory(self.request)
        user = userFactory.get_user(username)
        if user :
            self.send_email_base_shared(basename, user)
        return Response()

    def send_email_base_shared(self, base, user):
        print("Enviando email para : " + str(user['email_user']))
        subject_email = global_config.SHARE_BASE_SUBJECT 
        # TODO : Verifica se há uma maneira melhor de ler conteúdo file
        file_name = os.path.dirname(os.path.realpath(__file__))
        file_name += '/../' + global_config.SHARE_BASE_FILE
        # TODO : Carregar somente uma vez ao inicializar app
        file_body = codecs.open(file_name, encoding='utf-8', mode='r')
        msg = file_body.read()
        format = {
                  'user_name':user['name_user'],
                  'base_name':base,
                  'link_lightbase':global_config.LINK_LIGHTBASE
                  }
        msg_body = msg.format(**format)
        email.send_email(user['email_user'], subject_email, msg_body, msg_body)
