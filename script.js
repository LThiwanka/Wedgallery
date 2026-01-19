const imageInput = document.getElementById("imageInput");
const gallery = document.getElementById("gallery");

// Load saved images from localStorage
let images = JSON.parse(localStorage.getItem("galleryImages")) || [];

// Display saved images on page load
window.onload = () => {
    images.forEach(src => addImage(src));
};

// Upload new images
imageInput.addEventListener("change", () => {
    const files = imageInput.files;

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();

        reader.onload = (e) => {
            images.push(e.target.result);
            localStorage.setItem("galleryImages", JSON.stringify(images));
            addImage(e.target.result);
        };

        reader.readAsDataURL(files[i]);
    }
});

// Add image to gallery
function addImage(src) {
    const card = document.createElement("div");
    card.className = "image-card";

    const img = document.createElement("img");
    img.src = src;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "×";

    deleteBtn.onclick = () => {
        gallery.removeChild(card);
        images = images.filter(image => image !== src);
        localStorage.setItem("galleryImages", JSON.stringify(images));
    };

    card.appendChild(img);
    card.appendChild(deleteBtn);
    gallery.appendChild(card);
}
