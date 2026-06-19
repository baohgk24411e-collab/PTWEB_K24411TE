var allEmployees = [];

function loadTitles(xmlDoc)
{
    var employee_tags = xmlDoc.getElementsByTagName("employee");
    var titles = [];
    
    allEmployees = [];
    for(i=0; i<employee_tags.length; i++)
    {
        employee_tag = employee_tags[i];
        id = employee_tag.getAttribute("id");
        title = employee_tag.getAttribute("title");
        name_tag = employee_tag.getElementsByTagName("name")[0];
        phone_tag = employee_tag.getElementsByTagName("phone")[0];
        name = name_tag.childNodes[0].nodeValue;
        phone = phone_tag.childNodes[0].nodeValue;
        
        allEmployees.push({
            id: id,
            title: title,
            name: name,
            phone: phone
        });
        
        if(titles.indexOf(title) === -1) {
            titles.push(title);
        }
    }
    
    var titleSelect = document.getElementById("titleSelect");
    for(i=0; i<titles.length; i++)
    {
        option = document.createElement("option");
        option.value = titles[i];
        option.innerHTML = titles[i];
        titleSelect.appendChild(option);
    }
}

function showEmployee()
{
    var titleSelect = document.getElementById("titleSelect");
    var selectedTitle = titleSelect.value;
    var bodyEmployee = document.getElementById("bodyEmployee");
    
    bodyEmployee.innerHTML = "";
    
    if(selectedTitle === "") {
        return;
    }
    
    for(i=0; i<allEmployees.length; i++)
    {
        if(allEmployees[i].title === selectedTitle)
        {
            employee = allEmployees[i];
            tr = document.createElement("tr");
            td_id = document.createElement("td");
            td_name = document.createElement("td");
            td_phone = document.createElement("td");
            
            td_id.innerHTML = employee.id;
            td_name.innerHTML = employee.name;
            td_phone.innerHTML = employee.phone;
            
            tr.appendChild(td_id);
            tr.appendChild(td_name);
            tr.appendChild(td_phone);
            
            bodyEmployee.appendChild(tr);
        }
    }
}
