import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { FlashCards } from '../../utils/cards';

interface CardsState {
    cardsList: FlashCards
}

const initialState: CardsState = {
  cardsList: [],
}

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setCards: (state, action: PayloadAction<FlashCards>) => {
            state.cardsList = action.payload
        },
    },
})

export const { setCards } = cardsSlice.actions;
export default cardsSlice.reducer
