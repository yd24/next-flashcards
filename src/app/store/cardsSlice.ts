import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { FlashCardsResult } from '../../utils/cards';

interface CardsState {
    cardsList: FlashCardsResult
}

const initialState: CardsState = {
  cardsList: [],
}

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setCards: (state, action: PayloadAction<FlashCardsResult>) => {
            state.cardsList = action.payload
        },
    },
})

export const { setCards } = cardsSlice.actions;
export default cardsSlice.reducer
