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

class PostsById(Resource):
    def get(self, id):
        post = Post.query.filter_by(id = id).one_or_none()

        if post is None:
            return make_response({"error" : "Post does not exist"}, 404)
        
        return make_response(post.to_dict(rules=("-comments", "-likes",)), 200)

    def patch(self, id):
        try:
            post = Post.query.filter_by(id = id).one_or_none()

            if post is None:
                return make_response({"error" : "Post does not exist"}, 404)
            
            request_json = request.get_json()

            for key in request_json:
                setattr(post, key, request_json[key])

            db.session.add(post)
            db.session.commit()

            return make_response(post.to_dict(), 200)
        except:
            return make_response({"error" : "PATCH UserById"}, 404)

    def delete(self, id):
        post = Post.query.filter_by(id = id).one_or_none()

        if post is None:
            return make_response({"error" : "Post does not exist"}, 404)
        
        db.session.delete(post)
        db.session.commit()

        return make_response({}, 202)

api.add_resource(PostsById, "/posts/<int:id>")


@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

