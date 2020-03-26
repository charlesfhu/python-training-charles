from functools import wraps
from flask import session,redirect,url_for

def login_required(func):
    @wraps(func)
    def wrapper(*args,**Kwargs):
        if session.get('user_id'):
            return func(*args,**Kwargs)
        else:
            return redirect(url_for('login'))
    return wrapper