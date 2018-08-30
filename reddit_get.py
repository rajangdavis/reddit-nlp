import requests

subreddits = ["cordcutters","Piracy"];

sr_posts = {}

def recurse(url, after, sr, limit =10000000000):
	if sr not in sr_posts:
		sr_posts[sr] = []
	if len(sr_posts[sr]) < limit:
		try:
			final_url = f"{url}?after={after}" if after != None else url
			print(final_url)
			response = requests.get(final_url)
			json = response.json()
			after_ = json['data']['after']
			children = list(map(lambda x: x['data']['title'], json['data']['children']))
			print(children)
			# push the titles to sr_post[sr]
			# for child in children:
			# 	sr_posts[sr].append(child)
			return recurse(url, after_, sr,1000)
		except Exception as e:
			print(e)

for sr in subreddits:
	recurse(f"https://www.reddit.com/r/{sr}.json",None,sr,1000)	
	# open file
	# write sr_posts[sr] to file