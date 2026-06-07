import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccountsService, Account } from '../../services/accounts/accounts';
import { TransactionsService, Transaction } from '../../services/transactions/transactions';

@Component({
  selector: 'app-transactions',
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
})
export class Transactions implements OnInit {

  accounts = signal<Account[]>([]);

  allTransactions = signal<Transaction[]>([]);

  transactionData:Transaction = {
    id: 0,
    description: '',
    amount: 0,
    date: '',
    type: 'EXPENSE' as 'INCOME' | 'EXPENSE',
    category: '',
    accountId: 0
  };

  isEditing = false;

  searchQuery: string = '';
  startDate: string = '';
  endDate: string = '';

  // Paginação
  currentPage: number = 1;
  pageSize: number = 10; // Itens por página


  private accountsService = inject(AccountsService);
  private transactionsService = inject(TransactionsService);

  ngOnInit() {
    this.loadAccounts();
    this.loadTransactions();
    // Inicializa os filtros de data com o mês atual por padrão
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    this.startDate = `${year}-${month}-01`;
    
    const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
    this.endDate = `${year}-${month}-${lastDay}`;
  }

  loadAccounts() {
    this.accountsService.getAccounts().subscribe({
      next: (data) => {
        this.accounts.set(data);
      },
      error: (err) => console.error('Erro ao buscar contas:', err)
    });
  }

  loadTransactions() {
    this.transactionsService.getTransactions().subscribe({
      next: (data) => {
        this.allTransactions.set(data);
      },
      error: (err) => console.error('Erro ao buscar transações:', err)
    });
  }

  get filteredTransactions(): Transaction[] {
    return this.allTransactions().filter(t => {

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
    if (this.isEditing && this.transactionData.id !== null && this.transactionData.id !== undefined) {

      this.transactionsService.updateTransaction(this.transactionData.id, this.transactionData).subscribe({
        next: () => {
          this.loadTransactions();
          this.resetForm();
          this.currentPage = 1;
        },
        error: (err) => console.error('Erro ao atualizar a transação:', err)
      });

    } else {

      this.transactionsService.createTransaction(this.transactionData).subscribe({
        next: () => {
          this.loadTransactions();
          this.resetForm();
          this.currentPage = 1;
        },
        error: (err) => console.error('Erro ao criar transação:', err)
      });

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

  deleteTransaction(id: number | undefined) {
    if (!id) return;

    if (confirm('Deseja realmente excluir esta transação?')) {
      this.transactionsService.deleteTransaction(id).subscribe({
        next: () => {
          this.loadAccounts();
          if (this.transactionData.id === id) this.resetForm();
          if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
        },
        error: (err) => console.error('Erro ao excluir transação:', err)
      });
    }

  }

  getAccountName(accountId: number): string {
    return this.accounts().find(a => a.id === accountId)?.name || 'Desconhecida';
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.isEditing = false;
    this.transactionData = {
      id: 0,
      description: '',
      amount: 0,
      date: '',
      type: 'EXPENSE',
      category: '',
      accountId: 0
    };
  }
  
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

}
