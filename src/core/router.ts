import { createRouter, createWebHistory } from "vue-router"
import DashboardView from "../modules/dashboard/DashboardView.vue"
import DebtView from "../modules/debt/DebtView.vue"
import CashflowView from "../modules/cashflow/CashflowView.vue"
import InvestmentView from "@/modules/investments/InvestmentView.vue"
import DebtDetailView from "../modules/debt/DebtDetailView.vue"

const routes = [
  { path: "/", component: DashboardView },
  { path: "/debts", component: DebtView },
  { path: "/cashflow", component: CashflowView },
  { path: "/investments", component: InvestmentView },
  { path: "/debts/:id", component: DebtDetailView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})