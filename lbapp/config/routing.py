
def make_routes(config):

    config.add_static_view('static', 'static', cache_max_age=3600)

    # ** BASE **
    config.add_route('create_base', 'base/new')
    config.add_route('list_base', 'base/list')
    config.add_route('edit_base', 'base/{base_id}/edit')
    config.add_route('explore_base', 'base/{base_id}/explore')

    # ** ERROR **
    config.add_route('error-404', 'error-404')
    config.add_route('error-500', 'error-500')

    # ** ACE **
    config.add_route('listarbase', 'listarbase')
    config.add_route('criarbase', 'criarbase')
    config.add_route('blank', 'blank')
    config.add_route('buttons', 'buttons')
    config.add_route('calendar', 'calendar')
    config.add_route('elements', 'elements')
    config.add_route('empty', 'empty')
    config.add_route('form-elements', 'form-elements')
    config.add_route('form-wizard', 'form-wizard')
    config.add_route('gallery', 'gallery')
    config.add_route('grid', 'grid')
    config.add_route('index', 'index')
    config.add_route('invoice', 'invoice')
    config.add_route('login', 'login')
    config.add_route('pricing', 'pricing')
    config.add_route('profile', 'profile')
    config.add_route('tables', 'tables')
    config.add_route('treeview', 'treeview')
    config.add_route('typography', 'typography')
    config.add_route('widgets', 'widgets')
    config.add_route('wysiwyg', 'wysiwyg')
    config.add_route('f', 'f')
    config.add_route('jqgrid', 'jqgrid')
    config.add_route('master', 'master')
    config.add_route('config', 'config')

''' 
    config.add_route('new_base',     'lb/new')

    config.add_route('view_base',    'lb/{base_name}/view')
    config.add_route('edit_base',    'lb/{base_name}/edit')
    config.add_route('delete_base',  'lb/{base_name}/delete')

    #   ***Formulário***

    config.add_route('new_form',     'lb/{base_name}/form/new')
    config.add_route('edit_form',    'lb/{base_name}/form/{form_name}/edit')
    config.add_route('delete_form',  'lb/{base_name}/form/{form_name}/delete')

    #   ***Registro***

    config.add_route('new_reg',      'lb/{base_name}/reg/{form_name}/new')
    config.add_route('view_reg',     'lb/{base_name}/reg/{form_name}/view/{id_reg}')
    config.add_route('edit_reg',     'lb/{base_name}/reg/{form_name}/edit/{id_reg}')
    config.add_route('delete_reg',   'lb/{base_name}/reg/{form_name}/delete/{id_reg}')
    '''
