from flask import Blueprint, redirect, request, render_template, Response
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
    user, check = UserController.verifyUser(token)

    return check, user

# Auth Routes
@main.route('/auth/register', methods = ['POST'])
def register() :
    body = request.get_json()
    
    if not body or "email" not in body.keys() :
        return Response(response = json.dumps({'message': 'Please provide the email details propelry', 'error-type': 0 }), status = 406)

    if "name" not in body.keys() :
        return Response(response = json.dumps({'message': 'Please provide the name details propelry', 'error-type': 2 }), status = 406)

    if "password" not in body.keys() :
        return Response(response = json.dumps({'message': 'Please provide the password details propelry', 'error-type': 1 }), status = 406)

    response, status = UserController.register(body['email'], body['password'], body['name'])
    return Response(response = response, status = status)

@main.route('/auth/login', methods = ['POST'])
def login() :
    body = request.get_json()
    
    if not body or "email" not in body.keys() :
        return Response(response = json.dumps({'message': 'Please provide the email details propelry', 'error-type': 0 }), status = 406)

    if "password" not in body.keys() :
        return Response(response = json.dumps({'message': 'Please provide the password details propelry', 'error-type': 1 }), status = 406)

    response, status = UserController.login(body['email'], body['password'])
    
    return Response(response = response, status = status)

@main.route('/auth/verify', methods = ['GET'])
def verify() :
    authenticated, user = verifyUser(request)

    if not authenticated :
        return json.dumps(user), 401

    return Response(response = json.dumps(user), status = 202)


# URL Routes
@main.route('/api/urls')
def url_get_all() :
    authenticated, user = verifyUser(request)

    if not authenticated :
        return Response(response = json.dumps(user), status = 401)

    userID = user['_id']

    urls, status = URLController.get(userID)
    return Response(response = urls, status = status)

@main.route('/api/urls', methods = ['POST'])
def url_post() :
    print(request.get_json())
    try :
        url = request.get_json()['url']
    except Exception as e :
        print(e)
        return Response(response = json.dumps({'message': 'Please make sure to include the url value in the request body'}), status = 406)

    authenticated, user = verifyUser(request)
    
    userType = 'Anonymous'
    userID = uuid.uuid4().hex

    if authenticated :
        userType = 'Registered'
        userID = user['_id']


    response, status = URLController.post(url, userID, userType)
    return Response(response = response, status = status)

@main.route('/api/urls/<urlID>')
def url_retrieve(urlID) :
    authenticated, user = verifyUser(request)

    if not authenticated :
        return Response(response = json.dumps(user), status = 401)

    userID = user['_id']
    
    url, status = URLController.retrieve(urlID, userID)
    return Response(response = url, status = status)

@main.route('/api/urls/<urlID>', methods=['DELETE'])
def url_delete(urlID) :
    authenticated, user = verifyUser(request)

    if not authenticated :
        return Response(response = json.dumps(user), status = 401)

    userID = user['_id']

    url, status = URLController.delete(urlID, userID)
    return Response(response = url, status = status)

@main.route('/api/urls/<urlID>', methods=['PATCH'])
def url_update(urlID) :
    updates = request.get_json()
    if not updates :
        return Response(response = json.dumps({'message': 'No update details provided'}), status = 406)

    authenticated, user = verifyUser(request)

    if not authenticated :
        return Response(response = json.dumps(user), status = 401)

    userID = user['_id']

    url, status = URLController.update(urlID, updates, userID)
    return Response(url, status)

@main.route('/api/get/<short>')
def url_link(short) :
    url, status = URLController.link(short)
    if status != 200 :
        return Response(response = json.dumps({'message': 'URL not found'}), status = 404)
    return Response(response = json.dumps({'message': 'Redirecting', 'original': url['original']}), status = 200)