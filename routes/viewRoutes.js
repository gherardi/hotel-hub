import express from 'express';
// import { parseCookie } from '../helper.js';

const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).render('landing');
});

router.get('/login', (req, res) => {
	res.status(200).render('login');
});

router.get('/signup', (req, res) => {
	res.status(200).render('signup');
});

router.get('/dashboard', (req, res) => {
	// if (!req.session.user) res.redirect('/');
	// else {
	// res.cookie('user', req.session.user);
	res.status(200).render('dashboard', {
		user: req.session.user,
	});
	// }
});

router.get('/prenotazioni', (req, res) => {
	// if (!req.session.user) res.redirect('/');
	// else
	res.status(200).render('prenotazioni', {
		user: req.session.user,
	});
});

router.get('/camere', (req, res) => {
	// if (!req.session.user) res.redirect('/');
	// else
	res.status(200).render('camere', {
		user: req.session.user,
	});
});

export default router;
