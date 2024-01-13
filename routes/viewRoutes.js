import express from 'express';
import bcrypt from 'bcryptjs';
import database from '../config/database.js';

const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).render('landing');
});

router.get('/login', (req, res) => {
	res.status(200).render('login');
});

router.get('/forgot-password', (req, res) => {
	res.status(200).render('forgotPassword');
});

router.get('/reset-password/:token', async (req, res) => {
	const { token } = req.params;
	if (!token) return res.status(400).json({ message: 'token non valido' });

	res.status(200).render('resetPassword');
});

router.patch('/reset-password/:token', async (req, res) => {
	console.log('richiesta ricevuta');
	const { token } = req.params;
	console.log('TOKEN:' + token);
	const { password } = req.body;

	const hash = await bcrypt.hash(password, 12);

	database.query(
		`UPDATE albergatori SET password = '${hash}', passwordResetToken = null WHERE passwordResetToken = '${token}'`,
		(err, result) => {
			if (err) {
				res.status(500).json({
					status: 'error',
					message: 'Errore nella query SQL',
					err,
				});
			} else {
				res.status(200).json({
					status: 'success',
				});
			}
		}
	);
});

router.get('/signup', (req, res) => {
	res.status(200).render('signup');
});

router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	});
});

router.get('/dashboard', (req, res) => {
	if (!req.isLoggedIn) return res.redirect('/');

	res.status(200).render('dashboard', {
		user: req.session.user,
	});
});

router.get('/prenotazioni', (req, res) => {
	if (!req.isLoggedIn) return res.redirect('/');

	res.status(200).render('prenotazioni', {
		user: req.session.user,
	});
});

router.get('/camere', (req, res) => {
	if (!req.isLoggedIn) return res.redirect('/');

	res.status(200).render('camere', {
		user: req.session.user,
	});
});

export default router;
