let addCardBtn = document.querySelector(".addCards");
let taskAdder = document.querySelector(".taskAddContainer");
let textContainer = document.querySelector(".taskText");
let priorityColorTask = document.querySelector(".priorityColorTask");
let taskBoxes = document.querySelectorAll(".taskBox");
let mainCardCont = document.querySelector("main");
let priorityColorBar = document.querySelector(".priorityColor");
let allCardsBtn = document.querySelector(".allCards");
let deleteIcon = document.querySelector(".deleteIcon");

let colors = ["purple" , "pink" , "blue" , "yellow"];
let deletequery = false ;
let border = "purple" ;

let tasksOfLocalStorage = localStorage.getItem("Tasks");


let taskArray = [];

if( tasksOfLocalStorage){
    taskArray = [...JSON.parse(tasksOfLocalStorage)];
}ticketAdderToUI(taskArray);

addCardBtn.addEventListener("click", () => {
    taskAdder.classList.toggle("noDisplay");
});

textContainer.addEventListener("keydown", (event) => {
    let taskText = event.target.value;
    let keyPressed = event.key;

    if(keyPressed == "Enter"){
        event.target.value = "";
        taskAdder.classList.toggle("noDisplay");
      //  console.log(taskText, border);
      let taskObj = {
        id : Date.now(),
        text : taskText,
        color : border
      };

      taskArray.push(taskObj);
      updateLocalStorage(taskArray)
      mainCardCont.innerHTML = "";
      ticketAdderToUI(taskArray);
    }
});

// border updating the color preference of task Added

priorityColorTask.addEventListener("click", (event)=> {
    let clickedBox = event.target ;

    taskBoxes.forEach((taskBox) => {
        taskBox.classList.remove("colorBorder");
    });

    console.log(clickedBox.classList);
    if(clickedBox.classList[0] == "taskBox") {
        border = clickedBox.classList[2];
        clickedBox.classList.add("colorBorder");
    }
}); 

   function ticketAdderToUI(arr)  {
     arr.forEach((taskObj) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML ='  <div class="colorCont ${taskObj.color}"></div>
                <div class="textArea"> ${taskObj.text}</div> 
                <span class="lockIcon close"><svg xmlns="http://www.w3.org/2000/svg" width="38px" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM11 15.7324V18H13V15.7324C13.5978 15.3866 14 14.7403 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 14.7403 10.4022 15.3866 11 15.7324ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z"></path></svg></span>
                ';

        mainCardCont.appendChild(card);
        
        let cardColorCont = card.querySelector(".colorCont");


        //color changing stripe of task

        cardColorCont.addEventListener("click", () =>{
            let currentColor = cardColorCont.classList(1);
            let currentColorIdx = colors.indexOf(currentColor);
            // console.log(currentColorIdx)

            let nextColor = colors[(currentColorIdx + 1)%4];

            cardColorCont.classList.remove(currentColor) //UI Update
            cardColorCont.classList.add(nextColor);

            // taskArray Update

            taskObj.color = nextColor;
            updateLocalStorage(taskArray)

        });

        // delete card
        card.addEventListener.apply("click", () => {
            if(deletequery == false) return;

            //removing card from taskArray
            let cardID = taskObj.id ;
            let filteredTaskArray = taskArray.filter(taskObj => taskObj.id != cardID);
            taskArray = [...filteredTaskArray];
            updateLocalStorage(taskArray)

            //UI remove

            mainCardCont.removeChild(card);
        });

        //Lock funcitonality

        let textAreaCard = card.querySelector(".textArea");
        let lockIcon = card.querySelector(".lockIcon");

            lockIcon.addEventListener("ckick", (event) => {

                if(lockIcon.classList[1] == 'close'){
                    lockIcon.classList.remove("close");
                    lockIcon.classList.add("open");
                    textAreaCard.setAttribute("contentedtable" , "true")
                lockIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="38px" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C14.7405 2 17.1131 3.5748 18.2624 5.86882L16.4731 6.76344C15.6522 5.12486 13.9575 4 12 4C9.23858 4 7 6.23858 7 9V10ZM10 15V17H14V15H10Z"></path></svg>'
            }
            else{
                lockIcon.classList.remove("open");
                 lockIcon.classList.add("close");
                 taskObj.text = textAreaCard.innerHTML;
                 updateLocalStorage(taskArray)
                 textAreaCard.setAttribute("contentedtable" , "false")
                 lockIcon.innerHTML = 'svg xmlns="http://www.w3.org/2000/svg" width="38px" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM11 15.7324V18H13V15.7324C13.5978 15.3866 14 14.7403 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 14.7403 10.4022 15.3866 11 15.7324ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z"></path></svg>'
            }
            })

     });
   }

   priorityColorBar.addEventListener("click", (event) => {
    let clickedBox = event.target

    if(clickedBox.classList[0] == "box"){
        
        let color = clickedBox.classList[1];

        let filteredTaskArray = taskArray.filter(taskObj => taskObj.color == color);

        mainCardCont.innerHTML = "";
      ticketAdderToUI(filteredTaskArray);
    }
   });

   allCardsBtn.addEventListener("click", (event) => {
    mainCardCont.innerHTML = "";
    ticketAdderToUI(TaskArray);

   })

   deleteIcon.addEventListener("click", () => {
    deletequery = !deletequery;
    deleteIcon.classList.toggle("#860A35");
   })

   function updateLocalStorage(arr){
    localStorage.setItem("Tasks", JSON.stringify(arr));
   }
