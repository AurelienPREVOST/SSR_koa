const Router = require('koa-router');
const router = new Router();
const jwt = require('jsonwebtoken');

const { loadHotels, saveHotels, loadUsers } = require('./utils');

const SECRET_KEY = 'your_secret_key';

function generateToken(user) {
    return jwt.sign({ email: user.email, status: user.status }, SECRET_KEY, { expiresIn: '1h' });
}

function authenticateToken(ctx, next) {
    const token = ctx.cookies.get('token');
    if (!token) {
        ctx.redirect('/login');
        return;
    }
    try {
        const user = jwt.verify(token, SECRET_KEY);
        ctx.state.user = user;
        return next();
    } catch (error) {
        ctx.redirect('/login');
    }
}

router.get('/', async (ctx) => {
    await ctx.render('pages/index', {
        title: 'Home'
    });
});

router.get('/login', async (ctx) => {
    await ctx.render('pages/login', {
        title: 'Login'
    });
});

router.post('/login', async (ctx) => {
    const { email, password } = ctx.request.body;
    const users = await loadUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        const token = generateToken(user);
        ctx.cookies.set('token', token, { httpOnly: true });
        ctx.redirect('/');
    } else {
        ctx.body = 'Invalid email or password';
    }
});

router.get('/logout', (ctx) => {
    ctx.cookies.set('token', null);
    ctx.redirect('/');
});

router.get('/list', authenticateToken, async (ctx) => {
    const hotels = await loadHotels();
    await ctx.render('pages/list', {
        title: 'List',
        hotels
    });
});

router.get('/list/:id', authenticateToken, async (ctx) => {
    const hotels = await loadHotels();
    const hotel = hotels.find(h => h.id === parseInt(ctx.params.id, 10));
    if (hotel) {
        await ctx.render('pages/item', {
            title: hotel.name,
            hotel
        });
    } else {
        ctx.status = 404;
        ctx.body = 'Hotel not found';
    }
});

router.get('/add-hotel', authenticateToken, async (ctx) => {
    await ctx.render('pages/add-hotel', {
        title: 'Add Hotel'
    });
});

router.post('/add-hotel', authenticateToken, async (ctx) => {
    const hotels = await loadHotels();
    const newHotel = {
        id: hotels.length ? hotels[hotels.length - 1].id + 1 : 1,
        ...ctx.request.body
    };
    hotels.push(newHotel);
    await saveHotels(hotels);
    ctx.redirect('/list');
});

router.get('/edit-hotel/:id', authenticateToken, async (ctx) => {
    const hotels = await loadHotels();
    const hotel = hotels.find(h => h.id === parseInt(ctx.params.id, 10));
    if (hotel) {
        await ctx.render('pages/edit-hotel', {
            title: 'Edit Hotel',
            hotel
        });
    } else {
        ctx.status = 404;
        ctx.body = 'Hotel not found';
    }
});

router.post('/edit-hotel/:id', authenticateToken, async (ctx) => {
    const hotels = await loadHotels();
    const index = hotels.findIndex(h => h.id === parseInt(ctx.params.id, 10));
    if (index !== -1) {
        hotels[index] = { id: hotels[index].id, ...ctx.request.body };
        await saveHotels(hotels);
        ctx.redirect('/list');
    } else {
        ctx.status = 404;
        ctx.body = 'Hotel not found';
    }
});

router.get('/delete-hotel/:id', authenticateToken, async (ctx) => {
    const hotels = await loadHotels();
    const index = hotels.findIndex(h => h.id === parseInt(ctx.params.id, 10));
    if (index !== -1) {
        hotels.splice(index, 1);
        await saveHotels(hotels);
        ctx.redirect('/list');
    } else {
        ctx.status = 404;
        ctx.body = 'Hotel not found';
    }
});

module.exports = { router }; // Assurez-vous d'exporter le router
