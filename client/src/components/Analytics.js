import { Progress } from 'antd'
import React from 'react'

const Analytics = ({ allTransaction }) => {
    // category
    const categories = ['salary', 'tip', 'project', 'food', 'movie', 'bills', 'fee', 'medical', 'tax']

    // total transaction
    const totalTransaction = allTransaction.length
    const totalIncomeTransaction = allTransaction.filter((transaction) => transaction.type === 'income')
    const totalExpenseTransaction = allTransaction.filter((transaction) => transaction.type === 'expense')
    const totalIncomePercent = (totalIncomeTransaction.length / totalTransaction) * 100
    const totalExpensePercent = (totalExpenseTransaction.length / totalTransaction) * 100

    // total turnover
    const totalTurnover = allTransaction.reduce((acc, transaction) =>
        acc + transaction.amount,
        0
    )

    const totalIncomeTurnover = allTransaction.filter((transaction) =>
        transaction.type === "income").reduce((acc, transaction) =>
            acc + transaction.amount,
            0
        )

    const totalExpenseTurnover = allTransaction.filter((transaction) =>
        transaction.type === 'expense').reduce((acc, transaction) =>
            acc + transaction.amount,
            0
        )

    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100

    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100

    return (
        <>
            <div className='row m-3'>
                <div className='col-md-3'>
                    <div className='card'>
                        <div className='card-header bg-primary'>
                            <h6>Total Transactions : {totalTransaction}</h6>
                        </div>
                        <div className='card-body'>
                            <h5 className='text-success'>Income : {totalIncomeTransaction.length}</h5>
                            <h5 className='text-danger'>Expense : {totalExpenseTransaction.length}</h5>
                            <div>
                                <Progress type='circle' strokeColor={'green'} className='mx-2'
                                    percent={totalIncomePercent.toFixed(0)} />

                                <Progress type='circle' strokeColor={'red'} className='mx-2'
                                    percent={totalExpensePercent.toFixed(0)} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-md-3'>
                    <div className='card'>
                        <div className='card-header bg-warning'>
                            <h6>Total totalTurnover : {totalTurnover}</h6>
                        </div>
                        <div className='card-body'>
                            <h5 className='text-success'>Income : {totalIncomeTurnover}</h5>
                            <h5 className='text-danger'>Expense : {totalExpenseTurnover}</h5>
                            <div>
                                <Progress type='circle' strokeColor={'green'} className='mx-2'
                                    percent={totalIncomeTurnoverPercent.toFixed(0)} />

                                <Progress type='circle' strokeColor={'red'} className='mx-2'
                                    percent={totalExpenseTurnoverPercent.toFixed(0)} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-md-3'>
                    {
                        categories.map((category) => {
                            const amount = allTransaction.filter((transaction) =>
                                transaction.type === "income" && transaction.category === category
                            ).reduce((acc, transaction) => acc + transaction.amount, 0)
                            return (
                                amount > 0 && (
                                    <div className='card'>
                                        <div className='card-header bg-success'>
                                            <h6>Categorywise Income</h6>
                                        </div>
                                        <div className='card-body'>
                                            <h5>{category}</h5>
                                            <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                                        </div>
                                    </div>

                                )
                            )

                        })
                    }
                </div>
                <div className='col-md-3'>
                        {
                            categories.map((category) => {
                                const amount = allTransaction.filter((transaction) =>
                                    transaction.type === "expense" && transaction.category === category
                                ).reduce((acc, transaction) => acc + transaction.amount, 0)
                                return (
                                    amount > 0 && (
                                        <div className='card'>
                                            <div className='card-header bg-info'>
                                                <h6>Categorywise Expense</h6>
                                            </div>
                                            <div className='card-body'>
                                                <h5>{category}</h5>
                                                <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} />
                                            </div>
                                        </div>

                                    )
                                )

                            })
                        }
                </div>
            </div>
        </>
    )
}

export default Analytics