const fs = require("fs")

const subs = ['PrequelMemes','SequelMemes'];

subs.map(sub =>{
	let dir = `./json2/${sub}`
	let files = fs.readdirSync(dir).map(x => `${dir}/${x}`);
	
	files.map(file => {
		let target = fs.readFileSync(`./json2/${sub}.json`, 'utf8');
		let finalData = JSON.parse(target);
		let contents = JSON.parse(fs.readFileSync(file));
		contents.map(c => finalData.push(c))
		fs.writeFileSync(`./json2/${sub}.json`,JSON.stringify(finalData));
	})

})
