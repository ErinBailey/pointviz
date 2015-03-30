import os
import sys
import pymongo
from bson import Binary, Code
from bson.json_util import dumps

db = pymongo.MongoClient().test

col = db.collection2

stuff = []
for doc in col.find():
	stuff.append(doc)



thejson = dumps(stuff)
fh = open('query.json', 'w')
fh.write(thejson)

subprocess.call('python geoparse.py query.json', shell=True)



