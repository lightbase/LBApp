#!/usr/bin/python

import requests
import sys

print ("Parametros : " + str(sys.argv))
print ("Parametros : " + str(len(sys.argv)))
file_base_name = './bases/base_user.json'

if len(sys.argv) == 2:
    file_base_name = sys.argv[1]
print ("Nome do arquivo : " + file_base_name)

url = 'http://localhost/lbgenerator/'
file_base = open(file_base_name, 'r')
base = file_base.read()

params = {"json_base": base}
#print ("Param a ser enviado : " + str(params))
response = requests.post(url, params=params)

print("Resposta do LBGenerator: ")
print(response.text)
