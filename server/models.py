from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class Post(db.Model, SerializerMixin):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.String)
    caption = db.Column(db.String)

    comments = db.relationship("Comment", backref="post", cascade="all, delete-orphan")
    likes = db.relationship("Like", backref="post", cascade="all, delete-orphan")

    serialize_rules = ("-comments.post", "-likes.post",)
    
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique = True)
    _password_hash = db.Column(db.String)
    image_url = db.Column(db.String)
    bio = db.Column(db.String)
    email = db.Column(db.String)

    comments = db.relationship("Comment", backref="user", cascade="all, delete-orphan")
    likes = db.relationship("Like", backref="user", cascade="all, delete-orphan")

    serialize_rules = ("-comments.user", "-likes.user",)

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be visible")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode("utf-8"))

    def __repr__(self):
        return f"<User {self.username}>"
    
class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.String)

    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    serialize_rules = ("-post.comments", "-user.comments",)

class Like(db.Model, SerializerMixin):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key = True)

    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    serialize_rules = ("-post.comments", "-post.likes",)
    