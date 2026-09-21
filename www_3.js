const http = require('http');
//moodul päringu parsimiseks
const url = require('url');
const path = require('path')
const fs = require('fs').promises;
const { fullDate, fullTime, fullDay } = require('./src/dateTimeET.js')
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Meris Pärna, veevbiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Meris Pärna, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageBanner = '<img src="veebiprogrammeerimine_2026_TA.png" alt="">';
const pageFoot = '\n</body>\n</html>';

http.createServer(async function(req, res){
	//parsin url-i
	console.log('Päring: ' + req.url);
	let currentURL = url.parse(req.url, true);
	console.log('Parsituna:' + currentURL.pathname)

	// Hakkame jaotama lehti => Routes

	if(currentURL.pathname === '/'){

		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write('\n\t<p>Täna on: ' + fullDate() + ', ' + fullDay() + '</p>');
		res.write('\n\t<p>Leht avati: ' + fullTime() + '</p>');
		res.write('\n\t<p>Lehele lisatud versioonihaldus ' + '</p>');
		res.write('\n\t<ul>\n\t\t<li><a href="vanasona">Tänane vanasõna</a></li>');
		res.write('\n\t</ul>');
		res.write(pageFoot);
		//res.write('Veeb lأ¤kski kأ¤ima!');
		return res.end();
	}

	else if(currentURL.pathname === '/vanasona') {
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write('\<h1>Eesti vanasõnad</h1>\n\t<p>Siin näed tänase päeva vanasõna</p>\n\t<a href="/">Tagasi avalehele</a><hr>')
		res.write(pageFoot);
		return res.end();
	}

	else if(currentURL.pathname === '/veebiprogrammeerimine_2026_TA.png') {
		let picPath = path.join(__dirname, 'pic', currentURL.pathname);
		try {
			const data = await fs.readFile(picPath);
			res.writeHead(200, {"Content-type": "image/jpeg"});
			res.end(data);
		} catch(err) {
			res.writeHead(404, {"Content-type": "text/plain; charset=utf8"})
			return res.end('Pilti ei leitud')
		}
	}

	else {
		res.end('Viga 404, ei leia sellist lehte!')
	}
}).listen(5114);