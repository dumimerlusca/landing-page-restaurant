import { menuItems } from "./data.js";

const body = document.querySelector('body');


// Menu toggler
(function menuToggler() {
    const toggler = document.getElementById('menu_toggler');
    const menu = document.querySelector('.main_nav');
    toggler.addEventListener('click', () => {
        menu.classList.toggle('show');
    })

    // Close menu when click on link
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('show')) {
                menu.classList.remove('show')
            }
        })
    })
}());


// Food menu
(function foodMenu() {
    document.addEventListener('DOMContentLoaded', () => {
        const foodMenuEL = document.createElement('div');
        foodMenuEL.className = 'food_menu';

        menuItems.forEach(item => {
            const { name, ingredients, price, img, category } = item;
            const foodItem = document.createElement('div');
            foodItem.className = 'food_item flex justify-between items-center';
            foodItem.setAttribute('data-food-category', category)
            foodItem.innerHTML = `
                <div class="flex items-center gap-2">
                    <div class="img-container">
                        <img src="${img}" alt="">
                    </div>
                    <div>
                        <h3>${name}</h3>
                        <p>${ingredients}</p>
                    </div>
                </div>
                <strong>$${price}</strong>
            `;

            foodMenuEL.appendChild(foodItem)
        })
        document.querySelector('#food_menu_container').appendChild(foodMenuEL)
    })

    const foodMenuButtons = document.querySelectorAll('[data-food-menu-btn]');

    foodMenuButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            updateButtonClass(index, foodMenuButtons)
            const category = button.getAttribute('data-food-menu-btn');
            const foodItems = document.querySelectorAll('[data-food-category]');
            foodItems.forEach(item => {
                const itemCategory = item.getAttribute('data-food-category');
                if (category === 'all') {
                    item.style.display = "flex";
                    return;
                }
                if (itemCategory !== category) {
                    item.style.display = "none";
                } else {
                    item.style.display = "flex";
                }
            })
        })
    })
}());


// Testimonials slider
(function testimonialsSlider() {
    const slidesContainer = document.querySelector('.t_inner');
    const slides = document.querySelectorAll('.t_slide');
    const t_buttons = document.querySelectorAll('.t_button');
    let count = 1;

    let t_interval = setInterval(moveContainer, 3000)

    slidesContainer.addEventListener('transitionend', () => {
        if (count === slides.length) {
            slidesContainer.style.transition = 'none';
            slidesContainer.style.transform = `translateX(0)`;
            setTimeout(() => {
                slidesContainer.style.transition = 'all .3s ease';
            }, 50)
            count = 1;
        }
    })

    // Buttons
    t_buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            count = index;
            moveContainer();
            clearInterval(t_interval);
            t_interval = setInterval(moveContainer, 3000);
        })
    })

    function moveContainer() {
        if (count >= t_buttons.length) {
            updateButtonClass(0, t_buttons);
        } else {
            updateButtonClass(count, t_buttons);
        }
        slidesContainer.style.transform = `translateX(-${count * 100}%)`
        count++;
    }
}());

// Modal gallery
(function modalGallery() {
    const modalGallery = document.getElementById('modal_gallery');
    const galleryItems = document.querySelectorAll('.gallery_item');
    const modalImg = document.querySelector('#modal_img');
    const nextBtn = document.querySelector('#next_btn');
    const prevBtn = document.querySelector('#prev_btn');
    const imagesSrcArr = Array.from(document.querySelectorAll('.gallery_item img')).map((img) => {
        return img.getAttribute('src')
    })
    let current = 0;

    console.log(imagesSrcArr);
    // Close modal
    const closeModalBtn = document.querySelector('#close_gallery')
    closeModalBtn.addEventListener('click', () => {
        modalGallery.classList.remove('show');
    })

    // Show modal
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            modalGallery.classList.add('show');
            current = index;
            modalImg.setAttribute('src', imagesSrcArr[current])
        })
    })

    // Next img
    nextBtn.addEventListener('click', () => {
        current++;
        if (current > imagesSrcArr.length - 1) {
            current = 0;
        }
        modalImg.setAttribute('src', imagesSrcArr[current])
    })

    prevBtn.addEventListener('click', () => {
        current--;
        if (current < 0) {
            current = imagesSrcArr.length - 1;
        }
        modalImg.setAttribute('src', imagesSrcArr[current])
    })

}());


// Global functions
function updateButtonClass(activeIndex, array) {
    array.forEach((button, index) => {
        if (index !== activeIndex) {
            button.classList.remove('active');
        } else {
            button.classList.add('active');
        }
    })
}


