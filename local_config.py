import os

DEBUG = False



DIALECT = 'mysql'
DRIVER = 'pymysql'
USERNAME = 'root'
PASSWORD = '89352189'
HOST = 'localhost'
PORT = '3306'
DATABASE = 'app_db'

SQLALCHEMY_DATABASE_URI = "{}+{}://{}:{}@{}:{}/{}?charset=utf8".format(DIALECT,DRIVER,USERNAME,PASSWORD,HOST,PORT,DATABASE)
SECRET_KEY = os.urandom(24)

SQLALCHEMY_TRACK_MODIFICATIONS = False