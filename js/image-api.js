// Unsplash API Configuration
const UNSPLASH_ACCESS_KEY = 'EqFBrfZB4yv7e7K6pzDovdWnZGLpM716ZyKP-rhip2M';
const UNSPLASH_API_URL = 'https://api.unsplash.com';

// Image categories for different pages
const IMAGE_CATEGORIES = {
    hero: ['mountain biking', 'cycling', 'bike trails'],
    'our-shop': ['bicycle shop', 'cycling gear', 'bike accessories'],
    'bike-hire': ['bike rental', 'mountain bikes', 'road bikes'],
    'bike-servicing': ['bike maintenance', 'bike repair', 'cycling tools'],
    'special-offers': ['cycling deals', 'bike sales', 'cycling promotions'],
    'walking-routes': ['hiking trails', 'nature walks', 'scenic paths'],
    'contact-us': ['customer service', 'bike shop', 'cycling']
};

// Function to fetch images from Unsplash
async function fetchImages(query, count = 10) {
    try {
        const response = await fetch(
            `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=${count}`,
            {
                headers: {
                    'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
                }
            }
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
}

// Function to load images for a specific page
async function loadPageImages(pageType) {
    const categories = IMAGE_CATEGORIES[pageType] || IMAGE_CATEGORIES.hero;
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    const images = await fetchImages(randomCategory, 5);
    
    if (images.length > 0) {
        // Update hero background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.src = images[0].urls.regular;
            heroBackground.alt = images[0].alt_description || 'Hero image';
        }
        
        // Update info card images if they exist
        const infoCards = document.querySelectorAll('.info-card');
        infoCards.forEach((card, index) => {
            if (images[index + 1]) {
                const cardImage = card.querySelector('img');
                if (cardImage) {
                    cardImage.src = images[index + 1].urls.small;
                    cardImage.alt = images[index + 1].alt_description || 'Card image';
                }
            }
        });
    }
}

// Function to create image gallery
function createImageGallery(containerId, images) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.small;
        imgElement.alt = image.alt_description || 'Gallery image';
        imgElement.className = 'gallery-image';
        imgElement.style.cssText = `
            width: 200px;
            height: 150px;
            object-fit: cover;
            border-radius: 8px;
            margin: 5px;
            cursor: pointer;
            transition: transform 0.3s ease;
        `;
        
        imgElement.addEventListener('click', () => {
            // Open full size image
            window.open(image.urls.regular, '_blank');
        });
        
        imgElement.addEventListener('mouseenter', () => {
            imgElement.style.transform = 'scale(1.05)';
        });
        
        imgElement.addEventListener('mouseleave', () => {
            imgElement.style.transform = 'scale(1)';
        });
        
        container.appendChild(imgElement);
    });
}

// Function to load random cycling images
async function loadRandomCyclingImages() {
    const cyclingQueries = [
        'mountain biking',
        'road cycling',
        'bike trails',
        'cycling gear',
        'bike maintenance'
    ];
    
    const randomQuery = cyclingQueries[Math.floor(Math.random() * cyclingQueries.length)];
    const images = await fetchImages(randomQuery, 8);
    
    if (images.length > 0) {
        createImageGallery('cycling-gallery', images);
    }
}

// Function to load specific category images for shop cards
async function loadShopCardImages() {
    const imageQueries = {
        'mountain-bikes': 'mountain bike',
        'road-bikes': 'road bike',
        'safety-gear': 'cycling helmet safety gear',
        'cycling-apparel': 'cycling jersey clothing'
    };

    const infoCards = document.querySelectorAll('.info-card[data-category]');
    
    for (const card of infoCards) {
        const category = card.dataset.category;
        const cardImg = card.querySelector('.card-img');
        
        if (cardImg && category && imageQueries[category]) {
            try {
                const images = await fetchImages(imageQueries[category], 1);
                if (images.length > 0) {
                    cardImg.src = images[0].urls.small;
                    cardImg.alt = images[0].alt_description || `${category.replace('-', ' ')} image`;
                }
            } catch (error) {
                console.error(`Failed to fetch image for ${category}:`, error);
            }
        }
    }
}

// Initialize images when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Determine current page type
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    
    // Load appropriate images for the current page
    if (currentPage === 'index' || currentPage === '') {
        loadPageImages('hero');
    } else {
        loadPageImages(currentPage);
    }
    
    // Load random cycling images if gallery container exists
    if (document.getElementById('cycling-gallery')) {
        loadRandomCyclingImages();
    }

    // Load shop card images if on shop page
    if (document.querySelector('.info-card[data-category]')) {
        loadShopCardImages();
    }
});

// Export functions for use in other scripts
window.ImageAPI = {
    fetchImages,
    loadPageImages,
    createImageGallery,
    loadRandomCyclingImages,
    loadShopCardImages
}; 