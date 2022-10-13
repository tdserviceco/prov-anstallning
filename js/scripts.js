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
			localStorage.setItem('galleryValue', [])
		}
		console.log('loading')
		console.log('scrips loading..');
		loading.classList.add('show');
		loading.classList.remove('hide');
	}
}

function gallery(arrayOfPhotos) {

}

function fetchImage() {
	let form = document.querySelector('form');
	let images = document.querySelector('.result-from-flickr');
	form.addEventListener('submit', function (e) {
		//Stops the form from autocomplete itself
		e.preventDefault();

		printImage(e.target[0].value).then(result => {
			let div;
			let photos = result.photos.photo;
			let img;
			let searchField = document.querySelector('.search-field');
			if (result.stat === 'ok') {
				console.log('Okay, showing result: ')
				console.log(photos)

				searchField.classList.remove('show');
				searchField.classList.add('hide');

				//Loop through all 100 photos and create new IMG elements

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

					let label = document.createElement('label');
					label.setAttribute('for', key);


					divImage[key].appendChild(label);
					label.appendChild(img);
					divImage[key].appendChild(checkBox);


				});

				let arrayOfSavedPhotos = [];


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
	console.log('scripts')
	fetchImage()
}


