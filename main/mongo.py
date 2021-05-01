import pymongo, os

class MongoDB :
    def __init__(self):
        self.cluster = pymongo.MongoClient(os.getenv('MONGO_URI'))
        self.db = self.cluster['url-shortener']

    def getCollection(self, collection) :
        return self.db[collection]