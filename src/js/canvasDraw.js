const canvasDraw = () => {
	let x;
	let y;
	let transparencyPercentage = 100;
	const bgcCanvasHelper = document.querySelector('#bgc-canvas-helper')
	const colorArray = ['#00dcff', '#ffc521', '#ff5851', '#ffffff'];
	let selectedColor = colorArray[0];
	let drawing = true;
	let bgcChangeRunning = false;
	const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);

	const canvas = document.querySelector('canvas');
	const context = canvas.getContext('2d');
	canvas.height = innerHeight*.75;
	canvas.width = innerWidth;
	window.addEventListener('resize', (e) => {
		if (!isMobile) {
			canvas.height = innerHeight*.75;
			canvas.width = innerWidth;
		}
	})

	document.querySelector('#intro').addEventListener('mousemove', (e) => {
		if (drawing) {
			context.beginPath();

			context.moveTo(x, y);
			context.lineCap = "round";
			context.lineTo(e.clientX, e.clientY);
			context.strokeStyle = selectedColor;
			context.lineWidth = innerWidth / 7;
			if (isMobile) {
				context.lineWidth = innerHeight / 5;
			} else {
				context.lineWidth = innerWidth / 6.5;
			}
			context.stroke();

			if (isMobile) {
				context.arc(e.clientX, e.clientY, innerHeight / 10, 0, 2 * Math.PI);
			} else {
				context.arc(e.clientX, e.clientY, innerWidth / 13, 0, 2 * Math.PI);
			}
			context.fillStyle = selectedColor;
			context.fill();

			context.closePath();

			x = e.clientX;
			y = e.clientY;

			transparencyPercentage = transparency()
			if (!isMobile) {
				if (transparencyPercentage <= 40) {
					document.querySelector('#info').style.color = selectedColor;
					if (!bgcChangeRunning) {
						bgcChangeRunning = true;
						drawing = false;
						bgcCanvasHelper.style.top = y + 'px';
						bgcCanvasHelper.style.left = x + 'px';
						bgcCanvasHelper.style.backgroundColor = selectedColor;
						bgcCanvasHelper.style.height = innerHeight > innerWidth ? `${innerHeight*2.5}px` : `${innerWidth*2.5}px`;
						bgcCanvasHelper.style.width = innerHeight > innerWidth ? `${innerHeight*2.5}px` : `${innerWidth*2.5}px`;
						bgcCanvasHelper.style.transform = 'translate(-50%, -50%) scale(1)';

						setTimeout(() => {
							document.body.style.backgroundColor = selectedColor;
							bgcCanvasHelper.style.transform = 'translate(-50%, -50%) scale(0)';
							bgcCanvasHelper.style.height = '0px';
							bgcCanvasHelper.style.width = '0px';
							context.clearRect(0, 0, canvas.width, canvas.height);
							colorSwitcher();
							drawing = true;
							bgcChangeRunning = false;
						}, 1000);
					}
				}
			} else {
				if (transparencyPercentage <= 70) {
					document.querySelector('#info').style.color = selectedColor;
					if (!bgcChangeRunning) {
						bgcChangeRunning = true;
						drawing = false;
						bgcCanvasHelper.style.top = y + 'px';
						bgcCanvasHelper.style.left = x + 'px';
						bgcCanvasHelper.style.backgroundColor = selectedColor;
						bgcCanvasHelper.style.height = innerHeight > innerWidth ? `${innerHeight*2.5}px` : `${innerWidth*2.5}px`;
						bgcCanvasHelper.style.width = innerHeight > innerWidth ? `${innerHeight*2.5}px` : `${innerWidth*2.5}px`;
						bgcCanvasHelper.style.transform = 'translate(-50%, -50%) scale(1)';

						setTimeout(() => {
							document.body.style.backgroundColor = selectedColor;
							bgcCanvasHelper.style.transform = 'translate(-50%, -50%) scale(0)';
							bgcCanvasHelper.style.height = '0px';
							bgcCanvasHelper.style.width = '0px';
							context.clearRect(0, 0, canvas.width, canvas.height);
							colorSwitcher();
							drawing = true;
							bgcChangeRunning = false;
						}, 1000);
					}
				}
			}
		} else {
			x = e.clientX;
			y = e.clientY;
		}
	})

	document.querySelector('#intro').addEventListener('touchstart', (e) => {
		if (isMobile) {
			let touch = e.touches[0];
			x = touch.clientX;
			y = touch.clientY;
		}
	})

	document.querySelector('#intro').addEventListener('touchmove', (e) => {
		if (isMobile) {
			let touch = e.touches[0];
			const mouseEvent = new MouseEvent("mousemove", {
				clientX: touch.clientX,
				clientY: touch.clientY
			});
			document.dispatchEvent(mouseEvent);
		}
	})

	const transparency = () => {
		let pixelCount = canvas.width * canvas.height;
		let arrayElemsCount = pixelCount * 4;
		let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		let dataArray = imageData.data;
		let threshold = 0;
		let transparentPixelCount = 0;
		for (let i = 3; i < arrayElemsCount; i+= 4) {
				let alphaValue = dataArray[i];
				if (alphaValue <= threshold) {
						transparentPixelCount++;
				}
		}
		let transparencyPercentage = (transparentPixelCount / pixelCount) * 100;

		return transparencyPercentage;
	}

	const colorSwitcher = () => {
		if (colorArray[colorArray.indexOf(selectedColor) + 1]) {
			selectedColor = colorArray[colorArray.indexOf(selectedColor) + 1];
		} else {
			selectedColor = colorArray[0];
		}
	}
}

export { canvasDraw }