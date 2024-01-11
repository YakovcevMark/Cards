type PaginationInfo = {
    page: number
    pageCount: number
}

export type CardPack = {
    _id: string
    user_id: string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number
    rating: number
    type: string
    created: string
    updated: string
    __v: number
}
export type Card = {
    answer: string
    question: string
    cardPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}
export type PacksDataResponse = PaginationInfo & {
    cardPacks: CardPack[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
}
export type CardDataResponse = PaginationInfo & {
    cards: Card[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
}