from main.mongo import MongoDB
from bson import json_util, objectid
import json, uuid, bcrypt, re, jwt, os, traceback, datetime

mongoDB = MongoDB()

# Helpers
def to_json(object) :
    return json.dumps(object, default=json_util.default)

class URL :
    def __init__(self):
        self.collection = mongoDB.getCollection('url')

    def get(self, user) :
        urls = self.collection.find({'user': user})
        return json.dumps([url for url in urls], default=json_util.default), 200

    def retrieve(self, id, user) :
        url = self.collection.find_one({"_id": objectid.ObjectId(id), "user": user})
        
        found = url is not None

        err_msg = {'message': 'This URL does not exist in our database. Please check the spelling or contact us.'}
        status = 200 if found else 404

        return json.dumps(url if found else err_msg, default=json_util.default), status

    def post(self, url, user, userType) :
        uid = uuid.uuid4().hex[0:5]
        
        newURL = {
            'original': url,
            'short': uid,
            'clicks': 0,
            'userType': userType,
            'user': user,
            'created': datetime.datetime.now()
        }

        try :
            new_short = self.collection.insert_one(newURL)
            newURL['_id'] = new_short.inserted_id

            return to_json(newURL), 201

        except Exception as e :
            print(e)
            return to_json({'message': 'Internal Server Error'}), 400

    def delete(self, id, user) :
        url = self.collection.find_one({"_id": objectid.ObjectId(id), 'user': user})

        if not url :  
            err_msg = {'message': 'This URL id does not exist in our database.'}
            return json.dumps(err_msg, default=json_util.default), 404

        deleted = self.collection.delete_one({"_id": objectid.ObjectId(id)})
        return json.dumps({'message': 'Deleted'} if deleted.acknowledged else {'message': 'Internal Server Error'}, default=json_util.default), 200 if deleted.acknowledged else 400

    def link(self, short) :
        url = self.collection.find_one({'short': short})

        found = url is not None

        err_msg = {'message': 'This URL does not exist in our database. Please check the spelling or contact us.'}
        status = 200 if found else 404

        if found :
            url_update_click = self.collection.update_one({'_id': objectid.ObjectId(url['_id'])}, {"$set": {'clicks': url['clicks'] + 1}})

        return url if found else err_msg, status

    def update(self, id, updates, user) :
        if len(updates.keys()) > 2 :
            return to_json({'message': 'Unverified information provided'}), 406
        
        try :
            short = updates['short']
            if len(short) < 4 :
                return to_json({'message': 'Length of the Short URL must be 4 or more'}), 406

            existing = self.collection.find_one({'short': short})
            if existing :
                return to_json({'message': 'This route already exists. Please try another'}), 409

        except Exception as e :
            print(e)

        found = self.collection.find_one({'_id': objectid.ObjectId(id), 'user': user})
        if not found :
            return to_json({'message': 'Not Found!'}), 404

        update_info = self.collection.update_one({'_id': objectid.ObjectId(id)}, {"$set": updates})

        return to_json({'message': 'UPDATED'}), 202

class User: 
    def __init__(self):
        self.collection = mongoDB.getCollection('users')

    def emailValidator(self, email) :
        regex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'
        if re.search(regex, email) :
            return True
        else :
            return False

    def passwordValidator(self, password) :
        regex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$'
        if re.search(regex, password) :
            return True
        else :
            return False

    def createToken(self, user) :
        key = os.getenv("JWT_SECRET")
        token = jwt.encode(
            user,
            key,
            algorithm='HS256'
        )
        return token

    def decodeToken(self, token) :
        key = os.getenv("JWT_SECRET")
        try :
            decoded = jwt.decode(
                token,
                key,
                algorithms=['HS256']
            )
            return True, decoded
        except Exception as e :
            print(e)
            return False, {}

    def hashPassword(self, password) :
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    def checkHashPassword(self, password, hashed) :
        return bcrypt.checkpw(password.encode('utf-8'), hashed)

    def getAll(self) :
        users = self.collection.find()
        return to_json([user for user in users])

    def register(self, email, password, name) :

        if not self.emailValidator(email) :
            return to_json({'message': 'Please make sure the email is of correct format!', 'error-type': 0}), 406
        
        if not self.passwordValidator(password) :
            # Should have at least one number.
            # Should have at least one uppercase and one lowercase character.
            # Should have at least one special symbol.
            # Should be between 6 to 20 characters long
            return to_json({'message': 'Please make sure the password is of correct format!', 'error-type': 1}), 406

        exisiting = self.collection.find_one({'email': email})
        if exisiting :
            return to_json({'message': 'User with this email already exists!', 'error-type': 0}), 409

        user = {
            "_id": uuid.uuid4().hex,
            "email": email,
            "password": self.hashPassword(password),
            "name": name
        }

        try :
            newUser = self.collection.insert_one(user)

            user.pop('password')
            token = self.createToken(user)

            return to_json({"user": user, "token": token}), 201

        except Exception as e :
            traceback.print_exc()
            return to_json({'message': 'Internal Server Error', 'error-type': 'server'}), 400

    def login(self, email, password) :
        if not self.emailValidator(email) :
            return to_json({'message': 'Please make sure the email is of correct format!', 'error-type': 0}), 406
        
        if not self.passwordValidator(password) :
            # Should have at least one number.
            # Should have at least one uppercase and one lowercase character.
            # Should have at least one special symbol.
            # Should be between 6 to 20 characters long
            return to_json({'message': 'Please make sure the password is of correct format!', 'error-type': 1}), 406

        user = self.collection.find_one({"email": email})
        
        if not user :
            return to_json({'message': 'User not found!', 'error-type': 0}), 404
        
        passwordCheck = self.checkHashPassword(password, user['password'])
        if not passwordCheck :
            return to_json({'message': 'Password Incorrect!', 'error-type': 1}), 403

        user.pop('password')
        token = self.createToken(user)
        return to_json({"user": user, "token": token}), 202

    def verifyUser(self, token) :
        check, decoded = self.decodeToken(token)

        if not check :
            return to_json({'message': 'Invalid Authentication'}), False
        
        
        try :
            uid = decoded['_id']
            user = self.collection.find_one({'_id': uid})
            if not user :
                print(decoded)
                raise Exception("Invalid Authentication")
        except Exception as e :
            print(e)
            return to_json({'message': 'Invalid Authentication'}), False

        return decoded, True

