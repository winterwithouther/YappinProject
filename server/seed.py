#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Post, User, Comment, Like, UserPost

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print("Seeding complete")
