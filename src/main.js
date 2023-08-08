
const add_students_form = document.getElementById("add_students_form");
const msg = document.getElementById("msg");
const student_post_area = document.getElementById("student_post_area");
const single_photo = document.querySelector("#single_student_btn img");
const single_name = document.querySelector(".single_information .name");
const single_roll = document.querySelector(".single_information .roll");
const single_reg = document.querySelector(".single_information .reg");
const add_students_marks_form = document.getElementById("add_students_marks_form");
const edit_mark_student_headding = document.getElementById("edit_mark_student_headding");








const showStdlist = () => {
  const students = getData("students");

 if(students.length > 0){
  let stdContent = "";

  students.map((item, index) => {
    stdContent += `<tr class="align-middle text-center">
    <td> ${index + 1} </td>
    <td><img src=" ${item.photo} " alt=" ${item.name} " style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;" align="middle"></td>
    <td> ${item.name} </td>
    <td> ${item.roll} </td>
    <td> ${item.reg} </td>
    <td> ${timeAgo(item.addtime)} </td>
    <td>
    ${item.result == null ? `<button class="btn btn-primary btn btn-sm" data-bs-toggle="modal" data-bs-target="#add_mark_modal" onclick = "add_mark('${item.id}')">Add mark</button>` : `<button class="btn btn-info btn btn-sm" onclick= "showMark('${item.id}')" data-bs-toggle = "modal" data-bs-target = "#show_mark_modal">Show Mark</button>`
    
    }
        
    </td>
    <td>
        
        <button class="btn btn-info btn btn-sm" onclick = "editeStudents('${item.id}')" data-bs-toggle = "modal" data-bs-target ="#edit_student_btn">
            <i class="fa fa-edit"></i>
        </button>
      
        <button class="btn btn-success btn btn-sm" onclick = "singleStudentView('${item.roll}')" data-bs-toggle="modal" data-bs-target="#single_student_btn">
            <i class="fa fa-eye"></i>
        </button>

        <button class="btn btn-danger btn btn-sm" onclick ="deleteStudent( '${item.roll}' )" >
            <i class="fa fa-trash"></i>
        </button>
    </td> 
  </tr>`;

  });
  student_post_area.innerHTML = stdContent;
 }else{
  student_post_area.innerHTML = 
                                `<tr>
                                  <td colspan = "8" align = "center" style = "color:red;"> <h4> No Student found</h4> </td>
                                </tr>`
 };

 };

 showStdlist();



// Delete student data from localStorage

const deleteStudent = (roll) => {

  const conf = confirm("Are you sure delete this studets???")
  
if(conf){
  const deldata = getData("students");
 
  const updateStudents = deldata.filter((data) => data.roll !== roll );
  
  setData("students", updateStudents);
 
  showStdlist();


} else {
  alert("your data is safe");
}
  
};







const edit_modal_form = document.getElementById("edit_modal_form");
// Edit student data
  const editeStudents = (id) => {
  const oldStudents = getData("students");
  const editStudentsdata = oldStudents.find((data) => data.id === id);
  
  edit_modal_form.innerHTML = `
                        <div>
                          <input type="hidden" name="id" value="${editStudentsdata.id}" class="form-control">
                        </div>
                        <div>
                            <label class="form-label">Name</label>
                            <input type="text" name="name" value="${editStudentsdata.name}" class="form-control">
                        </div>
                        <div class="my-3">
                            <label class="form-label">Roll</label>
                            <input type="text" name="roll" value="${editStudentsdata.roll}" class="form-control">
                        </div>
                        <div class="my-3">
                            <label class="form-label">Reg</label>
                            <input type="text" name="reg" value="${editStudentsdata.reg}" class="form-control">
                        </div>
                        <div class="my-3">
                            <label class="form-label">Photo link</label>
                            <input type="text" name="photo" value="${editStudentsdata.photo}" class="form-control">
                        </div>
                        <div> 
                        <img src="${editStudentsdata.photo}" style="width:250px; height:250px; object-fit:cover; border-radius:10px">
                        </div>
                        <div class="my-3">
                            <button class="btn btn-success" type="submit">Update</button>
                            
                        </div>
                      `;
};




// Upadate student data
const edit_form_student = document.getElementById("edit_form_student");
const edit_msg = document.querySelector(".edit_student_modal #msg")

edit_form_student.onsubmit = (e) => {
  e.preventDefault();
  const oldStudents = getData("students");
  
  const form_data = new FormData(e.target);
  const data =  Object.fromEntries(form_data.entries());
  
  const originalData = oldStudents.find((item)=> item.id === data.id);

  if(originalData.roll !== data.roll){
    if(oldStudents.some(item => item.roll == data.roll)){
      edit_msg.innerHTML = creatAlert("This roll alredy axist")
      return
    }  
  };

  if(originalData.reg !== data.reg){
    if(oldStudents.some(item => item.reg == data.reg)){
      edit_msg.innerHTML = creatAlert("This roll alredy axist");
      return
    }  
  };
 
  



    oldStudents[oldStudents.findIndex(item => item.id == data.id)] = {
      ...oldStudents[oldStudents.findIndex(item => item.id === data.id)],
     name: data.name,
     roll: data.roll,
     reg: data.reg,
     photo: data.photo,
    }
    setData("students", oldStudents );
    showStdlist();
  
}








