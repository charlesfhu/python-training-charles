import os

DEBUG = False


if DEBUG == False:
    # SECRET_KEY設定
    SECRET_KEY = os.environ['SECRET_KEY']

    # sqlalchemy設定
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False
else:
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