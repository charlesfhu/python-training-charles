from flask_script import Manager #伺服器命令
from flask_migrate import Migrate,MigrateCommand #db遷移
from App import app
from exts import db
from models import User,Question,Answer,GameData

#http://note.drx.tw/2012/12/mysql-syntax.html

# init
# migrate
# upgrade
manager = Manager(app)

migrate = Migrate(app,db) #綁定app和db

manager.add_command('db',MigrateCommand)

if __name__ == "__main__":
    manager.run()

