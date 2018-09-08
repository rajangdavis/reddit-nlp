// Fetch dependencies
const fs = require("fs")

// These are the folders/subs of data that we want
// const subs = ['PrequelMemes','SequelMemes'];
const subs = ['OTMemes'];

// Loop through each of the above
subs.map(sub =>{
	// This is the directory of json files for the given
	// sub reddit
	let dir = `./json2/${sub}`
	// Get a list of files from tje folder
	let files = fs.readdirSync(dir).map(x => `${dir}/${x}`);
	
	// Loop over each file
	// and add it's contents to the 
	// main JSON file that has the name of the subreddit
	files.map(file => {
		let target = fs.readFileSync(`./json2/${sub}.json`, 'utf8');
		let finalData = JSON.parse(target);
		let contents = JSON.parse(fs.readFileSync(file));
		contents.map(c => finalData.push(c))
		fs.writeFileSync(`./json2/${sub}.json`,JSON.stringify(finalData));
	})

})
