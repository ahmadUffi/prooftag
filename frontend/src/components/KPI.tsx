import * as React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface KPIProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  key?: any;
}

export default function KPI({ label, value, change, icon: Icon, color, bg }: KPIProps) {
  const isPositive = change.startsWith('+');

  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-xl ${bg} ${color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className={`text-xs font-bold ${isPositive ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'} px-2 py-1 rounded-full flex items-center gap-1`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {change}
          </span>
        </div>
        <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </CardContent>
    </Card>
  );
}
