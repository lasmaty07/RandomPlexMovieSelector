# Requirements.txt
# Flask-RESTful==0.3.6

from flask import Flask
from flask_restful import Resource, Api
import os
from pathlib import Path
from dotenv import load_dotenv
from plexapi.server import PlexServer
import random
from flask_cors import CORS

basepath = Path()
basedir = str(basepath.cwd())
envars = basepath.cwd() / 'PRIVATE.env'
load_dotenv(envars)


url = os.getenv("PLEX_URL")
token =  os.getenv("PLEX_TOKEN")
plex = PlexServer(url,token)

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
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
    app.run(host='0.0.0.0')  # run our Flask app