'use client';

import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Store,
  CreditCard,
  AlertCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';

// بيانات وهمية للإحصائيات
const STATS = [
  {
    title: 'إجمالي المبيعات',
    value: '1,234,567',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    title: 'الطلبات الجديدة',
    value: '156',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'المستخدمين النشطين',
    value: '2,345',
    change: '+5.1%',
    trend: 'up',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    title: 'المنتجات',
    value: '456',
    change: '-2.3%',
    trend: 'down',
    icon: Package,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
];

// بيانات الرسم البياني
const SALES_DATA = [
  { month: 'يناير', sales: 4500 },
  { month: 'فبراير', sales: 5200 },
  { month: 'مارس', sales: 4800 },
  { month: 'أبريل', sales: 6100 },
  { month: 'مايو', sales: 5500 },
  { month: 'يونيو', sales: 6800 },
  { month: 'يوليو', sales: 7200 },
];

const ORDERS_DATA = [
  { day: 'السبت', orders: 24 },
  { day: 'الأحد', orders: 18 },
  { day: 'الإثنين', orders: 32 },
  { day: 'الثلاثاء', orders: 28 },
  { day: 'الأربعاء', orders: 35 },
  { day: 'الخميس', orders: 42 },
  { day: 'الجمعة', orders: 38 },
];

// الطلبات الأخيرة
const RECENT_ORDERS = [
  { id: '#12345', customer: 'أحمد محمد', total: '12,500 دج', status: 'مؤكد', time: 'منذ 5 دقائق' },
  { id: '#12344', customer: 'فاطمة الزهراء', total: '8,900 دج', status: 'قيد التجهيز', time: 'منذ 15 دقيقة' },
  { id: '#12343', customer: 'كريم بن علي', total: '25,000 دج', status: 'تم الشحن', time: 'منذ 30 دقيقة' },
  { id: '#12342', customer: 'سارة أحمد', total: '5,600 دج', status: 'ملغي', time: 'منذ ساعة' },
  { id: '#12341', customer: 'محمد علي', total: '18,300 دج', status: 'مؤكد', time: 'منذ ساعتين' },
];

// المتاجر المعلقة
const PENDING_STORES = [
  { name: 'متجر التقنية', owner: 'أحمد محمد', date: '2024-01-15', status: 'قيد المراجعة' },
  { name: 'بيت الأناقة', owner: 'فاطمة الزهراء', date: '2024-01-14', status: 'في الانتظار' },
];

const chartConfig = {
  sales: {
    label: "المبيعات",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">لوحة التحكم</h1>
          <p className="text-muted-foreground">مرحباً بك في لوحة تحكم ChariDay</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4 ml-2" />
            آخر 7 أيام
          </Button>
          <Button size="sm">
            تحديث البيانات
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendIcon className="h-4 w-4" />
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>المبيعات الشهرية</CardTitle>
            <CardDescription>المبيعات خلال آخر 7 أشهر</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <AreaChart data={SALES_DATA}>
                <XAxis 
                  dataKey="month" 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000}ك`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle>الطلبات اليومية</CardTitle>
            <CardDescription>الطلبات خلال الأسبوع الحالي</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart data={ORDERS_DATA}>
                <XAxis 
                  dataKey="day" 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="orders"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>الطلبات الأخيرة</CardTitle>
              <CardDescription>آخر 5 طلبات</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              عرض الكل
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الطلب</TableHead>
                  <TableHead>العميل</TableHead>
                  <TableHead>المبلغ</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الوقت</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECENT_ORDERS.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          order.status === 'مؤكد' ? 'default' :
                          order.status === 'قيد التجهيز' ? 'secondary' :
                          order.status === 'تم الشحن' ? 'outline' :
                          'destructive'
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{order.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions & Pending */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>إجراءات سريعة</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Package className="h-5 w-5" />
                <span className="text-xs">إضافة منتج</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="h-5 w-5" />
                <span className="text-xs">مستخدم جديد</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Store className="h-5 w-5" />
                <span className="text-xs">متاجر معلقة</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <CreditCard className="h-5 w-5" />
                <span className="text-xs">تسويات مالية</span>
              </Button>
            </CardContent>
          </Card>

          {/* Pending Stores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                متاجر في الانتظار
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-40">
                <div className="space-y-3">
                  {PENDING_STORES.map((store, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">{store.name}</p>
                        <p className="text-xs text-muted-foreground">{store.owner}</p>
                      </div>
                      <Badge variant="secondary">{store.status}</Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
