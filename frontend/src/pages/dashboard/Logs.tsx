import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Search, 
  Download,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const mockLogs = [
  { id: 'LOG-001', pid: 'ST-94021', time: '2026-04-16 14:20:11', location: 'Tokyo, JP', status: 'VALID', ip: '192.168.1.1' },
  { id: 'LOG-002', pid: 'ST-94021', time: '2026-04-16 14:22:05', location: 'London, UK', status: 'DUPLICATE', ip: '203.0.113.4' },
  { id: 'LOG-003', pid: 'ST-UNKNOWN', time: '2026-04-16 12:45:00', location: 'Berlin, DE', status: 'INVALID', ip: 'unknown' },
  { id: 'LOG-004', pid: 'ST-10293', time: '2026-04-15 18:45:30', location: 'Singapore, SG', status: 'VALID', ip: '172.16.254.1' },
  { id: 'LOG-005', pid: 'ST-94022', time: '2026-04-15 09:10:15', location: 'Jakarta, ID', status: 'VALID', ip: '10.0.0.5' },
];

export default function Logs() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Verification Logs</h2>
          <p className="text-sm text-slate-500">History of all product scans and security events</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-6">
          <div className="flex items-center gap-4 flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search logs..." className="pl-10 px-4 py-2" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Log ID</TableHead>
              <TableHead>Product ID</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="text-xs font-mono text-slate-400">{log.id}</TableCell>
                <TableCell className="font-bold">{log.pid}</TableCell>
                <TableCell className="text-xs text-slate-500">{log.time}</TableCell>
                <TableCell className="text-sm font-medium">{log.location}</TableCell>
                <TableCell>
                  <Badge 
                    className={
                      log.status === 'VALID' ? 'bg-green-100 text-green-700' : 
                      log.status === 'DUPLICATE' ? 'bg-orange-100 text-orange-700' : 
                      'bg-red-100 text-red-700'
                    }
                  >
                    {log.status === 'VALID' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {log.status === 'DUPLICATE' && <AlertCircle className="w-3 h-3 mr-1" />}
                    {log.status === 'INVALID' && <XCircle className="w-3 h-3 mr-1" />}
                    {log.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-slate-400 font-mono">
                  IP: {log.ip}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
