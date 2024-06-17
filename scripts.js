const formEl = document.getElementById('form');
const passwordEl = document.getElementById('password');
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

// Handle button verification
const disableBtn = () => {
	submitBtnEl.disabled = true;
};

const enableBtn = () => {
	submitBtnEl.disabled = false;
};

// Handle slide toast
const hideSliderToast = () => {
	sliderToastEl.className = 'toastHidden';
};

const showSliderToast = () => {
	sliderToastEl.className = 'toastActive';
};

// Get form data to set Password Strength
formEl.addEventListener('input', (e) => {
	let formData = new FormData(formEl);
	let entries = Object.fromEntries(formData);
	let entriesLength = Object.keys(entries).length;

	if (entries.slider < 1) {
		showSliderToast();
		disableBtn();
	} else if (entries.slider > 0 && entriesLength == 2) {
		hideSliderToast();
		enableBtn();
		ratingTextEL.innerHTML = 'Too Weak!';
		ratingWrapper.classList = 'ratings tooWeak';
	} else if (entries.slider > 0 && entriesLength === 3) {
		hideSliderToast();
		enableBtn();
		ratingTextEL.innerHTML = 'Weak';
		ratingWrapper.classList = 'ratings weak';
	} else if (entries.slider > 0 && entriesLength === 4) {
		hideSliderToast();
		enableBtn();
		ratingTextEL.innerHTML = 'Medium';
		ratingWrapper.classList = 'ratings medium';
	} else if (entries.slider > 0 && entriesLength === 5) {
		hideSliderToast();
		enableBtn();
		ratingTextEL.innerHTML = 'Strong';
		ratingWrapper.classList = 'ratings strong';
	}
});

// Create random sting for password
const createRandomString = (length, chars) => {
	let result = '';

	const randomArray = new Uint8Array(length);
	crypto.getRandomValues(randomArray);
	randomArray.forEach((number) => {
		result += chars[number % chars.length];
	});

	return result;
};

// Display password in output
const displayPassword = (randomString) => {
	passwordEl.innerHTML = randomString;
	passwordEl.style.color = 'var(--clr-neutral-offwhite)';
};

// Get form data for password output
formEl.addEventListener('submit', (e) => {
	e.preventDefault();

	let formData = new FormData(formEl);
	let entries = Object.fromEntries(formData);

	const length = entries.slider;
	const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
	const numberChars = '1234567890';
	const symbolChars = '!@#$%^&*()?><+-/{}[];:~_';

	let chars = '';

	if (entries.upperCase) {
		chars += upperCaseChars;
	}

	if (entries.lowerCase) {
		chars += lowerCaseChars;
	}

	if (entries.numbers) {
		chars += numberChars;
	}

	if (entries.symbols) {
		chars += symbolChars;
	}

	const randomString = createRandomString(length, chars);

	displayPassword(randomString);
});
