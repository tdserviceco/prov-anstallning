//Global variable
let loading = document.querySelector('.loading');
let galleryValue = localStorage.getItem('galleryValue');
let galleryForm = document.querySelector('.result-from-flickr');
let buttonsContainer = document.createElement('div');
let searchField = document.querySelector('.search-field')
let searchTextField = document.querySelector('#search');
let submitFetchImageButton = document.querySelector('.fetch-button');
//Checkup on loading state
document.onreadystatechange = () => {
	if (document.readyState === 'complete') {

		//Hide the loading text when complete is active 
		loading.classList.remove('show');
		loading.classList.add('hide');

		//Display the search field
		searchField.classList.remove('hide');
		searchField.classList.add('show');

		//Run all scripts 
		document.title = 'Vanilla JS'
		console.log('complete');
		scripts();
	}
	else {
		if (galleryValue === null) {
			localStorage.setItem('galleryValue', JSON.stringify([]))
		}
		document.title = 'Vanilla JS - Loading...'
		console.log('loading')
		console.log('scrips loading..');
		loading.classList.add('show');
		loading.classList.remove('hide');
	}
}

function fetchImage() {
	let resultText;
	resultText = document.createElement('h2');
	let images = document.querySelector('.images-container');

	searchField.addEventListener('submit', function (e) {
		//Stops the form from autocomplete itself
		e.preventDefault();
		document.title = 'Vanilla JS - Fetching images...'
		printImage(e.target[0].value).then(result => {
			document.title = 'Vanilla JS';


			//Store our fetch in localstorage and then use this to draw our result out
			localStorage.setItem('flickr-photos', JSON.stringify(result.photos.photo));
			let photos = JSON.parse(localStorage.getItem('flickr-photos'));

			let div;
			let img;
			if (result.stat === 'ok') {
				console.log('Okay, showing result: ');
				console.log(photos);

				searchField.classList.remove('show');
				searchField.classList.add('hide');

				//Loop through all X photos and create new IMG elements
				if (photos.length !== 0) {
					resultText.classList.add('result');
					resultText.innerText = `Found ${photos.length}`;
					images.appendChild(resultText);
					photos.forEach((photo, key) => {

						div = document.createElement('div');
						div.setAttribute('class', 'image');
						images.appendChild(div);
						let divImage = document.querySelectorAll('.image');
						img = document.createElement('img');
						img.setAttribute("src", `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${'q'}.jpg`);
						img.setAttribute('alt', `_${photo.id}_${photo.secret}_q_.jpg`);

						let checkBox = document.createElement('input');
						checkBox.setAttribute('type', 'checkbox');
						checkBox.setAttribute('id', key);
						checkBox.setAttribute('class', 'checkbox');
						checkBox.setAttribute('onchange', "checkUnCheck(this)")
						checkBox.setAttribute('value', JSON.stringify([{
							id: photo.id,
							quality: 'q',
							src: 'https://live.staticflickr.com',
							server: photo.server,
							secret: photo.secret
						}]));

						let label = document.createElement('label');
						label.setAttribute('for', key);

						//What order I want the label + image should land on
						divImage[key].appendChild(label);
						label.appendChild(img);
						label.appendChild(checkBox);
					});

					buttonsContainer.setAttribute('class', 'buttons-container');
					galleryForm.appendChild(buttonsContainer);

					let buttonContainerDiv = document.querySelector('.buttons-container');

					let newSearchButton = document.createElement('button');
					newSearchButton.setAttribute('type', 'button');
					newSearchButton.setAttribute('onclick', 'newSearch()');
					newSearchButton.setAttribute('class', 'btn new-search-button');
					newSearchButton.innerText = 'New search';
					buttonContainerDiv.appendChild(newSearchButton);

					let createGalleryButton = document.createElement('input');
					createGalleryButton.setAttribute('type', 'submit');
					createGalleryButton.setAttribute('onsubmit', 'setupGallery(e)');
					createGalleryButton.setAttribute('class', 'btn show-gallery-button');
					createGalleryButton.setAttribute('value', 'Show gallery');
					buttonContainerDiv.appendChild(createGalleryButton);
				}
				else {
					searchField.classList.add('show');
					searchField.classList.remove('hide');
					resultText = document.querySelector('.nothing-returned');
					resultText.innerText = `Found ${photos.length}, please search again`;
				}

			}
			else {
				throw 'Hmmm something went wrong!';
			}
		})
	})
}

