// Simple basket functionality for Bike King Borders

class Basket {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.init();
    }

    init() {
        this.updateBasketCount();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Basket icon click
        const basketIcon = document.getElementById('basket-icon');
        if (basketIcon) {
            basketIcon.addEventListener('click', () => this.openBasket());
        }

        // Basket modal close
        const basketModal = document.getElementById('basket-modal');
        if (basketModal) {
            const closeButton = basketModal.querySelector('.close-button');
            if (closeButton) {
                closeButton.addEventListener('click', () => this.closeBasket());
            }

            // Close on outside click
            basketModal.addEventListener('click', (e) => {
                if (e.target === basketModal) {
                    this.closeBasket();
                }
            });
        }

        // Clear basket button
        const clearBasketBtn = document.getElementById('clear-basket');
        if (clearBasketBtn) {
            clearBasketBtn.addEventListener('click', () => this.clearBasket());
        }

        // Checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }

        this.saveToStorage();
        this.updateBasketCount();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateBasketCount();
        this.renderBasket();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateBasketCount();
                this.renderBasket();
            }
        }
    }

    clearBasket() {
        this.items = [];
        this.saveToStorage();
        this.updateBasketCount();
        this.renderBasket();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    updateBasketCount() {
        const basketCount = document.getElementById('basket-count');
        if (basketCount) {
            const count = this.getItemCount();
            basketCount.textContent = count;
            basketCount.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    openBasket() {
        const basketModal = document.getElementById('basket-modal');
        if (basketModal) {
            this.renderBasket();
            basketModal.style.display = 'block';
        }
    }

    closeBasket() {
        const basketModal = document.getElementById('basket-modal');
        if (basketModal) {
            basketModal.style.display = 'none';
        }
    }

    renderBasket() {
        const basketItems = document.getElementById('basket-items');
        const basketTotal = document.getElementById('basket-total');
        
        if (!basketItems || !basketTotal) return;

        if (this.items.length === 0) {
            basketItems.innerHTML = `
                <div class="basket-empty">
                    <i class="fas fa-shopping-basket"></i>
                    <p>Your basket is empty</p>
                </div>
            `;
            basketTotal.textContent = '0.00';
            return;
        }

        basketItems.innerHTML = this.items.map(item => `
            <div class="basket-item" data-id="${item.id}">
                <img src="${item.imageUrl || `https://via.placeholder.com/60x60.png?text=${item.name.replace(/ /g, '+')}`}" alt="${item.name}">
                <div class="basket-item-details">
                    <div class="basket-item-name">${item.name}</div>
                    <div class="basket-item-price">£${item.price}</div>
                </div>
                <div class="basket-item-quantity">
                    <button class="quantity-btn" onclick="basket.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="basket.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="basket-item-remove" onclick="basket.removeItem(${item.id})">Remove</button>
            </div>
        `).join('');

        basketTotal.textContent = this.getTotal().toFixed(2);
    }

    checkout() {
        if (this.items.length === 0) {
            alert('Your basket is empty!');
            return;
        }
        
        const total = this.getTotal();
        alert(`Thank you for your order!\nTotal: £${total.toFixed(2)}`);
        this.clearBasket();
        this.closeBasket();
    }

    saveToStorage() {
        localStorage.setItem('bikeKingBasket', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('bikeKingBasket');
        if (saved) {
            try {
                this.items = JSON.parse(saved);
            } catch (e) {
                console.error('Error loading basket from storage:', e);
                this.items = [];
            }
        }
    }
}

// Initialize basket when DOM is loaded
let basket;
document.addEventListener('DOMContentLoaded', () => {
    basket = new Basket();
});

// Export basket for use in other scripts
window.Basket = Basket; 