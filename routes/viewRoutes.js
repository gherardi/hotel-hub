import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	if (req.session.user) res.redirect('/dashboard');
	// else res.status(200).send({ message: `Benvenuto, ${req.session.user.email}!` });
	else res.redirect('/login');
});

// router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/login', (req, res) => {
	res.status(200).render('login');
});

router.get('/signup', (req, res) => {
	res.status(404).json({
		status: 'error',
		message: `Can't find ${req.originalUrl} on this server!`,
	});
});

router.get('/dashboard', (req, res) => {
	res.status(200).json({
		status: 'success',
		message: `sei riuscito ad accedere alla dashboard!`,
		email: req.session.user.email,
		password: req.session.user.password,
	});
});

export default router;