async function printImage(word) {

	const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b54580f369a7eeebecb2004dc429d08f&is_commons=true&in_gallery=true&content_type=1&safe_search=1&text=${word}&tags=${word}&media=photos&format=json&nojsoncallback=1`
	let response = await fetch(url);
	return response.json()
}

function newSearch() {
	localStorage.setItem('flickr-photos', JSON.stringify([]))
	let photos = JSON.parse(localStorage.getItem('flickr-photos'));
	console.log("amount of photos: ", photos.length)

	let images = document.querySelector('.images-container');
	let buttonsContainerDiv = document.querySelector('.buttons-container');
	let nothingReturnedText = document.querySelector('.nothing-returned');
	if (nothingReturnedText !== null) {
		nothingReturnedText.innerText = ""; // Remove anything child related to .nothing-returned h2 class
	}


	// Remove anything child related to .images-container & buttons-container div
	buttonsContainerDiv.innerText = "";
	images.innerText = "";


	searchField.classList.remove('hide');
	searchField.classList.add('show');
}

function setupGallery() {
	galleryForm.addEventListener('submit', function (e) {
		document.title = 'Vanilla JS - Creating gallery'

		e.preventDefault();
		console.log('creating gallery....')
		let checkboxes = document.querySelectorAll("input[type='checkbox']");
		let selectedImages = [];
		for (let i = 0; i < checkboxes.length; i++) {
			const element = checkboxes[i];
			if (element.checked) {
				selectedImages.push(JSON.parse(element.value))
			}
		}
		localStorage.setItem('galleryValue', JSON.stringify(selectedImages));

		createGallery();

	})
}

function createGallery() {
	let selectedImagesForGallery = JSON.parse(localStorage.getItem('galleryValue'));

	document.title = `Vanilla JS - Your gallery with total of ${selectedImagesForGallery.length}`

	let removeAllForms = document.querySelectorAll('form');
	let galleryDiv = document.querySelector('.gallery');
	let galleryText = document.querySelector('.gallery h2');
	galleryDiv.classList.remove('hide');
	galleryDiv.classList.add('show');

	for (let i = 0; i < removeAllForms.length; i++) {
		const element = removeAllForms[i];
		element.innerText = "";
	}

	let newSearchButton = document.createElement('button');
	newSearchButton.setAttribute('onclick', 'restartPage()');
	newSearchButton.innerText = 'New search';
	galleryDiv.appendChild(newSearchButton);

	let images = document.createElement('div');
	images.setAttribute('class', 'images');
	galleryDiv.appendChild(images);

	galleryText.innerText = `This is your gallery with total of ${selectedImagesForGallery.length}`;
	let galleryImagesDiv = document.querySelector('.gallery .images');
	for (let i = 0; i < selectedImagesForGallery.length; i++) {
		let image = document.createElement('img');
		const element = selectedImagesForGallery[i];
		console.log(element[0])
		image.setAttribute('src', `${element[0].src}/${element[0].server}/${element[0].id}_${element[0].secret}_${element[0].quality}.jpg`);
		image.setAttribute('alt', `${element[0].id}_${element[0].secret}_${element[0].quality}.jpg`);
		galleryImagesDiv.appendChild(image);
	}

}

function checkUnCheck(e) {
	let previousSibling = e.previousSibling;
	if (e.checked) {
		previousSibling.classList.add('checked');
	}
	else {
		previousSibling.classList.remove('checked');
	}
}

function disableSubmitButtonForFetchImages() {
	//Disable the submit fetch button if nothing is written..
	searchTextField.addEventListener('input', function () {
		if (searchTextField.value.length > 1) {
			submitFetchImageButton.classList.add('active');
		}
		else {
			submitFetchImageButton.classList.remove('active');
		}
	})

}

function restartPage() {
	window.location.reload();
}

function scripts() {
	console.log('scripts loaded')
	fetchImage()
	setupGallery()
	disableSubmitButtonForFetchImages();
}