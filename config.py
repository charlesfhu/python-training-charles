import os

DEBUG = True



DIALECT = 'mysql'
DRIVER = 'pymysql'
USERNAME = 'root'
PASSWORD = '89352189'
HOST = 'localhost'
PORT = '3306'
DATABASE = 'app_db'

#SQLALCHEMY_DATABASE_URI = "{}+{}://{}:{}@{}:{}/{}?charset=utf8".format(DIALECT,DRIVER,USERNAME,PASSWORD,HOST,PORT,DATABASE)
#SECRET_KEY = os.urandom(24)

SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
SECRET_KEY = os.environ.get('SECRET_KEY')

SQLALCHEMY_TRACK_MODIFICATTONS = False