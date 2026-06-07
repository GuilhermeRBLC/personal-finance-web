import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardSummary } from '../../services/dashboard/dashboard';
import { Transaction } from '../../services/transactions/transactions';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  dashboardSummary = signal<DashboardSummary>({ currentBalance: 0, recentTransactions: [], totalExpense: 0, totalIncome: 0 });

  private dashboardService = inject(DashboardService);
  
  ngOnInit() {
    this.loadDashboardSummary();
  }

  loadDashboardSummary() {
    this.dashboardService.getSummary().subscribe({
      next: (data) => {
        this.dashboardSummary.set(data);
      },
      error: (err) => console.error('Erro obter informações do dashboard:', err)
    });
  }

  get totalIncome(): number {
    return this.dashboardSummary().totalIncome;
  }

  get totalExpense(): number {
    return this.dashboardSummary().totalExpense;
  }

  get currentBalance(): number {
    return this.dashboardSummary().currentBalance;
  }
  
  get recentTransactions(): Transaction[] {
    return this.dashboardSummary().recentTransactions;
  }

}
