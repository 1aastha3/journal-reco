import json
import pprint
import requests
import sys
import pymongo
import requests
import os
from dotenv import load_dotenv

load_dotenv()

keywords :list[str] = sys.argv[1:]
springer_key :str = "ba1b622422755eaaf763ec9b95b831d7" 

base_url :str = "https://api.springernature.com/metadata"

response_type :str = "json"
search_index :int = 1

num_response :int = 10
articles :list[dict] = []

userId = sys.argv[-1]
print(userId)

mongo_uri = os.getenv("MONGO_URI")
client = pymongo.MongoClient(mongo_uri)
db = client["journal-reco"]
collection = db["users"]

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

data = {
    "recommendedTillNow" : articles
}

collection.update_one({"_id" : userId}, {"$set" : data})
# todo - run recommendation system
# todo-write code to directly append the response to mongodb