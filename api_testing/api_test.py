import json
import pprint
import requests
import sys

keywords :list[str] = sys.argv[1:]

springer_key :str = "ba1b622422755eaaf763ec9b95b831d7" 

base_url :str = "https://api.springernature.com/metadata"

response_type :str = "json"
search_index :int = 1

num_response :int = 10
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

while (True):
    ind :int = int(input("Enter the record number 1-10:"))
    if ind < 1:
        break
    else:
        pprint.pprint(articles[(ind - 1)%len(keywords)])
