//Global variable
let loading = document.querySelector('.loading');
let galleryValue = localStorage.getItem('galleryValue');

//Checkup on loading state
document.onreadystatechange = () => {
	if (document.readyState === 'complete') {

		//Hide the loading text when complete is active 
		loading.classList.remove('show');
		loading.classList.add('hide');

		//Display the search field
		document.querySelector('.search-field').classList.remove('hide');
		document.querySelector('.search-field').classList.add('show');

		//Run all scripts 
		console.log('complete')
		scripts()
	}
	else {
		if (galleryValue === null) {
			localStorage.setItem('galleryValue', JSON.stringify([]))
		}
		console.log('loading')
		console.log('scrips loading..');
		loading.classList.add('show');
		loading.classList.remove('hide');
	}
}

function fetchImage() {
	let searchField = document.querySelector('.search-field');

	let resultText;
	let images = document.querySelector('.images');

	searchField.addEventListener('submit', function (e) {
		//Stops the form from autocomplete itself
		e.preventDefault();

		printImage(e.target[0].value).then(result => {

			//Store our fetch in localstorage and then use this to draw our result out
			localStorage.setItem('flickr-photos', JSON.stringify(result.photos.photo));
			let photos = JSON.parse(localStorage.getItem('flickr-photos'));

			let div;
			let img;
			if (result.stat === 'ok') {
				console.log('Okay, showing result: ')
				console.log(photos)

				searchField.classList.remove('show');
				searchField.classList.add('hide');

				//Loop through all 100 photos and create new IMG elements
				if (photos.length !== 0) {
					resultText = document.createElement('h2');
					resultText.innerText = `Found ${photos.length}`
					images.appendChild(resultText);
					photos.forEach((photo, key) => {

						div = document.createElement('div');
						div.setAttribute('class', 'image');
						images.appendChild(div);
						let divImage = document.querySelectorAll('.image');
						img = document.createElement('img');
						img.setAttribute("src", `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${'q'}.jpg`);
						img.setAttribute('alt', `${photo.id}._q_.jpg`)

						let checkBox = document.createElement('input');
						checkBox.setAttribute('type', 'checkbox');
						checkBox.setAttribute('id', key);
						checkBox.setAttribute('class', 'checkbox');
						checkBox.setAttribute('onchange', "checkUnCheck(this)")
						checkBox.setAttribute('value', JSON.stringify([{
							id: photo.id,
							quality: 'q',
							src: 'https://live.staticflickr.com/',
							server: photo.server,
						}]));

						let label = document.createElement('label');
						label.setAttribute('for', key);

						//What order I want the label + image should land on
						divImage[key].appendChild(label);
						label.appendChild(img);
						label.appendChild(checkBox);

					});

					let newSearchButton = document.createElement('button');
					newSearchButton.setAttribute('type', 'button');
					newSearchButton.setAttribute('onclick', 'newSearch()');
					newSearchButton.setAttribute('class', 'new-search-button');
					newSearchButton.innerText = 'New search';
					images.appendChild(newSearchButton);

					let createGalleryButton = document.createElement('input');
					createGalleryButton.setAttribute('type', 'submit');
					createGalleryButton.setAttribute('onsubmit', 'createGallery(e)');
					createGalleryButton.setAttribute('class', 'show-gallery-button');
					createGalleryButton.setAttribute('value', 'Show gallery');
					images.appendChild(createGalleryButton);
				}
				else {
					searchField.classList.add('show');
					searchField.classList.remove('hide');

					resultText = document.createElement('h2');
					resultText.setAttribute('class', 'nothing-returned');
					resultText.innerText = `Found ${photos.length}, please search again`
					searchField.appendChild(resultText);
				}


			}
			else {
				throw 'Hmmm something went wrong!'
			}
		})
	})
}

async function printImage(word) {
	const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b54580f369a7eeebecb2004dc429d08f&is_commons=true&in_gallery=true&content_type=1&safe_search=1&text=${word}&tags=${word}&media=photos&format=json&nojsoncallback=1`
	let response = await fetch(url);
	return response.json()
}

function scripts() {
	console.log('scripts loaded')
	fetchImage()
	createGallery()
}


function newSearch() {
	localStorage.setItem('flickr-photos', JSON.stringify([]))
	let photos = JSON.parse(localStorage.getItem('flickr-photos'));
	console.log("amount of photos: ", photos.length)

	let images = document.querySelector('.images');
	let searchField = document.querySelector('.search-field');
	let nothingReturnedText = document.querySelector('.nothing-returned');
	if (nothingReturnedText !== null) {
		nothingReturnedText.innerText = ""; // Remove anything child related to .nothing-returned h2 class
	}
	images.innerText = ""; // Remove anything child related to .images div
	searchField.classList.remove('hide');
	searchField.classList.add('show');
}

function createGallery() {
	let galleryForm = document.querySelector('.result-from-flickr');
	galleryForm.addEventListener('submit', function (e) {
		e.preventDefault();
		console.log('creating gallery....')
		let checkboxes = document.querySelectorAll("input[type='checkbox']");
		//Stops the form from autocomplete itself
		for (let i = 0; i < checkboxes.length; i++) {
			const element = checkboxes[i];
			if (element.checked) {
				localStorage.setItem('galleryValue', JSON.stringify(...localStorage.getItem('galleryValue')));
			}
		}

	})
}


function checkUnCheck(e) {
	let previousSibling = e.previousSibling;
	if (e.checked) {
		previousSibling.classList.add('checked')

	}
	else {
		previousSibling.classList.remove('checked')

	}
}