export interface Movement {
    id: number,
    type: 'Income' | 'Expense',
    amount: number,
    description: string,
    date: Date
}