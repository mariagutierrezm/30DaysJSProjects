  const inputText = document.querySelector('.add-items_ingredient'); 
  const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.ingredients');
  
  let done = false; 

  function getLocalStorage(){
    return localStorage.getItem('itemsList')
    ? JSON.parse(localStorage.getItem('itemsList'))
    : [];
  }  

  function createElement(id, text) {
    let items = getLocalStorage();
    const element = document.createElement("li");
    element.innerHTML = `
            <input type="checkbox" id="${id}" ${items.done ? 'checked' : ''} />
            <label for="${id}" class="ingredients_done">${text}</label> 
            <a class="ingredients_close" href="${id}">x</a> 
        `;
    itemsList.appendChild(element); 
    const deleteBtn = element.querySelector('.ingredients_close');
    deleteBtn.addEventListener("click", removeItem);  
  }
  
  function setUpItem() {
    let items = getLocalStorage();

    if(items.length > 0) {
      items.forEach(function (item) {
        createElement(item.id, item.text);
      });
    }
  }

  function addItemToLocalStorage(id, text) {
      const item = {
        id,
        text,
        done
      };
      let items = getLocalStorage();
      items.push(item);
      localStorage.setItem('itemsList', JSON.stringify(items));
      console.table(items);
  };

  function addItemByEvent(e){
    e.preventDefault();
    let items = getLocalStorage();
    const text = inputText.value;
    const id = getUniqueID();
    createElement(id, text);
    addItemToLocalStorage(id, text);
    this.reset();
  }

  function getUniqueID(){
    // always start with a letter (for DOM friendlyness)
    var idstr=String.fromCharCode(Math.floor((Math.random()*25)+65));
    do {                
        // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
        var ascicode=Math.floor((Math.random()*42)+48);
        if (ascicode<58 || ascicode>64){
            // exclude all chars between : (58) and @ (64)
            idstr+=String.fromCharCode(ascicode);    
        }                
    } while (idstr.length<32);

    return (idstr);
}

  function removeItem(e){
    e.preventDefault(); 
    const element = e.target.parentElement;
    itemsList.removeChild(element);

    const idElement = e.target.getAttribute('href');
    let items = getLocalStorage();
    // var index = 0;
    // for(var i = 0; i < items.length; i++) {
    //   if(items[i].id === idElement){
    //     index = i;
    //   }
    // }
    var index = items.map(item => item.id).indexOf(idElement);
    console.log(index, "is it");
    
    removeFromLocalStorage(index)
    /* https://stackoverflow.com/questions/7176908/how-to-get-index-of-object-by-its-property-in-javascript/54015295
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
    https://www.youtube.com/watch?v=etLF49Ete-0
    https://www.youtube.com/watch?v=lPZZwkrJ5n0&t=162s
    */
  };

  function removeFromLocalStorage(i) {
    let items = getLocalStorage();
    let newArr = items.splice(i, 1);
    localStorage.setItem('itemsList', JSON.stringify(items)); 
  }

  function toggleDone(e) {
    // if (e.target.matches('a')) {
    //   console.log('clicked');
    // } else 
    if (e.target.matches('input')) {
      const element = e.target.getAttribute('id');
      let items = getLocalStorage();

      // var index = items.map(item => item.done);
      console.log(element);
      for(var i = 0; i < items.length; i++){
        console.log("enter loop");
        console.log(items[i].done);
        if(!items[i].done && items[i].id === element) {
          items[i].done = true;
          console.log(items[i].done, "inside loop");
        }
      }
      // items[index].done = !items[index].done; 
      localStorage.setItem('itemsList', JSON.stringify(items)); 
    }
    
  };

  
  addItems.addEventListener('submit', addItemByEvent);
  itemsList.addEventListener('click', toggleDone);
  window.addEventListener('DOMContentLoaded', setUpItem);
//TODO- seach how to  //how do I update that one list item that I have instead of rendering the entire list - REACT or Angular
// instead of rerender the entire list 
//TODO-make a button uncheck all, check all, and mirror it all to localStorage