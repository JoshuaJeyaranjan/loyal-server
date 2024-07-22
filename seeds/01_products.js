// seeds/01_products.js

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// seeds/01_products.js

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('products').del()
      .then(function () {
        // Inserts seed entries
        return knex('products').insert([
          { 
            name: 'Classic Hoodie', 
            size: 'L', 
            description: 'A comfortable hoodie made from high-quality materials.',
            regular_price: 49.99, 
            sale_price: 39.99,
            default_image: 'https://example.com/images/hoodie.jpg',
            category: 'Hoodies'
          },
          { 
            name: 'Graphic T-Shirt', 
            size: 'M', 
            description: 'A stylish t-shirt with a cool graphic design.',
            regular_price: 19.99, 
            sale_price: 14.99,
            default_image: 'https://example.com/images/tshirt.jpg',
            category: 'T-Shirts'
          },
          { 
            name: 'Vintage Sticker Pack', 
            size: null, 
            description: 'A pack of vintage-themed stickers.',
            regular_price: 5.99, 
            sale_price: 5.99,
            default_image: 'https://example.com/images/sticker.jpg',
            category: 'Stickers'
          },
          { 
            name: 'Large Banner', 
            size: null, 
            description: 'A large, eye-catching banner for events.',
            regular_price: 29.99, 
            sale_price: 24.99,
            default_image: 'https://example.com/images/banner.jpg',
            category: 'Banners'
          },
          { 
            name: 'Snapback Hat', 
            size: 'One Size', 
            description: 'A trendy snapback hat for all occasions.',
            regular_price: 15.99, 
            sale_price: 12.99,
            default_image: 'https://example.com/images/hat.jpg',
            category: 'Hats'
          },
          { 
            name: 'Metal Keychain', 
            size: null, 
            description: 'A durable metal keychain with a sleek design.',
            regular_price: 7.99, 
            sale_price: 6.99,
            default_image: 'https://example.com/images/keychain.jpg',
            category: 'Keychains'
          },
          // Add more products as needed
          { 
            name: 'Premium Fleece Sweatshirt', 
            size: 'XL', 
            description: 'A soft and warm fleece sweatshirt perfect for chilly days.',
            regular_price: 59.99, 
            sale_price: 49.99,
            default_image: 'https://example.com/images/sweatshirt.jpg',
            category: 'Hoodies'
          },
          { 
            name: 'Cool Graphic Tee', 
            size: 'S', 
            description: 'A trendy tee with a unique graphic design.',
            regular_price: 22.99, 
            sale_price: 18.99,
            default_image: 'https://example.com/images/graphic_tee.jpg',
            category: 'T-Shirts'
          },
          { 
            name: 'Retro Stickers Pack', 
            size: null, 
            description: 'A collection of retro-themed stickers for decorating.',
            regular_price: 6.99, 
            sale_price: 6.99,
            default_image: 'https://example.com/images/retro_stickers.jpg',
            category: 'Stickers'
          },
          { 
            name: 'Event Banner', 
            size: '4x6 ft', 
            description: 'A large banner suitable for various events and occasions.',
            regular_price: 35.99, 
            sale_price: 29.99,
            default_image: 'https://example.com/images/event_banner.jpg',
            category: 'Banners'
          },
          { 
            name: 'Classic Baseball Cap', 
            size: 'Adjustable', 
            description: 'A classic baseball cap with an adjustable strap.',
            regular_price: 14.99, 
            sale_price: 12.99,
            default_image: 'https://example.com/images/baseball_cap.jpg',
            category: 'Hats'
          },
          { 
            name: 'Keychain with Logo', 
            size: null, 
            description: 'A keychain featuring our logo, great for daily use.',
            regular_price: 8.99, 
            sale_price: 7.99,
            default_image: 'https://example.com/images/logo_keychain.jpg',
            category: 'Keychains'
          },
          { 
            name: 'Lightweight Hoodie', 
            size: 'M', 
            description: 'A lightweight hoodie for casual wear and layering.',
            regular_price: 45.99, 
            sale_price: 39.99,
            default_image: 'https://example.com/images/lightweight_hoodie.jpg',
            category: 'Hoodies'
          },
          { 
            name: 'Minimalist T-Shirt', 
            size: 'L', 
            description: 'A minimalist t-shirt with a clean and simple design.',
            regular_price: 21.99, 
            sale_price: 17.99,
            default_image: 'https://example.com/images/minimalist_tshirt.jpg',
            category: 'T-Shirts'
          },
          { 
            name: 'Funny Sticker Pack', 
            size: null, 
            description: 'A pack of funny stickers to brighten up your day.',
            regular_price: 7.99, 
            sale_price: 6.99,
            default_image: 'https://example.com/images/funny_stickers.jpg',
            category: 'Stickers'
          },
          { 
            name: 'Customizable Banner', 
            size: '3x5 ft', 
            description: 'A customizable banner for any event or promotion.',
            regular_price: 30.99, 
            sale_price: 27.99,
            default_image: 'https://example.com/images/customizable_banner.jpg',
            category: 'Banners'
          },
          { 
            name: 'Beanie Hat', 
            size: 'One Size', 
            description: 'A cozy beanie hat for keeping warm in cold weather.',
            regular_price: 12.99, 
            sale_price: 10.99,
            default_image: 'https://example.com/images/beanie_hat.jpg',
            category: 'Hats'
          },
          { 
            name: 'Leather Keychain', 
            size: null, 
            description: 'A stylish leather keychain with a premium feel.',
            regular_price: 9.99, 
            sale_price: 8.99,
            default_image: 'https://example.com/images/leather_keychain.jpg',
            category: 'Keychains'
          },
          { 
            name: 'Heavy Duty Hoodie', 
            size: 'XXL', 
            description: 'A heavy-duty hoodie for ultimate warmth and comfort.',
            regular_price: 69.99, 
            sale_price: 59.99,
            default_image: 'https://example.com/images/heavy_duty_hoodie.jpg',
            category: 'Hoodies'
          },
          { 
            name: 'Artistic Graphic Tee', 
            size: 'XL', 
            description: 'A graphic tee with a vibrant artistic design.',
            regular_price: 24.99, 
            sale_price: 20.99,
            default_image: 'https://example.com/images/artistic_graphic_tee.jpg',
            category: 'T-Shirts'
          },
  
        ]);
      });
  };
  