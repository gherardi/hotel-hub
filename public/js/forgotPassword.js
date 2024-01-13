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
	document.querySelector('#result').textContent = data.message;
});
