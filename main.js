const list = ['Apron', 'Belt','Cardigan','Dress','Earrings','Fur coat','Gloves','Hat'];
const nodes = list.map((item) => `<span>${item}<button class='unactive'>edit</button></span>`);

const initialState = {
  items: list,
  nodes: nodes
}

function reducer(state, action) {
  switch(action.type) {
    case 'edit':
      return {
        ...state,
        nodes: state.items.map((item, index) => {
          if(index === action.index) {
            return `<input type='text' value=${item}></input>`;
          }
          return `<span>${item}<button class='unactive'>edit</button></span>`;
        })
      };
    case 'blur':
      return {
        ...state,
        nodes: state.items.map((item) => {
          return `<span>${item}<button class='unactive'>edit</button></span>`
        })
      };
    case 'enter':
      let newItems;
      let newNodes;
      if(action.title === '') {
        newItems = state.items.filter((item, index) => index !== action.index);
        newNodes = newItems.map((item) => {
          return `<span>${item}<button class='unactive'>edit</button></span>`
        });
      } else {
        newItems = state.items.map((item, index) => {
          if (index === action.index) {
            return action.title
          }
          return item
        });
        newNodes = state.items.map((item, index) => {
          if (index === action.index) {
            return `<span>${action.title}<button class='unactive'>edit</button></span>`
          }
          return `<span>${item}<button class='unactive'>edit</button></span>`
        })
      }

      return {
        ...state,
        items: newItems,
        nodes: newNodes
      };
    default:
      return state
  }
}

const store = Redux.createStore(reducer, initialState);
store.subscribe(render);
render();

function render() {
  const list = document.querySelector('.list');
  list.innerHTML = '';
  let inputPresent = false;
  for(let item of  store.getState().nodes) {
    if(item.includes('input')) {
      inputPresent = true;
      break;
    }
  }
  
  for (let item of store.getState().nodes) {
    const li = document.createElement('li');
    li.insertAdjacentHTML('beforeend', item);
    let span = li.querySelector('span');
    let button = li.querySelector('button');
    let input = li.querySelector('input');
    list.append(li);
   
    if (span && !inputPresent) {
      span.addEventListener('mouseenter', () => {
        li.querySelector('button').classList.toggle('unactive');
      });
      span.addEventListener('mouseleave', () => {
        li.querySelector('button').classList.toggle('unactive');
      });
      button.addEventListener('click', (e) => {
        store.dispatch({
          type: 'edit',
          title: item,
          index: store.getState().nodes.indexOf(item)
        });
      });
    }

    if (input) {
      input.focus();
      input.addEventListener('blur', () => {
        store.dispatch({
          type: 'blur'
        });
      });
      input.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
          store.dispatch({
            type: 'enter',
            title: event.target.value,
            index: store.getState().nodes.indexOf(item)
          });
        }
      });
    }
  }
}
