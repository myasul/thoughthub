import type { DBSchema } from 'idb'

export interface JournalSchema extends DBSchema {
    entry: {
        key: string,
        value: {
            date: string, 
            text: string
        }
    }
}