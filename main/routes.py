from flask import Blueprint, redirect, request
import main.controllers as controllers
import json

main = Blueprint('main', __name__)

URLController = controllers.URL()

# @main.route('/')
# def index() :
#     return {'message': 'Hello World'}

# URL Routes

# For debugging making this the / route 
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