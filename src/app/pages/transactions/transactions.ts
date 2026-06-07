import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  accountId: number;
}

interface Account {
  id: number;
  name: string;
}

@Component({
  selector: 'app-transactions',
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
})
export class Transactions {

  accounts: Account[] = [
    { id: 1, name: 'Conta Corrente - Itaú' },
    { id: 2, name: 'Carteira' },
    { id: 3, name: 'Reserva de Emergência' }
  ];

  allTransactions: Transaction[] = [
    { id: 1, description: 'Salário Mensal', amount: 5000, date: '2026-06-01', type: 'INCOME', category: 'Trabalho', accountId: 1 },
    { id: 2, description: 'Supermercado Pão de Açúcar', amount: 350.20, date: '2026-06-02', type: 'EXPENSE', category: 'Alimentação', accountId: 1 },
    { id: 3, description: 'Combustível', amount: 120, date: '2026-06-03', type: 'EXPENSE', category: 'Transporte', accountId: 2 },
    { id: 4, description: 'Rendimento Poupança', amount: 45.50, date: '2026-06-05', type: 'INCOME', category: 'Investimentos', accountId: 3 },
    { id: 5, description: 'Assinatura Streaming', amount: 55.90, date: '2026-06-05', type: 'EXPENSE', category: 'Entretenimento', accountId: 1 },
    { id: 6, description: 'Freelance Design', amount: 1200, date: '2026-06-06', type: 'INCOME', category: 'Trabalho', accountId: 2 }
  ];

  transactionData = {
    id: null as number | null,
    description: '',
    amount: 0,
    date: '',
    type: 'EXPENSE' as 'INCOME' | 'EXPENSE',
    category: '',
    accountId: '' as number | string
  };

  isEditing = false;

  searchQuery: string = '';
  startDate: string = '';
  endDate: string = '';

  // Paginação
  currentPage: number = 1;
  pageSize: number = 10; // Itens por página

  ngOnInit() {
    // Inicializa os filtros de data com o mês atual por padrão
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    this.startDate = `${year}-${month}-01`;
    
    const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
    this.endDate = `${year}-${month}-${lastDay}`;
  }

  get filteredTransactions(): Transaction[] {
    return this.allTransactions.filter(t => {

      const matchesSearch = t.description.toLowerCase().includes(this.searchQuery.toLowerCase());

      const transactionDate = new Date(t.date);
      const matchesStartDate = this.startDate ? transactionDate >= new Date(this.startDate) : true;
      const matchesEndDate = this.endDate ? transactionDate <= new Date(this.endDate) : true;

      return matchesSearch && matchesStartDate && matchesEndDate;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  get paginatedTransactions(): Transaction[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredTransactions.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredTransactions.length / this.pageSize) || 1;
  }

  onSubmit() {
    if (this.isEditing && this.transactionData.id !== null) {
      const index = this.allTransactions.findIndex(t => t.id === this.transactionData.id);
      if (index !== -1) {
        this.allTransactions[index] = {
          ...(this.transactionData as Transaction),
          accountId: Number(this.transactionData.accountId)
        };
      }
    } else {
      const newTransaction: Transaction = {
        id: Date.now(),
        description: this.transactionData.description,
        amount: this.transactionData.amount,
        date: this.transactionData.date,
        type: this.transactionData.type,
        category: this.transactionData.category,
        accountId: Number(this.transactionData.accountId)
      };
      this.allTransactions.push(newTransaction);
    }
    this.resetForm();
    this.currentPage = 1;
  }

  editTransaction(transaction: Transaction) {
    this.isEditing = true;
    this.transactionData = {
      id: transaction.id,
      description: transaction.description,
      amount: transaction.amount,
      date: transaction.date,
      type: transaction.type,
      category: transaction.category,
      accountId: transaction.accountId
    };
  }

  deleteTransaction(id: number) {
    if (confirm('Deseja realmente excluir esta transação?')) {
      this.allTransactions = this.allTransactions.filter(t => t.id !== id);
      if (this.transactionData.id === id) this.resetForm();
      if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
    }
  }

  getAccountName(accountId: number): string {
    return this.accounts.find(a => a.id === accountId)?.name || 'Desconhecida';
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.isEditing = false;
    this.transactionData = {
      id: null,
      description: '',
      amount: 0,
      date: '',
      type: 'EXPENSE',
      category: '',
      accountId: ''
    };
  }
  
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

}
