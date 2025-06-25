// Simple data model for Bike King Borders

// Bike products data
const bikes = [
    {
        id: 1,
        name: "Mountain Bike Pro",
        type: "Mountain",
        price: 25,
        available: true,
        image: "mountain-bike.jpg",
        description: "Full suspension mountain bike for advanced trail riding",
        category: "mountain-bikes",
        size: "Large",
        duration: "per day"
    },
    {
        id: 2,
        name: "Road Bike Elite",
        type: "Road",
        price: 30,
        available: true,
        image: "road-bike.jpg",
        description: "Lightweight carbon road bike for speed and efficiency",
        category: "road-bikes",
        size: "Medium",
        duration: "per day"
    },
    {
        id: 3,
        name: "Kids Bike",
        type: "Junior",
        price: 15,
        available: true,
        image: "kids-bike.jpg",
        description: "Safe and fun bike for children aged 6-12",
        category: "kids-bikes",
        size: "Small",
        duration: "per day"
    },
    {
        id: 4,
        name: "Mountain Bike Trail",
        type: "Mountain",
        price: 20,
        available: true,
        image: "mountain-trail.jpg",
        description: "Hardtail mountain bike perfect for beginners",
        category: "mountain-bikes",
        size: "Medium",
        duration: "per day"
    },
    {
        id: 5,
        name: "Mountain Bike Expert",
        type: "Mountain",
        price: 35,
        available: true,
        image: "mountain-expert.jpg",
        description: "Professional grade mountain bike for extreme trails",
        category: "mountain-bikes",
        size: "Large",
        duration: "per day"
    },
    {
        id: 6,
        name: "Road Bike Touring",
        type: "Road",
        price: 28,
        available: true,
        image: "road-touring.jpg",
        description: "Comfortable road bike for long-distance touring",
        category: "road-bikes",
        size: "Large",
        duration: "per day"
    },
    {
        id: 7,
        name: "Road Bike Racing",
        type: "Road",
        price: 40,
        available: true,
        image: "road-racing.jpg",
        description: "High-performance racing bike for competitive cyclists",
        category: "road-bikes",
        size: "Medium",
        duration: "per day"
    },
    {
        id: 8,
        name: "Electric Mountain Bike",
        type: "Mountain",
        price: 50,
        available: true,
        image: "e-mountain.jpg",
        description: "E-bike with full suspension for assisted mountain riding",
        category: "electric-bikes",
        size: "Large",
        duration: "per day"
    },
    {
        id: 9,
        name: "Kids Mountain Bike",
        type: "Junior",
        price: 12,
        available: true,
        image: "kids-mountain.jpg",
        description: "Small mountain bike for adventurous kids",
        category: "kids-bikes",
        size: "Small",
        duration: "per day"
    },
    {
        id: 10,
        name: "Kids Road Bike",
        type: "Junior",
        price: 10,
        available: true,
        image: "kids-road.jpg",
        description: "Lightweight road bike for young cyclists",
        category: "kids-bikes",
        size: "Small",
        duration: "per day"
    },
    {
        id: 11,
        name: "Electric Road Bike",
        type: "Road",
        price: 45,
        available: true,
        image: "e-road.jpg",
        description: "Electric road bike for assisted long-distance riding",
        category: "electric-bikes",
        size: "Large",
        duration: "per day"
    },
    {
        id: 12,
        name: "Electric City Bike",
        type: "City",
        price: 35,
        available: true,
        image: "e-city.jpg",
        description: "Comfortable electric bike for city commuting",
        category: "electric-bikes",
        size: "Medium",
        duration: "per day"
    }
];

