import { 
  Key, 
  User, 
  ArrowRightLeft, 
  ExternalLink, 
  ShieldCheck,
  Zap,
  Fingerprint
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const mockOwnership = [
  { id: 'TKN-001', pid: 'ST-94021', type: 'TOKEN', owner: '0x71C...4f2', status: 'ACTIVE', network: 'Shield Mainnet' },
  { id: 'TKN-002', pid: 'ST-94022', type: 'TOKEN', owner: '0x000...000', status: 'BURNED', network: 'Shield Mainnet' },
  { id: 'NFT-901', pid: 'ST-10293', type: 'NFT', owner: '0x3aB...1d9', status: 'ACTIVE', network: 'EtherLayer 2' },
  { id: 'NFT-902', pid: 'ST-10294', type: 'NFT', owner: '0xfE2...a88', status: 'ACTIVE', network: 'EtherLayer 2' },
];

export default function Ownership() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Ownership Registry</h2>
          <p className="text-sm text-slate-500">Blockchain-verified digital twin states</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-white py-1.5 px-3">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
            Blockchain Sync: Live
          </Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Smart Contract Status
            </CardTitle>
            <CardDescription>Global ownership parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Zap className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-bold">Token Burner v2.1</p>
                  <p className="text-[10px] text-slate-400 font-mono">0x42...88ab</p>
                </div>
              </div>
              <Badge>Operational</Badge>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Fingerprint className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-bold">NFT Registry v1.0</p>
                  <p className="text-[10px] text-slate-400 font-mono">0x99...ff32</p>
                </div>
              </div>
              <Badge>Operational</Badge>
            </div>
            <Button variant="outline" className="w-full text-xs">View Protocol Documentation</Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-primary" />
              Recent Transfers
            </CardTitle>
            <CardDescription>Live feed of ownership changes</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {[1, 2, 3].map((_, i) => (
                 <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">Transfer ST-10294</p>
                        <p className="text-[10px] text-slate-400">To: 0xfE2...a88</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">14 mins ago</p>
                 </div>
               ))}
               <Button variant="ghost" className="w-full text-xs mt-4">Expand Feed</Button>
             </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900">Digital Asset List</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Asset ID</TableHead>
              <TableHead>Product ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Current Owner</TableHead>
              <TableHead>Network</TableHead>
              <TableHead>State</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOwnership.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono text-xs">{item.id}</TableCell>
                <TableCell className="font-bold">{item.pid}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[10px]">
                    {item.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs text-slate-500">{item.owner}</TableCell>
                <TableCell className="text-xs font-medium">{item.network}</TableCell>
                <TableCell>
                  <Badge className={item.status === 'BURNED' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                   <Button variant="ghost" size="icon">
                     <ExternalLink className="w-4 h-4" />
                   </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
