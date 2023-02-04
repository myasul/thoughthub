export enum EntryLevel {
    LevelZero = '#ebedf0',
    LevelOne = '#9be9a8',
    LevelTwo = '#40c463',
    LevelThree = '#30a14e',
    LevelFour = '#216e39'
}

export const getEntryLevel = (entry: string) => {
    if (entry === '') return EntryLevel.LevelZero

    const wordCount = entry.split(' ').length

    if (wordCount > 30) return EntryLevel.LevelFour
    if (wordCount > 25) return EntryLevel.LevelThree
    if (wordCount > 10) return EntryLevel.LevelTwo
    
    return EntryLevel.LevelOne

}
