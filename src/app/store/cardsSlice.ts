import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { FlashCard } from '../../utils/cards';

interface CardsState {
    cardsList: FlashCard[]
}

const initialState: CardsState = {
  cardsList: [],
}

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setCards: (state, action: PayloadAction<FlashCard[]>) => {
            state.cardsList = action.payload
        },
    },
})

export const { setCards } = cardsSlice.actions;
export default cardsSlice.reducer
