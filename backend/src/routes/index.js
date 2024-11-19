import { Router } from 'express';

import users from './users.js';
import books from './books.js';
import categories from './categories.js';
import exchanges from './exchanges.js';

const router = Router();

router.use('/users', users);
router.use('/books', books);
router.use('/categories', categories);
router.use('/exchanges', exchanges)

export default router;