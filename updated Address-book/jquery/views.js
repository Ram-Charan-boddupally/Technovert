import {reList,validateEmail,validateWebAddress,checkEmpty,isOnlyText} from '../../task3/scripts/utlis.js';

// views
class FormView{
    constructor(model){
        this.model = model;
        this.details = {};
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
        $('.input-block span').remove();
        // cheking is the fields are empty
        let status = true;
        $("input").each(function(){
            if(checkEmpty(this.value)){
                this.parentNode.innerHTML += "<span class='error'>FIELD IS REQUIRED</span>";
                status = false;
            }
        });

        if(!status) return false;

        // checking the field validation
        if(!isOnlyText(this.details.name)) $("#name").parent().append("<span class='error'>can't contain numbers</span>"),status=false;
        if(!validateEmail(this.details.email)) $("#email").parent().append("<span class='error'>INVALID Email</span>"),status=false;
        if(this.details.contactInformation[0].replaceAll(" ","").search(/(\+91)?[6-9][0-9]{9}/) == -1) $("#mobileNumber").parent().append("<span class='error'>INVALID Number</span>"),status=false;
        if(!validateWebAddress(this.details.website)) $("#website").parent().append("<span class='error'>INVALID Address</span>"),status=false;

        return status;
    }
    
    bindSubmitForm(handler,edit,empId){
        let obj = this;
        $("button[type='submit']").click(function(){
            obj.details.contactInformation = [];

            obj.details.name = $("#name").val();
            obj.details.email = $("#email").val();
            obj.details.contactInformation.push($("#mobileNumber").val());
            obj.details.contactInformation.push($("#contactInformation").val());
            obj.details.website = $("#website").val();
            obj.details.address = $("#address").val().replace("\n", "<br>");

            if(obj.formValidation()){
                if(edit) obj.model.editEmployee(empId,obj.details);
                else obj.model.addEmployee(obj.details);

                handler.displayContacts(obj.model.employeeList);

                obj.bindResetForm();
                sessionStorage.setItem("employeeList",JSON.stringify(obj.model));
                alert("contact Succesfully submited");
                location.href = '../html/home.html';
            }
        })
    }
    
    bindResetForm(){
        $("button[type='reset']").click(function(){
            $('.input-block span').remove();
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
                                            $("<p></p>").addClass("candit-name").text(object['name']),
                                            $("<p></p>").addClass("candit-email").text(object['email']),
                                            $("<p></p>").addClass("candit-contact").text(object['contactInformation'][0]))
                                        .click(function(){
                                            // let empId = $(this).prop("tagName") == 'P' ? $(this).parent().attr("id") : $(this).attr("id");
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
