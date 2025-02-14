const ipConfig = "localhost";
const startUrl = `http://${ipConfig}:8080/`;


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
});

document.querySelectorAll('.product').forEach((product) => {
    observer.observe(product);
});

async function fetchProducts(query) {
    try {
        const response = await fetch(`${startUrl}command?Command=findProducts&ID=nil&Text=${query}`); 
        if (response.ok) {
            const products = await response.json();
            return products;
        } else {
            console.error("Failed to fetch products: ", response.statusText); 
            return []; 
        }
    } catch (error) {
        console.error("Error fetching products: ", error);
        return [];
    }
}

async function fetchImage(FotoID) {
    try {
        const response = await fetch(`${startUrl}command?Command=getImage&ID=${FotoID}&Text=nil`); 
        if (response.ok) {
            const blob = await response.blob(); 
            const imageUrl = URL.createObjectURL(blob); 
            console.log("Image URL: ", imageUrl);
            return imageUrl; 
        } else {
            console.error("Failed to fetch image: ", response.statusText); 
            return null; 
        }
    } catch (error) {
        console.error("Error fetching image: ", error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById("loading-screen");

    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add("hidden");
        }, 1000);
    } else {
        console.error('Loading screen element not found.');
    }

    const productInput = document.getElementById('productInput');
    const productList = document.getElementById('productList');

    
    productInput.addEventListener('input', async () => {
        const query = productInput.value.toLowerCase().trim();
        productList.innerHTML = ''; 

        if (query === '') {
            productList.classList.remove('visible'); 
            return;
        }

        
        const products = await fetchProducts(query);

        if (products.length === 0) {
            console.error("No products found.");

            
            if (!document.querySelector('.no-results')) {
                const noResult = document.createElement('li');
                noResult.textContent = 'Geen resultaten gevonden';
                noResult.classList.add('no-results'); 
                productList.appendChild(noResult);
            }
        } else {
            
            products.forEach(product => {
                const li = document.createElement('li');
                li.classList.add('product-item');

                
                const img = document.createElement('img');
                img.src = `${startUrl}command?Command=getImage&ID=${product.FotoID}&Text=nil`; 
                img.alt = product.Naam;
                img.classList.add('product-image');

                const span = document.createElement('span');
                span.textContent = product.Naam;

                li.appendChild(img);
                li.appendChild(span);
                li.addEventListener('click', () => {
                    alert(`Je hebt '${product.Naam}' geselecteerd.`);
                });
                productList.appendChild(li);
            });
        }

        productList.classList.add('visible'); 
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const body = document.body;

    if (/mobile|android|iphone|ipad|tablet/.test(userAgent)) {
        body.classList.add("mobile-user"); 
    } else {
        body.classList.add("desktop-user"); 
    }
});
