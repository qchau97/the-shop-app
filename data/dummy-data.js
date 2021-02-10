import Product from '../models/product';

const PRODUCTS = [
  new Product(
    'p1',
    'u1',
    'Red Shirt',
    'A red t-shirt, perfect for days with non-red weather.',
    29.99
  ),
  new Product(
    'p2',
    'u1',
    'Blue Carpet',
    'Fits your red shirt perfectly. To stand on. Not to wear it.',
    99.99
  ),
  new Product(
    'p3',
    'u2',
    'Coffee Mug',
    'Can also be used for tea!',
    8.99
  ),
  new Product(
    'p4',
    'u3',
    'The Book - Limited Edition',
    "What the content is? Why would that matter? It's a limited edition!",
    15.99
  ),
  new Product(
    'p5',
    'u3',
    'PowerBook',
    'Awesome hardware, crappy keyboard and a hefty price. Buy now before a new one is released!',
    2299.99
  ),
  new Product(
    'p6',
    'u1',
    'Pen & Paper',
    "Can be used for role-playing (not the kind of role-playing you're thinking about...).",
    5.49
  )
];

export default PRODUCTS;
