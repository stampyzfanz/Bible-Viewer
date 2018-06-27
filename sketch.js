let data;
let books_data;

async function setup() {
	// createCanvas(600, 400);
	noCanvas();

	// load_JSON_data('en_bbe.json', gotData);
	// loadJSON('http://getbible.net/json?p=JOHN3:16&lang=basicenglish', gotData, 'jsonp');
	// loadJSON('http://getbible.net/json?p=3JOHN&lang=basicenglish', gotData, 'jsonp');

	await loadJSON('books_of_bible.json', got_books_data);
	loadJSON('https://bible-api.com/john 3:16', got_other_data, 'jsonp');
}

function got_books_data(a) {
	books_data = a;
}

function got_other_data(a) {
	data = a;

	// console.log(data);
	console.log(data.text);
}

function gotData(a) {
	data = a;

	console.log('data:  ' + JSON.stringify(data));
	console.log('verse: ' + JSON.stringify(data.book[0].chapter['16'].verse));
	// console.log('verse: ' + JSON.stringify(data.book[0].chapter['16'].verse));
}

function got_JSON_data(a) {
	data = a;
	document.getElementsByTagName('body')[0].style.color = 'magenta';

	createElement('h1', 'Genesis');
	
	let chapter = data[0].chapters[0];
	let string_chapter = '';

	for (let i = 0; i < chapter.length; i++) {
		string_chapter += '<sup>' + i + '</sup> ' + chapter[i];
	}

	createP(string_chapter);
}