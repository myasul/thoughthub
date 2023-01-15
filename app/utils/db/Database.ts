import { openDB } from 'idb'
import type { IDBPDatabase } from 'idb'
import { JournalSchema } from './types'

const DATABASE_NAME = 'journal'
const LATEST_DB_VERSION = 1
type DatabaseTable = 'entry'

export class Database {
    private readonly connectionPromise: Promise<IDBPDatabase<JournalSchema>>

    constructor (dbConnectionPromise?: Promise<IDBPDatabase<JournalSchema>>) {
        this.connectionPromise = dbConnectionPromise ?? openDB<JournalSchema>(
            DATABASE_NAME,
            LATEST_DB_VERSION,
            {
                upgrade (db) {
                    db.createObjectStore('entry', { keyPath: 'date' })
                }
            }
        )
    }

    public async find (tableName: DatabaseTable, key: string) {
        const connection = await this.connectionPromise

        return connection.get(tableName, key)
    }

    public async findAll (tableName: DatabaseTable) {
        const connection = await this.connectionPromise

        return connection.getAll(tableName)
    }

    public async save (
        tableName: DatabaseTable,
        value: any
    ) {
        const connection = await this.connectionPromise

        return connection.put(tableName, value)
    }

    public async batchSave (
        tableName: DatabaseTable,
        data: any[]
    ) {
        const connection = await this.connectionPromise
        const transaction = connection.transaction(tableName, 'readwrite')
        const addPromises = data.map((pair) => transaction.store.put(pair))

        return Promise.all([...addPromises, transaction.done])
    }
}
