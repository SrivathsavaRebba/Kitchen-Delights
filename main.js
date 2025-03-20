function validateSignIn() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;

    // Email validation
    if (!email.includes("@") || !email.includes(".") || !email.includes("com")) {
        alert("Email must be valid (ex. abcd@email.com)");
        return false;
    }

    // Password validation
    if (password === "") {
        alert("Password is Required!");
        return false;
    }

    if (confirm("Logged in Successfully")) {
        window.location.href = "main.html"; 
        return true;
    }

    return false;
}
function validateSignUp(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    var name = document.getElementById("name").value;
    var confirmPassword = document.getElementById("conpass").value;
    if (name === ""){
        alert("Name is Required!");
        return false;
    }
    //Email validation
    if (!email.includes("@") || !email.includes(".") || !email.includes("com")) {
        alert("Email must be valid (ex. abcd@email.com)");
        return false;
    }

    //Password validation
    if (password === "") {
        alert("Password is Required!");
        return false;
    }
    if (confirmPassword === ""){
        alert("Please Confirm Password!");
        return false;
    }
    if (password !==confirmPassword) {
        alert("Password and Confirm Password must be Same")
        return false;
    }
    if (confirm("Account Created Successfully 🎉🥳")) {
        window.location.href = "main.html"; 
        return true;
    }

    return false;   

}

document.addEventListener("DOMContentLoaded", function () {
    const favoriteIcons = document.querySelectorAll(".heart-icon");

    // Load favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favoriteIcons.forEach(icon => {
        const card = icon.closest(".categories-section3-cards-set2");
        const cardId = card.getAttribute("data-id");

        // Check if item is already favorited and update icon
        if (favorites.some(item => item.id === cardId)) {
            icon.src = "love-img-fill.jpg"; // Set filled heart image
        }

        icon.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default action

            const cardData = {
                id: cardId,
                imgSrc: card.querySelector("img.categories-section3-img-set2").src,
                title: card.querySelector("h3").innerText,
                description: card.querySelector("p:last-of-type").innerText
            };

            // Check if item is already favorited
            const isAlreadyFavorite = favorites.some(item => item.id === cardData.id);

            if (!isAlreadyFavorite) {
                // Add to favorites and change to filled heart icon
                favorites.push(cardData);
                localStorage.setItem("favorites", JSON.stringify(favorites));
                icon.src = "love-img-fill.jpg"; // Change to filled heart
                alert("Added to favorites!");
            } else {
                // Remove from favorites and change back to unfilled heart icon
                favorites = favorites.filter(item => item.id !== cardData.id);
                localStorage.setItem("favorites", JSON.stringify(favorites));
                icon.src = "love-img-empty.jpg"; // Change to empty heart
                alert("Removed from favorites!");

                // Remove the card from favorites.html if we're there
                if (window.location.pathname.includes("favorites.html")) {
                    card.remove();
                }
            }
        });
    });

    // Load favorites in favorites.html
    if (window.location.pathname.includes("favorites.html")) {
        const favoritesContainer = document.querySelector("#favorites-container");

        if (favorites.length === 0) {
            favoritesContainer.innerHTML = "<p>No favorites added yet.</p>";
        } else {
            favorites.forEach(item => {
                const newCard = document.createElement("div");
                newCard.className = "categories-section3-cards-set2";
                newCard.setAttribute("data-id", item.id);
                newCard.innerHTML = `
                    <img class="categories-section3-img-set2" src="${item.imgSrc}" />
                    <div class="categories-section3-text-div">
                        <p class="categories-section3-blue-text">
                            Recipe 
                            <img class="heart-icon" src="love-img-fill.jpg" style="cursor: pointer;" />
                        </p>
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                `;

                // Add event listener for removing from favorites
                newCard.querySelector(".heart-icon").addEventListener("click", function () {
                    let updatedFavorites = favorites.filter(fav => fav.id !== item.id);
                    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                    newCard.remove(); // Remove from UI
                    alert("Removed from favorites!");
                });

                favoritesContainer.appendChild(newCard);
            });
        }
    }
});
