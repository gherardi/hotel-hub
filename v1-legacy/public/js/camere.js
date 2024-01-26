const eliminaCamera = async function (id) {
	const res = await fetch(`/api/camere/${id}`, {
		method: 'DELETE',
	});
	const data = await res.json();
	if (data.status === 'success') {
		fetchCamere();
		document.querySelectorAll('input').forEach((input) => {
			input.value = '';
		});
	}
};

const fetchCamere = async function () {
	document.querySelector('#list').innerHTML = '';
	const response = await fetch('/api/camere', {
		method: 'GET',
	});
	const camere = await response.json();
	camere.data.camere.forEach((camera) => {
		const markup = `
      <div class="grid grid-cols-5 gap-5 py-2">
        <p class="">${camera.numero}</p>
        <p class="">${camera.tipologia}</p>
        <p class="">${camera.prezzo_giornaliero}</p>
        <p class="">${camera.sconto}</p>
				<p class=""><button class="border" onclick="eliminaCamera(${camera.id})">elimina</button></p>

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
		fetchCamere();
		document.querySelectorAll('input').forEach((input) => {
			input.value = '';
		});
	}
});
