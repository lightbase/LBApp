
import json
from lbapp.lib import utils
from pyramid.response import Response

class BaseView():

    def __init__(self, factory, request):
        self.factory = factory
        self.request = request

    def get_bases(self):
        """ Get list of bases names
        """
        bases = self.factory.get_bases()
        return {'base_names': self.factory.to_json(bases)}

    def get_base_json(self):
        """ Get base json
        """
        response = self.factory.get_base(attr='json_base')
        return {'base_json': response.text}

    def list_base(self):
        """ Get all bases 
        """
        results = self.factory.list_base()
        return {'results': json.dumps(results)}

    def create_base(self):
        """ Create base
        """
        data = dict(self.request.params)
        response = self.factory.create_base(data)
        return Response(response.text)

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

    def get_explorer_data(self):
        """ Get base json and registries
        """
        results = self.factory.get_registries()
        registries = [result['json_reg'] for result in results['results']]
        base_json = self.factory.get_base(attr='json_base').json()
        explorer = {
            'json_base': base_json,
            'registries': registries,
        }
        # This is used in template
        self.request.rest_url = self.factory.rest_url
        self.request.base_name = self.factory.base

        return {'explorer': json.dumps(explorer, ensure_ascii=False)}

    def explorer_override(self):
        """ Choose method and respective registry action 
        """
        method = self.request.params['method']
        actions = {
            'POST': 'create_registry',
            'PUT': 'edit_registry',
            'DELETE': 'delete_registry'
        }
        action = getattr(self, actions[method])
        return action()

    def create_registry(self):
        """ Create registry or path
        """
        id = self.request.params['pk']
        if id == '':
            data = {'json_reg': self.request.params['value']}
            response = self.factory.create_registry(data)
        else:
            path = self.request.params['name']
            data = {'value': self.request.params['value']}
            response = self.factory.create_registry_path(id, path, data)
        return Response(response.text, status=response.status_code)

    def edit_registry(self):
        """ Edit registry or path
        """
        id = self.request.params['pk']
        path  = self.request.params['name']
        if path == '':
            data = {'json_reg': self.request.params['value']}
            self.factory.edit_registry(id, data)
            response = self.factory.get_registry(id, attr='json_reg')
        else:
            data = {'value': self.request.params['value']}
            response = self.factory.edit_registry_path(id, path, data)
        return Response(response.text, status=response.status_code)

    def delete_registry(self):
        """ Delete registry or path
        """
        id = self.request.params['pk']
        path = self.request.params.get('name')
        if path:
            response = self.factory.delete_registry_path(id, path)
        else:
            response = self.factory.delete_registry(id)
        return Response(response.text, status=response.status_code)

