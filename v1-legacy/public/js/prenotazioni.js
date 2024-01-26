const eliminaPrenotazione = async function (id) {
	const res = await fetch(`/api/prenotazioni/${id}`, {
		method: 'DELETE',
	});
	const data = await res.json();
	if (data.status === 'success') {
		fetchPrenotazioni();
		document.querySelectorAll('input').forEach((input) => {
			input.value = '';
		});
	}
};

const fetchPrenotazioni = async function () {
	document.querySelector('#list').innerHTML = '';
	const res = await fetch('/api/prenotazioni', {
		method: 'GET',
	});
	const data = await res.json();
	data.data.prenotazioni.forEach((prenotazione) => {
		const markup = `
      <div class="grid grid-cols-6  gap-5 py-2">
        <p class="">${prenotazione.nominativo_cliente}</p>
        <p class="overflow-x-scroll">${prenotazione.email_cliente}</p>
        <p class="">${new Date(prenotazione.data_check_in).toLocaleDateString()}</p>
        <p class="">${new Date(prenotazione.data_check_out).toLocaleDateString()}</p>
        <p class="">${prenotazione.prezzo_totale + ' €'}</p>
        <p class=""><button class="border" onclick="eliminaPrenotazione(${prenotazione.id})">elimina</button></p>
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
		option.text = 'n: ' + camera.numero + ' (' + camera.tipologia + ')';
		select.appendChild(option);
	});
};

document.querySelector('form').addEventListener('submit', async function (e) {
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
		fetchPrenotazioni();
	}
	console.log(data);
});

fetchCamere();
fetchPrenotazioni();
