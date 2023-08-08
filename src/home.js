
const searchResult = document.getElementById("searchResult");
const loader = document.getElementById("loader");
const showMarksheet = document.getElementById("showMarksheet");
const searchAlert = document.getElementById("searchAlert")


/**
 * /**
 * GPA, CGPA, GRADE function for result publishing
 * 
 * question no-3
 */

function gpaCal(mark){
    let gpa;
    if( mark >=0 && mark <33){
        gpa = 0;
    

    }else if( mark >=33 && mark <40){
        gpa = 1.00;
      

    }else if( mark >=40 && mark <50){
        gpa = 2.00;
    

    }else if( mark >=50 && mark <60){
        gpa = 3.00;
    

    }else if( mark >=60 && mark <70){
        gpa = 3.5;


    }else if( mark >=70 && mark <80){
        gpa = 4.00;
 

    }else if( mark >=80 && mark <=100){
        gpa = 5.00;
  

    }else{
        gpa ="invalid"
    
    }
    return gpa;


};


function gradeCal(mark){
 
    let grade;
    if( mark >=0 && mark <33){
        grade = "F";

    }else if( mark >=33 && mark <40){
        grade = "D";

    }else if( mark >=40 && mark <50){
        grade = "C";

    }else if( mark >=50 && mark <60){
        grade = "B";

    }else if( mark >=60 && mark <70){
        grade = "A-";

    }else if( mark >=70 && mark <80){
        grade = "A";

    }else if( mark >=80 && mark <=100){
        grade = "A+";

    }else{
        grade = "invalid"
    }
    return grade;

};


function resultCal(ban, eng, big, math, reg, ict){

    let banGpa = gpaCal(ban);
    let engGpa = gpaCal(eng);
    let bigGpa = gpaCal(big);
    let mathGpa = gpaCal(math);
    let regGpa = gpaCal(reg);
    let ictGpa = gpaCal(ict);

    let cgpa

    if(banGpa>0 && engGpa>0 && bigGpa>0 && mathGpa>0 && regGpa>0 && ictGpa>0 ){

      cgpa =  (banGpa + engGpa + bigGpa + mathGpa + regGpa + ictGpa) / 6;

    } else{
        cgpa = 0;
    };
    return cgpa

};

const finalGrade = (cgpa) => {

    let grade;
    if(cgpa >= 0 && cgpa<1){
        grade = "F"
    }else if(cgpa >= 1 && cgpa<2){
        grade = "D"
    }else if(cgpa >= 2 && cgpa<3){
        grade = "C"
    }else if(cgpa >= 3 && cgpa<3.5){
        grade = "B"
    }else if(cgpa >= 3.5 && cgpa<4){
        grade = "A-"
    }else if(cgpa >= 4 && cgpa<5){
        grade = "A"
    }else if(cgpa>=5){
        grade = "A+"
    }else{
        grade = "Invalid"
    }
    return grade;

}


searchResult.onsubmit = (e) => {
e.preventDefault();
const studentsData = getData("students");
const form_data = new FormData(e.target);
const data = Object.fromEntries(form_data.entries());

const searchStudents = studentsData.find((item)=> item.roll === data.roll && item.reg === data.reg);
loader.style.display = "block"


    if(!searchStudents){
       
        setTimeout(() => {
            loader.style.display = "none";
            searchAlert.innerHTML = `<h4 style="color:red; text-align:center;">Result Not Found!</h4>`
        },1000);
        return
    } else{

        let cgpa = resultCal(searchStudents.result.bangla, searchStudents.result.english, searchStudents.result.math, searchStudents.result.science, searchStudents.result.social_science, searchStudents.result.religion).toFixed(2);


    

        setTimeout(() => {

            loader.style.display = "none";
            showMarksheet.innerHTML = `
                    <div class="card">
                        <div class="card-body shadow">
                        <div class="row justify-content-center">
                          <h3 align="center" style="margin-bottom: 30px;color: tomato;">ShoroBindu Academy</h3>
                          <div class="col-md-5">
                              <div>
                                <p> <strong> Name: </strong>${searchStudents.name}</p>
                              </div>
                              <div>
                                <p> <strong> Roll No:</strong> ${searchStudents.roll}</p>
                              </div>
                              <div>
                                <p> <strong> Reg No:</strong> ${searchStudents.reg}</p>
                              </div>
                              <div>
                                ${cgpa<1 ? "<h3 style = 'color:red;'>Fail</h3>" : "<h3 style='color:green;'>PASSED</h3>" }
                            </div>
                          </div>
                          <div class="col-md-5">
                            <div align="right">
                              <img src="${searchStudents.photo}" alt="" style="width: 120px; height: 120px; object-fit: cover; border-radius: 15px;">
                            </div>
                          </div>
                        </div>
                        <br>
                        <hr>
        
                        <table class="table table-striped table-bordered" borderd>
                          <tr>
                            <td>Code</td>
                            <td>Subject</td>
                            <td>Mark</td>
                            <td>Gpa</td>
                            <td>Grade</td>
                            <td>Cgpa</td>
                            <td>Final</td>                    
                          </tr>
                          <tr>
                            <td>101</td>
                            <td>Bangla</td>
                            <td>${searchStudents.result.bangla}</td>
                            <td>${gpaCal(searchStudents.result.bangla)}</td>
                            <td>${gradeCal(searchStudents.result.bangla)}</td>
                            <td rowspan="6" style="vertical-align: middle; text-align: center;">${cgpa} </td>
                            <td rowspan="6" style="vertical-align: middle; text-align: center;"> ${finalGrade(cgpa)} </td>
        
                          </tr>
                          <tr>
                            <td>102</td>
                            <td>English</td>
                            <td>${searchStudents.result.english}</td>
                            <td>${gpaCal(searchStudents.result.english)}</td>
                            <td>${gradeCal(searchStudents.result.english)}</td>                                    
                          </tr>
                          <tr>
                            <td>103</td>
                            <td>Math</td>
                            <td>${searchStudents.result.math}</td>
                            <td>${gpaCal(searchStudents.result.math)}</td>
                            <td>${gradeCal(searchStudents.result.math)}</td>                                    
                          </tr>
                          <tr>
                            <td>104</td>
                            <td>Science</td>
                            <td>${searchStudents.result.science}</td>
                            <td>${gpaCal(searchStudents.result.science)}</td>
                            <td>${gradeCal(searchStudents.result.science)}</td>                                    
                          </tr>
                          <tr>
                            <td>105</td>
                            <td>Social Science</td>
                            <td>${searchStudents.result.social_science}</td>
                            <td>${gpaCal(searchStudents.result.social_science)}</td>
                            <td>${gradeCal(searchStudents.result.social_science)}</td>                                    
                          </tr>
                          <tr>
                            <td>106</td>
                            <td>Religion</td>
                            <td>${searchStudents.result.religion}</td>
                            <td>${gpaCal(searchStudents.result.religion)}</td>
                            <td>${gradeCal(searchStudents.result.religion)}</td>                                    
                          </tr>
                     </table>
                </div>
            </div>
        `;
        
        },1000);


    };

    
};