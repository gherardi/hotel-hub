import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	res.redirect('/login');
});

// router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/login', (req, res) => {
	res.status(200).render('login');
});

router.get('/signup', (req, res) => {
	res.status(200).render('signup');
});

router.get('/dashboard', (req, res) => {
	if (!req.session.user) res.redirect('/');
	res.status(200).render('dashboard', {
		user: req.session.user,
	});
});

export default router;
