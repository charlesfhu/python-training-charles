from flask import Flask,render_template,request,redirect,url_for,session,jsonify
#render_template(渲染HTML模板)、db.session(資料庫)、session(存庫)、request(傳值)、redirect轉向、jsonify接受(JSON)
import config
from models import User,Question,Answer,GameData
from exts import db
from decorations import login_required
#from Game.pygame_info import Game

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    db.init_app(app)

    @app.route('/')
    def index():
        context= {
            'questions':Question.query.order_by(Question.create_time.desc()).all()
        }
        return render_template('index.html' , **context)

    @app.route('/game/',methods=['GET','POST'])
    def game():
        if request.method == 'POST':
            #money = request.form.get('money')
            #level = request.form.get('level')
            data = request.get_json(force=True)
            money = data['money']
            level = data['level']
            #print(data['money'])
            gameData = GameData.query.filter(GameData.id == 1).first()
            gameData.money = money
            gameData.level = level
            db.session.commit()
        context= GameData.query.filter(GameData.id == 1).first()
        return render_template('game.html' , gameData = context)

        

    @app.route('/login/',methods=['GET','POST'])
    def login():
        if request.method == 'GET':
            return render_template('login.html')
        else:
            telephone = request.form.get('telephone')
            password = request.form.get('password')
            user = User.query.filter(User.telephone == telephone,User.password == password).first()
            if user:
                session['user_id'] = user.id
                # 31內不需要再登入
                session.permanent = True
                return redirect(url_for('index'))
            else:
                return '手機號碼或密碼錯誤，請確認後再登入'

    @app.route('/regist/',methods=['GET','POST'])
    def regist():
        if request.method == 'GET':
            return render_template('regist.html')
        else:
            telephone = request.form.get('telephone')
            username = request.form.get('username')
            password1 = request.form.get('password1')
            password2 = request.form.get('password2')

            # 手機號碼驗證，如果被註冊了，就不能再註冊了
            user = User.query.filter(User.telephone == telephone).first()
            if user:
                return '該手機號碼已被註冊，請換手機號碼'
            else:
                if password1 != password2:
                    return '兩次密碼不相等，請核對後再填寫'
                else:
                    user = User(telephone=telephone,username=username,password=password1)
                    db.session.add(user)
                    db.session.commit()
                    # 如果註冊成功，就讓頁面跳轉到登錄的頁面
                    return redirect(url_for('login'))

    #發布問答
    @app.route('/question/',methods=['GET','POST'])
    @login_required
    def question():
        if request.method == 'GET':
            return render_template('question.html')
        else:
            title = request.form.get('title')
            content = request.form.get('content')
            question = Question(title=title,content=content)
            user_id = session.get('user_id')
            user = User.query.filter(User.id == user_id).first()
            question.author = user
            db.session.add(question)
            db.session.commit()
            return redirect(url_for('index'))

    #提問細節
    @app.route('/detail/<question_id>/')
    def detail(question_id):
        question_model = Question.query.filter(Question.id == question_id).first()
        
        return render_template('detail.html',question=question_model)

    #增加答案
    @app.route('/add_answer/',methods=['POST'])
    @login_required
    def add_answer():
        #html填入的資訊
        content = request.form.get('answer_content')
        question_id = request.form.get('question_id')

        answer = Answer(content=content)
        user_id = session['user_id']
        user= User.query.filter(User.id == user_id).first()
        answer.author = user
        question = Question.query.filter(Question.id == question_id).first()
        answer.question = question
        db.session.add(answer)
        db.session.commit()
        return redirect(url_for('detail',question_id= question_id))

    if __name__ == '__main__':
        app.run()
        #Game.run()