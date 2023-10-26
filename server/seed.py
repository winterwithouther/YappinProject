#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Post, User, Comment, Like

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        User.query.delete()
        Post.query.delete()
        Comment.query.delete()
        Like.query.delete()

        print("Starting seed...")
        
        user1 = User(username = "Ava")
        post1 = Post(content = "dog.png", caption = "Here is my Dog!")

        comment1 = Comment(content = "Cool dog!", user_id = 1, post_id = 1)
        like1 = Like(user_id = 1, post_id = 1)

        db.session.add(user1)
        db.session.add(post1)
        db.session.add(comment1)
        db.session.add(like1)

        db.session.commit()

        print("Seeding complete")
