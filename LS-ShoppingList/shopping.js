  const inputText = document.querySelector('.add-items_ingredient'); 
  const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.ingredients');
  
  let done = false; 

  function getLocalStorage(){
    return localStorage.getItem("itemsList")
    ? JSON.parse(localStorage.getItem("itemsList"))
    : [];
  }  

  function createElement(i, text) {
    let items = getLocalStorage();
    const element = document.createElement("li");
    element.innerHTML = `
            <input type="checkbox" data-index="${i}" id="item${i}" ${items.done ? 'checked' : ''} />
            <label for="item${i}" class="ingredients_done">${text}</label> 
            <a class="ingredients_close" href="${i}">x</a> 
        `;
    itemsList.appendChild(element);   
  }
  
  function setUpItem() {
    let items = getLocalStorage();

    if(items.length > 0) {
      items.forEach(function (item) {
        createElement(item.i, item.text);
      });
    }
  }

  function addItemToLocalStorage(i, text) {
      const item = {
        i,
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
    const i = items.length;
    createElement(i, text);
    addItemToLocalStorage(i, text);
    this.reset();
  }

  
  $('.ingredients').on('click', 'li a', function(event){
      event.preventDefault();
      $( this ).parent().hide( 400 );
      const index = event.target.getAttribute('href');
      console.log(index);
      removeItemfromArray(index);
  });

  function removeItemfromArray(index){ 
    let items = getLocalStorage();
    let newArr = items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items)); 
  };

  function toggleDone(e) {
    if (e.target.matches('a')) {
      console.log('clicked');
    } else if (e.target.matches('input')) {
      const element = e.target;
      const index = element.dataset.index;
      let items = getLocalStorage();
      items[index].done = !items[index].done; 
      localStorage.setItem('itemsList', JSON.stringify(items)); 
    }
    
  };

  
  addItems.addEventListener('submit', addItemByEvent);
  itemsList.addEventListener('click', toggleDone);
  window.addEventListener("DOMContentLoaded", setUpItem);
//TODO- seach how to  //how do I update that one list item that I have instead of rendering the entire list - REACT or Angular
// instead of rerender the entire list 
//TODO-make a button uncheck all, check all, and mirror it all to localStorage