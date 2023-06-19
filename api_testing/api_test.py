import key
import json
import pprint
import requests
import sys

# added
keywords = sys.argv[1:-1]
num = sys.argv[-1]
#print(num)
query = ','.join(keywords)

springer_key :str = key.springer_key

base_url :str = "https://api.springernature.com/metadata"

response_type :str = "json"
search_index :int = 1
num_response :int = num
articles = []
query_str :str = ''

for keyword in keywords:
    #print("hello inside")
    query_str += keyword+'%20OR'

# query_str :str = input("Enter the query string:\n")
api_url = f"{base_url}/{response_type}?api_key={springer_key}&q={query_str}&s={search_index}&p={num_response}"
print(api_url)

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

    

