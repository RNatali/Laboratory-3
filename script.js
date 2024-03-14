let products = [
    {id: 1, name: 'Girlwood Lip Care Set', image: 'фото1.png', description: 'Комплекс з догляду за губами', price: '20$'},
    {id: 2, name: 'Hadat Cosmetics Hydro Nutrient Nourishing Conditioner', image: 'фото2.png', description: 'Зволожуючий Кондиціонер', price: '10$'},
    {id: 3, name: 'Єва колаген Єгипетський', image: 'фото3.png', description: 'Антивіковий крем поживний для зрілої шкіри', price: '14$'},
    {id: 4, name: 'Missha Signature M Real Complete BB Cream', image: 'фото4.png', description: 'SPF30/PA++ (45ml)', price: '22$'},
    {id: 5, name: 'ПІНКА ДЛЯ ВМИВАННЯ', image: 'фото5.png', description: 'Ed Cosmetics Men Cleansing Foam', price: '21$'},
    {id: 6, name: 'Гідрофільна олійка', image: 'фото6.png', description: 'Anti acne для жирної і проблемної шкіри обличчя', price: '18$'},
    {id: 7, name: 'Набір карбоксітерапії з фруктовими кислотами', image: 'фото7.png', description: 'Для всіх типів шкіри', price: '14$'},
    {id: 8, name: 'Крем для обличчя Anti acne', image: 'фото8.png', description: 'Лікувальний, проти акне та запальних процесів', price: '19$'},
];

let cart = [];

function loadProducts() {
    let container = document.getElementById('container');
    products.forEach(elem => {
        let productItem = document.createElement('div');
        productItem.classList.add('product-item');

        let img = document.createElement('img');
        img.src = elem.image;
        img.alt = elem.name;
        img.style.width = "200px";
        productItem.appendChild(img);

        let h3 = document.createElement('h3');
        h3.textContent = elem.name;
        productItem.appendChild(h3);

        let pDescription = document.createElement('p');
        pDescription.textContent = elem.description;
        productItem.appendChild(pDescription);

        let pPrice = document.createElement('p');
        pPrice.textContent = elem.price;
        productItem.appendChild(pPrice);

        let button = document.createElement('button');
        button.textContent = 'Купити';
        button.addEventListener('click', function() {
            addProductToCart(elem.id);
        });
        productItem.appendChild(button);

        container.appendChild(productItem);
    });
}

function addProductToCart(id) {
    cart.push(products.find(elem => elem.id === id));
}

function openCart() {
    displayCartItems();
    addSortButtonsToCartModal(); //кнопки сортування 

   
    let modal = document.getElementById('myModal');
    modal.style.display = 'block';
}

let closeModal = document.getElementsByClassName("close")[0];

closeModal.onclick = function() {
    let modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

window.onclick = function(event) {
    let modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

//кількість товару
function modifyQuantity(id, action) {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        if (action === 'increase') {
            cart[index].quantity = cart[index].quantity ? cart[index].quantity + 1 : 1;
        } else if (action === 'decrease') {
            cart[index].quantity = cart[index].quantity && cart[index].quantity > 1 ? cart[index].quantity - 1 : 1;
        }
        displayCartItems();
    }
}

function removeItem(id) { //видалення
    cart = cart.filter(item => item.id !== id);
    displayCartItems();
}

function calculateTotal() {
    let total = 0;
    cart.forEach(item => {
        total += parseFloat(item.price) * (item.quantity || 1);
    });
    return total.toFixed(2); // округлення до двох знаків після коми
}

function displayCartItems() {
    let cartItems = document.getElementById('cart-items');
    let containerHtml = '';
    let totalItems = cart.length; // кількість товарів
    containerHtml += `<p>Кількість товарів: ${totalItems}</p>`;
    cart.forEach(elem => {
        containerHtml += `
            <div>
                <h3>${elem.name}</h3>
                <p>Ціна за одиницю: ${elem.price}</p>
                <p>Кількість: 
                    <button onclick="modifyQuantity(${elem.id}, 'decrease')">-</button>
                    ${elem.quantity || 1}
                    <button onclick="modifyQuantity(${elem.id}, 'increase')">+</button>
                </p>
                <button onclick="removeItem(${elem.id})">Видалити</button>
            </div>`;
    });
    containerHtml += `<p>Остаточна вартість: ${calculateTotal()}$</p>`;
    cartItems.innerHTML = containerHtml;
}

loadProducts();


let modalContent = document.querySelector('.modal-content');
modalContent.insertAdjacentHTML('afterbegin', '<h2>Ваш кошик</h2>');


let scrollBtn = document.getElementById('scrollBtn');

// клік на кнопку
scrollBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// коли показувати і приховувати кнопку 
window.addEventListener('scroll', function() {
    if (document.documentElement.scrollTop > window.innerHeight * 2 / 3) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});


function addSortButtonsToCartModal() {
    let sortOptionsCart = document.getElementById('sort-options-cart');
    sortOptionsCart.innerHTML = `
        <button onclick="window.myApp.sortBy('name')">Сортувати за назвою</button>
        <button onclick="window.myApp.sortBy('price')">Сортувати за ціною</button>
    `;
}

// сортування
window.myApp = {
    sortBy: function(criteria) {
        if (criteria === 'name') {
            cart.sort((a, b) => a.name.localeCompare(b.name));
        } else if (criteria === 'price') {
            cart.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        }
        displayCartItems();
    },
    displayCartItems: function() {
        displayCartItems();
    }
};

const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Girlwood Lip Care Set', 'Hadat Cosmetics Hydro Nutrient Nourishing Conditioner', 'Єва колаген Єгипетський', 'Missha Signature M Real Complete BB Cream', 'ПІНКА ДЛЯ ВМИВАННЯ', 'Гідрофільна олійка', 'Набір карбоксітерапії з фруктовими кислотами', 'Крем для обличчя Anti acne'], 
    datasets: [{
      label: 'Ціна', 
      data: [20, 10, 14, 22, 21, 18, 14, 19],
      backgroundColor: 'rgba(255, 99, 132, 0.2)', 
      borderColor: 'rgba(255, 99, 132, 1)', 
      borderWidth: 1
      
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
