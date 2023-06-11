import key
import json
import pprint
import requests

# Springer API key
springer_key :str = key.springer_key

base_url :str = "https://api.springernature.com/metadata"

response_type :str = "json"

query_str :str = ""
query_str :str = input("Enter the query string:\n")

search_index :int = 1
num_response :int = int(input("Number of responses:\n"))

api_url = f"{base_url}/{response_type}?api_key={springer_key}&q={query_str}&s={search_index}&p={num_response}"

try:
    response = requests.get(api_url)
    if response:
        content = response.json()
        pprint.pprint(content)
        with open("test_response.json", "w+") as res:
            res.write(json.dumps(content))
    else:
        print(response.status_code)
except Exception as err:
    print(f"ERROR: {err}")
