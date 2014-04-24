import json

def parse_json(obj):
    if not obj:
        raise Exception('No JSON data supplied.')
    if type(obj) is dict:
        return obj
    if isinstance(obj, str):
        obj = obj.encode('utf-8')
    try:
        obj = json.loads(obj.decode('utf-8'))
        return obj
    except Exception as e:
        raise Exception('Could not parse JSON data. Details: %s' % str(e.args[0]))

def is_integer(text):
    try:
        int(text)
        return True
    except:
        return False
