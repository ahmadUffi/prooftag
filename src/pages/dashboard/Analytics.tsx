import { 
  BarChart3, 
  TrendingUp, 
  Globe, 
  Users,
  Search,
  Download
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Cell,
  PieChart,
  Pie
} from 'recharts';

const scanData = [
  { name: 'OxyPure', value: 450, color: '#3b82f6' },
  { name: 'Luxury Watch', value: 300, color: '#10b981' },
  { name: 'Harvest Honey', value: 200, color: '#f59e0b' },
  { name: 'Aroma Diffuser', value: 150, color: '#8b5cf6' },
];

const regionData = [
  { name: 'Jakarta', value: 35 },
  { name: 'Singapore', value: 25 },
  { name: 'Tokyo', value: 20 },
  { name: 'London', value: 10 },
  { name: 'Others', value: 10 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Market Analytics</h2>
          <p className="text-sm text-slate-500">Insights into consumer behavior and product reach</p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" /> Export Report
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm h-[400px]">
          <CardHeader>
            <CardTitle className="text-lg">Product Popularity</CardTitle>
            <CardDescription>Scan volume by product line</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scanData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} tick={{fontSize: 12, fontWeight: 500}} />
                <RechartsTooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none'}} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {scanData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm h-[400px]">
          <CardHeader>
            <CardTitle className="text-lg">Regional Distribution</CardTitle>
            <CardDescription>Scans by geographical region</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={regionData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 min-w-[120px]">
              {regionData.map((region, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}} />
                    <span className="text-slate-500">{region.name}</span>
                  </div>
                  <span className="font-bold">{region.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: 'Avg. Scan Time', value: '4.2s', desc: 'Scan to verify speed', icon: TrendingUp },
          { label: 'Mobile Conversion', value: '82%', desc: 'Product claims after scan', icon: Globe },
          { label: 'Retention Rate', value: '15%', desc: 'Repeat scan behavior', icon: Users },
        ].map((item, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="pt-6">
               <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-slate-50 rounded-lg">
                   <item.icon className="w-4 h-4 text-slate-400" />
                 </div>
                 <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</span>
               </div>
               <h3 className="text-3xl font-bold mb-2">{item.value}</h3>
               <p className="text-xs text-slate-500">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
