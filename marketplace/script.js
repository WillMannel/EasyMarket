// Moved the form handling from seller.html to script.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newProductForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const description = document.getElementById('description').value;
            const price = document.getElementById('price').value;
            fetch('/product', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ description, price, seller_id: 1 }) // Example seller_id
            }).then(response => {
                if (response.ok) {
                    alert('Product listed successfully!');
                    document.getElementById('description').value = '';
                    document.getElementById('price').value = '';
                } else {
                    alert('Failed to list product.');
                }
            }).catch(error => console.error('Error:', error));
        });
    }

    loadProducts();  // Ensure products are loaded for buyers.
});
