/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Node(val1, val2, val3, val4, pri){
    this.value1 = val1;
    this.value2 = val2;
    this.value3 = val3;
    this.value4 = val4;
    
    this.priority = pri;
}

Node.prototype.getUnit1 = function(){
    return [this.value1, this.value2];
};

Node.prototype.getUnit2 = function(){
    return [this.value3, this.value4];
};



