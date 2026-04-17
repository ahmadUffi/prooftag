import { 
  MapPin, 
  Package, 
  Truck, 
  Warehouse, 
  Store, 
  UserCheck,
  Search,
  Filter,
  ChevronRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const timelineEvents = [
  { id: 1, type: 'MANUFACTURING', status: 'COMPLETED', location: 'Guangdong Tech Hub, CN', date: '2026-04-10 08:30', icon: Warehouse, color: 'text-gray-400' },
  { id: 2, type: 'WAREHOUSE', status: 'COMPLETED', location: 'HK Logistics Center, HK', date: '2026-04-12 14:20', icon: Package, color: 'text-blue-500' },
  { id: 3, type: 'DISTRIBUTION', status: 'IN_TRANSIT', location: 'Singapore Port, SG', date: '2026-04-14 11:15', icon: Truck, color: 'text-orange-500' },
  { id: 4, type: 'RETAIL', status: 'PENDING', location: 'Central Mall Orchard, SG', date: '-', icon: Store, color: 'text-slate-200' },
  { id: 5, type: 'CONSUMER_SCAN', status: 'PENDING', location: 'N/A', date: '-', icon: UserCheck, color: 'text-slate-200' },
];

export default function Tracking() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Supply Chain Tracking</h2>
          <p className="text-sm text-slate-500">Trace product journeys from factory to consumer</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Enter Serial ID..." className="pl-10 w-[250px]" />
          </div>
          <Button>Track Item</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden flex flex-col min-h-[600px]">
          <CardHeader className="border-b border-slate-50">
            <CardTitle className="text-lg">Real-time Location Map</CardTitle>
            <CardDescription>Visualizing global distribution network</CardDescription>
          </CardHeader>
          <div className="flex-1 bg-slate-100 flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/map/1200/800')] bg-cover" />
            <div className="relative p-10 text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl font-bold">ST-94021 in Transit</h3>
              <p className="text-slate-500">Currently at Singapore Port Facility Z-4</p>
              <div className="mt-8 flex justify-center gap-2">
                <Badge variant="outline" className="bg-white">Lat: 1.3521</Badge>
                <Badge variant="outline" className="bg-white">Long: 103.8198</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="border-none shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Product Life-Cycle</CardTitle>
            <CardDescription>Event timeline for ST-94021</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 py-0">
            <div className="relative pl-10 space-y-12 py-6">
              <div className="absolute left-[39px] top-8 bottom-8 w-px bg-slate-200" />
              {timelineEvents.map((event, i) => (
                <div key={event.id} className="relative group">
                  <div className={`absolute -left-[30px] w-12 h-12 rounded-full border-4 border-white shadow-sm flex items-center justify-center bg-white z-10 transition-all ${event.status === 'COMPLETED' ? 'text-primary border-primary/20' : 'text-slate-300'}`}>
                    <event.icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold uppercase tracking-wider">{event.type.replace('_', ' ')}</span>
                      <Badge variant={event.status === 'COMPLETED' ? 'secondary' : event.status === 'IN_TRANSIT' ? 'default' : 'outline'} className="text-[9px] h-4">
                        {event.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{event.location}</p>
                    <span className="text-[10px] text-slate-400 mt-1">{event.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="p-6 border-t border-slate-50">
            <Button variant="outline" className="w-full gap-2">
              Generate Link for Consumer <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
