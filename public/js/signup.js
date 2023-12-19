document.querySelector('form').addEventListener('submit', async function (e) {
	e.preventDefault();
	const nominativo = document.querySelector("#name").value;
	const email = document.querySelector("#email").value;
	const password = document.querySelector("#password").value;

	console.log(nominativo, email, password);
	const res = await fetch('/api/users/signup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ nominativo, email, password }),
	});
	const data = await res.json();
	if (data.status === 'success') {
		window.location.href = '/dashboard';
	} else {
		alert(data.err?.sqlMessage ? data.err.sqlMessage : data.message);
	}
});
