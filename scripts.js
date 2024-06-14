const formEl = document.getElementById('form');
const passwordRangeEl = document.getElementById('passwordRange');
const ratingEls = document.querySelectorAll('.rating');
const ratingWrapper = document.getElementById('ratings');
const ratingTextEL = document.getElementById('ratingText');
const sliderValueEl = document.getElementById('sliderValue');

// Style slider progress
passwordRangeEl.addEventListener('input', (event) => {
	const tempSlideValue = event.target.value;
	sliderValueEl.textContent = tempSlideValue;

	const progress = (tempSlideValue / passwordRangeEl.max) * 100;

	passwordRangeEl.style.background = `linear-gradient(to right, var(--clr-primary-green) ${progress}%, var(--clr-neutral-gray-very-dark) ${progress}%)`;
});

// Get form data to set Password Strength
formEl.addEventListener('input', (e) => {
	let formData = new FormData(formEl);
	let entries = Object.fromEntries(formData);
	let entriesLength = Object.keys(entries).length;

	if (entries.slider < 1) {
		window.alert('Password Character Length cannot be 0.');
	} else if (entries.slider > 0 && entriesLength <= 2) {
		ratingTextEL.innerHTML = 'Too Weak!';
		ratingWrapper.classList = 'ratings tooWeak';
	} else if (entries.slider > 0 && entriesLength === 3) {
		ratingTextEL.innerHTML = 'Weak';
		ratingWrapper.classList = 'ratings weak';
	} else if (entries.slider > 0 && entriesLength === 4) {
		ratingTextEL.innerHTML = 'Medium';
		ratingWrapper.classList = 'ratings medium';
	} else if (entries.slider > 0 && entriesLength === 5) {
		ratingTextEL.innerHTML = 'Strong';
		ratingWrapper.classList = 'ratings strong';
	}
});
