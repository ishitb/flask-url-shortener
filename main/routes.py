from flask import Blueprint, redirect, request, render_template
import main.controllers as controllers
import json

main = Blueprint('main', __name__)

URLController = controllers.URL()
UserController = controllers.User()

@main.route('/')
def index() :
    return render_template('index.html')

# Auth Routes
@main.route('/auth/register', methods = ['POST'])
def register() :
    body = request.get_json()
    
    if not body or "email" not in body.keys() or "password" not in body.keys() or "name" not in body.keys() :
        return {'message': 'Please provide all the required details'}

    return UserController.register(body['email'], body['password'], body['name'])

@main.route('/auth/login', methods = ['POST'])
def login() :
    body = request.get_json()
    
    if not body or "email" not in body.keys() or "password" not in body.keys() :
        return {'message': 'Please provide all the required details'}

    return UserController.login(body['email'], body['password'])

@main.route('/auth/verify', methods = ['GET'])
def verifyUser() :
    print(request.headers)
    if 'Authorization' not in request.headers.keys() :
        return {'message': 'User not Authenticated'}

    token = request.headers['Authorization']
    if not token.startswith("Token") :
        return {'message': 'User not Authenticated'}
    
    token = token[6:]
    user = UserController.verifyUser(token)
    userID = user['_id']



    return user



# URL Routes
@main.route('/api/urls')
def url_get_all() :
    urls = URLController.get()
    return urls

@main.route('/api/urls', methods = ['POST'])
def url_post() :
    try :
        url = request.get_json()['url']
    except Exception as e :
        print(e)
        return {'message': 'Please make sure to include the url value in the request body'}

    return URLController.post(url)

@main.route('/api/urls/<short>')
def url_retrieve(short) :
    url = URLController.retrieve(short)
    return url

@main.route('/api/urls/<urlID>', methods=['DELETE'])
def url_delete(urlID) :
    url = URLController.delete(urlID)
    return url

# Redirection url. To be kept in the end
@main.route('/<short>')
def url_redirect(short) :
    url = URLController.retrieve(short)
    url = json.loads(url)
    
    if len(url.keys()) > 1 :
        return redirect(url['original'])
    
    return url