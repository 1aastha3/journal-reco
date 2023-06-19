import json
import pprint
import requests
import sys
import pymongo
import os
from dotenv import load_dotenv
from bson.objectid import ObjectId

load_dotenv()

keywords :list[str] = sys.argv[1:]
springer_key :str = os.getenv("JOURNAL_API")
print("inside api.py")

base_url :str = "https://api.springernature.com/metadata"

response_type :str = "json"
search_index :int = 1

num_response :int = 10
articles :list[dict] = []

userId = sys.argv[-1]
print(userId)

# mongo_uri = os.getenv("MONGO_URI")
# client = pymongo.MongoClient(mongo_uri)
# db = client["journal-reco"]
# collection = db["users"]

for interest in keywords:
    api_url = f"{base_url}/{response_type}?api_key={springer_key}&q={interest}&s={search_index}&p={num_response}"

    try:
        
        response = requests.get(api_url)
        if response:
            content = response.json()
            articles += content["records"]
        else:
            print(response.status_code)

    except Exception as err:
        print(f"ERROR: {err}")

recommendedTillNow = [{
    'identifier': ObjectId(),
    'url': article['url'][0]['value'],
    'title': article['title']
} for article in articles]

data = {
    'recommendedTillNow': recommendedTillNow
}
print(data)
# collection.update_one({'_id': ObjectId(userId)}, {'$set': data})

#resolve pymongo, dotenv, bson... issue and uncomment line 57, and 27 to 30



# todo - run recommendation system
# todo-write code to directly append the response to mongodb