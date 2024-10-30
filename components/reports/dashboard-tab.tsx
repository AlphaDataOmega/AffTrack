"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, MousePointerClick, UserCheck2, DollarSign, ArrowRightLeft, Target, TrendingDown, TrendingUp } from "lucide-react";

const data = [
  { name: 'Jan 1', visits: 5000, leads: 800, transfers: 400, clicks: 2400, conversions: 400, revenue: 4000 },
  { name: 'Jan 2', visits: 4200, leads: 750, transfers: 320, clicks: 1398, conversions: 210, revenue: 3000 },
  { name: 'Jan 3', visits: 6800, leads: 920, transfers: 480, clicks: 9800, conversions: 290, revenue: 2000 },
  { name: 'Jan 4', visits: 5400, leads: 840, transfers: 380, clicks: 3908, conversions: 300, revenue: 2780 },
  { name: 'Jan 5', visits: 4900, leads: 760, transfers: 340, clicks: 4800, conversions: 181, revenue: 1890 },
  { name: 'Jan 6', visits: 5200, leads: 830, transfers: 410, clicks: 3800, conversions: 250, revenue: 2390 },
  { name: 'Jan 7', visits: 5800, leads: 890, transfers: 450, clicks: 4300, conversions: 210, revenue: 3490 },
];

const metrics = [
  {
    title: "Total Visits",
    value: (data) => data.reduce((sum, item) => sum + item.visits, 0).toLocaleString(),
    change: "+12.5%",
    trend: "up",
    icon: Users,
    description: "Unique visitors to landing pages"
  },
  {
    title: "Total Leads",
    value: (data) => data.reduce((sum, item) => sum + item.leads, 0).toLocaleString(),
    change: "-3.2%",
    trend: "down",
    icon: UserCheck2,
    description: "Captured lead information"
  },
  {
    title: "Total Transfers",
    value: (data) => data.reduce((sum, item) => sum + item.transfers, 0).toLocaleString(),
    change: "+8.7%",
    trend: "up",
    icon: ArrowRightLeft,
    description: "Successful lead sales"
  },
  {
    title: "Total Clicks",
    value: (data) => data.reduce((sum, item) => sum + item.clicks, 0).toLocaleString(),
    change: "+5.3%",
    trend: "up",
    icon: MousePointerClick,
    description: "Ad placement clicks"
  },
  {
    title: "Total Conversions",
    value: (data) => data.reduce((sum, item) => sum + item.conversions, 0).toLocaleString(),
    change: "-1.8%",
    trend: "down",
    icon: Target,
    description: "Successful offer conversions"
  },
  {
    title: "Total Revenue",
    value: (data) => `$${data.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}`,
    change: "+15.4%",
    trend: "up",
    icon: DollarSign,
    description: "Total revenue generated"
  }
];

export default function DashboardTab() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium">{metric.title}</p>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="text-2xl font-bold">{metric.value(data)}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {metric.description}
                  </p>
                </div>
                <div className={`flex items-center space-x-1 ${
                  metric.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="name" 
                  className="text-sm" 
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  className="text-sm" 
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(value) => `${value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="visits" 
                  stroke="hsl(var(--primary))" 
                  name="Visits"
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="hsl(var(--secondary))" 
                  name="Leads"
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="transfers" 
                  stroke="hsl(var(--accent))" 
                  name="Transfers"
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="hsl(var(--destructive))" 
                  name="Clicks"
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="conversions" 
                  stroke="hsl(var(--muted-foreground))" 
                  name="Conversions"
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(145, 80%, 40%)" 
                  name="Revenue"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}