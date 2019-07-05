const list = ['Apron', 'Belt','Cardigan','Dress','Earrings','Fur coat','Gloves','Hat'];
const nodes = list.map((item) => `<span>${item}<button class='unactive'>edit</button></span>`);

const EDIT = {
  type: 'edit',
  title: null,
  index: null
}

const BLUR = {
  type: 'blur'
}

const ENTER = {
  type: 'enter',
  title: null,
  index: null
}



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
    const span = li.querySelector('span');
    const button = li.querySelector('button');
    const input = li.querySelector('input');
    list.append(li);
   
    if (span && !inputPresent) {
      span.addEventListener('mouseenter', () => {
        li.querySelector('button').classList.toggle('unactive');
      });
      span.addEventListener('mouseleave', () => {
        li.querySelector('button').classList.toggle('unactive');
      });
      button.addEventListener('click', () => {
        EDIT.title = item;
        EDIT.index = store.getState().nodes.indexOf(item);
        store.dispatch(EDIT);
      });
    }

    if (input) {
      input.focus();
      input.addEventListener('blur', () => {
        store.dispatch(BLUR);
      });
      input.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
          ENTER.title = event.target.value;
          ENTER.index = store.getState().nodes.indexOf(item);
          store.dispatch(ENTER);
        }
      });
    }
  }
}
