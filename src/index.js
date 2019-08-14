'use strict';

// чекбокс
function toggleCheckBox() {
    const checkbox = document.querySelectorAll('.filter-check_checkbox');

    checkbox.forEach(element => {
        element.addEventListener('change', function() {
            if (this.checked)
            {
                this.nextElementSibling.classList.add('checked');
            }
            else
            {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    });
}

//end чекбокс



//корзина

function toggleCart() {
    const btnCart = document.getElementById('cart');
    const modalCart = document.querySelector('.cart');
    const btnClose = document.querySelector('.cart-close');
    
    btnCart.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    btnClose.addEventListener('click', () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    });
}

//end корзина



//работа с товароами в корзине

function addCart() {
    const cards = document.querySelectorAll('.goods .card');
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmty = document.getElementById('cart-empty');
    const countGoods = document.querySelector('.counter');
    
    cards.forEach(card => {
        const btn = card.querySelector('button');
        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            showData();
            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины';
            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                showData();
            });
        });
    });
    
    function showData() {
        const countCards = cartWrapper.querySelectorAll('.card');
        const cardsPrice = cartWrapper.querySelectorAll('.card-price');
        const cartTotal = document.querySelector('.cart-total span');
        let sum = 0;
    
        countGoods.textContent = countCards.length;
    
        cardsPrice.forEach((cardPrice) => {
            let price = parseFloat(cardPrice.textContent);
            sum += price;
            //console.log(sum);
        });
    
        cartTotal.textContent = sum;
    
        if (countCards.length !== 0 ) {
            cartEmty.remove();
        } else {
            cartWrapper.appendChild(cartEmty);
        }
    }
}

//end работа с товароами в корзине


//филтр

function filterPage() {

    const cards = document.querySelectorAll('.goods .card'),
        discountCheckBox = document.getElementById('discount-checkbox');
    const min = document.getElementById('min'),
        max = document.getElementById('max');
    const search = document.querySelector('.search-wrapper_input'),
        searchBtn = document.querySelector('.search-btn');

    discountCheckBox.addEventListener('click', filter);
    min.addEventListener('change', filter); 
    max.addEventListener('change', filter);
    searchBtn.addEventListener('click', filter);

    function filter() {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);       
            
            if (!searchText.test(title.textContent) || (min.value && price < min.value) || 
                (max.value && price > max.value) || (discountCheckBox.checked && !card.querySelector('.card-sale'))) 
            {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });

        //search.value = ''; 
    }
}

//end филтр


toggleCheckBox();
toggleCart();
addCart();
filterPage();