// Safety Gear data
const safetyGear = [
    {
        id: 1,
        name: "Safety Helmet",
        price: 45,
        description: "Essential head protection for every rider.",
        image: "safety-helmet.jpg"
    },
    {
        id: 2,
        name: "Cycling Gloves",
        price: 20,
        description: "Enhanced grip and comfort for your hands.",
        image: "cycling-gloves.jpg"
    },
    {
        id: 3,
        name: "Knee Pads",
        price: 35,
        description: "Protective knee pads for mountain biking.",
        image: "knee-pads.jpg"
    },
    {
        id: 4,
        name: "Elbow Pads",
        price: 30,
        description: "Elbow protection for aggressive riding.",
        image: "elbow-pads.jpg"
    },
    {
        id: 5,
        name: "Reflective Vest",
        price: 25,
        description: "High-visibility vest for road safety.",
        image: "reflective-vest.jpg"
    },
    {
        id: 6,
        name: "Bike Lights Set",
        price: 40,
        description: "Front and rear LED lights for visibility.",
        image: "bike-lights.jpg"
    },
    {
        id: 7,
        name: "First Aid Kit",
        price: 15,
        description: "Compact first aid kit for emergencies.",
        image: "first-aid.jpg"
    },
    {
        id: 8,
        name: "Bike Lock",
        price: 35,
        description: "Heavy-duty lock for bike security.",
        image: "bike-lock.jpg"
    }
];

// Cycling Apparel data
const cyclingApparel = [
    {
        id: 1,
        name: "Pro Cycling Jersey",
        price: 55,
        description: "Aerodynamic, breathable, and stylish.",
        image: "cycling-jersey.jpg"
    },
    {
        id: 2,
        name: "Padded Shorts",
        price: 65,
        description: "Maximum comfort for long-distance rides.",
        image: "padded-shorts.jpg"
    }
];

// Services data
const services = [
    {
        id: 1,
        name: "Basic Service",
        price: 25,
        description: "Oil chain, check brakes, inflate tires",
        category: "basic"
    },
    {
        id: 2,
        name: "Full Service",
        price: 50,
        description: "Complete bike check and tune-up",
        category: "full-service"
    },
    {
        id: 3,
        name: "Health Check",
        price: 0,
        description: "Free safety inspection",
        category: "health-check"
    },
    {
        id: 4,
        name: "Brake Service",
        price: 30,
        description: "Brake adjustment and pad replacement",
        category: "repairs"
    },
    {
        id: 5,
        name: "Gear Service",
        price: 35,
        description: "Gear adjustment and cable replacement",
        category: "repairs"
    },
    {
        id: 6,
        name: "Wheel Truing",
        price: 20,
        description: "Straighten and balance wheels",
        category: "repairs"
    },
    {
        id: 7,
        name: "Chain Replacement",
        price: 15,
        description: "New chain fitted and adjusted",
        category: "parts-replacement"
    },
    {
        id: 8,
        name: "Tire Replacement",
        price: 25,
        description: "New tires fitted and balanced",
        category: "parts-replacement"
    },
    {
        id: 9,
        name: "Cable Replacement",
        price: 20,
        description: "Brake and gear cables replaced",
        category: "parts-replacement"
    },
    {
        id: 10,
        name: "Bearing Service",
        price: 40,
        description: "Clean and repack all bearings",
        category: "full-service"
    },
    {
        id: 11,
        name: "Suspension Service",
        price: 60,
        description: "Full suspension overhaul",
        category: "full-service"
    },
    {
        id: 12,
        name: "Electrical Check",
        price: 15,
        description: "Check lights and electrical systems",
        category: "health-check"
    }
];

// Trails data
const trails = [
    {
        id: 1,
        name: "Green Trail",
        difficulty: "Easy",
        length: "5km",
        description: "Perfect for beginners"
    },
    {
        id: 2,
        name: "Blue Trail",
        difficulty: "Medium",
        length: "8km",
        description: "Great for intermediate riders"
    },
    {
        id: 3,
        name: "Red Trail",
        difficulty: "Hard",
        length: "12km",
        description: "Challenging for experienced riders"
    }
];

// Simple functions to get data
function getBikes() {
    return bikes;
}

function getSafetyGear() {
    return safetyGear;
}

function getCyclingApparel() {
    return cyclingApparel;
}

function getServices() {
    return services;
}

function getTrails() {
    return trails;
}

function findBike(id) {
    return bikes.find(bike => bike.id === id);
}

function findSafetyGear(id) {
    return safetyGear.find(gear => gear.id === id);
}

function findCyclingApparel(id) {
    return cyclingApparel.find(apparel => apparel.id === id);
}

function findService(id) {
    return services.find(service => service.id === id);
}

function findTrail(id) {
    return trails.find(trail => trail.id === id);
} 