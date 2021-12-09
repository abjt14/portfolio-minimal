import './style.scss'
import { MagneticElement } from './js/magneticElement'
import { canvasDraw } from './js/canvasDraw'
import { gsap } from "gsap"


if (innerWidth > 600) {
	// gsap init
	gsap.timeline()
	.to('html, body', { duration: 0, overflowY: 'hidden' })
	.to('#intro .row:nth-child(1) .title', { duration: 0, y: -innerHeight*.05, autoAlpha: 0 , rotate: 0.01 })
	.to('#intro .row:nth-child(1) .subtitle', { duration: 0, y: -innerHeight*.05, autoAlpha: 0 , rotate: 0.01 })
	.to('#intro .row:nth-child(2) .links', { duration: 0, y: innerHeight*.05, autoAlpha: 0 , rotate: 0.01 })
	.to('#intro .row:nth-child(2) .subtext span', { duration: 0, y: innerHeight*.05, autoAlpha: 0 , rotate: 0.01 })
	.to('#info', { duration: 0, y: innerHeight*.1, rotate: 0.01 })
	.to('#intro .row:nth-child(2)', { duration: 0, y: innerHeight*.1, rotate: 0.01 })
	// gsap init end
} else {
	// gsap init
	gsap.timeline()
	.to('html, body', { duration: 0, overflowY: 'hidden' })
	.to('#intro .row:nth-child(1) .title', { duration: 0, y: -innerHeight*.05, autoAlpha: 0 , rotate: 0.01 })
	.to('#intro .row:nth-child(1) .subtitle', { duration: 0, y: -innerHeight*.05, autoAlpha: 0 , rotate: 0.01 })
	.to('#intro .row:nth-child(2)', { duration: 0, y: -innerHeight*.05, autoAlpha: 0 , rotate: 0.01 })
	.to('#intro', { duration: 0, minHeight: '100vh', rotate: 0.01 })
	// gsap init end
}

window.addEventListener('DOMContentLoaded', (e) => {
	if (innerWidth > 600) {
		// gsap after init
		let timelineInit = gsap.timeline({ delay: .5 });

		timelineInit
		.to('#intro .row:nth-child(1) .title', { duration: .8, y: 0, autoAlpha: 1, ease: 'back.out(1)', force3D: true })
		.to('#intro .row:nth-child(1) .subtitle', { duration: .8, y: 0, autoAlpha: 1, ease: 'back.out(1)', force3D: true }, "-=.6")
		.to('#intro .row:nth-child(2) .links', { duration: .8, y: 0, autoAlpha: 1, ease: 'back.out(1)', force3D: true }, "-=.6")
		.to('#intro .row:nth-child(2) .subtext span', { duration: .8, y: 0, stagger: .2, autoAlpha: 1, ease: 'back.out(1)', force3D: true }, "-=.6")
		.to('#info', { duration: 1, y: 0, ease: 'back.out(1)', force3D: true })
		.to('#intro .row:nth-child(2)', { duration: 1, y: 0, ease: 'back.out(1)', force3D: true }, "-=1")
		.to('html, body', { duration: 0, overflowY: 'auto' })
		// gsap after init end


		// magnetize
		new MagneticElement('html body #info .links a:nth-child(1)');
		new MagneticElement('html body #info .links a:nth-child(2)');
		new MagneticElement('html body #info .links a:nth-child(3)');
		new MagneticElement('html body #info .links a:nth-child(4)');
		// magnetize end


		// projects listing item hover
		gsap.to('#projects .project-image-cont', { duration: 0, opacity: 0 })

		document.querySelector('#projects .listing').addEventListener('mouseenter', (e) => {
			gsap.to('#projects .project-image-cont', { duration: .3, opacity: 1, ease: 'power1.out' })
		})

		document.querySelector('#projects .listing').addEventListener('mouseleave', (e) => {
			gsap.to('#projects .project-image-cont', { duration: .3, opacity: 0, ease: 'power1.out' })
		})

		document.querySelectorAll('#projects .listing a.item').forEach(element => {
			const imageName = element.querySelector('.number').innerText + '.webp';

			element.addEventListener('mouseenter', (e) => {
				document.querySelector('#projects .project-image-cont img').setAttribute('src', `./src/images/projects/${imageName}`)
			})
		})
		// projects listing item hover end
	} else {
		// gsap after init
		let timelineInit = gsap.timeline({ delay: .5 });

		timelineInit
		.to('#intro .row:nth-child(1) .title', { duration: .8, y: 0, autoAlpha: 1, ease: 'back.out(1)', force3D: true })
		.to('#intro .row:nth-child(1) .subtitle', { duration: .8, y: 0, autoAlpha: 1, ease: 'back.out(1)', force3D: true }, "-=.6")
		.to('#intro', { duration: 1.2, minHeight: '80vh', ease: 'back.out(1)', force3D: true }, "-=.4")
		.to('#intro .row:nth-child(2)', { duration: .8, y: 0, autoAlpha: 1, ease: 'back.out(1)', force3D: true }, "-=1.2")
		.to('html, body', { duration: 0, overflowY: 'auto' })
		// gsap after init end
	}


	// email copy to clipboard
	document.querySelector('#copy-email').addEventListener('click', (e) => {
		navigator.clipboard.writeText('abhijeetsinghmain@gmail.com');
		document.querySelector('#copy-email').classList.add('copied');
		setTimeout(() => {
			document.querySelector('#copy-email').classList.remove('copied');
		}, 5000);
	})
	// email copy to clipboard end


	// info button event listener
	document.querySelector('#info-button').addEventListener('click', (e) => {
		document.querySelector('#info').scrollIntoView({ behavior: 'smooth' })
	})
	// info button event listener end


	// hide on scroll
	let observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (innerWidth > 600) {
				if (entry.intersectionRatio > .7) {
					document.querySelectorAll('.hide-on-scroll').forEach(el => {
						el.classList.add('activate')
					})
				} else {
					document.querySelectorAll('.hide-on-scroll').forEach(el => {
						el.classList.remove('activate')
					})
				}
			}
		});
	}, { threshold: .7 });
	observer.observe(document.querySelector('#info'));
	// hide on scroll end


	// canvas draw
	canvasDraw()
	// canvas draw end


	// show projects
	const projectsCont = document.querySelector('#projects');
	document.querySelector('#projects-button').addEventListener('click', (e) => {
		projectsCont.classList.add('active');
		document.querySelector('html').style.overflowY = 'hidden';
		document.querySelector('body').style.overflowY = 'hidden';
	})
	document.querySelector('#close-projects-button').addEventListener('click', (e) => {
		projectsCont.classList.remove('active');
		document.querySelector('html').style.overflowY = 'auto';
		document.querySelector('body').style.overflowY = 'auto';
	})
	// show projects end
})