// add submit students marks 

const add_mark = (id) => {
  add_students_marks_form.querySelector('input[name="id"]').value = id;

};

add_students_marks_form.onsubmit = (e) => {
  e.preventDefault();

  const studentOld = getData("students");

 const form_data = new FormData(e.target);
 const data = Object.fromEntries(form_data.entries())
 
 const index = studentOld.findIndex((item) => item.id === data.id);
 
  const mark = studentOld[index].result = data;

  setData("students", studentOld);
 
  showStdlist()
e.target.reset()
};




// edit students mark 
const edit_students_marks_form = document.getElementById("edit_students_marks_form");
const mark_edit_img = document.getElementById("mark_edit_img");
const showMark = (id) => {
  const oldStudents = getData("students")
  const index = oldStudents.findIndex(item => item.id === id);
  

 const bangla = oldStudents[index].result.bangla;
 const english = oldStudents[index].result.english;
 const math = oldStudents[index].result.math;
 const science = oldStudents[index].result.science;
 const social_science = oldStudents[index].result.social_science;
 const religion = oldStudents[index].result.social_science;
 
 
 edit_students_marks_form.innerHTML = `
              <div>
                <input type="hidden" name="id" class="form-control" value ="${id}">
              </div>
              <div>
                <label for="">Bangla</label>
                <input type="text" name="bangla" class="form-control" value="${bangla}">
              </div>
              <div class="my-3">
                <label for="">English</label>
                <input type="text" id="roll" name="english" class="form-control" value="${english}">
              </div>
              <div class="my-3">
                <label for="">Math</label>
                <input type="text" id="reg" name="math" class="form-control" value="${math}">
              </div>
              <div class="my-3">
                <label for="">Science</label>
                <input type="text" name="science" class="form-control" value="${science}">
              </div>
              <div class="my-3">
                <label for="">Social Science</label>
                <input type="text" name="social_science" class="form-control" value="${social_science}">
              </div>
              <div class="my-3">
                <label for="">Religion</label>
                <input type="text" name="religion" class="form-control" value="${religion}">
              </div>
              <div class="my-3">
                <button class="btn btn-success" type="submit">Mark Update</button>
              </div>

 `;
 edit_mark_student_headding.innerHTML=`Edit Mark of <span style="color:green;"> ${oldStudents[index].name} </span> `; 
 mark_edit_img.setAttribute("src", `${oldStudents[index].photo}`);

}

edit_students_marks_form.onsubmit = (e) => {
  e.preventDefault();

 const oldStudents = getData("students");

 const from_data = new FormData(e.target);
 const data = Object.fromEntries(from_data.entries());

 const index = oldStudents.findIndex((item) => item.id === data.id);

 oldStudents[index].result = {...data};

 setData("students", oldStudents);

}




//single_information
// single student view data 
const singleStudentView = (roll) => {
  const oldStudents = getData("students");
  const editStudentsdata = oldStudents.find(data => data.roll == roll);
  single_name.innerHTML = ` <h6> <span> Name:</span> ${editStudentsdata.name}</h6> `
  single_roll.innerHTML = ` <h6> <span> Roll No:</span> ${editStudentsdata.roll}</h6> `
  single_reg.innerHTML = ` <h6> <span> Reg No:</span> ${editStudentsdata.reg}</h6>`
  single_photo.setAttribute("src", `${editStudentsdata.photo}`)
}






// add roll and reg keyup validation//

const rollveli = document.querySelector("#add_student_btn #roll");
const regveli = document.querySelector("#add_student_btn #reg");


    rollveli.onkeyup = () => {
      const allStudentsV = getData("students");
      allStudentsV.map((item, index) => {
       if(item.roll == rollveli.value){
        msg.innerHTML = creatAlert(`This Roll already axist`)
       }
    })
  };

  regveli.onkeyup = () => {
    const allStudentsV = getData("students");
    allStudentsV.map((item, index) => {
     if(item.reg == regveli.value){
      msg.innerHTML = creatAlert("This Reg already axist")
     }
  })
};







// add students data form 

add_students_form.onsubmit = (e) => {
  e.preventDefault();

  // get data from student form
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());
 

  // add students form validation
  if(!data.name && !data.roll && !data.reg && !data.photo){
    msg.innerHTML = creatAlert("All fields are requireds")
  }else if(!data.name){
    msg.innerHTML = creatAlert("Invalid Name")
  }else if(!data.roll){
    msg.innerHTML = creatAlert("Invalid Roll No")
  }else if(!data.reg){
    msg.innerHTML = creatAlert("Invalid Reg No")
  }else if(!data.photo){
    msg.innerHTML = creatAlert("Invalid photo")
  }else{
    
    const oldStudets = getData("students") || [];

    msg.innerHTML = creatAlert("data save successfully", "success");

    
    

    oldStudets.push({
      id : getRandomUniqueID(),
      name: data.name,
      roll: data.roll,
      reg: data.reg,
      photo: data.photo,
      addtime: new Date(),
      result: null,
    });
   
    setData("students", oldStudets);
    e.target.reset();
  }

showStdlist();
};
  

