document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // Header Scroll Effect
    const mainHeader = document.getElementById('main-header');
    
    if(mainHeader) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        });
    }

    // Fade-in animation for sections
    const animatedSections = document.querySelectorAll('.content-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    animatedSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Load API images for shop page cards
    const loadShopCardImages = async () => {
        const infoCards = document.querySelectorAll('.info-card');
        if (infoCards.length === 0) return;

        const imageQueries = {
            'mountain-bikes': 'mountain bike',
            'road-bikes': 'road bike',
            'safety-gear': 'cycling helmet safety gear',
            'cycling-apparel': 'cycling jersey clothing',
            'full-service': 'bike maintenance tools',
            'health-check': 'bike inspection',
            'repairs': 'bike repair',
            'parts-replacement': 'bike parts',
            'kids-bikes': 'kids bicycle',
            'electric-bikes': 'electric bike'
        };

        for (const card of infoCards) {
            const category = card.dataset.category;
            const cardImg = card.querySelector('.card-img');
            
            if (cardImg && category && imageQueries[category]) {
                try {
                    if (window.ImageAPI && typeof window.ImageAPI.fetchImages === 'function') {
                        const images = await window.ImageAPI.fetchImages(imageQueries[category], 1);
                        if (images.length > 0) {
                            cardImg.src = images[0].urls.small;
                            cardImg.alt = images[0].alt_description || `${category.replace('-', ' ')} image`;
                        }
                    }
                } catch (error) {
                    console.error(`Failed to fetch image for ${category}:`, error);
                }
            }
        }
    };

    // Modal functionality
    const productModal = document.getElementById('product-modal');
    if (productModal) {
        const infoCards = document.querySelectorAll('.info-card');
        const modalTitle = document.getElementById('modal-title');
        const modalProducts = document.getElementById('modal-products');
        const closeButton = document.querySelector('.close-button');

        infoCards.forEach(card => {
            card.addEventListener('click', async () => {
                const category = card.dataset.category;
                let items = [];
                let title = '';

                switch (category) {
                    case 'mountain-bikes':
                        title = 'Mountain Bikes';
                        items = getBikes().filter(bike => bike.category === 'mountain-bikes');
                        break;
                    case 'road-bikes':
                        title = 'Road Bikes';
                        items = getBikes().filter(bike => bike.category === 'road-bikes');
                        break;
                    case 'kids-bikes':
                        title = 'Kids Bikes';
                        items = getBikes().filter(bike => bike.category === 'kids-bikes');
                        break;
                    case 'electric-bikes':
                        title = 'Electric Bikes';
                        items = getBikes().filter(bike => bike.category === 'electric-bikes');
                        break;
                    case 'safety-gear':
                        title = 'Safety Gear';
                        items = getSafetyGear();
                        break;
                    case 'cycling-apparel':
                        title = 'Cycling Apparel';
                        items = getCyclingApparel();
                        break;
                    case 'full-service':
                        title = 'Full Service';
                        items = getServices().filter(service => service.category === 'full-service');
                        break;
                    case 'health-check':
                        title = 'Health Check';
                        items = getServices().filter(service => service.category === 'health-check');
                        break;
                    case 'repairs':
                        title = 'Repairs';
                        items = getServices().filter(service => service.category === 'repairs');
                        break;
                    case 'parts-replacement':
                        title = 'Parts Replacement';
                        items = getServices().filter(service => service.category === 'parts-replacement');
                        break;
                }

                modalTitle.textContent = title;
                modalProducts.innerHTML = '';

                if (items.length > 0) {
                    for (const item of items) {
                        let imageUrl = `https://via.placeholder.com/250x150.png?text=${item.name.replace(/ /g, '+')}`;
                        
                        // Try to get API image for the product
                        if (window.ImageAPI && typeof window.ImageAPI.fetchImages === 'function') {
                            try {
                                const images = await window.ImageAPI.fetchImages(item.name, 1);
                                if (images.length > 0) {
                                    imageUrl = images[0].urls.small;
                                }
                            } catch (error) {
                                console.error(`Failed to fetch image for ${item.name}:`, error);
                            }
                        }

                        const productCard = `
                            <div class="product-card" data-product-id="${item.id}">
                                <img src="${imageUrl}" alt="${item.name}">
                                <h4>${item.name}</h4>
                                <p>${item.description || 'High-quality service for cyclists.'}</p>
                                ${item.size ? `<p><strong>Size:</strong> ${item.size}</p>` : ''}
                                <p class="price">£${item.price} ${item.duration || ''}</p>
                                <button class="btn btn-primary add-to-basket-btn" data-product='${JSON.stringify({
                                    id: item.id,
                                    name: item.name,
                                    price: item.price,
                                    description: item.description,
                                    imageUrl: imageUrl,
                                    size: item.size,
                                    duration: item.duration
                                })}'>Add to Basket</button>
                            </div>
                        `;
                        modalProducts.insertAdjacentHTML('beforeend', productCard);
                    }

                    // Add event listeners to "Add to Basket" buttons
                    const addToBasketBtns = modalProducts.querySelectorAll('.add-to-basket-btn');
                    addToBasketBtns.forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            const productData = JSON.parse(btn.dataset.product);
                            if (window.basket) {
                                window.basket.addItem(productData);
                            }
                        });
                    });
                } else {
                    modalProducts.innerHTML = '<p>No services found in this category.</p>';
                }

                productModal.style.display = 'block';
            });
        });

        const closeModal = () => {
            productModal.style.display = 'none';
        }

        closeButton.addEventListener('click', closeModal);
        window.addEventListener('click', (event) => {
            if (event.target == productModal) {
                closeModal();
            }
        });
    }

    // Homepage featured products
    const loadFeaturedProducts = async () => {
        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) return;

        const featuredBikes = getBikes().slice(0, 2);
        const featuredGear = getSafetyGear().slice(0, 1);
        const featuredApparel = getCyclingApparel().slice(0, 1);

        const featuredItems = [...featuredBikes, ...featuredGear, ...featuredApparel];

        if (featuredItems.length > 0) {
            for (const item of featuredItems) {
                let imageUrl = `https://via.placeholder.com/250x150.png?text=${item.name.replace(/ /g, '+')}`;
                
                if (window.ImageAPI && typeof window.ImageAPI.fetchImages === 'function') {
                    try {
                        const images = await window.ImageAPI.fetchImages(item.name, 1);
                        if (images.length > 0) {
                            imageUrl = images[0].urls.small;
                        }
                    } catch (error) {
                        console.error(`Failed to fetch image for ${item.name}:`, error);
                    }
                }

                const productCard = `
                    <div class="product-card">
                        <img src="${imageUrl}" alt="${item.name}">
                        <h4>${item.name}</h4>
                        <p class="price">£${item.price}</p>
                        <button class="btn btn-primary">View Details</button>
                    </div>
                `;
                productGrid.insertAdjacentHTML('beforeend', productCard);
            }
        }
    };

    // Load content based on the page
    if (document.querySelector('.featured-products')) {
        loadFeaturedProducts();
    }

    // Load shop card images if on shop page
    if (document.querySelector('.info-card[data-category]')) {
        loadShopCardImages();
    }

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput && searchResults) {
        // Combined search data from all pages
        const searchData = [
            // Shop products
            { name: 'Mountain Bike Pro', description: 'Professional mountain bike for trail riding', price: '£899.99', category: 'shop', page: 'our-shop.html' },
            { name: 'Road Bike Elite', description: 'Lightweight road bike for racing', price: '£1,299.99', category: 'shop', page: 'our-shop.html' },
            { name: 'Hybrid Bike Comfort', description: 'Comfortable hybrid bike for city riding', price: '£549.99', category: 'shop', page: 'our-shop.html' },
            { name: 'Kids Bike 20"', description: 'Safe and fun bike for children', price: '£199.99', category: 'shop', page: 'our-shop.html' },
            { name: 'Electric Bike City', description: 'E-bike for assisted city commuting', price: '£1,899.99', category: 'shop', page: 'our-shop.html' },
            { name: 'BMX Bike Pro', description: 'Professional BMX bike for tricks', price: '£399.99', category: 'shop', page: 'our-shop.html' },
            
            // Bike hire options
            { name: 'Mountain Bike Hire', description: 'Full suspension mountain bike rental', price: '£35/day', category: 'hire', page: 'bike-hire.html' },
            { name: 'Road Bike Hire', description: 'Lightweight road bike rental', price: '£30/day', category: 'hire', page: 'bike-hire.html' },
            { name: 'Kids Bike Hire', description: 'Safe kids bike rental', price: '£15/day', category: 'hire', page: 'bike-hire.html' },
            { name: 'Electric Bike Hire', description: 'E-bike rental for assisted riding', price: '£45/day', category: 'hire', page: 'bike-hire.html' },
            
            // Bike servicing
            { name: 'Basic Service', description: 'Essential bike maintenance service', price: '£45', category: 'service', page: 'bike-servicing.html' },
            { name: 'Full Service', description: 'Comprehensive bike service and tune-up', price: '£85', category: 'service', page: 'bike-servicing.html' },
            { name: 'Brake Service', description: 'Brake system inspection and adjustment', price: '£25', category: 'service', page: 'bike-servicing.html' },
            { name: 'Wheel Truing', description: 'Professional wheel alignment service', price: '£35', category: 'service', page: 'bike-servicing.html' },
            { name: 'Gear Service', description: 'Gear system maintenance and adjustment', price: '£30', category: 'service', page: 'bike-servicing.html' }
        ];

        let searchTimeout;

        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim().toLowerCase();
            
            if (query.length < 2) {
                searchResults.classList.remove('active');
                return;
            }

            searchTimeout = setTimeout(() => {
                const results = searchData.filter(item => 
                    item.name.toLowerCase().includes(query) ||
                    item.description.toLowerCase().includes(query) ||
                    item.category.toLowerCase().includes(query)
                );

                displaySearchResults(results);
            }, 300);
        });

        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });

        // Handle search result clicks
        searchResults.addEventListener('click', function(e) {
            const resultItem = e.target.closest('.search-result-item');
            if (resultItem) {
                const page = resultItem.dataset.page;
                if (page) {
                    window.location.href = page;
                }
            }
        });
    }
});

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item"><p>No results found</p></div>';
    } else {
        searchResults.innerHTML = results.slice(0, 8).map(item => `
            <div class="search-result-item" data-page="${item.page}">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <span class="price">${item.price}</span>
            </div>
        `).join('');
    }
    
    searchResults.classList.add('active');
} 