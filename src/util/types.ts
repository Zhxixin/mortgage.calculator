
export type MortgageDetails = {
    mortgageAmount?: number;// 贷款总额
    mortgageTerm?: number;// 贷款期限（以年为单位）
    interestRate?: number;// 年利率（百分比）
    mortgageType: MortgageType;//抵押贷款类型，还款，仅利息
}

export type MortgageType = "repayment" | "interestOnly";

export interface MortgageResult {
    monthlyInterest: number; // 每月还利息
    monthlyPayment: number; // 每月还款额
    totalPayment: number; // 总还款额
    totalInterest: number; // 总利息
}

export function calculateMortgage({
    mortgageAmount,
    interestRate,
    mortgageTerm,
}: MortgageDetails): MortgageResult {
    const monthlyRate = (interestRate ?? 0) / 100 / 12; // 转为月利率
    const totalMonths = (mortgageTerm ?? 0) * 12; // 总期数

    // 等额本息每月还款额计算
    const monthlyPayment =
        (mortgageAmount ?? 0) *
        (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);

    // 总还款额
    const totalPayment = monthlyPayment * totalMonths;

    // 总利息
    const totalInterest = totalPayment - (mortgageAmount ?? 0);

    // 每月还利息
    const monthlyInterest = totalInterest / totalMonths;

    return {
        monthlyPayment: parseFloat(monthlyPayment.toFixed(2)), // 保留两位小数
        monthlyInterest: parseFloat(monthlyInterest.toFixed(2)), // 保留两位小数
        totalPayment: parseFloat(totalPayment.toFixed(2)),
        totalInterest: parseFloat(totalInterest.toFixed(2)),
    };
}




export const numFormat = (
    num?: number,
    options: Intl.NumberFormatOptions & { currency?: string } = { style: "currency", currency: "GBP" }
): string => Intl.NumberFormat("en-GB", options).format(num ?? 0);


