const fetchCamere = async function () {
	const response = await fetch('/api/camere', {
		method: 'GET',
	});
	const camere = await response.json();
	console.log(camere);
	camere.data.camere.forEach((camera) => {
		const markup = `
      <div class="grid grid-cols-5">
        <p class="">${camera.id}</p>
        <p class="">${camera.tipologia}</p>
        <p class="">${camera.prezzo_giornaliero}</p>
        <p class="">${camera.occupata.data[0] === 0 ? 'libera' : 'occupata'}</p>
        <p class="">${camera.sconto}</p>
      </div>
    `;
		document.querySelector('#list').insertAdjacentHTML('afterbegin', markup);
	});
};
fetchCamere();
