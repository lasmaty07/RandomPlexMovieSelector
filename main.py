# Requirements.txt
# Flask-RESTful==0.3.6

from flask import Flask
from flask_restful import Resource, Api, reqparse
import json 
# import pandas as pd
# import astapp 

from plexapi.server import PlexServer

import random

baseurl = 'http://192.168.1.4:32400'
token = 'sbn7nRHCfJNzA6djb8Ji'
plex = PlexServer(baseurl, token)

app = Flask(__name__)
api = Api(app)

class Movies(Resource):
    def get(self):
        movies = plex.library.section('Películas')
        data = []
        for video in movies.search(unwatched=True):
          data.append(video)
        movieobj = random.choice(data)        
        return { 'title': movieobj.title, 'image': movieobj.thumbUrl, 'year': movieobj.year}, 200 

api.add_resource(Movies, '/api/v1/movie')

if __name__ == '__main__':
    app.run()  # run our Flask app