import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Plus, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending";
}

export default function Wallet() {
  const [balance] = useState(1250.50);
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "debit",
      amount: 25.00,
      description: "Chat with Emma",
      date: "2h ago",
      status: "completed",
    },
    {
      id: "2",
      type: "credit",
      amount: 100.00,
      description: "Top up",
      date: "1d ago",
      status: "completed",
    },
    {
      id: "3",
      type: "debit",
      amount: 15.00,
      description: "Voice call with James",
      date: "2d ago",
      status: "completed",
    },
    {
      id: "4",
      type: "credit",
      amount: 50.00,
      description: "Earnings from chat",
      date: "3d ago",
      status: "completed",
    },
  ]);

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 glass-card p-4 border-b border-border">
          <h1 className="text-2xl font-bold">Wallet</h1>
        </div>

        {/* Balance Card */}
        <div className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="gradient-primary rounded-3xl p-6 text-white shadow-2xl mb-6"
          >
            <p className="text-sm opacity-90 mb-2">Total Balance</p>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-5xl font-bold">${balance.toFixed(2)}</h2>
              <DollarSign className="w-12 h-12 opacity-50" />
            </div>
            <Button
              variant="glass"
              size="lg"
              className="w-full text-foreground"
            >
              <Plus className="mr-2" />
              Top Up
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card className="p-4 rounded-2xl glass-card">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                  <ArrowDownLeft className="w-5 h-5 text-success" />
                </div>
                <span className="text-sm text-muted-foreground">Earned</span>
              </div>
              <p className="text-2xl font-bold">$450</p>
              <p className="text-xs text-muted-foreground">This month</p>
            </Card>

            <Card className="p-4 rounded-2xl glass-card">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-destructive" />
                </div>
                <span className="text-sm text-muted-foreground">Spent</span>
              </div>
              <p className="text-2xl font-bold">$180</p>
              <p className="text-xs text-muted-foreground">This month</p>
            </Card>
          </div>

          {/* Transactions */}
          <div>
            <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
            <div className="space-y-3">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-2xl p-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        transaction.type === "credit"
                          ? "bg-success/20"
                          : "bg-destructive/20"
                      }`}
                    >
                      {transaction.type === "credit" ? (
                        <ArrowDownLeft className="w-6 h-6 text-success" />
                      ) : (
                        <ArrowUpRight className="w-6 h-6 text-destructive" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.date}
                      </p>
                    </div>

                    <div className="text-right">
                      <p
                        className={`font-bold ${
                          transaction.type === "credit"
                            ? "text-success"
                            : "text-destructive"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}$
                        {transaction.amount.toFixed(2)}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          transaction.status === "completed"
                            ? "bg-success/20 text-success"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
