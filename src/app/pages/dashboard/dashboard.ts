import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  transactions: Transaction[] = [
    { id: 1, description: 'Salário Mensal', amount: 5000.00, date: '2026-06-01', type: 'INCOME', category: 'Trabalho' },
    { id: 2, description: 'Supermercado', amount: 450.30, date: '2026-06-02', type: 'EXPENSE', category: 'Alimentação' },
    { id: 3, description: 'Freelance Web', amount: 1500.00, date: '2026-06-04', type: 'INCOME', category: 'Trabalho' },
    { id: 4, description: 'Conta de Luz', amount: 180.20, date: '2026-06-05', type: 'EXPENSE', category: 'Contas' },
    { id: 5, description: 'Gasolina', amount: 120.00, date: '2026-06-06', type: 'EXPENSE', category: 'Transporte' },
  ];

  get totalIncome(): number {
    return this.transactions
      .filter(t => t.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get totalExpense(): number {
    return this.transactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get currentBalance(): number {
    return this.totalIncome - this.totalExpense;
  }
  
  get recentTransactions(): Transaction[] {
    return this.transactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }

}
