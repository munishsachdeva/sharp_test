// USER FORM SCRIPT

// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const priceInput = document.querySelector('#price');
const nameInput = document.querySelector('#name');
const msg = document.querySelector('.msg');
const productList = document.querySelector('#products');
const apiBaseUrl = 'https://crudcrud.com/api/your-api-key';

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

// Function to delete a user
function deleteUser(key, li) {
    axios.delete(`${apiBaseUrl}/${key}`)
            .then(() => {
                // Remove the corresponding list item from the UI
                li.remove();
            })
            .catch(error => console.error(error));
}

function onSubmit(e) {
    e.preventDefault();

    if (priceInput.value === '' || nameInput.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        setTimeout(() => msg.remove(), 3000);
    } else {
        const product = {
            price: priceInput.value,
            name: nameInput.value
        };

        // Generate a unique key for the user
        const key = `product_${Date.now()}`;

        // Store the user object in the local storage using the generated key
        localStorage.setItem(key, JSON.stringify(product));

        // Create new list item with user
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${product.price}: ${product.name}`));

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteUser(key, li));

        // Append the delete button to the list item
        li.appendChild(deleteButton);

        // Append the list item to the user list in the HTML
        productList.appendChild(li);

        priceInput.value = '';
        nameInput.value = '';
    }
}

