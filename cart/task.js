document.addEventListener('DOMContentLoaded', () => {
    const productsQuantity = document.querySelectorAll('.product__quantity-controls')
    const cartProducts = document.querySelector('.cart__products');
    const cart = document.querySelector('.cart');
    let basket = JSON.parse(localStorage.getItem('basket')) || [];

    renderBasket()

    function saveBasket() {
        localStorage.setItem('basket', JSON.stringify(basket));
    }

    function findProductInBasket(productId) {
        return basket.find(item => item.id === productId);
    }

    function updateBasket(productId, title, quantity, image, price = 0) {
        const existingProduct = findProductInBasket(productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            console.log(image);
            basket.push({
                id: productId,
                title: title,
                quantity: quantity,
                image: image,
                price: price
            });
        }

        saveBasket();
        renderBasket()
        console.log('Корзина обновлена:', basket);
    }

    function renderBasket() {
        cartProducts.innerHTML = '';
        if (basket.length > 0) {
            cart.style.display = 'block';

            const totalSum = basket.reduce((sum, item) => {
                return sum + (item.price * item.quantity);
            }, 0);

            const totalPriceElement = document.getElementById('total-price');
            if (totalPriceElement) {
                totalPriceElement.textContent = totalSum.toFixed(2);
            }

            basket.forEach((item) => {
                let product = `
                    <div class="cart__product" data-id=${item.id}>
                        <img class="cart__product-image" src="${item.image}">
                        <div class="cart__product-count">${item.quantity}</div>
                    </div>
                `

                cartProducts.insertAdjacentHTML('beforeend', product);
            })
        } else {
            cart.style.display = 'none';

            const totalPriceElement = document.getElementById('total-price');
            if (totalPriceElement) {
                totalPriceElement.textContent = '0.00';
            }
        }
    }




    productsQuantity.forEach(el => {
        el.addEventListener('click', (e) => {
            let productQuantityValue = el.querySelector('.product__quantity-value')
            let counter = parseInt(productQuantityValue.textContent, 10)

            if (e.target.classList.contains('product__quantity-control_dec')) {
                if (counter > 1) {
                    counter--
                } else {
                    counter = 1
                }
                productQuantityValue.textContent = counter
            }

            if (e.target.classList.contains('product__quantity-control_inc')) {
                counter++

                productQuantityValue.textContent = counter
            }
        })
    })


    const products = document.querySelectorAll('.product')

    products.forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target.classList.contains('product__add')) {
                e.preventDefault()

                let counter = parseInt(el.querySelector('.product__quantity-value').textContent, 10)
                let title = el.querySelector('.product__title').textContent.trim();
                let productId = el.dataset.id || title;
                let price = parseFloat(el.querySelector('.product__price').textContent.trim()) || 1;
                let image = el.querySelector('.product__image').src;

                // console.log(image);
                updateBasket(productId, title, counter, image, price);
            }
        })
    })
})