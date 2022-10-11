// views
class FormView{
    constructor(model){
        this.details = {};
        this.model = model;
    }

    fillForm(employee){
        $("#name").val(employee.name);
        $("#email").val(employee.email);
        $("#mobileNumber").val(employee.contactInformation[0]);
        $("#contactInformation").val(employee.contactInformation[1]);
        $("#website").val(employee.website);
        $("#address").html(employee.address);
    }

    bindSubmitForm(handler,edit=false,empId){
        $("button[type='submit']").click(function(){
            if(this.formValidation()){ // if formValidation is false
                this.details.contactInformation = [];

                this.details.name = $("#name").val();
                this.details.email = $("#email").val();
                this.details.contactInformation.push($("#mobileNumber").val());
                this.details.contactInformation.push($("#contactInformation").val());
                this.details.website = $("#website").val();
                this.details.address = $("#address").val().replace("\n", "<br>");
                
                if(edit) this.model.editEmployee(empId,this.details);
                else this.model.addEmployee(this.details);

                handler.displayContacts(this.model.employeeList);

                this.bindResetForm();
                sessionStorage.setItem("employeeList",JSON.stringify(this.model));
                alert("contact Succesfully submited");
                location.href = '../html/home.html';
            }
        })
    }

    bindResetForm(){
        $("button[type='reset']").click(function(){
            $("#contactForm").find("input").val() = "";
            $("#contactForm").find("textarea").val() = "";            
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
        let listElement = $("<li></li>").attr({ "id":'emp'+object.id, "class": "candit-details"})
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
        let employee = model.getEmployee(empId);

        $(".user-name").text(employee.name);
        $(".email-address span").text(employee.email);
        $(".mobile-number span").text(employee.contactInformation[0]);
        $(".land-line span").text(employee.contactInformation[1]);
        $(".website span").text(employee.website);
        $("address span").text(employee.address);

        this.bindEditInformation();
        this.bindDeleteInformation(empId);
    }
        
    bindEditInformation(){
        $(".edit-option").click(function(){
            location.href = "../html/contactForm.html?edit=true&employee="+$(".details-block").attr("id");
        })
    }

    bindDeleteInformation(empId){
        $(".delete-option").click(function(){
            this.model.deleteEmployee(empId);
            sessionStorage.setItem("employeeList", JSON.stringify(this.model));
            location.href = '../html/home.html';
        })
    }
}

export {FormView,ContactsListView,DetailsView};