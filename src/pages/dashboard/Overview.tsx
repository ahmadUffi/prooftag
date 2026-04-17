import { 
  Users, 
  Package, 
  Scan, 
  AlertTriangle, 
  Clock,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import KPI from '@/components/KPI';

const data = [
  { name: 'Mon', scans: 450, fraud: 12 },
  { name: 'Tue', scans: 520, fraud: 8 },
  { name: 'Wed', scans: 480, fraud: 15 },
  { name: 'Thu', scans: 610, fraud: 4 },
  { name: 'Fri', scans: 550, fraud: 10 },
  { name: 'Sat', scans: 380, fraud: 2 },
  { name: 'Sun', scans: 420, fraud: 5 },
];

const kpiData = [
  { label: 'Total Products', value: '124,502', change: '+12%', icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
  { label: 'Active Items', value: '88,291', change: '+5%', icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
  { label: 'Total Scans', value: '452,109', change: '+24%', icon: Scan, color: 'text-purple-600', bg: 'bg-purple-100' },
  { label: 'Fraud Alerts', value: '42', change: '-18%', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
];

export default function Overview() {
  return (
    <div className="space-y-8">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, i) => (
          <KPI 
            key={i} 
            label={kpi.label}
            value={kpi.value}
            change={kpi.change}
            icon={kpi.icon}
            color={kpi.color}
            bg={kpi.bg}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2 border-none shadow-sm h-[450px]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Scan Activity</CardTitle>
              <CardDescription>Daily scan volume across all regions</CardDescription>
            </div>
            <Button variant="outline" size="sm">Last 7 Days</Button>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                />
                <Area type="monotone" dataKey="scans" stroke="#3b82f6" fillOpacity={1} fill="url(#colorScans)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-none shadow-sm overflow-hidden flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Latest events from the blockchain</CardDescription>
          </CardHeader>
          <ScrollArea className="flex-1">
            <div className="px-6 space-y-6 pb-6">
              {[
                { type: 'BURN', product: 'OxyPure Pack B-12', time: '2 mins ago', status: 'COMPLETED' },
                { type: 'SCAN', product: 'Luxury Watch W-402', time: '5 mins ago', status: 'VALID' },
                { type: 'MINT', product: 'New Harvest Batch #04', time: '12 mins ago', status: 'PENDING' },
                { type: 'TRANSFER', product: 'Antique Vase A-9', time: '1 hour ago', status: 'COMPLETED' },
                { type: 'FRAUD', product: 'OxyPure Pack B-11', time: '3 hours ago', status: 'FLAGGED' },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-slate-400" />
                    </div>
                    {i !== 4 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-6 bg-slate-100" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold truncate">
                        {activity.type} <span className="text-slate-400 font-normal">on</span> {activity.product}
                      </p>
                      <Badge variant={activity.status === 'FLAGGED' ? 'destructive' : 'secondary'} className="text-[10px] h-4">
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                      {activity.time} <ExternalLink className="w-3 h-3" />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t border-slate-50">
            <Button variant="ghost" className="w-full text-xs text-slate-400">View All Logs</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
