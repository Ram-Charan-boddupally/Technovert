
export let reList = { emailRE : /^[a-zA-Z]+([a-zA-Z0-9]|[_\.-])+@(([a-zA-Z0-9]|[_-])+.)+/gm,
                      webAddRE : /^(https|http):\/\/[a-zA-Z]+([a-zA-Z0-9]|[.:_\/\-%])+/,
                      onlyTextRE : /^[a-zA-Z ]+$/,
                      phoneCountryRE : {India: '[6-9][0-9]{9}',
                                        Canada: '[1-9][0-9]{2}-[0-9]{3}-[0-9]{4}',
                                        UnitedKingdom: '[1-9][0-9]{3}-[1-9][0-9]{5}',
                                        Australia: '0(4|5) [1-9][0-9]{3} [1-9][0-9]{3}'
                                    },
                      placeHolder : {India: 'XXXXXXXXXX',
                                    Canada: 'XXX-XXX-XXXX',
                                    UnitedKingdom: 'XXXX-XXXXXX',
                                    Australia: '0X XXXX XXXX' 
                                    }
                };

export function validateEmail(emailAddress){
    if(emailAddress != ""){
        return emailAddress.match(reList.emailRE) != null ? true : false;
    }else{
        return true;
    }
}

export function validateWebAddress(address){
    if(address != ""){
        return address.match(reList.webAddRE) != null ? true : false;
    }else{
        return true;
    }
}

export function checkEmpty(data){
    return data == "" ? true : false;
}

export function isOnlyText(text){
    if(text != ""){
        return text.match(reList.onlyTextRE) != null ? true : false;
    }else{
        return true;
    }
}

export function addErrorTag(query = '.imp-field label'){
    let elements = document.querySelectorAll(query); 
    for(let i=0; i < elements.length; i++){
        // creating a span elemt and appending as child element in label
        let spanEle = document.createElement("span");
        spanEle.setAttribute("class","user-msg");
        elements[i].appendChild(spanEle);
    }
}
