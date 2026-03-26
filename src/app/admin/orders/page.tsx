'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter,
  Download,
  Eye,
  Truck,
  XCircle,
  CheckCircle,
  Clock,
  Package,
  MoreHorizontal,
  Printer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// بيانات وهمية للطلبات
const ORDERS = [
  {
    id: '#12345',
    customer: 'أحمد محمد',
    phone: '0555123456',
    total: 12500,
    status: 'مؤكد',
    payment: 'مدفوع',
    date: '2024-01-22 14:30',
    items: 3,
  },
  {
    id: '#12344',
    customer: 'فاطمة الزهراء',
    phone: '0666123456',
    total: 8900,
    status: 'قيد التجهيز',
    payment: 'عند الاستلام',
    date: '2024-01-22 13:15',
    items: 2,
  },
  {
    id: '#12343',
    customer: 'كريم بن علي',
    phone: '0777123456',
    total: 25000,
    status: 'تم الشحن',
    payment: 'مدفوع',
    date: '2024-01-22 10:00',
    items: 5,
  },
  {
    id: '#12342',
    customer: 'سارة أحمد',
    phone: '0555987654',
    total: 5600,
    status: 'ملغي',
    payment: 'مسترد',
    date: '2024-01-21 18:45',
    items: 1,
  },
  {
    id: '#12341',
    customer: 'محمد علي',
    phone: '0666987654',
    total: 18300,
    status: 'تم التسليم',
    payment: 'مدفوع',
    date: '2024-01-21 15:30',
    items: 4,
  },
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'مؤكد':
        return <Badge className="bg-blue-500">مؤكد</Badge>;
      case 'قيد التجهيز':
        return <Badge className="bg-yellow-500">قيد التجهيز</Badge>;
      case 'تم الشحن':
        return <Badge className="bg-purple-500">تم الشحن</Badge>;
      case 'تم التسليم':
        return <Badge className="bg-green-500">تم التسليم</Badge>;
      case 'ملغي':
        return <Badge variant="destructive">ملغي</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentBadge = (payment: string) => {
    switch (payment) {
      case 'مدفوع':
        return <Badge variant="outline" className="text-green-600 border-green-600">مدفوع</Badge>;
      case 'عند الاستلام':
        return <Badge variant="outline">عند الاستلام</Badge>;
      case 'مسترد':
        return <Badge variant="outline" className="text-red-600 border-red-600">مسترد</Badge>;
      default:
        return <Badge variant="outline">{payment}</Badge>;
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ar-DZ') + ' دج';
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-right">
          <h1 className="text-2xl font-bold">إدارة الطلبات</h1>
          <p className="text-muted-foreground">عرض وإدارة جميع الطلبات</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>تصدير</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            <span>طباعة</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-right">
            <div className="flex items-center gap-2 justify-end">
              <p className="text-sm text-muted-foreground">قيد الانتظار</p>
              <Clock className="h-4 w-4 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold mt-1">45</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-right">
            <div className="flex items-center gap-2 justify-end">
              <p className="text-sm text-muted-foreground">مؤكد</p>
              <CheckCircle className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold mt-1">156</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-right">
            <div className="flex items-center gap-2 justify-end">
              <p className="text-sm text-muted-foreground">قيد التجهيز</p>
              <Package className="h-4 w-4 text-orange-500" />
            </div>
            <p className="text-2xl font-bold mt-1">89</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-right">
            <div className="flex items-center gap-2 justify-end">
              <p className="text-sm text-muted-foreground">تم الشحن</p>
              <Truck className="h-4 w-4 text-purple-500" />
            </div>
            <p className="text-2xl font-bold mt-1">67</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-right">
            <div className="flex items-center gap-2 justify-end">
              <p className="text-sm text-muted-foreground">تم التسليم</p>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold mt-1">1,234</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث برقم الطلب أو اسم العميل..."
                className="pr-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-40" dir="rtl">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="confirmed">مؤكد</SelectItem>
                <SelectItem value="processing">قيد التجهيز</SelectItem>
                <SelectItem value="shipped">تم الشحن</SelectItem>
                <SelectItem value="delivered">تم التسليم</SelectItem>
                <SelectItem value="cancelled">ملغي</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>فلترة متقدمة</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">رقم الطلب</TableHead>
                <TableHead className="text-right">العميل</TableHead>
                <TableHead className="text-right">المبلغ</TableHead>
                <TableHead className="text-right">الدفع</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ORDERS.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-right">{order.id}</TableCell>
                  <TableCell className="text-right">
                    <div>
                      <p>{order.customer}</p>
                      <p className="text-sm text-muted-foreground text-left" dir="ltr">
                        {order.phone}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div>
                      <p className="font-medium">{formatPrice(order.total)}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items} منتجات
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{getPaymentBadge(order.payment)}</TableCell>
                  <TableCell className="text-right">{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-muted-foreground text-right">
                    {order.date}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" dir="rtl">
                        <DropdownMenuItem className="flex items-center gap-2 justify-end">
                          <span>عرض التفاصيل</span>
                          <Eye className="h-4 w-4" />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 justify-end">
                          <span>تحديث الحالة</span>
                          <Truck className="h-4 w-4" />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 justify-end">
                          <span>طباعة الفاتورة</span>
                          <Printer className="h-4 w-4" />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive flex items-center gap-2 justify-end">
                          <span>إلغاء الطلب</span>
                          <XCircle className="h-4 w-4" />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
