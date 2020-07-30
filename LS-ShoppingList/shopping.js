  const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.ingredients');
  const items = JSON.parse(localStorage.getItem('items')) || [] ;

  function addItem(e) {
      e.preventDefault(); 
      const text = (this.querySelector('[name=item]')).value; 
      const item = {
        text,
        done: false
      };
      this.reset(); //this is the form element
      items.push(item);
      populateList(items, itemsList);
      localStorage.setItem('items', JSON.stringify(items));
      console.table(items);
  };

  function populateList(ingredients = [], ingredientsList) { 
         ingredientsList.innerHTML = ingredients.map((ingredient, i) => { //item single, and an index, all sticked directly into the HTML
            return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${ingredient.done ? 'checked' : ''} />
                <label for="item${i}" class="ingredients_done">${ingredient.text}</label> 
                <a class="ingredients_close" href="${i}">x</a> 
            </li>
            `; 
        }).join(''); 
  };

  $('.ingredients').on('click', 'li a', function(event){
      event.preventDefault();
      //this.parentElement.style.display = 'none';
      $( this ).parent().hide( 400 );
      const index = event.target.getAttribute('href');
      console.log(index);
      removeItemfromArray(index);
  });

  function removeItemfromArray(index){ 
    let newArr = items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items)); 
  };

  function toggleDone(e) {
    if (e.target.matches('a')) {
      console.log('clicked');
    } else if (e.target.matches('input')) {
      const element = e.target;
      const index = element.dataset.index;
      items[index].done = !items[index].done; 
      localStorage.setItem('items', JSON.stringify(items)); 
      populateList(items, itemsList); 
    }
    
  };

  addItems.addEventListener('submit', addItem);
  itemsList.addEventListener('click', toggleDone);
  populateList(items, itemsList); 
//TODO- seach how to  //how do I update that one list item that I have instead of rendering the entire list - REACT or Angular
// instead of rerender the entire list 
//TODO-make a button uncheck all, check all, and mirror it all to localStorage