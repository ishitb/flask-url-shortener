from flask import Blueprint, redirect, request, render_template
import main.controllers as controllers
import json, uuid

main = Blueprint('main', __name__)

URLController = controllers.URL()
UserController = controllers.User()


# Common Methods
def verifyUser(request) :
    if 'Authorization' not in request.headers.keys() :
        return False, {'message': 'User not Authenticated'}

    token = request.headers['Authorization']
    if not token.startswith("Token") :
        return False, {'message': 'User not Authenticated'}
    
    token = token[6:]
    user = UserController.verifyUser(token)

    return True, user


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
def verify() :
    
    authenticated, user = verifyUser(request)

    if not authenticated :
        return user

    userID = user['_id']

    userLinks = URLController.get(userID)

    return {
        'user': user,
        'urls': userLinks
    }


# URL Routes
@main.route('/api/urls')
def url_get_all() :
    authenticated, user = verifyUser(request)

    if not authenticated :
        return user

    userID = user['_id']

    urls = URLController.get(userID)
    return urls

@main.route('/api/urls', methods = ['POST'])
def url_post() :
    try :
        url = request.get_json()['url']
    except Exception as e :
        print(e)
        return {'message': 'Please make sure to include the url value in the request body'}

    authenticated, user = verifyUser(request)
    
    userType = 'Anonymous'
    userID = uuid.uuid4().hex

    if authenticated :
        userType = 'Registered'
        userID = user['_id']


    return URLController.post(url, userID, userType)

@main.route('/api/urls/<urlID>')
def url_retrieve(urlID) :
    authenticated, user = verifyUser(request)

    if not authenticated :
        return user

    userID = user['_id']
    
    url = URLController.retrieve(urlID, userID)
    return url

@main.route('/api/urls/<urlID>', methods=['DELETE'])
def url_delete(urlID) :
    authenticated, user = verifyUser(request)

    if not authenticated :
        return user

    userID = user['_id']

    url = URLController.delete(urlID, userID)
    return url

@main.route('/api/urls/<urlID>', methods=['PATCH'])
def url_update(urlID) :
    updates = request.get_json()
    if not updates :
        return {'message': 'No update details provided'}

    authenticated, user = verifyUser(request)

    if not authenticated :
        return user

    userID = user['_id']

    url = URLController.update(urlID, updates, userID)
    return url