document.querySelector('form').addEventListener('submit', async function (e) {
	e.preventDefault();

  const password = document.querySelector("input[name='password']").value;
	const res = await fetch(`/reset-password/${window.location.pathname.split("/").pop()}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ password }),
	});
	const data = await res.json();
	if (data.status === 'success') {
    document.querySelector('#result').textContent = "password modificata con successo";
	} else {
    document.querySelector('#result').textContent = "errore nel modificare la password";
	}
});
