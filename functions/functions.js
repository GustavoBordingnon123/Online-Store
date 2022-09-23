const express = require('express');
const router = express();

const Functions = {
    isUndefined: function isUndefined(x){
        if(x != undefined && x != ''){
            return 200;
        }else{
            return 400;
        }
    },

    isLenghtRight: function isLenghtRight(x){
        if(x.length > 3 && x.length < 20 ){   
            return 200;
        }else{
            return 411;
        }
    },

    nameValidation: function nameValidation(variable){

        firstValidation = this.isUndefined(variable)
    
        if(firstValidation == 200){
    
            secondValidation = this.isLenghtRight(variable)
    
            if(secondValidation == 200){
                return 200;
    
            }else{
                return secondValidation;
            }
    
        }else{
            return firstValidation;
        }
       
    },

    emailValidation: function emailValidation(email) {
        const re = /\S+@\S+\.\S+/;
    
        if(re.test(email)){
            return 200;
        }else{
            return 400;
        }
    },

    passwordValidation: function passwordValidation(password){
    
        const lowerWords = /[a-z]/; 
        const upperWords = /[A-Z]/;
        const numbers = /[0-9]/;
        const especialCaracther = /[!|@|#|$|%|^|&|*|(|)|-|_]/
    
        if(this.nameValidation(password) == 200){
    
            if(lowerWords.test(password)){
           
                if(upperWords.test(password)){
                    
                    if(numbers.test(password)){
        
                        if(especialCaracther.test(password)){
                            return 200;
                        }else{
                            return 400;
                        }
        
                    }else{
                        return 400
                    }
        
                }else{
                    return 400
                }
        
            }else{
                return 400
            }
        
        }else{
            return password_statusCode;
        }
    },

    numberValidation: function numberValidation(variable){

        firstValidation = this.isUndefined(variable)
     
         if(firstValidation == 200){
             
             if(variable != isNaN){
                
                 if(variable > 0 && variable < 1000){
                     return 200;
     
                 }else{
                     return 400;
                 }
     
     
             }else{
                 return 400;
             }
     
     
     
         }else{
             return firstValidation;
         }
     }
}



module.exports = Functions;




