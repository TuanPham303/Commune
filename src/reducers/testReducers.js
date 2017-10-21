// import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'

const initialState = [{text: 'type and press enter'}]

export default function testActions(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TEXT':
      return [
        ...state,
        { text: action.text }
      ]

    default:
      return state
  }
}
