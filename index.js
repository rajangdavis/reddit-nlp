const axios = require("axios")
const fs = require('fs');

fs.readFile("subreddits.txt","utf8", function(err, data){
	let subreddits = data.split(",");

	let subArr = [];
	let subArrofArrs = []
	subreddits.map((sr,i) => {
		subArr.push(sr);
		if(subArr.length ==4){
			subArrofArrs.push(subArr);
			subArr = [];
		}
	})

	let index = 0;
	const maxBounds = subArrofArrs.length - 1;

	const fetchReddit = index =>{

		let srPosts = {}


		let subreddits = subArrofArrs[index];
		count = 0
		
		subreddits.map((sr,i) => {
			
			const recurse = async (url, after, limit = 10000000000)=>{
				if(srPosts[sr].length < limit){
					try{
						let finalUrl = after == undefined ? url : `${url}?after=${after}`;
						let res = await axios.get(finalUrl);
						let children = res.data.data.children.map(x => x.data.title);
						let after_ = res.data.data.after;
						children.map(x => srPosts[sr].push(x));
						// console.log(`${sr} posts length is ${srPosts[sr].length}`)
						// console.log(`pulling ${url}?after=${after_}`)
						return await recurse(url,after_,1000);
					}catch(e){
						console.log(e)
					}
				}
			}

			console.log(`GETting ${sr} reddit\n\n\n\n\n`)
			
			
			srPosts[sr] = [];
			
			recurse(`https://www.reddit.com/r/${sr}.json`,"",1000).then(res => {

				let uniqueTitles = srPosts[sr].reduce((p, c) => {
				  if (!p.includes(c)) p.push(c);
				  return p;
				}, []);

				let currentTime = + new Date;
				let dir = `./json/${sr.toLowerCase().replace(" ","_")}`;


				if (!fs.existsSync(dir)){
					fs.mkdirSync(dir);
				}

				fs.writeFile(`${dir}/${currentTime}.json`, JSON.stringify(uniqueTitles), function(err) {
				    if(err) {
				        return console.log(err);
				    }
				    count ++;
				    console.log(`\n\n\n\n\nThe ${dir}/${currentTime}.json file was saved with ${uniqueTitles.length} unique titles.\n\n\n\n\n`);
				    if(count ==4 ){
				    	count = 0;
						if((index + 1) <= maxBounds){
							fetchReddit(index + 1)
						}
				    }
				})
				
			}).catch(err=> console.log(err));
		
		})

	}

	fetchReddit(0);

})