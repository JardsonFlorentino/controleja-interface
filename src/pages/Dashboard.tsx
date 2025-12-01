import { useEffect, useState } from "react";
import MonthYearSelect from "../components/MonthYearSelect";
import {
  getTransactionsMonthly,
  getTransactionsSummary,
} from "../services/transactionService";
import type { MonthlyItem, TransactionSummary } from "../types/transactions";
import Card from "../components/Card";
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  Calendar,
  CalendarSearch,
  ChartNoAxesCombined,
  ClockAlert,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { formatCurrency } from "../utils/formatter";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const initialSummary: TransactionSummary = {
  totalExpenses: 0,
  totalIncomes: 0,
  balance: 0,
  previousBalance: 0,
  monthResult: 0,
  expensesByCategory: [],
};

interface ChartLabelProps {
  categoryName: string;
  percent: number;
}

const Dashboard = () => {
  const currentDate = new Date();
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [summary, setSummary] = useState<TransactionSummary>(initialSummary);
  const [monthlyItemData, setMonthlyItemData] = useState<MonthlyItem[]>([]);

  useEffect(() => {
    async function loadTransactionsSummary() {
      const response = await getTransactionsSummary(month, year);
      setSummary(response);
    }

    loadTransactionsSummary();
  }, [month, year]);

  useEffect(() => {
    async function loadTransactionsMonthly() {
      const response = await getTransactionsMonthly(month, year, 5);
      setMonthlyItemData(response.history);
    }

    loadTransactionsMonthly();
  }, [month, year]);

  const renderPieChartLabel = ({
    categoryName,
    percent,
  }: ChartLabelProps): string => {
    return ` ${categoryName}: ${(percent * 100).toFixed(1)}%`;
  };

  const formatTooTipValue = (value: number | string): string => {
    return formatCurrency(typeof value === "number" ? value : 0);
  };

  return (
    <div className="container-app py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex justify-center items-center bg-[#0e1615] rounded-xl border border-gray-700 p-2 px-4 text-primary-700 mb-2">
          <ChartNoAxesCombined className="w-9 h-9 mr-2" />
          <h1 className="text-4xl font-bold  md:mb-0">Dashbord</h1>
        </div>

        <MonthYearSelect
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          glowEffect={summary.balance > 0}
          glowColor={summary.balance > 0 ? "blue" : "red"}
          hover
          title="Saldo"
          subtitle="Saldo total no mês"
          icon={<Wallet className="text-primary-500" />}
        >
          <p
            className={`text-2xl font-semibold mt-2 ${
              summary.balance > 0 ? "text-primary-500" : "text-red-400"
            }`}
          >
            {formatCurrency(summary.balance)}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Saldo do mês anterior: {formatCurrency(summary.previousBalance)}
          </p>
          <p className="text-xs text-slate-400">
            Resultado do mês atual: {formatCurrency(summary.monthResult)}
          </p>
        </Card>

        <Card
          hover
          glowEffect={summary.totalIncomes > 0}
          glowColor="green"
          title="Receitas"
          subtitle="Valor no Mês"
          icon={<BanknoteArrowUp className="text-primary-500" />}
        >
          <p className="text-2xl font-semibold text-primary-500">
            {formatCurrency(summary.totalIncomes)}
          </p>
        </Card>

        <Card
          hover
          glowEffect={summary.totalExpenses > 0}
          glowColor="red"
          title="Despesas"
          subtitle="Valor no Mês"
          icon={<BanknoteArrowDown className="text-red-700" />}
        >
          <p className="text-2xl font-semibold text-red-700">
            {formatCurrency(summary.totalExpenses)}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-3">
        <Card
          icon={<TrendingUp size={20} className="text-primary-500" />}
          title="Despesas por Categoria"
          className="min-h-80"
          hover
        >
          {summary.expensesByCategory.length > 0 ? (
            <div className="h-72 mt-4">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={summary.expensesByCategory}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={50}
                    paddingAngle={2}
                    dataKey="amount"
                    nameKey="categoryName"
                    label={renderPieChartLabel}
                  >
                    {summary.expensesByCategory.map((entry) => (
                      <Cell
                        key={entry.categoryId}
                        fill={entry.categoryColor}
                      />
                    ))}
                  </Pie>
                  <div>
                    <Tooltip
                      formatter={formatTooTipValue}
                      contentStyle={{
                        backgroundColor: " #94a3b8c8",
                        borderColor: "#1a2b3e ",
                        textTransform: "capitalize",
                        borderRadius: "5px",
                        color: "#ffffff !important",
                      }}
                    />
                  </div>
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div>
              <p className="flex justify-center flex-col items-center text-3xl h-64 text-gray-500 gap-2">
                <ClockAlert size={60} />
                Nenhum despesa registrada nesse período
              </p>
            </div>
          )}
        </Card>

        <Card
          icon={<Calendar size={20} className="text-primary-500" />}
          title="Histórico Mensal"
          className="min-h-80"
          hover
        >
          <div className="h-72 mt-4">
            {monthlyItemData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyItemData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  tick={{ style: { textTransform: "capitalize" } }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(43, 255, 0, 0.482)"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    tick={{ style: { textTransform: "capitalize" } }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    tickFormatter={formatCurrency}
                    tick={{ style: { textTransform: "capitalize" } }}
                  />
                  <Tooltip
                    formatter={formatCurrency}
                    contentStyle={{
                      backgroundColor: " #94a3b8c8",
                      borderColor: "#1a2b3e ",
                      textTransform: "capitalize",
                      borderRadius: "5px",
                    }}
                    labelStyle={{ color: " #ffffff" }}
                  />
                  <Legend style={{ textTransform: "capitalize" }} />
                  <Bar
                    dataKey="expenses"
                    name={"DESPESA"}
                    fill="#b70040"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar
                    dataKey="income"
                    name={"RECEITA"}
                    fill="#0ac200"
                    activeBar={<Rectangle fill="gold" stroke="purple" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div>
                <p className="flex justify-center flex-col items-center text-3xl h-64 text-gray-500 gap-2">
                  <CalendarSearch size={60} />
                  Nenhum despesa registrada nesse período
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
