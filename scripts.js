const passwordRangeEl = document.getElementById('passwordRange');
const sliderValueEl = document.getElementById('sliderValue');

passwordRangeEl.addEventListener('input', (event) => {
	const tempSlideValue = event.target.value;
	sliderValueEl.textContent = tempSlideValue;

	const progress = (tempSlideValue / passwordRangeEl.max) * 100;

	passwordRangeEl.style.background = `linear-gradient(to right, var(--clr-primary-green) ${progress}%, var(--clr-neutral-gray-very-dark) ${progress}%)`;
});
