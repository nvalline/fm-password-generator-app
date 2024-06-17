const formEl = document.getElementById('form');
const passwordRangeEl = document.getElementById('passwordRange');
const ratingEls = document.querySelectorAll('.rating');
const ratingWrapper = document.getElementById('ratings');
const ratingTextEL = document.getElementById('ratingText');
const sliderToastEl = document.getElementById('sliderToast');
const sliderValueEl = document.getElementById('sliderValue');
const submitBtnEl = document.getElementById('submitBtn');

// Style slider progress
passwordRangeEl.addEventListener('input', (event) => {
	const tempSlideValue = event.target.value;
	sliderValueEl.textContent = tempSlideValue;

	const progress = (tempSlideValue / passwordRangeEl.max) * 100;

	passwordRangeEl.style.background = `linear-gradient(to right, var(--clr-primary-green) ${progress}%, var(--clr-neutral-gray-very-dark) ${progress}%)`;
});

// Handle slide toast
const hideSliderToast = () => {
	sliderToastEl.className = 'toastHidden';
	submitBtnEl.disabled = false;
};

const showSliderToast = () => {
	sliderToastEl.className = 'toastActive';
	submitBtnEl.disabled = true;
};

// Get form data to set Password Strength
formEl.addEventListener('input', (e) => {
	let formData = new FormData(formEl);
	let entries = Object.fromEntries(formData);
	let entriesLength = Object.keys(entries).length;

	if (entries.slider < 1) {
		showSliderToast();
	} else if (entries.slider > 0 && entriesLength <= 2) {
		hideSliderToast();
		ratingTextEL.innerHTML = 'Too Weak!';
		ratingWrapper.classList = 'ratings tooWeak';
	} else if (entries.slider > 0 && entriesLength === 3) {
		hideSliderToast();
		ratingTextEL.innerHTML = 'Weak';
		ratingWrapper.classList = 'ratings weak';
	} else if (entries.slider > 0 && entriesLength === 4) {
		hideSliderToast();
		ratingTextEL.innerHTML = 'Medium';
		ratingWrapper.classList = 'ratings medium';
	} else if (entries.slider > 0 && entriesLength === 5) {
		hideSliderToast();
		ratingTextEL.innerHTML = 'Strong';
		ratingWrapper.classList = 'ratings strong';
	}
});

// Get form data for password output
formEl.addEventListener('submit', (e) => {
	e.preventDefault();
	console.log('SUBMIT');
});
