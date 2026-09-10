// this is for allowing tin-items to be moved around/also when clicking on a tin item
// it will bring up the tin-item to the front if their is another placed right on top of it. 

let highestZIndex = 1;

const items = document.querySelectorAll(".tin-item");

// allowing items to be grabbed and moved around
items.forEach((item, index) => {

    const itemName = "tin-item-" + index;

    const savedPosition = localStorage.getItem(itemName);

    if (savedPosition) {
        const position = JSON.parse(savedPosition);

        item.style.left = position.left + "px";
        item.style.top = position.top + "px";
    }

    item.addEventListener("mousedown", function(e) {

        e.preventDefault();

        // Bringing clicked items to the front
        highestZIndex++;
        item.style.zIndex = highestZIndex;

        const rect = item.getBoundingClientRect();
        const parentRect = item.parentElement.getBoundingClientRect();

        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        function moveItem(e) {

            const newLeft =
                e.clientX - parentRect.left - offsetX;

            const newTop =
                e.clientY - parentRect.top - offsetY;

            item.style.left = newLeft + "px";
            item.style.top = newTop + "px";
        }

        function stopMoving() {

            const position = {
                left: parseFloat(item.style.left),
                top: parseFloat(item.style.top)
            };

            localStorage.setItem(
                itemName,
                JSON.stringify(position)
            );

            document.removeEventListener("mousemove", moveItem);
            document.removeEventListener("mouseup", stopMoving);
        }

        document.addEventListener("mousemove", moveItem);
        document.addEventListener("mouseup", stopMoving);
    });

});