from main.mongo import MongoDB
from bson import json_util, objectid
import json, uuid, bcrypt, re, jwt, os, traceback

mongoDB = MongoDB()

# Helpers
def to_json(object) :
    return json.dumps(object, default=json_util.default)

class URL :
    def __init__(self):
        self.collection = mongoDB.getCollection('url')

    def get(self) :
        urls = self.collection.find()
        return json.dumps([url for url in urls], default=json_util.default)

    def retrieve(self, short) :
        url = self.collection.find_one({"short": short})
        
        found = url is not None

        err_msg = {'message': 'This URL does not exist in our database. Please check the spelling or contact us.'}

        return json.dumps(url if found else err_msg, default=json_util.default)

    def post(self, url) :
        uid = uuid.uuid4().hex[0:5]
        
        try :
            new_short = self.collection.insert_one({"original": url, "short": uid})
            return to_json({"_id": new_short.inserted_id, "original": url, "short": uid})

        except Exception as e :
            print(e)
            return to_json({'message': 'Internal Server Error'})

    def delete(self, id) :
        url = self.collection.find_one({"_id": objectid.ObjectId(id)})

        if not url :  
            err_msg = {'message': 'This URL id does not exist in our database. Please check the spelling or contact us.'}
            return json.dumps(err_msg, default=json_util.default)

        deleted = self.collection.delete_one({"_id": objectid.ObjectId(id)})
        return json.dumps({'message': 'Deleted'} if deleted.acknowledged else {'message': 'Internal Server Error'}, default=json_util.default)

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

    def verifyUser(self, token) :
        check, decoded = self.decodeToken(token)

        if not check :
            return to_json({'message': 'Invalid Authentication'})
        
        if len(decoded.keys()) < 4 :
            return to_json({'message': 'Invalid Authentication'})
        
        return to_json(decoded)

    def hashPassword(self, password) :
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    def checkHashPassword(self, password, hashed) :
        return bcrypt.checkpw(password.encode('utf-8'), hashed)

    def getAll(self) :
        users = self.collection.find()
        return to_json([user for user in users])

    def register(self, email, password, name) :

        if not self.emailValidator(email) :
            return to_json({'message': 'Please make sure the email is of correct format!'})
        
        if not self.passwordValidator(password) :
            # Should have at least one number.
            # Should have at least one uppercase and one lowercase character.
            # Should have at least one special symbol.
            # Should be between 6 to 20 characters long
            return to_json({'message': 'Please make sure the password is of correct format!'})

        exisiting = self.collection.find_one({'email': email})
        if exisiting :
            return to_json({'message': 'User with this email already exists!'})

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

            return to_json({"user": user, "token": token})

        except Exception as e :
            traceback.print_exc()
            return to_json({'message': 'Internal Server Error'})

    def login(self, email, password) :
        if not self.emailValidator(email) :
            return to_json({'message': 'Please make sure the email is of correct format!'})
        
        if not self.passwordValidator(password) :
            # Should have at least one number.
            # Should have at least one uppercase and one lowercase character.
            # Should have at least one special symbol.
            # Should be between 6 to 20 characters long
            return to_json({'message': 'Please make sure the password is of correct format!'})

        user = self.collection.find_one({"email": email})
        
        if not user :
            return to_json({'message': 'User not found!'})
        
        passwordCheck = self.checkHashPassword(password, user['password'])
        if not passwordCheck :
            return to_json({'message': 'Password Incorrect!'})

        user.pop('password')
        token = self.createToken(user)
        return to_json({"user": user, "token": token})