function load_dropdowns() {
    var selDay = document.getElementById("selDay");
    for (var i = 1; i <= 31; i++) {
        var option = document.createElement("option");
        var dayText = i < 10 ? "0" + i : "" + i;
        option.value = dayText;
        option.text = dayText;
        selDay.appendChild(option);
    }
    var selMonth = document.getElementById("selMonth");
    for (var i = 1; i <= 12; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        selMonth.appendChild(option);
    }
    var selYear = document.getElementById("selYear");
    for (var i = 1970; i <= 2026; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        selYear.appendChild(option);
    }
}
function register() {
    var nameInput = document.getElementById("txtName");
    var emailInput = document.getElementById("txtEmail");

    var nameVal = nameInput.value.trim();
    var emailVal = emailInput.value.trim();

    if (nameVal === "") {
        alert("Name cannot be left blank!");
        nameInput.focus();
        return;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
        alert("Email must be valid!");
        emailInput.focus();
        return;
    }

    var genderVal = document.querySelector('input[name="gender"]:checked').value;

    var selDay = document.getElementById("selDay");
    var selMonth = document.getElementById("selMonth");
    var selYear = document.getElementById("selYear");

    var day = selDay.value;
    var month = selMonth.value;
    if (month < 10) month = "0" + month;
    var year = selYear.value;
    var birthdayVal = day + "/" + month + "/" + year;

    var checkedHobbies = [];
    var hobbiesCheckboxes = document.querySelectorAll('input[name="hobbies"]:checked');
    for (var i = 0; i < hobbiesCheckboxes.length; i++) {
        checkedHobbies.push(hobbiesCheckboxes[i].value);
    }
    var hobbiesVal = checkedHobbies.join(", ");

    var colorVal = document.querySelector('input[name="favColor"]:checked').value;

    var tableBody = document.getElementById("resultBody");
    var tr = document.createElement("tr");

    var tdName = document.createElement("td");
    tdName.innerHTML = nameVal;
    tr.appendChild(tdName);
    var tdEmail = document.createElement("td");
    tdEmail.innerHTML = emailVal;
    tr.appendChild(tdEmail);
    var tdGender = document.createElement("td");
    tdGender.innerHTML = genderVal;
    tr.appendChild(tdGender);
    var tdBirthday = document.createElement("td");
    tdBirthday.innerHTML = birthdayVal;
    tr.appendChild(tdBirthday);
    var tdHobbies = document.createElement("td");
    tdHobbies.innerHTML = hobbiesVal;
    tr.appendChild(tdHobbies);
    var tdColor = document.createElement("td");
    tdColor.innerHTML = colorVal;
    tr.appendChild(tdColor);

    tr.onmouseover = function() {
        this.style.backgroundColor = "yellow";
    };
    tr.onmouseout = function() {
        this.style.backgroundColor = "white";
    };
    tableBody.appendChild(tr);
}

function nextStep() {
    document.getElementById("regForm").reset();
    document.getElementById("txtName").focus();
}
