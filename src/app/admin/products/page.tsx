'use client';

import { useState } from 'react';
import { 
  Search, 
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  Image as ImageIcon,
  Package
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
import Image from 'next/image';

// بيانات وهمية للمنتجات
const PRODUCTS = [
  {
    id: '1',
    name: 'آيفون 15 برو ماكس',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100&h=100&fit=crop',
    category: 'الإلكترونيات',
    store: 'متجر آبل',
    price: 169900,
    status: 'نشط',
    stock: 50,
    views: 1250,
  },
  {
    id: '2',
    name: 'سامسونج جالكسي S24',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop',
    category: 'الإلكترونيات',
    store: 'متجر سامسونج',
    price: 139900,
    status: 'نشط',
    stock: 35,
    views: 980,
  },
  {
    id: '3',
    name: 'نايك إير ماكس 270',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
    category: 'الموضة',
    store: 'متجر نايك',
    price: 19900,
    status: 'قيد المراجعة',
    stock: 200,
    views: 560,
  },
  {
    id: '4',
    name: 'بلايستيشن 5',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=100&h=100&fit=crop',
    category: 'الألعاب',
    store: 'منطقة الألعاب',
    price: 69900,
    status: 'نشط',
    stock: 30,
    views: 2100,
  },
  {
    id: '5',
    name: 'ماك بوك برو 14',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop',
    category: 'الإلكترونيات',
    store: 'متجر آبل',
    price: 299900,
    status: 'مرفوض',
    stock: 20,
    views: 450,
  },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'نشط':
        return <Badge className="bg-green-500">نشط</Badge>;
      case 'قيد المراجعة':
        return <Badge variant="outline">قيد المراجعة</Badge>;
      case 'مرفوض':
        return <Badge variant="destructive">مرفوض</Badge>;
      default:
        return <Badge>{status}</Badge>;
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
          <h1 className="text-2xl font-bold">إدارة المنتجات</h1>
          <p className="text-muted-foreground">عرض وإدارة جميع المنتجات</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>تصدير</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>إضافة منتج</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-right">
            <p className="text-sm text-muted-foreground">إجمالي المنتجات</p>
            <p className="text-2xl font-bold">12,456</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-right">
            <p className="text-sm text-muted-foreground">المنتجات النشطة</p>
            <p className="text-2xl font-bold text-green-600">11,234</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-right">
            <p className="text-sm text-muted-foreground">قيد المراجعة</p>
            <p className="text-2xl font-bold text-yellow-600">156</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-right">
            <p className="text-sm text-muted-foreground">مرفوضة</p>
            <p className="text-2xl font-bold text-red-600">66</p>
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
                placeholder="البحث في المنتجات..."
                className="pr-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-40" dir="rtl">
                <SelectValue placeholder="الفئة" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                <SelectItem value="all">جميع الفئات</SelectItem>
                <SelectItem value="electronics">الإلكترونيات</SelectItem>
                <SelectItem value="fashion">الموضة</SelectItem>
                <SelectItem value="home">المنزل</SelectItem>
                <SelectItem value="beauty">الجمال</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-40" dir="rtl">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="pending">قيد المراجعة</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-1">
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('table')}
              >
                <Package className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products */}
      {viewMode === 'table' ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">المنتج</TableHead>
                  <TableHead className="text-right">الفئة</TableHead>
                  <TableHead className="text-right">المتجر</TableHead>
                  <TableHead className="text-right">السعر</TableHead>
                  <TableHead className="text-right">المخزون</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PRODUCTS.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {product.views} مشاهدة
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{product.category}</TableCell>
                    <TableCell className="text-right">{product.store}</TableCell>
                    <TableCell className="font-medium text-right">
                      {formatPrice(product.price)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={product.stock < 50 ? 'text-yellow-600' : ''}>
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{getStatusBadge(product.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" dir="rtl">
                          <DropdownMenuItem className="flex items-center gap-2 justify-end">
                            <span>عرض</span>
                            <Eye className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 justify-end">
                            <span>تعديل</span>
                            <Edit className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2 justify-end">
                            <span>موافقة</span>
                            <CheckCircle className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive flex items-center gap-2 justify-end">
                            <span>رفض</span>
                            <XCircle className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive flex items-center gap-2 justify-end">
                            <span>حذف</span>
                            <Trash2 className="h-4 w-4" />
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
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {PRODUCTS.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2">
                  {getStatusBadge(product.status)}
                </div>
              </div>
              <CardContent className="p-3 text-right">
                <h3 className="font-medium text-sm line-clamp-2 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {product.store}
                </p>
                <p className="font-bold text-primary">
                  {formatPrice(product.price)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
