import { openDB } from 'idb'
import type { IDBPDatabase } from 'idb'

const DATABASE_NAME = 'journal'
const LATEST_DB_VERSION = 1

export class Database {
    private readonly connectionPromise: Promise<IDBPDatabase>

    constructor (dbConnectionPromise?: Promise<IDBPDatabase>) {
        this.connectionPromise = dbConnectionPromise ?? openDB(
            DATABASE_NAME,
            LATEST_DB_VERSION,
            {
                upgrade (db) {
                    db.createObjectStore('entry', { keyPath: 'date' })
                }
            }
        )
    }

    public async find (tableName: string, key: string | number) {
        const connection = await this.connectionPromise

        return connection.get(tableName, key)
    }

    public async findAll (tableName: string) {
        const connection = await this.connectionPromise

        return connection.getAll(tableName)
    }

    public async save (
        tableName: string,
        key: string,
        value: any
    ) {
        const connection = await this.connectionPromise

        return connection.put(tableName, value, key)
    }

    public async batchSave<Data> (
        tableName: string,
        data: Data[]
    ) {
        const connection = await this.connectionPromise
        const transaction = connection.transaction(tableName, 'readwrite')
        const addPromises = data.map((pair) => transaction.store.put(pair))

        return Promise.all([...addPromises, transaction.done])
    }
}
