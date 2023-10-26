#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, make_response, abort, session, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports

from models import *

class Posts(Resource):
    def get(self):
        posts = [post.to_dict(rules=("-comments", "-likes",)) for post in Post.query.all()]
        return make_response(posts, 200)
    
    def post(self):
        try:
            new_post = Post(
                content = request.json["content"],
                caption = request.json["caption"]
            )

            db.session.add(new_post)
            db.session.commit()

            return make_response(new_post.to_dict(), 201)
        except:
            return make_response({"error" : ["validation errors"]}, 404)

api.add_resource(Posts, "/posts")

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

