document.addEventListener("DOMContentLoaded", function () {
    const cartButtons = document.querySelectorAll('.add-to-cart');

    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-name');
            const itemPrice = parseFloat(button.getAttribute('data-price'));

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingItem = cart.find(item => item.name === itemName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: itemName, price: itemPrice, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));

        });
    });
});
