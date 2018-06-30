"use strict";

let data;
let booksData;
let books_of_bible = [];
let bible_formatted_data = {};

let book_sel, chapter_sel, verse_sel;

let verse_text;

let pos;

let bibleVerseUp = false;

async function setup() {
	// createCanvas(600, 400);
	noCanvas();

	coordStuff();

	loadJSON('books_of_bible.json', gotBooksData);
	// loadJSON('https://bible-api.com/john 3:16', got_data, 'jsonp');
}

function coordStuff() {
	pos = createP();

	pos.style('font-family', 'consolas');
	pos.style('font-size', '16pt');
	pos.position('inherit', 450)
}

function gotBooksData(a) {
	booksData = a;
	formatData();
	makeGUI();
}

function gotData(a) {
	data = a;
	createP(data.text);
}

function formatData() { // getting the books of the bible and their verse lengths
	let names_of_parts_of_bible = booksData['section_order'];
	let parts_of_bible          = booksData['sections'];

	for (let i in names_of_parts_of_bible) {
		let name_of_part_of_bible = names_of_parts_of_bible[i];
		let part_of_bible         = parts_of_bible[name_of_part_of_bible];

		// for (let j = 0; j < part_of_bible.length; j++) {
		for (let info of part_of_bible) {

			let book  = info.key;
			let value = info.val;

			value = value.split(',');

			value[0] = int(value[0].replace(/\D/g, '')); // chapter
			value[1] = int(value[1].replace(/\D/g, '')); // verse

			// console.log(book);
			// console.log(value);

			books_of_bible.push(book);
			bible_formatted_data[book] = value;
		}
	}
}

function makeGUI() {
	book_sel    = createSelect();
	verse_sel   = createInput('1');
	chapter_sel = createInput('1');

	book_sel.position('inherit', 10);
	book_sel.changed(update);
	for (let book of books_of_bible) {
		book_sel.option(book);
	}

	verse_sel.position(230, 10);
	verse_sel.style('width', '5em');
	verse_sel.changed(update);

	chapter_sel.position(150, 10);
	chapter_sel.style('width', '5em');
	chapter_sel.changed(update);

	verse_text = createP('Please choose verse!');
	verse_text.position('inherit', 20);
}

function draw() {
	if (!(bibleVerseUp)) {
		pos.html([winMouseX, ' ' + round(winMouseY)]);
	} else {
		pos.html('');
	}
}

function update() {
	// console.log('UPDATING')

	let book    = book_sel.value();
	let chapter = chapter_sel.value();
	let verse   = verse_sel.value();

	let book_data = bible_formatted_data[book];

	// the below is legacy code, my JSON doc has total amount of verses, 
	// not verses in current chapter (obviously, it doesn't have THAT much data)

	// if (verse != 'all') {
	// 	verse = int(verse);
	// }

	// let good_verse = false;
	// if (typeof verse == 'number') {
	// 	if (verse < book_data[0] && verse > 0) {
	// 		good_verse = true;
	// 		console.log(book_data[0], verse);
	// 	}
	// } else if (verse === 'all') {
	// 	verse = '';
	// }

	// if (!(good_verse)) {
	// 	verse = '';
	// 	// alert('Please fix verse');
	// }

	chapter = int(chapter);

	let good_chapter = false;
	if (typeof chapter == 'number') {
		if (chapter < book_data[1] && chapter > 0) {
			good_chapter = true;
		}
	}

	if (!(good_chapter)) {
		// alert('Please fix chapter');
	}
	// loadJSON('https://bible-api.com/john 3:16', got_data, 'jsonp');

	if (verse === 'all') {
		loadJSON('https://bible-api.com/' + book + chapter, got_data, 'jsonp');	
	} else if (good_chapter) {
		loadJSON('https://bible-api.com/' + book + chapter + ':' + verse, got_data, 'jsonp');
	}
}

function got_data(newData) {
	data = newData;
	bibleVerseUp = true;

	let verse_data = '';
	for (let i of data.verses) {
		verse_data += (i.text + '<sup>' + i.verse + '</sup>fillertext');
		// console.log(verse_data);
	}

	verse_data = verse_data.replace(/fillertext/g, '<br/>');

	verse_text.html(verse_data);
}