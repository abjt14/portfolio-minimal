import './style.scss'
import { MagneticElement } from './js/magneticElement'
import { canvasDraw } from './js/canvasDraw'

document.querySelector('#copy-email').addEventListener('click', (e) => {
	navigator.clipboard.writeText('abhijeetsinghmain@gmail.com');
	document.querySelector('#copy-email').classList.add('copied');
	setTimeout(() => {
		document.querySelector('#copy-email').classList.remove('copied');
	}, 5000);
})

document.querySelector('#info-button').addEventListener('click', (e) => {
	document.querySelector('#info').scrollIntoView()
})

// magnetize
window.addEventListener('DOMContentLoaded', (e) => {
	new MagneticElement('html body #info .links a:nth-child(1)');
	new MagneticElement('html body #info .links a:nth-child(2)');
	new MagneticElement('html body #info .links a:nth-child(3)');
	new MagneticElement('html body #info .links a:nth-child(4)');
})
// magnetize end


// hide on scroll
let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
		if (entry.intersectionRatio > .9) {
      document.querySelectorAll('.hide-on-scroll').forEach(el => {
				el.classList.add('activate')
			})
    } else {
      document.querySelectorAll('.hide-on-scroll').forEach(el => {
				el.classList.remove('activate')
			})
		}
  });
}, { threshold: .9 });
observer.observe(document.querySelector('#info'));
// hide on scroll end


// canvas draw
canvasDraw()
// canvas draw end