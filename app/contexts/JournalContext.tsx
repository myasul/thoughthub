import React, { createContext, useContext, useReducer } from 'react'
import type { Reducer, Dispatch } from 'react'

type Journal = {
    [date: string]: string | undefined
}

export enum JournalActionType {
    Update = 'UPDATE'
}

type JournalAction = { type: JournalActionType.Update, date: string, entry: string }


const journalReducer: Reducer<Journal, JournalAction> = (journal: Journal, action: JournalAction) => {
    if (action.type === JournalActionType.Update) {
        journal[action.date] = action.entry

        return { ...journal }
    }

    return journal
}

const initialJournal: Journal = {
    '01-01-2023': 'The quick brown fox jumps over the lazy dog.',
    '02-14-2023': 'She sells seashell by the seashore',
    '03-25-2023': 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    '04-02-2023': "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    '05-02-2023': 'Try not to become a man of success. Rather become a man of value.',
    '06-02-2023': "Successful people do what unsuccessful people are not willing to do. Don't wish it were easier; wish you were better.",
    '07-02-2023': 'I find that the harder I work, the more luck I seem to have.',
    '07-11-2023': "The real test is not whether you avoid this failure, because you won't. It's whether you let it harden or shame you into inaction, or whether you learn from it; whether you choose to persevere",
    '07-21-2023': "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma — which is living with the results of other people's thinking.",
    '07-29-2023': 'If life were predictable it would cease to be life and be without flavor.',
    '08-31-2023': "Many of life's failures are people who did not realize how close they were to success when they gave up.",
    '09-01-2023': 'Do not go where the path may lead, go instead where there is no path and leave a trail.',
    '10-15-2023': 'It is during our darkest moments that we must focus to see the light.',
    '12-24-2023': 'Tell me and I forget. Teach me and I remember. Involve me and I learn.'
}

const dummyDispatch: Dispatch<JournalAction> = (action: JournalAction) => {}

const JournalDispatchContext = createContext(dummyDispatch)
const JournalContext = createContext(initialJournal)

export const useJournal = () => useContext(JournalContext)
export const useJournalDispatch = () => useContext(JournalDispatchContext)

export const JournalProvider = ({ children }: { children: React.ReactNode }) => {
    const [journal, dispatch] = useReducer(journalReducer, initialJournal)

    return (
        <JournalContext.Provider value={journal}>
            <JournalDispatchContext.Provider value={dispatch}>
                {children}
            </JournalDispatchContext.Provider>
        </JournalContext.Provider>
    )
}

export const JournalDateFormat = 'MM-DD-YYYY'
