#!/bin/env python

import sys, os, json

commit_message = sys.argv[1]

curr_dir = os.getcwd()
os.chdir(os.path.join(curr_dir, 'client'))

f = open('package.json')
data = f.read()
f.close()
data = json.loads(data)
data['homepage'] = '/static/react'
f = open('package.json', 'w+')
f.write(json.dumps(data))
f.close()

os.system('npm run build')

f = open('package.json')
data = f.read()
f.close()
data = json.loads(data)
data.pop('homepage')
f = open('package.json', 'w+')
f.write(json.dumps(data))
f.close()

os.chdir(curr_dir)

os.system('git add .')
os.system(f'git commit -m "{commit_message}" --allow-empty')
os.system('git push')