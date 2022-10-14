import * as utils from '../jquery/validation.js';

// views
class FormView{
    constructor(model){
        this.model = model;
        this.details = {};
        this.bindValidationListners();
    }

    fillForm(employee){
        $("contact-form").attr("id",employee.id);
        $("#name").val(employee.name);
        $("#email").val(employee.email);
        $("#mobileNumber").val(employee.contactInformation[0]);
        $("#contactInformation").val(employee.contactInformation[1]);
        $("#website").val(employee.website);
        $("#address").html(employee.address);
    }

    formValidation(){
        // $('.input-block p.error').remove();
        // // cheking is the fields are empty
        // let status = true;
        // $("input").each(function(){
        //     if(this.id != 'contactInformation' && utils.isFieldEmpty(this.value)){
        //         let ele = document.createElement("p");
        //         ele.classList.add("error");
        //         ele.innerText = this.id + "  Is Required";  
        //         this.parentNode.appendChild(ele);
        //         status = false;
        //         };
        //     });


        // return status;
    }
    
    bindValidationListners(){
        let status = true;

        $("input").change(function(){
            status = true;
            $("input").each(function(){
                if(this.id != 'contactInformation' && this.value == ""){
                    status = false;
                    $("#"+this.id).parent().append($("<p class='error'></p>").text(this.id+" can't be empty"));
                    return status;
                }
            })

            if(status){
                $(".button[type='submit']").css({"cursor":"pointer","opacity":"1"}).prop("disabled",false);
            }else{
                $(".button[type='submit']").css({"cursor":"not-allowed", "opacity": "0.5"}).prop("disabled",true);
            }

        })

        $('#name').on('input', function(){
            utils.displayErrorMsg("#name",utils.isOnlyText);
        });

        $("#email").on('input', function(){
            utils.displayErrorMsg("#email",utils.validateEmail);
        });
 
        $("#mobileNumber").on('input', function(){
            utils.displayErrorMsg("#mobileNumber",utils.mobileValidation);
        });

        $("#website").on('input',function(){
            utils.displayErrorMsg("#website",utils.validateWebAddress);
        });

    }

    bindSubmitForm(handler,edit,empId){
        let obj = this;
        $("button[type='submit']").click(function(){
            obj.details.contactInformation = [];

            obj.details.name = $("#name").val();
            obj.details.email = $("#email").val();
            obj.details.contactInformation.push($("#mobileNumber").val());
            obj.details.contactInformation.push($("#contactInformation").val() == "" ? 'NA' : $("#contactInformation").val());
            obj.details.website = $("#website").val();
            obj.details.address = $("#address").val().replace("\n", "<br>");

            if(edit) obj.model.editEmployee(empId,obj.details);
            else obj.model.addEmployee(obj.details);

            handler.displayContacts(obj.model.employeeList);

            obj.bindResetForm();
            sessionStorage.setItem("employeeList",JSON.stringify(obj.model));
            alert("contact Succesfully submited");
            location.href = '../html/home.html';
        })
    }
    
    bindResetForm(){
        $("button[type='reset']").click(function(){
            $('.input-block p.error').remove();
            $('.input-block input').val("");
            $('.input-block textarea').text("");
        });
    }

    bindCancelEditForm(){
        $("button[type='reset']").click(function(){
            location.href="../html/home.html";
        })
    }
}

class ContactsListView{
    constructor(model){
        this.model = model;
        this.displayContacts();
    }

    createContact(object){
        // creating p tags for employee information and list for empoloyee details
        let listElement = $("<li></li>").attr({ "id":object.id, "class": "candit-details"})
                                        .append(
                                            $("<p class='candit-name'></p>").text(object['name']),
                                            $("<p class='candit-email'></p>").text(object['email']),
                                            $("<p class='candit-contact'></p>").text(object['contactInformation'][0]))
                                        .click(function(){
                                            location.href = '../html/detailsPage.html?'+'employee='+$(this).attr("id");
                                        });

        return listElement;
    }

    displayContacts(){
        // removing the existing child elements of ul
        $(".contacts-list").empty();

        // appending child elements to the list
        if(this.model.getListLength() ==  0){
            $(".contacts-list").html("<p>No contacts Available</p>");
        }else{
            this.model.employeeList.forEach((employee) => {
                let empInfo = this.createContact(employee);
                $(".contacts-list").append(empInfo);
            });
        }
    }
}

class DetailsView{
    constructor(employeeModel,empId){
        this.model = employeeModel;

        $(".details-block").attr("id",empId);
        let employee = this.model.getEmployee(empId);
        console.log(employee)
        if(employee){

            $(".user-name").text(employee.name);
            $(".email-address span").text(employee.email);
            $(".mobile-number span").text(employee.contactInformation[0]);
            $(".land-line span").text(employee.contactInformation[1]);
            $(".website span").text(employee.website);
            $(".address span").html(employee.address.replace("\n","<br>"));
        }else{
            $(".details-block").html("<h1>NO CONTACT EXISTS</h1>");
        }

        this.bindEditInformation();
        this.bindDeleteInformation(empId);
    }
        
    bindEditInformation(){
        $(".edit-option").click(function(){
            location.href = "../html/contactForm.html?edit=true&employee="+$(".details-block").attr("id");
        })
    }

    bindDeleteInformation(empId){
        let obj = this;
        $(".delete-option").click(function(){
            obj.model.deleteEmployee(empId);
            sessionStorage.setItem("employeeList", JSON.stringify(obj.model));
            location.href = '../html/home.html';
        })
    }
}

export {FormView,ContactsListView,DetailsView};
