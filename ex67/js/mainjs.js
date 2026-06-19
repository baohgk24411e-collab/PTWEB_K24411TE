var allStudents = [];
var sortDirection = {};

function load_students_from_xml(dataset,body_student)
{
    var parser = new DOMParser(); 
    var xmlDoc = parser.parseFromString(dataset,"text/xml"); 
    var student_tags=xmlDoc.getElementsByTagName("student")
    
    allStudents = [];
    for(i=0;i<student_tags.length;i++)
    {
        student_tag=student_tags[i]
        id_tag=student_tag.getElementsByTagName("id")[0]
        name_tag=student_tag.getElementsByTagName("name")[0]
        birthday_tag=student_tag.getElementsByTagName("birthday")[0]
        gender_tag=student_tag.getElementsByTagName("gender")[0]
        student_id=id_tag.childNodes[0].nodeValue
        student_name=name_tag.childNodes[0].nodeValue
        student_birthday=birthday_tag.childNodes[0].nodeValue
        student_gender=gender_tag.childNodes[0].nodeValue
        
        allStudents.push({
            id: student_id.trim(),
            name: student_name.trim(),
            birthday: student_birthday.trim(),
            gender: student_gender.trim()
        });
    }
    
    displayStudents(allStudents, body_student);
}
function displayStudents(students, body_student)
{
    body_student.innerHTML = "";
    for(i=0;i<students.length;i++)
    {
        var student = students[i];
        var tr=document.createElement("tr")
        var td_id=document.createElement("td")
        var td_name=document.createElement("td")
        var td_birthday=document.createElement("td")
        var td_gender=document.createElement("td")
        
        td_id.innerHTML=student.id
        td_name.innerHTML=student.name
        td_birthday.innerHTML=student.birthday
        td_gender.innerHTML=student.gender
        
        tr.appendChild(td_id)
        tr.appendChild(td_name)
        tr.appendChild(td_birthday)
        tr.appendChild(td_gender)
        
        tr.onclick = function(e) {
            if(e.target.tagName === 'TD') {
                var studentData = JSON.stringify(student);
                window.open('detail.html?data=' + encodeURIComponent(studentData), '_blank');
            }
        }
        
        body_student.appendChild(tr)
    }
}

function sortByColumn(columnIndex)
{
    var sortKeys = ['id', 'name', 'birthday', 'gender'];
    var key = sortKeys[columnIndex];
    
    if(sortDirection[key] === 'asc') {
        sortDirection[key] = 'desc';
        allStudents.sort(function(a, b) {
            if(a[key] > b[key]) return -1;
            if(a[key] < b[key]) return 1;
            return 0;
        });
    } else {
        sortDirection[key] = 'asc';
        allStudents.sort(function(a, b) {
            if(a[key] < b[key]) return -1;
            if(a[key] > b[key]) return 1;
            return 0;
        });
    }
    
    displayStudents(allStudents, document.getElementById("bodystudent"));
}