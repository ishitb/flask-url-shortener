from main.mongo import MongoDB
from bson import json_util, objectid
import json, uuid

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
        url = self.collection.find({"short": short})
        url = [i for i in url]
        
        found = len(url) > 0

        err_msg = {'message': 'This URL does not exist in our database. Please check the spelling or contact us.'}

        return json.dumps(url[0] if found else err_msg, default=json_util.default)

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