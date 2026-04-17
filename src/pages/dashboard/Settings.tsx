import { 
  User, 
  Wallet, 
  Bell, 
  Key, 
  Users, 
  ShieldCheck,
  Save
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { walletService } from '@/lib/web3';

export default function Settings() {
  const adminWallet = walletService.getOrCreateWallet();

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold">Workspace Settings</h2>
        <p className="text-sm text-slate-500">Manage your brand configuration and team access</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="wallet">Blockchain</TabsTrigger>
          <TabsTrigger value="team">Team & API</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Brand Information</CardTitle>
              <CardDescription>How your brand appears to consumers during verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Brand Name</Label>
                <Input defaultValue="Shieldtag Official" />
              </div>
              <div className="grid gap-2">
                <Label>Support Email</Label>
                <Input defaultValue="support@shieldtag.io" />
              </div>
              <div className="grid gap-2">
                <Label>Verification Branding</Label>
                <div className="flex items-center gap-4 p-4 border rounded-lg bg-slate-50">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">Standard Shieldtag Theme</p>
                    <p className="text-xs text-slate-400">Consumers see your logo on a clean verified background</p>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-50 mt-6 pt-6">
              <Button className="gap-2">
                <Save className="w-4 h-4" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="wallet">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>System Wallets</CardTitle>
              <CardDescription>Wallets used for minting and burning digital twins</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Administrator Mint Wallet</Label>
                <div className="flex gap-2">
                  <div className="flex-1 p-3 bg-slate-900 text-white rounded-lg font-mono text-xs overflow-hidden truncate">
                    {adminWallet}
                  </div>
                  <Button variant="outline"><Key className="w-4 h-4 mr-2" /> Show Keys</Button>
                </div>
                <p className="text-[10px] text-slate-400">This wallet is auto-generated for your workspace and handles all automated minting logic.</p>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <Wallet className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Auto-fund Wallet</p>
                    <p className="text-xs text-slate-400">Automatically refill gas from credit balance</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card className="border-none shadow-sm">
             <CardHeader>
               <CardTitle>Team Management</CardTitle>
               <CardDescription>Invite colleagues to manage the Shieldtag dashboard</CardDescription>
             </CardHeader>
             <CardContent>
               <div className="space-y-4">
                 <div className="flex items-center justify-between py-3 border-b border-slate-50">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold">
                       AU
                     </div>
                     <div>
                       <p className="text-sm font-bold">Ahmad Uffi</p>
                       <p className="text-[10px] text-slate-400">ahmad@shieldtag.io • Owner</p>
                     </div>
                   </div>
                   <Badge>Admin</Badge>
                 </div>
                 <Button variant="outline" className="w-full gap-2">
                   <Users className="w-4 h-4" /> Invite Member
                 </Button>
               </div>
             </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
