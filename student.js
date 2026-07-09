let students =
JSON.parse(localStorage.getItem("students")) || [];

const studentList =
document.getElementById("studentList");

const saveBtn =
document.getElementById("saveBtn");

const searchInput =
document.getElementById("search");

function saveToLocalStorage(){
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}

function displayStudents(data){

    studentList.innerHTML = "";

    data.forEach((student,index)=>{

        studentList.innerHTML += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>
                <button
                class="edit"
                onclick="editStudent(${index})">
                Edit
                </button>

                <button
                class="delete"
                onclick="deleteStudent(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });
}

displayStudents(students);

saveBtn.addEventListener("click",()=>{

    const id =
    document.getElementById("studentId").value;

    const name =
    document.getElementById("name").value;

    const email =
    document.getElementById("email").value;

    const course =
    document.getElementById("course").value;

    if(!name || !email || !course){
        alert("Fill all fields");
        return;
    }

    if(id){

        students[id] = {
            id:Number(id)+1,
            name,
            email,
            course
        };

        saveBtn.textContent =
        "Add Student";

        document.getElementById(
            "studentId"
        ).value = "";

    }else{

        students.push({
            id:students.length + 1,
            name,
            email,
            course
        });
    }

    saveToLocalStorage();

    displayStudents(students);

    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("course").value="";
});

function editStudent(index){

    const student = students[index];

    document.getElementById(
        "studentId"
    ).value = index;

    document.getElementById(
        "name"
    ).value = student.name;

    document.getElementById(
        "email"
    ).value = student.email;

    document.getElementById(
        "course"
    ).value = student.course;

    saveBtn.textContent =
    "Update Student";
}

function deleteStudent(index){

    if(confirm("Delete Student?")){

        students.splice(index,1);

        saveToLocalStorage();

        displayStudents(students);
    }
}

searchInput.addEventListener("keyup",()=>{

    const value =
    searchInput.value.toLowerCase();

    const filtered =
    students.filter(student=>

        student.name
        .toLowerCase()
        .includes(value)

        ||

        student.email
        .toLowerCase()
        .includes(value)

        ||

        student.course
        .toLowerCase()
        .includes(value)
    );

    displayStudents(filtered);
});