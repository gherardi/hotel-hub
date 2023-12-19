const fetchCamere = async function () {
	const response = await fetch('/api/camere', {
		method: 'GET',
	});
	const camere = await response.json();
	camere.data.camere.forEach((camera) => {
		const markup = `
      <div class="grid grid-cols-5 gap-5 py-2">
        <p class="">${camera.id}</p>
        <p class="">${camera.tipologia}</p>
        <p class="">${camera.prezzo_giornaliero}</p>
        <p class="">${camera.sconto}</p>
        <p class="">${camera.occupata.data[0] === 0 ? 'libera' : 'occupata'}</p>
      </div>
    `;
		document.querySelector('#list').insertAdjacentHTML('afterbegin', markup);
	});
};
fetchCamere();

document.querySelector('form').addEventListener('submit', async function (e) {
	e.preventDefault();
	const formData = [...new FormData(this)];
	const dataObj = Object.fromEntries(formData);

	const response = await fetch('/api/camere', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dataObj),
	});
	const data = await response.json();
	if (data.status === 'success') {
		window.location.reload();
	}
});
