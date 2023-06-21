import sys
import json
import pprint
import bson.objectid import ObjectId
import pymongo
import requests
import numpy as np
import pandas as pd
from nltk.corpus import wordnet as wn
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

mongo_uri :int = ""
client = pymongo.MongoClient(mongo_uri)
db = client["test"]
collection = db["users"]
user_id :str = sys.argv[-1]

keywords :list[str] = sys.argv[1:]
keywords.pop()

for ind, key in enumerate(keywords):
    keywords[ind] = key.replace("_", "%20")

print(keywords)

springer_key :str = "ba1b622422755eaaf763ec9b95b831d7" 

base_url :str = "https://api.springernature.com/metadata"

response_type :str = "json"
search_index :int = 1

num_response :int = 50
articles :list[dict] = []

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

papers :dict = {"abstract": [],
                "title": [],
                "pub_name": [],
                "url": [],
                "score": []}


for article in articles:
    papers["abstract"].append(article["abstract"])

for article in articles:
    papers["pub_name"].append(article["publicationName"])

for article in articles:
    papers["title"].append(article["title"])

for article in articles:
    papers["url"].append(article["url"][0]["value"])


for ind, key in enumerate(keywords):
    keywords[ind] = key.replace("%20", " ")
print(keywords)

tfid_vectorizer = TfidfVectorizer()

print("\n=== === === === === === === === === ===\n")
inputs = []
for key in keywords:
    inputs.append(key)
    for ss in wn.synsets(key):
        for word in ss.lemma_names():
            word = word.replace("_", " ")
            inputs.append(word)
print(inputs)
print("\n=== === === === === === === === === ===\n")


feature = tfid_vectorizer.fit_transform(papers["abstract"])
abs_simi = np.zeros(num_response*len(keywords))
for key in inputs:
    interest = tfid_vectorizer.transform([key])
    abs_simi += np.array(list(map(lambda x: x[0][0], list(map(lambda x: cosine_similarity(interest, x), feature)))))
print("\n=== === === === === === === === === ===\n")


feature = tfid_vectorizer.fit_transform(papers["pub_name"])
name_simi = np.zeros(num_response*len(keywords))
for key in inputs:
    interest = tfid_vectorizer.transform([key])
    name_simi += np.array(list(map(lambda x: x[0][0], list(map(lambda x: cosine_similarity(interest, x), feature)))))
print("\n=== === === === === === === === === ===\n")


feature = tfid_vectorizer.fit_transform(papers["title"])
title_simi = np.zeros(num_response*len(keywords))
for key in inputs:
    interest = tfid_vectorizer.transform([key])
    title_simi += np.array(list(map(lambda x: x[0][0], list(map(lambda x: cosine_similarity(interest, x), feature)))))
print("\n=== === === === === === === === === ===\n")

papers["score"] = (abs_simi + name_simi + title_simi).tolist()
df = pd.DataFrame.from_dict(papers)
df.sort_values(by=["score"], ascending=False, inplace=True)

toBeRecommended :list[dict] = [df.to_dict("records")]

data :dict = {
    "toBeRecommended": toBeRecommended
}

collection.update_one({"_id": ObjectId(user_id)}, {"$set": data})
