import click
from flask.cli import with_appcontext

from exts import db
from models import User,Question,Answer,GameData

@click.command(name='create_tables')
@with_appcontext
def create_tables():
    db.create_all()