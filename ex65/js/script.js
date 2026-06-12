function addNode() {
    var contentInput = document.getElementById("addContent");
    var posInput = document.getElementById("addPos");
    var content = contentInput.value.trim();
    var pos = posInput.value.trim();

    if (content === "") {
        alert("Please enter content to add!");
        contentInput.focus();
        return;
    }

    var li = document.createElement("li");
    li.innerHTML = content;

    var ul = document.getElementById("webList");
    var items = ul.getElementsByTagName("li");

    if (pos === "" || isNaN(pos)) {
        ul.appendChild(li);
    } else {
        var idx = parseInt(pos) - 1;
        if (idx < 0) idx = 0;
        
        if (idx >= items.length) {
            ul.appendChild(li);
        } else {
            ul.insertBefore(li, items[idx]);
        }
    }
}

function removeNode() {
    var posInput = document.getElementById("removePos");
    var pos = posInput.value.trim();

    if (pos === "" || isNaN(pos)) {
        alert("Please enter a valid position to remove!");
        posInput.focus();
        return;
    }

    var ul = document.getElementById("webList");
    var items = ul.getElementsByTagName("li");
    var idx = parseInt(pos) - 1;

    if (idx < 0 || idx >= items.length) {
        alert("Invalid position! No node exists at position " + pos);
        posInput.focus();
        return;
    }

    ul.removeChild(items[idx]);
}

function modifyNode() {
    var contentInput = document.getElementById("modifyContent");
    var posInput = document.getElementById("modifyPos");
    var newContent = contentInput.value.trim();
    var pos = posInput.value.trim();

    if (newContent === "") {
        alert("Please enter new content!");
        contentInput.focus();
        return;
    }

    if (pos === "" || isNaN(pos)) {
        alert("Please enter a valid position to modify!");
        posInput.focus();
        return;
    }

    var ul = document.getElementById("webList");
    var items = ul.getElementsByTagName("li");
    var idx = parseInt(pos) - 1;

    if (idx < 0 || idx >= items.length) {
        alert("Invalid position! No node exists at position " + pos);
        posInput.focus();
        return;
    }

    items[idx].innerHTML = newContent;
}
