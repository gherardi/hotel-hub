const fetchPrenotazioni = async function () {
	const response = await fetch('/api/prenotazioni', {
		method: 'GET',
	});
	const camere = await response.json();
	console.log(camere);
	camere.data.prenotazioni.forEach((prenotazione) => {
		const markup = `
      <div class="grid grid-cols-5">
        <p class="">${prenotazione.nominativo_cliente}</p>
        <p class="overflow-x-scroll">${prenotazione.email_cliente}</p>
        <p class="">${new Date(prenotazione.data_check_in).toLocaleDateString()}</p>
        <p class="">${new Date(prenotazione.data_check_out).toLocaleDateString()}</p>
        <p class="">${prenotazione.prezzo_totale + " €"}</p>
      </div>
    `;
		document.querySelector('#list').insertAdjacentHTML('afterbegin', markup);
	});
};
fetchPrenotazioni();
