console.log("##########################################################");
console.log("-- H a s h   O f  A r r a y   O b j e c t  -- Loading");
console.log("##########################################################");
//--- add (inKey, inValue)      put element(inValue) into the specific array
//--- removeItemFromSpecificHash (inKey, inValue)
//--- removeItemFromAnyHash (inValue)
//--- removeArrayFromHash (inKey)
//--- copy (inSourceKey, inTargetKey)
//--- dump (inHead)
//--- getArrayFromHash (inKey)
//--- getItemFromArray (inKey, inIndex)
//--- getLengthOfArray (inKey)



var HashOfArrayObject = function(inAllowDuplicates){
    var _this = this;
    var hash = {};
    var allowDuplicates = inAllowDuplicates;

    this.exist = function(inKey){
        inKey = inKey.toString();
        return (hash[inKey]) ? true : false;
    }

    this.add = function(inKey, inValue){        
        inKey = inKey.toString();
        if(!(hash[inKey])){
            hash[inKey] = [];
        }
        if(allowDuplicates){
            hash[inKey].push(inValue);
        }else{
            /*if(isFunction(inValue)){
                var match = false;
                var theHashArray = hash[inKey];
                for(var hashIndex in theHashArray){
                    var theStoredFunction = theHashArray[hashIndex];
                    if(isFunction(theStoredFunction)){
                        if(JSON.stringify(theStoredFunction) != JSON.stringify(inValue)){
                        }else{
                            alert("added notMatched:" + JSON.stringify(theStoredFunction) + ">---to----<" + JSON.stringify(inValue));
                            _this.dump();
                            console.log("Matched:" + JSON.stringify(theStoredFunction) + ">---to----<" + JSON.stringify(inValue));
                            match = true;
                            break;
                        }
                    }
                }
                if(!(match)){
                    hash[inKey].push(inValue);
                    alert("added:" + JSON.stringify(inValue));
                    _this.dump();
                    console.log("added:" + JSON.stringify(inValue));
                }
            }else{*/

                if(hash[inKey].indexOf(inValue) == -1){
                    hash[inKey].push(inValue);
                }

            //}
        }
        
    }

    this.removeItemFromSpecificHash = function(inKey, inValue){
        if(!(inKey)){console.log('key was empty'); return false;};
        inKey = inKey.toString();
        var attemptValue = hash[inKey];
        if(!(attemptValue)){
            return false;
        }
        var arrayOfValues = attemptValue;
        for(var i = 0; i < arrayOfValues.length; i++){
            if(arrayOfValues[i] == inValue){
               delete arrayOfValues[i];
               hash[inKey] = arrayOfValues.filter(function(e){return e});
               return true;
            }
        }
        return false;        
    }

    this.removeItemFromAnyHash = function(inValue){
        var retBool = false;        
        for(hashKey in hash){        
            var arrayOfValues = hash[hashKey];
            for(var i = 0; i < arrayOfValues.length; i++){
                if(arrayOfValues[i] == inValue){
                   delete arrayOfValues[i];
                   hash[hashKey] = arrayOfValues.filter(function(e){return e});
                   retBool = true;
                }
            }
        }
        return retBool;
    };

    this.removeArrayFromHash = function(inKey){
        inKey = inKey.toString();
        var attemptValue = hash[inKey];
        if(!(attemptValue)){
            return false;
        }
        delete hash[inKey];
    }

    this.copy = function(inSourceKey, inTargetKey){
        var inSourceKey = inSourceKey.toString();
        var inTargetKey = inTargetKey.toString();

        if(!(inSourceKey in hash)){
            return false;
        }

        if(!(inTargetKey in hash)){
            hash[inTargetKey] = [];
        }

        //copy
        var arrayFromSource = hash[inSourceKey];
        var arrayFromTarget = hash[inTargetKey];
        for(var i = 0; i < arrayFromSource.length; i++){
            arrayFromTarget.push(arrayFromSource[i]);
        }
    }

    this.dump = function(inHead){
        for(hashKey in hash){        
            var arrayOfValues = hash[hashKey];
            for(var i = 0; i < arrayOfValues.length; i++){
                if(inHead){                    
                    console.log(inHead+"->"+hashKey+"[" + i + "]:"+JSON.stringify(hash[hashKey][i]));
                }else{
                    console.log(hashKey+"[" + i + "]:"+JSON.stringify(hash[hashKey][i]));
                }
                
            }
        }
    }

    

    this.getArrayFromHash = function(inKey){
        if(!(inKey)){console.log('key was empty'); return false;};
        inKey = inKey.toString();
        var attemptValue = hash[inKey];
        if(!(attemptValue)){
            return false;
        }

        return attemptValue;
    }

    this.getItemFromArray = function(inKey, inIndex){
        if(!(inKey in hash)){
            return false;
        }

        var arrayOfItems = hash[inKey];
        if(inIndex < arrayOfItems.length){            
            return arrayOfItems[inIndex];
        }
        return false;  

    }

    this.getLengthOfArray = function(inKey){
        if(!(inKey in hash)){
            return false;
        }
        return hash[inKey].length;
    }

    this.getKeys = function(){
        return Object.keys(hash);
    }

    this.getHash = function(){
        return hash;
    }

    this.getFirstKeyByValue = function(inValueToCheck){
        var keys = _this.getKeys();
        for(index in keys){
            var storedArrayForKey = _this.getArrayFromHash(keys[index]);
            for(arrayIndex in storedArrayForKey){
                if(storedArrayForKey[arrayIndex] == inValueToCheck){
                    return keys[index];
                }
            }
        }
        return false;
    }

    function isFunction(x) {
      return Object.prototype.toString.call(x) == '[object Function]';
    }
}

module.exports = HashOfArrayObject;