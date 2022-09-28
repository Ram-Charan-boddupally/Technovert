// function fot validation of the forms emailIds ,names, Empty values 
function reset(form){
    console.log("ram");
    form.querySelectorAll('input').forEach((ele)=>{
        ele.value = "";
    })
    if(form.contains('input[type=radio]')){
        form.querySelectorAll('input[type=radio]').checked = false;
    }
    if(form.contains('textarea')){
        form.querySelectorAll('textarea').forEach(ele => {ele.innerHTML = ""})
    }
    if(form.contains('select')){
        form.querySelector('select').selectedIndex = 0;
    }
    document.getElementById("unSuccesfullSubmittion").style.display = 'none';
    document.getElementById("succesfullSubmittion").style.display = 'none';
}


function validateForm(form){

    let status = true;
    form.querySelectorAll(".imp-field").forEach((element)=>{
        let value = element.querySelector('input').value;
        if(value == ""){
            element.querySelector('.user-msg').innerHTML = "Field Cant Be Empty";
            status = false;
        }else{
            if(element.classList.contains('name-field')){
                for(let ele of value){
                    if(ele > '0' && ele<'9'){
                        element.querySelector('.user-msg').innerHTML = "Field Canont contain numerics";
                        status = false;
                        break;                   
                    }
                }
                // website and number via js 
            }
        }
    })
    if(!status){
        document.getElementById("unSuccesfullSubmittion").style.color = 'red';
        document.getElementById("unSuccesfullSubmittion").style.display = 'initial';
    }else{
        document.getElementById("succesfullSubmittion").style.color = 'green';
        document.getElementById("succesfullSubmittion").style.display = 'initial';
    }
} 

function addMandatorySign(){
    ne_fields = document.getElementsByClassName('imp-field');
    for(let i=0;i<ne_fields.length;i++){
        let para = document.createElement('span');
        para.setAttribute('class','user-msg');
        para.innerText = "*";
        ne_fields[i].appendChild(para);
    }    
}

function addEventListners(){
    let stateElement = document.querySelector('#stateName');
    if(document.contains(stateElement)){
        stateElement.addEventListener('change',(event)=>{
            document.getElementById('promotionCode').value = event.target.value+"-PROMO";
        });    
    }

    let inputElements = document.querySelectorAll("input[name=gender]");
    if(document.contains(inputElements[0])){

        inputElements.forEach((element)=> {
            element.addEventListener('click',(event)=>{
                pnoun = ""
                if(event.target.value == "Male"){
                    pnoun = "Sir";
                }else{
                    pnoun = "Madam";
                }
                alert("Hello "+pnoun);
            })
        })
    }
    let fileElement = document.querySelector('#resume')
    if(document.contains(fileElement)){
        fileElement.addEventListener('onclick',event=>{
            fileElement = fileElement.value;
            fileElement.style.contentVisibility = "visible";
        })
    }

    let emailElement = document.querySelector('.email-field');
    if(document.contains(emailElement)){
        const re = /(^[a-zA-Z]+)([_\.-]|[0-9a-zA-Z])*@([_-]|[0-9a-zA-Z])*(\.[a-zA-Z0-9]+){2}/;
        emailElement.addEventListener('focusout',function(){
            let value = emailElement.querySelector('input').value;
            if(!value.match(re)){
                emailElement.querySelector('.user-msg').innerText = "Please enter correct format of email";
            }    
        });
    }
};


function main(){
    addMandatorySign();
    addEventListners();   
}

document.addEventListener('load',main());