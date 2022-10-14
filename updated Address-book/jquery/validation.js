export function mobileValidation(mobileNumber){
    if(mobileNumber != ""){
        return mobileNumber.replaceAll(" ","").search(/^(91)?[6-9][0-9]{9}$/) != -1 ? true : false;
    }else{
        return true;
    }
}

export function validateEmail(emailAddress){
    if(emailAddress != ""){
        return emailAddress.search(/^[a-zA-Z]+([a-zA-Z0-9]|[_\.-])+@[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+/) != -1 ? true : false;
    }else{
        return true;
    }
}

export function validateWebAddress(address){
    if(address != ""){
        return address.search(/^(https|http):\/\/[a-zA-Z]+([a-zA-Z0-9]|[.:_\/\-%])+/) != -1 ? true : false;
    }else{
        return true;
    }
}

export function isFieldEmpty(data){
    return data == "" ? true : false;
}

export function isOnlyText(text){
    if(text != ""){
        return text.search(/^[a-zA-Z ]+$/) != -1 ? true : false;
    }else{
        return true;
    }
}

export function displayErrorMsg(tag,validator){
    let status = validator($(tag).val());
    if(!status){
        if($(tag).next().length == 0){
            $(tag).parent().append($("<p class='error'></p>").text(tag.replace("#","")+" is Invalid"));                
        }
    }else{
        if($(tag).next().length != 0)
            $(tag).next().remove();
    }

    if(status){
        $(".button[type='submit']").css({"cursor":"pointer","opacity":1}).prop("disabled",false);
    }else{
        $(".button[type='submit']").css({"cursor":"not-allowed", "opacity": "0.5"}).prop("disabled",true);
    }

}
