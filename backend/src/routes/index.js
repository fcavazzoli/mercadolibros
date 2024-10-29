import { Router } from 'express';

import users from './users.js';
import books from './books.js';
import categories from './categories.js';

const router = Router();

router.use('/users', users);
router.use('/books', books);
router.use('/categories', categories);

export default router;