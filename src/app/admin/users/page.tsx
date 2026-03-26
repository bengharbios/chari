'use client';

import { useState } from 'react';
import { 
  Search, 
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  Ban,
  CheckCircle,
  Filter,
  Download,
  UserPlus,
  Phone,
  User,
  Key,
  FileText,
  Building,
  Star
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

// بيانات وهمية للمستخدمين
const USERS = [
  {
    id: '1',
    name: 'أحمد محمد',
    username: 'ahmed_m',
    email: 'ahmed@example.com',
    phone: '0555123456',
    gender: 'male',
    type: 'مشتري',
    status: 'نشط',
    joinDate: '2024-01-15',
    orders: 12,
    phoneVerified: true,
    twoFactorEnabled: false,
  },
  {
    id: '2',
    name: 'فاطمة الزهراء',
    username: 'fatima_z',
    email: 'fatima@example.com',
    phone: '0666123456',
    gender: 'female',
    type: 'تاجر مستقل',
    status: 'نشط',
    joinDate: '2024-01-10',
    orders: 45,
    phoneVerified: true,
    twoFactorEnabled: true,
  },
  {
    id: '3',
    name: 'متجر التقنية',
    username: 'tech_store',
    email: 'tech@example.com',
    phone: '0777123456',
    gender: null,
    type: 'متجر',
    status: 'موثق',
    joinDate: '2024-01-05',
    orders: 120,
    phoneVerified: true,
    twoFactorEnabled: true,
  },
  {
    id: '4',
    name: 'كريم بن علي',
    username: 'karim_b',
    email: 'karim@example.com',
    phone: '0555987654',
    gender: 'male',
    type: 'مشتري',
    status: 'معلق',
    joinDate: '2024-01-20',
    orders: 3,
    phoneVerified: false,
    twoFactorEnabled: false,
  },
  {
    id: '5',
    name: 'سارة أحمد',
    username: 'sara_a',
    email: 'sara@example.com',
    phone: '0666987654',
    gender: 'female',
    type: 'تاجر مستقل',
    status: 'قيد المراجعة',
    joinDate: '2024-01-22',
    orders: 0,
    phoneVerified: true,
    twoFactorEnabled: false,
  },
  {
    id: '6',
    name: 'مدير النظام',
    username: 'admin',
    email: 'admin@chariday.com',
    phone: '0555000000',
    gender: 'male',
    type: 'أدمن',
    status: 'نشط',
    joinDate: '2023-01-01',
    orders: 0,
    phoneVerified: true,
    twoFactorEnabled: true,
  },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState('buyer');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'نشط':
        return <Badge className="bg-green-500">نشط</Badge>;
      case 'موثق':
        return <Badge className="bg-blue-500">موثق</Badge>;
      case 'معلق':
        return <Badge variant="secondary">معلق</Badge>;
      case 'قيد المراجعة':
        return <Badge variant="outline">قيد المراجعة</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'مشتري':
        return <Badge variant="secondary">مشتري</Badge>;
      case 'تاجر مستقل':
        return <Badge variant="outline">تاجر مستقل</Badge>;
      case 'متجر':
        return <Badge className="bg-purple-500">متجر</Badge>;
      case 'أدمن':
        return <Badge className="bg-red-500">أدمن</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  const getGenderIcon = (gender: string | null) => {
    if (!gender) return null;
    if (gender === 'male') {
      return (
        <svg className="h-4 w-4 text-blue-500 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="10" cy="14" r="5" />
          <path d="M19 5l-5.4 5.4M15 5h4v4" />
        </svg>
      );
    }
    return (
      <svg className="h-4 w-4 text-pink-500 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="5" />
        <path d="M12 13v8M9 18h6" />
      </svg>
    );
  };

  const getVerificationBadge = (verified: boolean) => {
    return verified ? (
      <Badge variant="outline" className="text-green-600 border-green-600">
        موثق
      </Badge>
    ) : (
      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
        غير موثق
      </Badge>
    );
  };

  const getTwoFactorBadge = (enabled: boolean) => {
    return enabled ? (
      <Badge variant="outline" className="text-green-600 border-green-600">
        مفعّل
      </Badge>
    ) : (
      <Badge variant="outline" className="text-gray-400">
        معطّل
      </Badge>
    );
  };

  // Section Header Component with RTL support
  const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
    <h3 className="font-semibold mb-3 flex items-center gap-2 justify-end">
      <span>{title}</span>
      <Icon className="h-4 w-4" />
    </h3>
  );

  // Form Field Component with RTL support
  const FormField = ({ label, children, ltr = false }: { label: string; children: React.ReactNode; ltr?: boolean }) => (
    <div className="space-y-2">
      <Label className="block text-right">{label}</Label>
      <div className={ltr ? "direction-ltr" : ""}>
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-right">
          <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
          <p className="text-muted-foreground">عرض وإدارة جميع المستخدمين</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>تصدير</span>
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span>إضافة مستخدم</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
              <DialogHeader className="text-right">
                <DialogTitle className="text-right">إضافة مستخدم جديد</DialogTitle>
                <DialogDescription className="text-right">
                  أدخل بيانات المستخدم الجديد
                </DialogDescription>
              </DialogHeader>
              
              {/* User Type Tabs */}
              <div className="w-full pt-4">
                <TabsList className="grid w-full grid-cols-4 bg-muted p-1 rounded-lg">
                  <TabsTrigger 
                    value="buyer" 
                    onClick={() => setSelectedUserType('buyer')}
                    className={selectedUserType === 'buyer' ? 'bg-background shadow-sm' : ''}
                  >
                    مشتري
                  </TabsTrigger>
                  <TabsTrigger 
                    value="seller" 
                    onClick={() => setSelectedUserType('seller')}
                    className={selectedUserType === 'seller' ? 'bg-background shadow-sm' : ''}
                  >
                    تاجر مستقل
                  </TabsTrigger>
                  <TabsTrigger 
                    value="store" 
                    onClick={() => setSelectedUserType('store')}
                    className={selectedUserType === 'store' ? 'bg-background shadow-sm' : ''}
                  >
                    متجر
                  </TabsTrigger>
                  <TabsTrigger 
                    value="admin" 
                    onClick={() => setSelectedUserType('admin')}
                    className={selectedUserType === 'admin' ? 'bg-background shadow-sm' : ''}
                  >
                    أدمن
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="space-y-6 pt-4">
                {/* البيانات الأساسية */}
                <div className="border-b pb-4">
                  <SectionHeader icon={User} title="البيانات الأساسية" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="الاسم الكامل (عربي)">
                      <Input placeholder="أدخل الاسم بالعربية" className="text-right" />
                    </FormField>
                    <FormField label="الاسم الكامل (إنجليزي)" ltr>
                      <Input placeholder="أدخل الاسم بالإنجليزية" className="text-left" dir="ltr" />
                    </FormField>
                    <FormField label="اسم المستخدم" ltr>
                      <Input placeholder="@username" className="text-left" dir="ltr" />
                    </FormField>
                    <FormField label="الجنس">
                      <Select>
                        <SelectTrigger className="text-right" dir="rtl">
                          <SelectValue placeholder="اختر الجنس" />
                        </SelectTrigger>
                        <SelectContent dir="rtl">
                          <SelectItem value="male">ذكر</SelectItem>
                          <SelectItem value="female">أنثى</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>
                    <FormField label="البريد الإلكتروني" ltr>
                      <Input type="email" placeholder="example@email.com" className="text-left" dir="ltr" />
                    </FormField>
                    <FormField label="رقم الهاتف" ltr>
                      <Input placeholder="0555123456" className="text-left" dir="ltr" />
                    </FormField>
                    <FormField label="كلمة المرور" ltr>
                      <Input type="password" placeholder="********" className="text-left" dir="ltr" />
                    </FormField>
                    <FormField label="تاريخ الميلاد (اختياري)" ltr>
                      <Input type="date" className="text-left" dir="ltr" />
                    </FormField>
                  </div>
                </div>

                {/* إعدادات الأمان */}
                <div className="border-b pb-4">
                  <SectionHeader icon={Shield} title="إعدادات الأمان" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <Switch />
                      <div className="flex items-center gap-2">
                        <span>التحقق من الهاتف</span>
                        <Phone className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <Switch />
                      <div className="flex items-center gap-2">
                        <span>المصادقة الثنائية</span>
                        <Key className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* بيانات المشتري */}
                {selectedUserType === 'buyer' && (
                  <div className="border-b pb-4">
                    <SectionHeader icon={ShoppingBag} title="بيانات المشتري" />
                    <div className="p-4 bg-muted rounded-lg text-right">
                      <p className="text-sm text-muted-foreground">
                        سيتم إنشاء حساب المشتري تلقائياً مع:
                      </p>
                      <ul className="text-sm mt-2 space-y-1">
                        <li>• قائمة أمنيات فارغة</li>
                        <li>• نقاط ولاء: 0 (مستوى برونزي)</li>
                        <li>• إعدادات الإشعارات مفعّلة</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* بيانات التاجر المستقل */}
                {selectedUserType === 'seller' && (
                  <div className="border-b pb-4">
                    <SectionHeader icon={Store} title="بيانات التاجر المستقل" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField label="اسم النشاط التجاري">
                        <Input placeholder="اسم المحل أو النشاط" className="text-right" />
                      </FormField>
                      <FormField label="خطة الاشتراك">
                        <Select>
                          <SelectTrigger className="text-right" dir="rtl">
                            <SelectValue placeholder="اختر الخطة" />
                          </SelectTrigger>
                          <SelectContent dir="rtl">
                            <SelectItem value="free">مجاني (0%)</SelectItem>
                            <SelectItem value="basic">أساسي (12%)</SelectItem>
                            <SelectItem value="pro">احترافي (10%)</SelectItem>
                            <SelectItem value="premium">متقدم (8%)</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormField>
                      <div className="md:col-span-2">
                        <FormField label="رقم الآيبان (IBAN)" ltr>
                          <Input placeholder="DZXXXXXXXXXXXXX" className="text-left" dir="ltr" />
                        </FormField>
                      </div>
                      <div className="md:col-span-2">
                        <FormField label="وصف النشاط">
                          <Textarea placeholder="وصف مختصر للنشاط التجاري..." className="text-right" />
                        </FormField>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center gap-2 justify-end mb-3">
                        <span className="text-sm font-medium">مستندات التوثيق (KYB)</span>
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['صورة الهاتف (أمام)', 'صورة الهاتف (خلف)', 'صورة السيلفي', 'إثبات العنوان'].map((doc) => (
                          <div key={doc} className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50">
                            <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-xs">{doc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* بيانات المتجر */}
                {selectedUserType === 'store' && (
                  <div className="border-b pb-4">
                    <SectionHeader icon={Building} title="بيانات المتجر" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField label="اسم المتجر (عربي)">
                        <Input placeholder="اسم المتجر بالعربية" className="text-right" />
                      </FormField>
                      <FormField label="اسم المتجر (إنجليزي)" ltr>
                        <Input placeholder="اسم المتجر بالإنجليزية" className="text-left" dir="ltr" />
                      </FormField>
                      <FormField label="السجل التجاري" ltr>
                        <Input placeholder="رقم السجل التجاري" className="text-left" dir="ltr" />
                      </FormField>
                      <FormField label="الرقم الضريبي" ltr>
                        <Input placeholder="الرقم الضريبي" className="text-left" dir="ltr" />
                      </FormField>
                      <FormField label="خطة الاشتراك">
                        <Select>
                          <SelectTrigger className="text-right" dir="rtl">
                            <SelectValue placeholder="اختر الخطة" />
                          </SelectTrigger>
                          <SelectContent dir="rtl">
                            <SelectItem value="free">مجاني</SelectItem>
                            <SelectItem value="basic">أساسي</SelectItem>
                            <SelectItem value="pro">احترافي</SelectItem>
                            <SelectItem value="premium">متقدم</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormField>
                      <FormField label="البريد الإلكتروني للمتجر" ltr>
                        <Input type="email" placeholder="store@example.com" className="text-left" dir="ltr" />
                      </FormField>
                      <div className="md:col-span-2">
                        <FormField label="رقم الآيبان (IBAN)" ltr>
                          <Input placeholder="DZXXXXXXXXXXXXX" className="text-left" dir="ltr" />
                        </FormField>
                      </div>
                      <div className="md:col-span-2">
                        <FormField label="وصف المتجر">
                          <Textarea placeholder="وصف مختصر للمتجر..." className="text-right" />
                        </FormField>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center gap-2 justify-end mb-3">
                        <span className="text-sm font-medium">مستندات التوثيق (KYB)</span>
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['السجل التجاري', 'صورة الهاتف (أمام)', 'صورة الهاتف (خلف)', 'التحقق الحيوي'].map((doc) => (
                          <div key={doc} className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50">
                            <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-xs">{doc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* بيانات الأدمن */}
                {selectedUserType === 'admin' && (
                  <div className="border-b pb-4">
                    <SectionHeader icon={Shield} title="بيانات الأدمن" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField label="دور الأدمن">
                        <Select>
                          <SelectTrigger className="text-right" dir="rtl">
                            <SelectValue placeholder="اختر الدور" />
                          </SelectTrigger>
                          <SelectContent dir="rtl">
                            <SelectItem value="super_admin">مشرف عام</SelectItem>
                            <SelectItem value="content_manager">مدير المحتوى</SelectItem>
                            <SelectItem value="operations_manager">مدير العمليات</SelectItem>
                            <SelectItem value="finance_reviewer">المراجع المالي</SelectItem>
                            <SelectItem value="customer_service">خدمة العملاء</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormField>
                      <FormField label="القسم">
                        <Select>
                          <SelectTrigger className="text-right" dir="rtl">
                            <SelectValue placeholder="اختر القسم" />
                          </SelectTrigger>
                          <SelectContent dir="rtl">
                            <SelectItem value="management">الإدارة</SelectItem>
                            <SelectItem value="content">المحتوى</SelectItem>
                            <SelectItem value="operations">العمليات</SelectItem>
                            <SelectItem value="finance">المالية</SelectItem>
                            <SelectItem value="support">الدعم</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormField>
                      <FormField label="الرقم الوظيفي" ltr>
                        <Input placeholder="EMP-001" className="text-left" dir="ltr" />
                      </FormField>
                      <FormField label="المسمى الوظيفي">
                        <Input placeholder="المسمى الوظيفي" className="text-right" />
                      </FormField>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium mb-3 text-right">الصلاحيات</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {[
                          'إدارة المستخدمين',
                          'إدارة المنتجات',
                          'إدارة الطلبات',
                          'إدارة المتاجر',
                          'إدارة المحتوى',
                          'التقارير المالية',
                          'إعدادات النظام',
                          'سجل النشاط',
                        ].map((permission) => (
                          <label key={permission} className="flex items-center gap-2 p-2 border rounded cursor-pointer justify-end">
                            <span className="text-sm">{permission}</span>
                            <input type="checkbox" className="rounded" />
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* التسويق */}
                <div className="pb-2">
                  <SectionHeader icon={Star} title="التسويق والإحالة" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="كود الإحالة (اختياري)" ltr>
                      <Input placeholder="REF123456" className="text-left" dir="ltr" />
                    </FormField>
                    <FormField label="محتوى من خلال" ltr>
                      <Input placeholder="معرف المستخدم المحيل" className="text-left" dir="ltr" />
                    </FormField>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 justify-start">
                <Button>إنشاء الحساب</Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  إلغاء
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'إجمالي المستخدمين', value: '2,345' },
          { label: 'المشترين', value: '1,890' },
          { label: 'التجار المستقلين', value: '320' },
          { label: 'المتاجر', value: '135' },
          { label: 'المدراء', value: '12' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-right">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث بالاسم أو البريد أو الهاتف..."
                className="pr-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-40" dir="rtl">
                <SelectValue placeholder="نوع الحساب" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="buyer">مشتري</SelectItem>
                <SelectItem value="seller">تاجر مستقل</SelectItem>
                <SelectItem value="store">متجر</SelectItem>
                <SelectItem value="admin">أدمن</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-40" dir="rtl">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="verified">موثق</SelectItem>
                <SelectItem value="suspended">معلق</SelectItem>
                <SelectItem value="pending">قيد المراجعة</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>فلترة</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">المستخدم</TableHead>
                  <TableHead className="text-right">نوع الحساب</TableHead>
                  <TableHead className="text-right">الهاتف</TableHead>
                  <TableHead className="text-right">التحقق</TableHead>
                  <TableHead className="text-right">المصادقة الثنائية</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الطلبات</TableHead>
                  <TableHead className="text-right">تاريخ التسجيل</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {USERS.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            {getGenderIcon(user.gender)}
                            <p className="font-medium">{user.name}</p>
                          </div>
                          <p className="text-sm text-muted-foreground text-left" dir="ltr">
                            {user.email}
                          </p>
                          {user.username && (
                            <p className="text-xs text-muted-foreground text-left" dir="ltr">
                              @{user.username}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{getTypeBadge(user.type)}</TableCell>
                    <TableCell className="text-right" dir="ltr">{user.phone}</TableCell>
                    <TableCell className="text-right">{getVerificationBadge(user.phoneVerified)}</TableCell>
                    <TableCell className="text-right">{getTwoFactorBadge(user.twoFactorEnabled)}</TableCell>
                    <TableCell className="text-right">{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-right">{user.orders}</TableCell>
                    <TableCell className="text-muted-foreground text-right">
                      {user.joinDate}
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
                            <span>تعديل</span>
                            <Edit className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 justify-end">
                            <span>الصلاحيات</span>
                            <Shield className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 justify-end">
                            <span>تفعيل</span>
                            <CheckCircle className="h-4 w-4" />
                          </DropdownMenuItem>
                          {(user.type === 'تاجر مستقل' || user.type === 'متجر') && (
                            <DropdownMenuItem className="flex items-center gap-2 justify-end">
                              <span>مستندات التوثيق</span>
                              <FileText className="h-4 w-4" />
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive flex items-center gap-2 justify-end">
                            <span>تعليق</span>
                            <Ban className="h-4 w-4" />
                          </DropdownMenuItem>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Custom Icons
function ShoppingBag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function Store({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2 2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
    </svg>
  );
}
