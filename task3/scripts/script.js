function checkEmptyElements(form){
    let count = 0 ,spanElement;
    if(form.querySelector("#name").value == ""){
        spanElement = form.querySelector(".name-field .user-message");
        spanElement.innerHTML = "Name is required";
        count += 1;
    }
    if(form.querySelector("#emailId").value == ""){
        spanElement = form.querySelector(".email-field .user-message");
        spanElement.innerHTML = "EmailId is required";
        count += 1;
    }
    if(form.querySelector("#desiredRole").value == ""){
        spanElement = form.querySelector(".role-field .user-message");
        spanElement.innerHTML = "Desired Role is required";
        count += 1;

    }
    if(form.querySelector("#resume").files.length == 0){
        console.log("helo");
        spanElement = form.querySelector(".resume-field .user-message");
        spanElement.innerHTML = "Please Upload your resume";
        count += 1;
    }
    if(count==0){
        document.querySelector("#succesfullSubmittion").style.visibility = "visible";
        document.querySelector("#succesfullSubmittion span").innerHTML = form.querySelector("#name").value; 
    }
    form.preventDefault();
    // return false;
}