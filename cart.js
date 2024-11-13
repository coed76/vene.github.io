// cart.js
export class CartManager {
    static cart = [];

    static addToCart(itemName, price) {
        this.cart.push({ itemName, price });
        this.updateCart();
        this.saveCartToStorage();
    }

    static removeFromCart(index) {
        this.cart.splice(index, 1);
        this.updateCart();
        this.saveCartToStorage();
    }

    static updateCart() {
        const cartItems = document.getElementById("cart-items");
        const totalElement = document.getElementById("total");
        
        if (!cartItems || !totalElement) return;

        cartItems.innerHTML = "";
        const total = this.calculateTotal();

        this.cart.forEach((item, index) => {
            const itemElement = this.createCartItemElement(item, index);
            cartItems.appendChild(itemElement);
        });

        totalElement.textContent = `Total: $${total} USD`;
    }

    static createCartItemElement(item, index) {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.setAttribute('role', 'listitem');
        
        div.innerHTML = `
            <span>${item.itemName} - $${item.price} USD</span>
            <button 
                onclick="CartManager.removeFromCart(${index})"
                aria-label="Eliminar ${item.itemName} del carrito">
                Eliminar
            </button>
        `;
        
        return div;
    }

    static calculateTotal() {
        return this.cart.reduce((sum, item) => sum + item.price, 0);
    }

    static saveCartToStorage() {
        localStorage.setItem('iboplayer-cart', JSON.stringify(this.cart));
    }

    static loadCartFromStorage() {
        const savedCart = localStorage.getItem('iboplayer-cart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
            this.updateCart();
        }
    }
}
