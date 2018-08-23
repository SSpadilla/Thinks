
//----------Elements-------

const form = document.querySelector(".think__form");
const thinkList = document.querySelector(".think__list");

//-------Functions-------

//Local Storage
const getThinksOnLocalS = () => {
   let thinks;
   //identify if there are thinks
   if(!(localStorage.getItem("Thinks") === null) ){
      //return a Json array
      thinks = JSON.parse(localStorage.getItem("Thinks"));
   }else{
      //return a empy array
      thinks = [];
   }
   return thinks;
}

const addThinkLocalS = (think) => {
   thinks = getThinksOnLocalS();//is an array
   thinks.push(think);
   //add to local storage as a array of strings
   localStorage.setItem("Thinks",JSON.stringify(thinks));
}

const deleteThinkLocalS = (think) => {
   let thinks = getThinksOnLocalS();
   thinks.forEach((_think,i) => {
      if(_think === think){
         thinks.splice(i,1);
         return;
      }
   });
   localStorage.setItem("Thinks",JSON.stringify(thinks));
}
//Listener's functions

const deleteThink = (e)=>{
   e.preventDefault();
   if(e.target.classList.contains("delete")){
      e.target.parentElement.remove();
      let text = e.target.parentElement.innerText;
      deleteThinkLocalS(text.substring(0, (text.length - 1) ));
   }
}

const printThink = (think) =>{
   //Create a list item
   let thinkItem = document.createElement("LI");
   thinkItem.innerText = think;
   thinkItem.setAttribute("class","think__item");

   //Create a delete button by listItem
   let deleteButton = document.createElement("A");
   deleteButton.setAttribute("class","delete");
   deleteButton.innerText = "X";

   //Joining elements
   thinkItem.appendChild(deleteButton);
   thinkList.appendChild(thinkItem);
}

const addThink = (e)=>{
   e.preventDefault();
   const think = document.getElementById("thinkText").value;
   if (!(think === "")) {
      printThink(think)//print 
      addThinkLocalS(think);//Addig to local storage
   }
}

const loadThinks= () => {
   let thinks = getThinksOnLocalS();
   thinks.forEach(think => {
      printThink(think);
   });
}

//-------EventListeners------
const eventListeners = (() =>{
   //Delete think
   thinkList.addEventListener("click", deleteThink);

   //Add think
   document.querySelector(".think__form").addEventListener("submit",addThink);

   //Load thinks
   document.addEventListener("DOMContentLoaded",loadThinks());
})();
