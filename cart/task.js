document.addEventListener('DOMContentLoaded', () => {
    const productsQuantity = document.querySelectorAll('.product__quantity-controls')
    const basket = {}

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

                if (basket.hasOwnProperty(title)) {
                    basket[title] += counter;
                } else {
                    basket[title] = counter;
                }

                console.log(counter);
                console.log(basket)
            }
        })
    })
})