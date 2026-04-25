import {
  BadgeCheck,
  Clock,
  QrCode,
  ShieldCheck,
  Scan,
  Wallet,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const quickStats = [
  {
    label: "Items Verified",
    value: "1,248",
    note: "+12% this month",
    icon: BadgeCheck,
    tone: "text-emerald-600 bg-emerald-50",
  },
  {
    label: "Ownership Claims",
    value: "312",
    note: "98% success rate",
    icon: Wallet,
    tone: "text-blue-600 bg-blue-50",
  },
  {
    label: "Active Watches",
    value: "42",
    note: "7 alerts in 24h",
    icon: ShieldCheck,
    tone: "text-amber-600 bg-amber-50",
  },
];

const recentScans = [
  {
    product: "Aurelia Luxe Watch",
    status: "Verified",
    time: "2 mins ago",
    location: "Jakarta, ID",
  },
  {
    product: "OxyPure Pack B-12",
    status: "Verified",
    time: "12 mins ago",
    location: "Bandung, ID",
  },
  {
    product: "Amber Coffee Beans",
    status: "Flagged",
    time: "45 mins ago",
    location: "Surabaya, ID",
  },
  {
    product: "Heritage Bag 07",
    status: "Verified",
    time: "2 hours ago",
    location: "Singapore",
  },
];

export default function Overview() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-10 w-56 h-56 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="relative z-10 grid lg:grid-cols-[1.4fr_0.6fr] gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              User Dashboard
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Track what you verified today
            </h2>
            <p className="text-slate-300 max-w-xl">
              Keep your verified items organized, claim ownership in seconds,
              and watch alerts for any suspicious scans tied to your products.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button className="bg-white text-slate-900 hover:bg-white/90">
              Scan a Product <QrCode className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" className="border-white/30 text-white">
              View Verified Items <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.tone}`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-400 mt-1">{stat.note}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent verifications</CardTitle>
            <CardDescription>
              Latest scans tied to your wallet and claims.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {recentScans.map((scan) => (
                <div
                  key={scan.product}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <Scan className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {scan.product}
                      </p>
                      <p className="text-xs text-slate-500">{scan.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        scan.status === "Flagged" ? "destructive" : "secondary"
                      }
                    >
                      {scan.status}
                    </Badge>
                    <span className="text-xs text-slate-400">{scan.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Ownership timeline</CardTitle>
            <CardDescription>
              Claims and transfers linked to your wallet.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              {
                title: "Claimed OxyPure Pack B-12",
                time: "2 days ago",
                status: "Completed",
              },
              {
                title: "Verified Heritage Bag 07",
                time: "4 days ago",
                status: "Completed",
              },
              {
                title: "Flagged Amber Coffee Beans",
                time: "1 week ago",
                status: "Needs Review",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-slate-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <Badge
                      variant={
                        item.status === "Needs Review"
                          ? "destructive"
                          : "secondary"
                      }
                      className="text-[10px]"
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    {item.time} <ExternalLink className="w-3 h-3" />
                  </p>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-sm text-slate-500">
              View all activity
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
