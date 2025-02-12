const productsData = [
  {
    "category": "men's clothing",
    "title": "Levi's Men's Jeans",
    "description": "Classic fit jeans made from high-quality denim. Perfect for casual outings.",
    "price": 2499,
    "image": "https://images.unsplash.com/photo-1593642632780-1b7c1c1c1c1c",
    "rating": { "rate": 4.5, "count": 1500 }
  },
  {
    "category": "men's clothing",
    "title": "Puma Men's T-Shirt",
    "description": "Comfortable cotton t-shirt with a stylish design. Ideal for workouts and casual wear.",
    "price": 899,
    "image": "https://images.unsplash.com/photo-1589927986089-35812378c1b0",
    "rating": { "rate": 4.3, "count": 800 }
  },
  {
    "category": "women's clothing",
    "title": "Fabindia Women's Kurta",
    "description": "Beautifully crafted cotton kurta with intricate embroidery. Perfect for festive occasions.",
    "price": 1799,
    "image": "https://images.unsplash.com/photo-1593642632780-1b7c1c1c1c1c",
    "rating": { "rate": 4.6, "count": 600 }
  },
  {
    "category": "women's clothing",
    "title": "H&M Women's Dress",
    "description": "Stylish summer dress made from breathable fabric. Great for casual outings.",
    "price": 2499,
    "image": "https://images.unsplash.com/photo-1589927986089-35812378c1b0",
    "rating": { "rate": 4.4, "count": 400 }
  },
  {
    "category": "electronics",
    "title": "Mi Smart Band 6",
    "description": "Fitness tracker with heart rate monitor and 14-day battery life.",
    "price": 3499,
    "image": "https://images.unsplash.com/photo-1593642632780-1b7c1c1c1c1c",
    "rating": { "rate": 4.5, "count": 2000 }
  },
  {
    "category": "electronics",
    "title": "Sony WH-1000XM4 Headphones",
    "description": "Noise-canceling wireless headphones with superior sound quality.",
    "price": 29999,
    "image": "https://images.unsplash.com/photo-1589927986089-35812378c1b0",
    "rating": { "rate": 4.8, "count": 1200 }
  },
  {
    "category": "home and kitchen",
    "title": "Philips Air Fryer",
    "description": "Healthy air fryer with rapid air technology for crispy food with less oil.",
    "price": 9999,
    "image": "https://images.unsplash.com/photo-1593642632780-1b7c1c1c1c1c",
    "rating": { "rate": 4.7, "count": 900 }
  },
  {
    "category": "home and kitchen",
    "title": "Prestige Pressure Cooker",
    "description": "Durable aluminum pressure cooker with a safety valve. Ideal for quick cooking.",
    "price": 2499,
    "image": "https://images.unsplash.com/photo-1589927986089-35812378c1b0",
    "rating": { "rate": 4.6, "count": 1500 }
  },
  {
    "category": "beauty",
    "title": "L'Oreal Paris Revitalift Serum",
    "description": "Anti-aging serum with hyaluronic acid for youthful skin.",
    "price": 899,
    "image": "https://images.unsplash.com/photo-1593642632780-1b7c1c1c1c1c",
    "rating": { "rate": 4.5, "count": 700 }
  },
  {
    "category": "beauty",
    "title": "Maybelline New York Lipstick",
    "description": "Vibrant and long-lasting lipstick available in various shades.",
    "price": 499,
    "image": "https://images.unsplash.com/photo-1589927986089-35812378c1b0",
    "rating": { "rate": 4.4, "count": 1200 }
  },
  {
    "category": "sports",
    "title": "Adidas Running Shoes",
    "description": "Lightweight running shoes designed for comfort and performance.",
    "price": 4999,
    "image": "https://images.unsplash.com/photo-1593642632780-1b7c1c1c1c1c",
    "rating": { "rate": 4.6, "count": 800 }
  },
  {
    "category": "sports",
    "title": "Nivia Badminton Racket",
    "description": "Durable badminton racket suitable for beginners and professionals.",
    "price": 1299,
    "image": "https://images.unsplash.com/photo-1589927986089-35812378c1b0",
    "rating": { "rate": 4.3, "count": 500 }
  },
  {
    "category": "kids' toys",
    "title": "Barbie Doll",
    "description": "Classic Barbie doll with stylish outfits and accessories.",
    "price": 799,
    "image": "https://images.unsplash.com/photo-1593642632780-1b7c1c1c1c1c",
    "rating": { "rate": 4.7, "count": 1500 }
  },
  {
    "category": "kids' toys",
    "title": "LEGO Classic Bricks Set",
    "description": "Creative building set with various bricks for endless fun.",
    "price": 1499,
    "image": "https://images.unsplash.com/photo-1589927986089-35812378c1b0",
    "rating": { "rate": 4.8, "count": 2000 }
  },
  {
    "category": "health and fitness",
    "title": "Fitbit Inspire 2",
    "description": "Fitness tracker with heart rate monitoring and sleep tracking.",
    "price": 9999,
    "image": "https://images.unsplash.com/photo-1593642632780-1b7c1c1c1c1c",
    "rating": { "rate": 4.5, "count": 1100 }
  },
  {
    "category": "men's clothing",
    "title": "Levi's Men's Jeans",
    "description": "Classic fit jeans made from high-quality denim. Perfect for casual outings.",
    "price": 2499,
    "image": "https://images.unsplash.com/photo-1593642632780-1b7c1c1c1c1c",
    "rating": { "rate": 4.5, "count": 1500 }
  },
  {
    "category": "men's clothing",
    "title": "Puma Men's T-Shirt",
    "description": "Comfortable cotton t-shirt with a stylish design. Ideal for workouts and casual wear.",
    "price": 899,
    "image": "https://images.unsplash.com/photo-1589927986089-35812378c1b0",
    "rating": { "rate": 4.3, "count": 800 }
  },
  {
    "category": "women's clothing",
    "title": "Fabindia Women's Kurta",
    "description": "Beautifully crafted cotton kurta with intricate embroidery. Perfect for festive occasions.",
    "price": 1799,
    "image": "https://images.unsplash.com/photo-1593642632780-1b7c1c1c1c1c",
    "rating": { "rate": 4.6, "count": 600 }
  },
  {
    "category": "women's clothing",
    "title": "H&M Women's Dress",
    "description": "Stylish summer dress made from breathable fabric. Great for casual outings.",
    "price": 2499,
    "image": "https://images.unsplash.com/photo-1589927986089-35812378c1b0",
    "rating": { "rate": 4.4, "count": 400 }
  },
  {
    "category": "electronics",
    "title": "Mi Smart Band 6",
    "description": "Fitness tracker with heart rate monitor and 14-day battery life.",
    "price": 3499,
    "image": "https://images.unsplash.com/photo-1593642632780-1b7c1c1c1c1c",
    "rating": { "rate": 4.5, "count": 2000 }
  },
  {
    "category": "electronics",
    "title": "Sony WH-1000XM4 Headphones",
    "description": "Noise-canceling wireless headphones with superior sound quality.",
    "price": 29999,
    "image": "https://images.unsplash.com/photo-1589927986089-35812378c1b0",
    "rating": { "rate": 4.8, "count": 1200 }
  },
  {
    "category": "home and kitchen",
    "title": "Philips Air Fryer",
    "description": "Healthy air fryer with rapid air technology for crispy food with less oil.",
    "price": 9999,
    "image": "https://images.unsplash.com/photo-1593642632780-1b7c1c1c1c1c",
    "rating": { "rate": 4.7, "count": 900 }
  },
  {
    "category": "home and kitchen",
    "title": "Prestige Pressure Cooker",
    "description": "Durable aluminum pressure cooker with a safety valve. Ideal for quick cooking.",
    "price": 2499,
    "image": "https://images.unsplash.com/photo-1589927986089-35812378c1b0",
    "rating": { "rate": 4.6, "count": 1500 }
  },
  {
    "category": "beauty",
    "title": "L'Oreal Paris Revitalift Serum",
    "description": "Anti-aging serum with hyaluronic acid for youthful skin.",
    "price": 899,
    "image": "https://images.unsplash.com/photo-1593642632780-1b7c1c1c1c1c",
    "rating": { "rate": 4.5, "count": 700 }
  },
  {
    "category": "beauty",
    "title": "Maybelline New York Lipstick",
    "description": "Vibrant and long-lasting lipstick available in various shades.",
    "price": 499,
    "image": "https://images.unsplash.com/photo-1589927986089-35812378c1b0",
    "rating": { "rate": 4.4, "count": 1200 }
  },
  {
    "category": "sports",
    "title": "Adidas Running Shoes",
    "description": "Lightweight running shoes designed for comfort and performance.",
    "price": 4999,
    "image": "https://images.unsplash.com/photo-1593642632780-1b7c1c1c1c1c",
    "rating": { "rate": 4.6, "count": 800 }
  },
  {
    "category": "sports",
    "title": "Nivia Badminton Racket",
    "description": "Durable badminton racket suitable for beginners and professionals.",
    "price": 1299,
    "image": "https://images.unsplash.com/photo-1589927986089-35812378c1b0",
    "rating": { "rate": 4.3, "count": 500 }
  },
  {
    "category": "kids' toys",
    "title": "Barbie Doll",
    "description": "Classic Barbie doll with stylish outfits and accessories.",
    "price": 799,
    "image": "https://images.unsplash.com/photo-1593642632780-1b7c1c1c1c1c",
    "rating": { "rate": 4.7, "count": 1500 }
  },
  {
    "category": "kids' toys",
    "title": "LEGO Classic Bricks Set",
    "description": "Creative building set with various bricks for endless fun.",
    "price": 1499,
    "image": "https://images.unsplash.com/photo-1589927986089-35812378c1b0",
    "rating": { "rate": 4.8, "count": 2000 }
  },
  {
    "category": "health and fitness",
    "title": "Fitbit Inspire 2",
    "description": "Fitness tracker with heart rate monitoring and sleep tracking.",
    "price": 9999,
    "image": "https://images.unsplash.com/photo-1593642632780-1b7c1c1c1c1c",
    "rating": { "rate": 4.5, "count": 1100 }
  },
]
  

export default productsData