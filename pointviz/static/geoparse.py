import sys
from collections import OrderedDict

geo_file = {}
for fi in sys.argv:
	if fi == sys.argv[0]:
		continue
	else:
		fh = open(fi, "r")
		geo_file["type"] = "FeatureCollection"
		geo_file["features"] = []
		coll = ''
		for i in fh.readlines():
			coll += i
		coll = eval(coll)
	for dic in coll:
		if "_id" in dic and type(dic["_id"]) is int:
			point = {"type" : "Feature", "geometry" : {"type" : "Point", "coordinates" : []}, "properties" : {}}
			print(dic["lat_lon"])
			for key in dic:
				#print(key)
				if key == "_id" or type(dic["_id"]) is not int:
					continue
				elif key == "lat_lon":
					point["geometry"]["coordinates"] = dic[key]
				else:
					point["properties"][key] = dic[key]
				#print(point)
			geo_file["features"].append(point)
		

	geo_file = str(geo_file)
	geo_file = geo_file.replace("'", '"')

	fhw = open("geojson.json", "w")
	fhw.write(geo_file)
