const { createStore } = require('./redux.min');

const initialState = {
  items: ['Apron', 'Belt', 'Cardigan', 'Dress', 'Earrings', 'Fur coat', 'Gloves', 'Hat'],
  selectedIndex: null,
}
const ACTIONS = {
  SELECT: 'SELECT',
  MOVE_UP: 'MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN',
};


  const selectItem = (index) => ({
      type: ACTIONS.SELECT,
      index: index,
    }
  );
  
  const moveUp = () => ({
    type: ACTIONS.MOVE_UP,
  });
  
  const moveDown = () => ({
    type: ACTIONS.MOVE_DOWN,
  }); 



function itemReducer (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SELECT: {
      return {
        ...state,
        selectedIndex: action.index,
      };
    }
    case ACTIONS.MOVE_UP: {
      const itemsArr = [...state.items]
      const temp = itemsArr[state.selectedIndex];
      if (state.selectedIndex > 0) {
        itemsArr[state.selectedIndex] = itemsArr[state.selectedIndex - 1];
        itemsArr[state.selectedIndex - 1] = temp;
        return {
          ...state,
          items: itemsArr,
          selectedIndex: state.selectedIndex - 1
        };
      }
        return state;
    }

      case ACTIONS.MOVE_DOWN: {
        const itemsArr = [...state.items]
        const temp = itemsArr[state.selectedIndex];
        if (state.selectedIndex < state.items.length) {
          itemsArr[state.selectedIndex] = itemsArr[state.selectedIndex + 1];
          itemsArr[state.selectedIndex + 1] = temp;
          return {
            ...state,
            items: itemsArr,
            selectedIndex: state.selectedIndex + 1
          };
        }
        return state;
      }
    default:
    return state;
  }
}

const store = createStore(itemReducer);
store.dispatch(selectItem(0));
store.dispatch(moveDown());
store.dispatch(moveDown());

console.log('Should be true', initialState.items[0] === store.getState().items[2]);
