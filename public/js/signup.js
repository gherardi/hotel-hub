document.querySelector('form').addEventListener('submit', async function (e) {
	e.preventDefault();
	const fullName = document.querySelector("input[name='name']").value;
	const email = document.querySelector("input[name='email']").value;
	const password = document.querySelector("input[name='password']").value;

	const res = await fetch('/api/users/signup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ fullName, email, password }),
	});
	const data = await res.json();
	if (data.status === 'success') {
		window.location.href = '/dashboard';
	} else alert(data.err.sqlMessage? data.err.sqlMessage : data.message);
});
