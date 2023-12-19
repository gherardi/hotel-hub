const fetchPrenotazioni = async function () {
	const res = await fetch('/api/prenotazioni', {
		method: 'GET',
	});
	const data = await res.json();
	data.data.prenotazioni.forEach((prenotazione) => {
		const markup = `
      <div class="grid grid-cols-5 gap-5 py-2">
        <p class="">${prenotazione.nominativo_cliente}</p>
        <p class="overflow-x-scroll">${prenotazione.email_cliente}</p>
        <p class="">${new Date(prenotazione.data_check_in).toLocaleDateString()}</p>
        <p class="">${new Date(prenotazione.data_check_out).toLocaleDateString()}</p>
        <p class="">${prenotazione.prezzo_totale + ' €'}</p>
      </div>
    `;
		document.querySelector('#list').insertAdjacentHTML('afterbegin', markup);
	});
};

const fetchCamere = async function () {
	const select = document.querySelector('#camera');
	const response = await fetch('/api/camere', {
		method: 'GET',
	});
	const camere = await response.json();
	camere.data.camere.forEach((camera) => {
		const option = document.createElement('option');
		option.value = camera.id;
		option.text = "id " + camera.id + ': ' + camera.tipologia;
		select.appendChild(option);
	});
};

document.querySelector('form').addEventListener('submit', async function(e) {
	e.preventDefault();
	const formData = [...new FormData(this)];
	const obj = Object.fromEntries(formData);
	console.log(obj);

	const res = await fetch('/api/prenotazioni', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(obj),
	});
	const data = await res.json();
	if (data.status === 'success') {
		window.location.reload();
	}
	console.log(data);
});

fetchCamere();
fetchPrenotazioni();