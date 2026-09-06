// this is for allowing items to be moved around
let highestZIndex = 1;

const items = document.querySelectorAll(".tin-item");

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

        // Bring clicked item to the front
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