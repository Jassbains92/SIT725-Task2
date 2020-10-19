//Importing Expres Framework
const express = require ('express');

const app = express();

const port = 3000;

app.use(express.static(__dirname+ '/public'))

// Adding the result
let addition = function(num1,num2){
    result = num1+num2
    return result;
}


//Addition by getting values from the user
app.get('/calAdd', function(req, res){
    let num1 = parseInt(req.query.num1);
    let num2 = parseInt(req.query.num2);
    let sum = addition(num1, num2);
    res.send('The sum is ' + sum);
})

//Array to store deposit details of customers
let account=[
    {id:1,name:'Alex',deposit:5},
    {id:2,name:'Sarah',deposit:5},
    {id:3,name:'Jim',deposit:15}
]

//Function to retrieve data from array
let user = function(){
    var result =  "";
    var size = account.length;
    console.log('size = '+ size);
    Object.keys(account).forEach((key, index) => {
            console.log(account[key]);
            var myJsOn = JSON.stringify(account[key]);
            result += myJsOn + ' <br> ';         
            })
    return result;
}

//Function to retrieve data of a specific user
let accountUser = function(name){
    var result =  "";
    var size = account.length;
    Object.keys(account).forEach((key) => {
        if(Object.values(account[key]).includes(name)){
            console.log(account[key]);
            var myJsOn = JSON.stringify(account[key]);                
			result += myJsOn + ' <br> ';  
        }       
    })
    return result;
}


//Displaying the full array content
app.get('/', function(req, res){
    console.log(Array.isArray(account));
    let dep = account();
    res.send(dep);
}) 

//Displaying the full array content for Sarah
app.get('/Jim', function(req, res){
    let dep = accountUser('Jim');
    res.send(dep);
}) 

//Display the full array content for entered user in the url
app.get('/username', function(req, res){
    let text = req.query.text;
    let dep = accountUser(text);
    res.send(dep);
}) 

//Node Class
class Node{
    constructor(data, next = null){
        this.data = data,
        this.next = next
    }
}

//Linkedlist Class
class LinkedList{
    constructor(){
        this.head = null
    }


//Inserting Value 
addItem(data){

    
    let node = new Node(data); 


    if(this.head === null){    
        this.head = node;
    } else {
        
        
        let currentNode = this.head;

    
        while(currentNode.next !== null){
            currentNode  = currentNode.next;
        }
        
       
        currentNode.next = node;
        }
    }
}


// Creating linkedlist from the array
function newLinkedList(account) {

   
    let list = new LinkedList();
    
    
    account.forEach(element => {
        list.addItem(element);        
    });

    return list;
}

// function to look for specific record by name
function getAccountByName(name,list){
   
    let currentNode = list.head;
    
    //Traversing through
    while (currentNode) {
      if (currentNode.data.name === name) {
        return currentNode.data;
      }
      currentNode = currentNode.next;
    }

    return null;
}



// Creating newLinkedList 
var linkedList = newLinkedList(account);


//End point to display 
app.get('/output',function(req,res){
    console.log(linkedList);
    res.send(linkedList);
});



//starting and listening to the port 3000
app.listen(port);