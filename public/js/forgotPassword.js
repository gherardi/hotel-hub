document.querySelector('form').addEventListener('submit', async function (e) {
	e.preventDefault();
  
  const email = document.querySelector("input[name='email']").value;
	const res = await fetch('/api/send-email', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email }),
	});
	const data = await res.json();
	if (data.status === 'success') {
    document.querySelector('#result').textContent = "email inviata con successo";
	} else {
    document.querySelector('#result').textContent = "errore nell'invio dell'email";
	}
});
