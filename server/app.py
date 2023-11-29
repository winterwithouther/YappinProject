#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, make_response, abort, session, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports

from models import *

app.secret_key = b'\x00q\x7fe\xe0\xafI5{\xa044Wdc\xd2'

class Posts(Resource):
    def get(self):
        posts = [post.to_dict() for post in Post.query.all()]
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
        
        return make_response(post.to_dict(), 200)

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

class Users(Resource):
    def get(self):
        users = [user.to_dict(rules=("-comments", "-likes",)) for user in User.query.all()]
        return make_response(users, 200)
    
    def post(self):
        
        new_user = User(
            username = request.json["username"]
        )

        db.session.add(new_user)
        db.session.commit()

        return make_response(new_user.to_dict(), 200)
    

api.add_resource(Users, "/users")

class UsersById(Resource):
    def get(self, id):
        user = User.query.filter_by(id = id).one_or_none()        
        if user is None:
            return make_response({"error" : "User does not exist"}, 404)
        return make_response(user.to_dict(), 200)

    def patch(self, id):
        try:
            user = User.query.filter_by(id = id).one_or_none()
            if user is None:
                return make_response({"error" : "User does not exist"}, 404)
            request_json = request.get_json()
            for key in request_json:
                setattr(user, key, request_json[key])
            db.session.add(user)
            db.session.commit()
            return make_response(user.to_dict(), 200)
        except:
            return make_response({"error" : "PATCH UserById"}, 404)

api.add_resource(UsersById, "/users/<int:id>")

class Comments(Resource):
    def get(self):
        comments = [comment.to_dict(rules=("-user", "-post",)) for comment in Comment.query.all()]
        return make_response(comments, 200)
    
    def post(self):
        try:
            new_comment = Comment(
                content = request.json["content"],
                user_id = request.json["user_id"],
                post_id = request.json["post_id"]
            )

            db.session.add(new_comment)
            db.session.commit()

            return make_response(new_comment.to_dict(), 201)
        except:
            return make_response({"error" : "POST Comments"}, 404)
    
api.add_resource(Comments, "/comments")

class CommentsById(Resource):
    def get(self, id):
        comment = Comment.query.filter_by(id = id).one_or_none()

        if comment is None:
            return make_response({"error" : "Comment does not exist"}, 404)
        
        return make_response(comment.to_dict(rules=("-user", "-post",)), 200)

    def patch(self, id):
        try:
            comment = Comment.query.filter_by(id = id).one_or_none()

            if comment is None:
                return make_response({"error" : "Comment does not eixst"}, 404)

            request_json = request.get_json()

            for key in request_json:
                setattr(comment, key, request_json[key])

            db.session.add(comment)
            db.session.commit()

            return make_response(comment.to_dict(), 200)
        except:
            return make_response({"error" : "PATCH CommentsById"}, 404)
        
    def delete(self, id):
        comment = Comment.query.filter_by(id = id).one_or_none()

        if comment is None:
            return make_response({"error" : "Comment does not exist"}, 404)

        db.session.delete(comment)
        db.session.commit()

        return make_response({}, 202)

api.add_resource(CommentsById, "/comments/<int:id>")

class Likes(Resource):
    def get(self):
        likes = [like.to_dict(rules=("-post", "-user",)) for like in Like.query.all()]
        return make_response(likes, 200)
    
    def post(self):
        try:
            new_like = Like(
                user_id = request.json["user_id"],
                post_id = request.json["post_id"]
            )

            db.session.add(new_like)
            db.session.commit()

            return make_response(new_like.to_dict(), 200)
        except:
            return make_response({"error" : "POST Likes"}, 404)

api.add_resource(Likes, "/likes")

class LikesById(Resource):
    def get(self, id):
        like = Like.query.filter_by(id = id).one_or_none()

        if like is None:
            return make_response({"error" : "Like does not exist"}, 404)
        
        return make_response(like.to_dict(rules=("-user", "-post",)), 200)

    def delete(self, id):
        like = Like.query.filter_by(id = id).one_or_none()

        if like is None:
            return make_response({"error" : "Like does not exist"}, 404)
        
        db.session.delete(like)
        db.session.commit()

        return make_response({}, 202)

api.add_resource(LikesById, "/likes/<int:id>")

class UserPosts(Resource):
    def get(self):
        userPosts = [userPost.to_dict() for userPost in UserPost.query.all()]
        return make_response(userPosts, 200)

    def post(self):
        try:
            request_json = request.get_json()

            newUserPost = UserPost(
                post_id = request_json["post_id"],
                user_id = request_json["user_id"]
            )

            db.session.add(newUserPost)
            db.session.commit()

            return make_response(newUserPost.to_dict(), 200)
        except:
            return make_response({"error" : "POST UserPost"}, 404)

api.add_resource(UserPosts, "/userposts")

class UserPostsById(Resource):
    def delete(self, id):
        userPost = UserPost.query.filter_by(id = id).one_or_none()

        if userPost is None:
            return make_response({"error" : "User post does not exist"}, 404)
        
        db.session.delete(userPost)
        db.session.commit()

        return make_response({}, 204)

    def patch(self, id):
        try:
            userPost = UserPost.query.filter_by(id = id).one_or_none()

            if userPost is None:
                return make_response({"error" : "UserPost does not exist"}, 404)

            request_json = request.get_json()

            for key in request_json:
                setattr(userPost, key, request_json[key])

            db.session.add(userPost)
            db.session.commit()

            return make_response(userPost.to_dict(), 200)
        except:
            return make_response({"error" : ["validation errors"]}, 404)
 
api.add_resource(UserPostsById, "/userposts/<int:id>")

class Signup(Resource):
    def post(self):
        request_json = request.get_json()

        username = request_json.get("username")
        password = request_json.get("password")
        email = request_json.get("email")

        user = User(
            username = username,
            image_url = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
            email = email,
            bio=None
        )

        user.password_hash = password

        db.session.add(user)
        db.session.commit()

        session["user_id"] = user.id

        return make_response(user.to_dict(), 201)

        
api.add_resource(Signup, "/signup", endpoint="signup")

class CheckSession(Resource):
    def get(self):
        user_id = session["user_id"]

        if user_id:
            user = User.query.filter(User.id == user_id).first()

            return make_response(user.to_dict(), 200)
        
        return make_response({}, 401)
    
api.add_resource(CheckSession, "/checksession", endpoint="check_session")

class Login(Resource):
    def post(self):

        request_json = request.get_json()

        username = request_json.get("username")
        password = request_json.get("password")

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):

                session["user_id"] = user.id
                return make_response(user.to_dict(), 200)
            
            return make_response({"error" : "401 Unauthorized"}, 401)
        
api.add_resource(Login, "/login", endpoint="login")

class Logout(Resource):
    def delete(self):
        session["user_id"] = None
        return make_response({}, 204)
    
api.add_resource(Logout, "/logout", endpoint="logout")

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

