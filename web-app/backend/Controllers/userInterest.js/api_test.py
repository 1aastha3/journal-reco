import sys
import json
import pprint
from bson.objectid import ObjectId
import pymongo
import requests
import numpy as np
import pandas as pd
# import nltk
# nltk.download("wordnet")
# from nltk.corpus import wordnet as wn
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import key

# connecting to mongoDB
mongo_uri :int = key.MONGO_URI
client = pymongo.MongoClient(mongo_uri)
db = client["test"]
collection = db["users"]

# fetching userId from command line arguments
user_id :str = sys.argv[-1]

# fetching user interests from command line arguments
keywords :list[str] = sys.argv[1:]
keywords.pop()

for ind, key in enumerate(keywords):
    keywords[ind] = key.replace("_", "%20")

print(keywords)

springer_key :str = "ba1b622422755eaaf763ec9b95b831d7" 

base_url :str = "https://api.springernature.com/metadata"

response_type :str = "json"
search_index :int = 1

num_response :int = 50 ## number of responses expected from API
articles :list[dict] = []

# using SPRINGER API to fetch user interest related articles/papers by passing query string in api_url
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

# structure of returned articles by SPRINGER API
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

# Instantiating Tfidf encoder
tfid_vectorizer = TfidfVectorizer()

print("\n=== === === === === === === === === ===\n")
inputs = []
for key in keywords:
    inputs.append(key)
    # for ss in wn.synsets(key):
    #     for word in ss.lemma_names():
    #         word = word.replace("_", " ")
    #         inputs.append(word)
print(inputs)
print("\n=== === === === === === === === === ===\n")

# embedding the articles' abstract
feature = tfid_vectorizer.fit_transform(papers["abstract"])
abs_simi = np.zeros(num_response*len(keywords))
# embedding the user interests and finding the cosine similarity from feature variable
for key in inputs:
    interest = tfid_vectorizer.transform([key])
    abs_simi += np.array(list(map(lambda x: x[0][0], list(map(lambda x: cosine_similarity(interest, x), feature)))))
print("\n=== === === === === === === === === ===\n")

# embedding the articles' pub_name
feature = tfid_vectorizer.fit_transform(papers["pub_name"])
name_simi = np.zeros(num_response*len(keywords))
for key in inputs:
    interest = tfid_vectorizer.transform([key])
    name_simi += np.array(list(map(lambda x: x[0][0], list(map(lambda x: cosine_similarity(interest, x), feature)))))
print("\n=== === === === === === === === === ===\n")

# embedding the articles' title
feature = tfid_vectorizer.fit_transform(papers["title"])
title_simi = np.zeros(num_response*len(keywords))
for key in inputs:
    interest = tfid_vectorizer.transform([key])
    title_simi += np.array(list(map(lambda x: x[0][0], list(map(lambda x: cosine_similarity(interest, x), feature)))))
print("\n=== === === === === === === === === ===\n")

# fetching previously recommended papers
user = collection.find_one({"_id" : ObjectId(user_id)})
recommended = user["recommendedTillNow"]

count = 0
feature = tfid_vectorizer.fit_transform(papers["abstract"])
prev_simi = np.zeros(num_response*len(keywords))

# finding similarity from previous highly rated recommendations
for reco in reversed(recommended):
    past_reco = tfid_vectorizer.transform([reco['abstract']])
    prev_simi += reco["rating"]*np.array(list(map(lambda x: x[0][0], list(map(lambda x: cosine_similarity(past_reco, x), feature)))))
    count += 1
    if count > 10:
        break

# calculating the score of the articles 
papers["score"] = (abs_simi + name_simi + title_simi + prev_simi).tolist()
df = pd.DataFrame.from_dict(papers)
df.sort_values(by=["score"], ascending=False, inplace=True)

toBeRecommended = df.to_dict("records")

data :dict = {
    "toBeRecommended": toBeRecommended
}

# updating the database
collection.update_one({"_id": ObjectId(user_id)}, {"$set": data})
