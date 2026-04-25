import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  QrCode, 
  Eye, 
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Package
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QRCodeSVG } from 'qrcode.react';

const mockBatches = [
  { id: 'B-001', name: 'OxyPure Pack July', model: 'CONSUMABLE', total: 5000, created: '2026-04-10', status: 'DISTRIBUTION' },
  { id: 'B-002', name: 'Luxury Watch Series 5', model: 'DURABLE', total: 500, created: '2026-04-12', status: 'READY' },
  { id: 'B-003', name: 'Harvest Honey Batch #4', model: 'CONSUMABLE', total: 1200, created: '2026-04-15', status: 'MANUFACTURING' },
];

const mockProducts = [
  { id: 'ST-94021', batch: 'B-001', model: 'CONSUMABLE', status: 'ACTIVE', lastScan: '2026-04-16 14:20', location: 'Jakarta, ID' },
  { id: 'ST-94022', batch: 'B-001', model: 'CONSUMABLE', status: 'BURNED', lastScan: '2026-04-15 09:10', location: 'Singapore, SG' },
  { id: 'ST-10293', batch: 'B-002', model: 'DURABLE', status: 'ACTIVE', lastScan: '2026-04-14 18:45', location: 'London, UK' },
  { id: 'ST-10294', batch: 'B-002', model: 'DURABLE', status: 'TRANSFERRED', lastScan: '2026-04-12 11:30', location: 'Dubai, UAE' },
];

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Product Assets</h2>
          <p className="text-sm text-slate-500">Manage batches and individual product identities</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> New Batch
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Production Batch</DialogTitle>
              <DialogDescription>
                Define your batch parameters and mint digital assets.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Batch Name</label>
                <Input placeholder="e.g. Summer Collection 2026" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Product Model</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consumable">Consumable (One-time use / Token)</SelectItem>
                    <SelectItem value="durable">Durable (Ownership / NFT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Total Quantity</label>
                <Input type="number" placeholder="1000" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">Mint Batch & Generate QR Codes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="products">Physical Items</TabsTrigger>
          <TabsTrigger value="batches">Production Batches</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-slate-50">
              <div className="flex items-center gap-4 flex-1 max-w-sm">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input placeholder="Search serial ID..." className="pl-10" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Serial ID</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProducts.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-bold">{p.id}</TableCell>
                    <TableCell className="text-slate-500">{p.batch}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] font-bold">
                        {p.model}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {p.status === 'ACTIVE' && <div className="w-2 h-2 rounded-full bg-green-500" />}
                        {p.status === 'BURNED' && <div className="w-2 h-2 rounded-full bg-red-500" />}
                        {p.status === 'TRANSFERRED' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                        <span className="text-sm font-medium">{p.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium">{p.location}</span>
                        <span className="text-[10px] text-slate-400">{p.lastScan}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setSelectedProduct(p)}>
                            <QrCode className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        {selectedProduct && selectedProduct.id === p.id && (
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Product Identity Card</DialogTitle>
                              <DialogDescription>
                                Scannable Shieldtag for {selectedProduct.id}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col items-center justify-center p-8 bg-white border rounded-2xl gap-6">
                              <div className="p-4 bg-white border-4 border-slate-900 rounded-xl">
                                <QRCodeSVG value={`https://shieldtag.io/verify/${selectedProduct.id}`} size={200} />
                              </div>
                              <div className="text-center">
                                <p className="text-lg font-bold">Product ID: {selectedProduct.id}</p>
                                <p className="text-xs text-slate-400 tracking-widest uppercase mt-1">Authentic Shieldtag Document</p>
                              </div>
                            </div>
                            <DialogFooter className="sm:justify-start">
                              <Button type="button" variant="secondary" className="w-full">
                                Download High-Res
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        )}
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="batches">
           {/* Batch grid similar to table above but for batches */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {mockBatches.map(batch => (
               <Card key={batch.id} className="border-none shadow-sm overflow-hidden group">
                 <CardHeader className="pb-2">
                   <div className="flex justify-between items-start mb-2">
                     <Badge className={batch.model === 'CONSUMABLE' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}>
                       {batch.model}
                     </Badge>
                     <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                   </div>
                   <CardTitle className="text-xl">{batch.name}</CardTitle>
                   <CardDescription className="flex items-center gap-2 mt-1">
                     <Package className="w-3 h-3" /> {batch.total.toLocaleString()} units
                   </CardDescription>
                 </CardHeader>
                 <CardContent>
                   <div className="space-y-4">
                     <div className="flex justify-between text-xs">
                       <span className="text-slate-400">Created: {batch.created}</span>
                       <span className={cn(
                         "font-bold",
                         batch.status === 'READY' ? "text-green-500" : "text-orange-500"
                       )}>{batch.status}</span>
                     </div>
                     <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                       <div className="bg-primary h-full transition-all" style={{ width: batch.status === 'READY' ? '100%' : '65%' }} />
                     </div>
                     <Button className="w-full opacity-0 group-hover:opacity-100 transition-opacity" variant="outline">View Batch Details</Button>
                   </div>
                 </CardContent>
               </Card>
             ))}
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
