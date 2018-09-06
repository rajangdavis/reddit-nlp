// Fetch dependencies
const axios = require("axios")
const fs = require('fs');

// These are our subs we want to get data from
const subs = ['PrequelMemes','SequelMemes'];

// Recursive function to fetch JSON Data
// If it fails (it probably will with timeouts)
// Just make the same request
const getJson = async (url, sub, after) =>{
	try{
		let finalUrl = `${url}&after=${after}`
		let json = await axios.get(finalUrl)
		let data = json.data.data;
		let lastAfter = Math.max(...data.map(x => parseInt(x.created_utc)));
		fs.writeFileSync(`./json2/${sub}/${lastAfter}.json`,JSON.stringify(data))
		return setTimeout(async function(){ return await getJson(url, sub, lastAfter) }, 2000)
	}catch(e){
		return setTimeout(async function(){ return await getJson(url, sub, after) }, 2000)
	}
}

// Does the initially fetch and then
// recurses forever
subs.map(async (sub) => {
	try{
		let url = `https://api.pushshift.io/reddit/submission/search?subreddit=${sub}&sort=asc`
		let json = await axios.get(url)
		let data = json.data.data;
		let lastAfter = Math.max(...data.map(x => parseInt(x.created_utc)))
		fs.writeFileSync(`./json2/${sub}/${lastAfter}.json`,JSON.stringify(data))
		return await getJson(url, sub, lastAfter);
	}catch(e){
		return setTimeout(async function(){ return await getJson(url, sub, after) }, 2000)
	}
})