
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.TenantScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  logo: 'logo',
  plan: 'plan',
  status: 'status',
  maxUsers: 'maxUsers',
  fiscalRegime: 'fiscalRegime',
  cnpj: 'cnpj',
  stateRegistration: 'stateRegistration',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  name: 'name',
  avatar: 'avatar',
  role: 'role',
  status: 'status',
  passwordHash: 'passwordHash',
  twoFactorEnabled: 'twoFactorEnabled',
  twoFactorSecret: 'twoFactorSecret',
  tenantId: 'tenantId',
  lastLoginAt: 'lastLoginAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  name: 'name',
  sku: 'sku',
  brand: 'brand',
  model: 'model',
  category: 'category',
  costPrice: 'costPrice',
  salePrice: 'salePrice',
  profitMargin: 'profitMargin',
  stockQuantity: 'stockQuantity',
  minStock: 'minStock',
  location: 'location',
  ncm: 'ncm',
  cest: 'cest',
  origin: 'origin',
  taxProfile: 'taxProfile',
  importType: 'importType',
  importTax: 'importTax',
  freightCost: 'freightCost',
  images: 'images',
  isActive: 'isActive',
  hasVariants: 'hasVariants',
  hasImei: 'hasImei',
  isMainProduct: 'isMainProduct',
  isLinkableProduct: 'isLinkableProduct',
  importName: 'importName',
  mainProductId: 'mainProductId',
  linkedAt: 'linkedAt',
  deletedAt: 'deletedAt',
  tenantId: 'tenantId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductVariantScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  color: 'color',
  storage: 'storage',
  condition: 'condition',
  sku: 'sku',
  costPrice: 'costPrice',
  salePrice: 'salePrice',
  stockQuantity: 'stockQuantity',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.IMEIScalarFieldEnum = {
  id: 'id',
  imei: 'imei',
  productId: 'productId',
  variantId: 'variantId',
  status: 'status',
  purchasedAt: 'purchasedAt',
  soldAt: 'soldAt',
  saleId: 'saleId',
  warrantyUntil: 'warrantyUntil',
  serviceOrderId: 'serviceOrderId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InventoryMovementScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  type: 'type',
  quantity: 'quantity',
  referenceType: 'referenceType',
  referenceId: 'referenceId',
  previousStock: 'previousStock',
  newStock: 'newStock',
  costPrice: 'costPrice',
  totalValue: 'totalValue',
  notes: 'notes',
  userId: 'userId',
  createdAt: 'createdAt'
};

exports.Prisma.SupplierScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  document: 'document',
  email: 'email',
  phone: 'phone',
  whatsapp: 'whatsapp',
  zipCode: 'zipCode',
  street: 'street',
  number: 'number',
  complement: 'complement',
  neighborhood: 'neighborhood',
  city: 'city',
  state: 'state',
  country: 'country',
  paymentTerms: 'paymentTerms',
  bankDetails: 'bankDetails',
  notes: 'notes',
  isActive: 'isActive',
  tenantId: 'tenantId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PurchaseScalarFieldEnum = {
  id: 'id',
  code: 'code',
  supplierId: 'supplierId',
  orderDate: 'orderDate',
  deliveryDate: 'deliveryDate',
  subtotal: 'subtotal',
  taxTotal: 'taxTotal',
  freightCost: 'freightCost',
  otherCosts: 'otherCosts',
  total: 'total',
  paymentMethod: 'paymentMethod',
  installments: 'installments',
  invoiceNumber: 'invoiceNumber',
  invoiceFile: 'invoiceFile',
  documents: 'documents',
  status: 'status',
  tenantId: 'tenantId',
  receivedBy: 'receivedBy',
  receivedAt: 'receivedAt',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PurchaseItemScalarFieldEnum = {
  id: 'id',
  purchaseId: 'purchaseId',
  productId: 'productId',
  quantity: 'quantity',
  unitCost: 'unitCost',
  icms: 'icms',
  ipi: 'ipi',
  pis: 'pis',
  cofins: 'cofins',
  importTax: 'importTax',
  totalCost: 'totalCost',
  subtotal: 'subtotal',
  imeiNumbers: 'imeiNumbers',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CustomerScalarFieldEnum = {
  id: 'id',
  name: 'name',
  document: 'document',
  birthDate: 'birthDate',
  email: 'email',
  phone: 'phone',
  whatsapp: 'whatsapp',
  zipCode: 'zipCode',
  street: 'street',
  number: 'number',
  complement: 'complement',
  neighborhood: 'neighborhood',
  city: 'city',
  state: 'state',
  tags: 'tags',
  segment: 'segment',
  lifetimeValue: 'lifetimeValue',
  crmStage: 'crmStage',
  leadSource: 'leadSource',
  notes: 'notes',
  preferences: 'preferences',
  isActive: 'isActive',
  tenantId: 'tenantId',
  totalPurchases: 'totalPurchases',
  lastPurchaseAt: 'lastPurchaseAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CustomerDeviceScalarFieldEnum = {
  id: 'id',
  customerId: 'customerId',
  brand: 'brand',
  model: 'model',
  imei: 'imei',
  serialNumber: 'serialNumber',
  color: 'color',
  storage: 'storage',
  purchaseDate: 'purchaseDate',
  purchasePrice: 'purchasePrice',
  saleId: 'saleId',
  warrantyUntil: 'warrantyUntil',
  warrantyType: 'warrantyType',
  notes: 'notes',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SaleScalarFieldEnum = {
  id: 'id',
  code: 'code',
  customerId: 'customerId',
  userId: 'userId',
  saleDate: 'saleDate',
  deliveryDate: 'deliveryDate',
  subtotal: 'subtotal',
  discount: 'discount',
  discountType: 'discountType',
  taxTotal: 'taxTotal',
  total: 'total',
  totalCost: 'totalCost',
  grossProfit: 'grossProfit',
  profitMargin: 'profitMargin',
  netProfit: 'netProfit',
  paymentMethod: 'paymentMethod',
  installments: 'installments',
  invoiceNumber: 'invoiceNumber',
  invoiceKey: 'invoiceKey',
  invoiceFile: 'invoiceFile',
  status: 'status',
  notes: 'notes',
  channel: 'channel',
  tenantId: 'tenantId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SaleItemScalarFieldEnum = {
  id: 'id',
  saleId: 'saleId',
  productId: 'productId',
  quantity: 'quantity',
  unitPrice: 'unitPrice',
  unitCost: 'unitCost',
  discount: 'discount',
  icms: 'icms',
  pis: 'pis',
  cofins: 'cofins',
  subtotal: 'subtotal',
  total: 'total',
  imeiNumber: 'imeiNumber',
  warrantyMonths: 'warrantyMonths',
  warrantyUntil: 'warrantyUntil',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ServiceOrderScalarFieldEnum = {
  id: 'id',
  code: 'code',
  customerId: 'customerId',
  deviceId: 'deviceId',
  deviceBrand: 'deviceBrand',
  deviceModel: 'deviceModel',
  deviceImei: 'deviceImei',
  deviceColor: 'deviceColor',
  technicianId: 'technicianId',
  openedAt: 'openedAt',
  estimatedDate: 'estimatedDate',
  completedAt: 'completedAt',
  deliveredAt: 'deliveredAt',
  reportedIssue: 'reportedIssue',
  diagnosis: 'diagnosis',
  solution: 'solution',
  laborCost: 'laborCost',
  partsCost: 'partsCost',
  total: 'total',
  warrantyDays: 'warrantyDays',
  warrantyUntil: 'warrantyUntil',
  status: 'status',
  priority: 'priority',
  photos: 'photos',
  termsAccepted: 'termsAccepted',
  termsSignature: 'termsSignature',
  notes: 'notes',
  internalNotes: 'internalNotes',
  tenantId: 'tenantId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ServiceOrderPartScalarFieldEnum = {
  id: 'id',
  serviceOrderId: 'serviceOrderId',
  productId: 'productId',
  quantity: 'quantity',
  unitCost: 'unitCost',
  unitPrice: 'unitPrice',
  total: 'total',
  stockUpdated: 'stockUpdated',
  createdAt: 'createdAt'
};

exports.Prisma.ServiceOrderEventScalarFieldEnum = {
  id: 'id',
  serviceOrderId: 'serviceOrderId',
  type: 'type',
  title: 'title',
  description: 'description',
  userId: 'userId',
  createdAt: 'createdAt'
};

exports.Prisma.ExpenseScalarFieldEnum = {
  id: 'id',
  description: 'description',
  category: 'category',
  amount: 'amount',
  dueDate: 'dueDate',
  paymentDate: 'paymentDate',
  paymentMethod: 'paymentMethod',
  isPaid: 'isPaid',
  supplierId: 'supplierId',
  purchaseId: 'purchaseId',
  isRecurring: 'isRecurring',
  recurrencePattern: 'recurrencePattern',
  attachments: 'attachments',
  notes: 'notes',
  tags: 'tags',
  tenantId: 'tenantId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReceivableScalarFieldEnum = {
  id: 'id',
  description: 'description',
  amount: 'amount',
  dueDate: 'dueDate',
  paymentDate: 'paymentDate',
  paymentMethod: 'paymentMethod',
  isPaid: 'isPaid',
  installmentNumber: 'installmentNumber',
  totalInstallments: 'totalInstallments',
  customerId: 'customerId',
  saleId: 'saleId',
  lateFee: 'lateFee',
  interest: 'interest',
  attachments: 'attachments',
  notes: 'notes',
  tenantId: 'tenantId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TransactionScalarFieldEnum = {
  id: 'id',
  type: 'type',
  category: 'category',
  amount: 'amount',
  accountId: 'accountId',
  referenceType: 'referenceType',
  referenceId: 'referenceId',
  description: 'description',
  paymentMethod: 'paymentMethod',
  transactionDate: 'transactionDate',
  isReconciled: 'isReconciled',
  reconciledAt: 'reconciledAt',
  tags: 'tags',
  notes: 'notes',
  tenantId: 'tenantId',
  createdAt: 'createdAt'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  bankName: 'bankName',
  accountNumber: 'accountNumber',
  agency: 'agency',
  initialBalance: 'initialBalance',
  currentBalance: 'currentBalance',
  isActive: 'isActive',
  tenantId: 'tenantId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TaxCalculationScalarFieldEnum = {
  id: 'id',
  month: 'month',
  year: 'year',
  grossRevenue: 'grossRevenue',
  netRevenue: 'netRevenue',
  icms: 'icms',
  pis: 'pis',
  cofins: 'cofins',
  ipi: 'ipi',
  iss: 'iss',
  simples: 'simples',
  totalTaxes: 'totalTaxes',
  effectiveRate: 'effectiveRate',
  isPaid: 'isPaid',
  paidAt: 'paidAt',
  tenantId: 'tenantId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReportScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  filters: 'filters',
  startDate: 'startDate',
  endDate: 'endDate',
  data: 'data',
  fileUrl: 'fileUrl',
  status: 'status',
  tenantId: 'tenantId',
  userId: 'userId',
  createdAt: 'createdAt',
  generatedAt: 'generatedAt'
};

exports.Prisma.SettingScalarFieldEnum = {
  id: 'id',
  key: 'key',
  value: 'value',
  tenantId: 'tenantId',
  updatedAt: 'updatedAt'
};

exports.Prisma.DocumentFileScalarFieldEnum = {
  id: 'id',
  fileName: 'fileName',
  fileType: 'fileType',
  fileSize: 'fileSize',
  fileUrl: 'fileUrl',
  documentType: 'documentType',
  category: 'category',
  customerId: 'customerId',
  deviceId: 'deviceId',
  saleId: 'saleId',
  serviceOrderId: 'serviceOrderId',
  description: 'description',
  uploadedBy: 'uploadedBy',
  tenantId: 'tenantId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  action: 'action',
  entity: 'entity',
  entityId: 'entityId',
  oldData: 'oldData',
  newData: 'newData',
  userId: 'userId',
  userEmail: 'userEmail',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  tenantId: 'tenantId',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  title: 'title',
  message: 'message',
  link: 'link',
  linkText: 'linkText',
  isRead: 'isRead',
  readAt: 'readAt',
  metadata: 'metadata',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Plan = exports.$Enums.Plan = {
  STARTER: 'STARTER',
  PROFESSIONAL: 'PROFESSIONAL',
  ENTERPRISE: 'ENTERPRISE'
};

exports.TenantStatus = exports.$Enums.TenantStatus = {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  TRIAL: 'TRIAL',
  CANCELED: 'CANCELED'
};

exports.FiscalRegime = exports.$Enums.FiscalRegime = {
  SIMPLES_NACIONAL: 'SIMPLES_NACIONAL',
  LUCRO_PRESUMIDO: 'LUCRO_PRESUMIDO',
  LUCRO_REAL: 'LUCRO_REAL',
  MEI: 'MEI'
};

exports.Role = exports.$Enums.Role = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  SELLER: 'SELLER',
  TECHNICIAN: 'TECHNICIAN',
  ACCOUNTANT: 'ACCOUNTANT'
};

exports.UserStatus = exports.$Enums.UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED'
};

exports.ProductCategory = exports.$Enums.ProductCategory = {
  SMARTPHONE: 'SMARTPHONE',
  TABLET: 'TABLET',
  SMARTWATCH: 'SMARTWATCH',
  ACCESSORY_CASE: 'ACCESSORY_CASE',
  ACCESSORY_CHARGER: 'ACCESSORY_CHARGER',
  ACCESSORY_CABLE: 'ACCESSORY_CABLE',
  ACCESSORY_SCREEN_PROTECTOR: 'ACCESSORY_SCREEN_PROTECTOR',
  ACCESSORY_EARPHONE: 'ACCESSORY_EARPHONE',
  ACCESSORY_OTHER: 'ACCESSORY_OTHER',
  PART_SCREEN: 'PART_SCREEN',
  PART_BATTERY: 'PART_BATTERY',
  PART_CAMERA: 'PART_CAMERA',
  PART_OTHER: 'PART_OTHER'
};

exports.ProductOrigin = exports.$Enums.ProductOrigin = {
  NATIONAL: 'NATIONAL',
  IMPORTED: 'IMPORTED'
};

exports.ImportType = exports.$Enums.ImportType = {
  NATIONAL_WITH_INVOICE: 'NATIONAL_WITH_INVOICE',
  IMPORTED_WITH_INVOICE: 'IMPORTED_WITH_INVOICE',
  IMPORTED_WITHOUT_INVOICE: 'IMPORTED_WITHOUT_INVOICE',
  PARAGUAY: 'PARAGUAY',
  USA: 'USA',
  FORWARDER: 'FORWARDER'
};

exports.ProductCondition = exports.$Enums.ProductCondition = {
  NEW: 'NEW',
  REFURBISHED: 'REFURBISHED',
  USED: 'USED',
  FOR_PARTS: 'FOR_PARTS'
};

exports.IMEIStatus = exports.$Enums.IMEIStatus = {
  IN_STOCK: 'IN_STOCK',
  SOLD: 'SOLD',
  RESERVED: 'RESERVED',
  IN_SERVICE: 'IN_SERVICE',
  DEFECTIVE: 'DEFECTIVE',
  RETURNED: 'RETURNED'
};

exports.MovementType = exports.$Enums.MovementType = {
  PURCHASE: 'PURCHASE',
  SALE: 'SALE',
  RETURN: 'RETURN',
  ADJUSTMENT: 'ADJUSTMENT',
  TRANSFER: 'TRANSFER',
  LOSS: 'LOSS',
  SERVICE_CONSUMPTION: 'SERVICE_CONSUMPTION'
};

exports.SupplierType = exports.$Enums.SupplierType = {
  NATIONAL_DISTRIBUTOR: 'NATIONAL_DISTRIBUTOR',
  INTERNATIONAL_SUPPLIER: 'INTERNATIONAL_SUPPLIER',
  FORWARDER: 'FORWARDER',
  INDIVIDUAL: 'INDIVIDUAL',
  MANUFACTURER: 'MANUFACTURER'
};

exports.PaymentMethod = exports.$Enums.PaymentMethod = {
  CASH: 'CASH',
  DEBIT_CARD: 'DEBIT_CARD',
  CREDIT_CARD: 'CREDIT_CARD',
  PIX: 'PIX',
  BANK_TRANSFER: 'BANK_TRANSFER',
  BANK_SLIP: 'BANK_SLIP',
  STORE_CREDIT: 'STORE_CREDIT',
  INSTALLMENT_PLAN: 'INSTALLMENT_PLAN',
  MULTIPLE: 'MULTIPLE'
};

exports.PurchaseStatus = exports.$Enums.PurchaseStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  IN_TRANSIT: 'IN_TRANSIT',
  RECEIVED: 'RECEIVED',
  PARTIALLY_RECEIVED: 'PARTIALLY_RECEIVED',
  CANCELED: 'CANCELED'
};

exports.CustomerSegment = exports.$Enums.CustomerSegment = {
  LEAD: 'LEAD',
  PROSPECT: 'PROSPECT',
  REGULAR: 'REGULAR',
  VIP: 'VIP',
  INACTIVE: 'INACTIVE',
  CHURNED: 'CHURNED'
};

exports.WarrantyType = exports.$Enums.WarrantyType = {
  STORE: 'STORE',
  MANUFACTURER: 'MANUFACTURER',
  EXTENDED: 'EXTENDED',
  NONE: 'NONE'
};

exports.DiscountType = exports.$Enums.DiscountType = {
  AMOUNT: 'AMOUNT',
  PERCENTAGE: 'PERCENTAGE'
};

exports.SaleStatus = exports.$Enums.SaleStatus = {
  DRAFT: 'DRAFT',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
  REFUNDED: 'REFUNDED',
  PARTIALLY_REFUNDED: 'PARTIALLY_REFUNDED'
};

exports.SaleChannel = exports.$Enums.SaleChannel = {
  STORE: 'STORE',
  ONLINE: 'ONLINE',
  WHATSAPP: 'WHATSAPP',
  PHONE: 'PHONE',
  MARKETPLACE: 'MARKETPLACE'
};

exports.ServiceOrderStatus = exports.$Enums.ServiceOrderStatus = {
  OPEN: 'OPEN',
  DIAGNOSING: 'DIAGNOSING',
  AWAITING_APPROVAL: 'AWAITING_APPROVAL',
  AWAITING_PARTS: 'AWAITING_PARTS',
  IN_REPAIR: 'IN_REPAIR',
  TESTING: 'TESTING',
  COMPLETED: 'COMPLETED',
  READY_FOR_PICKUP: 'READY_FOR_PICKUP',
  DELIVERED: 'DELIVERED',
  CANCELED: 'CANCELED',
  WARRANTY_CLAIM: 'WARRANTY_CLAIM'
};

exports.Priority = exports.$Enums.Priority = {
  LOW: 'LOW',
  NORMAL: 'NORMAL',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
};

exports.EventType = exports.$Enums.EventType = {
  STATUS_CHANGE: 'STATUS_CHANGE',
  NOTE_ADDED: 'NOTE_ADDED',
  PART_ADDED: 'PART_ADDED',
  DIAGNOSIS_UPDATED: 'DIAGNOSIS_UPDATED',
  CUSTOMER_CONTACTED: 'CUSTOMER_CONTACTED',
  PAYMENT_RECEIVED: 'PAYMENT_RECEIVED'
};

exports.ExpenseCategory = exports.$Enums.ExpenseCategory = {
  RENT: 'RENT',
  UTILITIES: 'UTILITIES',
  SALARIES: 'SALARIES',
  MARKETING: 'MARKETING',
  SUPPLIES: 'SUPPLIES',
  MAINTENANCE: 'MAINTENANCE',
  TAXES: 'TAXES',
  INSURANCE: 'INSURANCE',
  FREIGHT: 'FREIGHT',
  PROFESSIONAL_SERVICES: 'PROFESSIONAL_SERVICES',
  OTHER: 'OTHER'
};

exports.TransactionType = exports.$Enums.TransactionType = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
  TRANSFER: 'TRANSFER'
};

exports.AccountType = exports.$Enums.AccountType = {
  CHECKING: 'CHECKING',
  SAVINGS: 'SAVINGS',
  CASH: 'CASH',
  CREDIT_CARD: 'CREDIT_CARD',
  DIGITAL_WALLET: 'DIGITAL_WALLET'
};

exports.ReportType = exports.$Enums.ReportType = {
  SALES: 'SALES',
  INVENTORY: 'INVENTORY',
  FINANCIAL: 'FINANCIAL',
  TAX: 'TAX',
  DRE: 'DRE',
  CASH_FLOW: 'CASH_FLOW',
  CUSTOMER: 'CUSTOMER',
  PRODUCT_PERFORMANCE: 'PRODUCT_PERFORMANCE',
  CUSTOM: 'CUSTOM'
};

exports.ReportStatus = exports.$Enums.ReportStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

exports.DocumentType = exports.$Enums.DocumentType = {
  SERVICE_CONTRACT: 'SERVICE_CONTRACT',
  WARRANTY_AGREEMENT: 'WARRANTY_AGREEMENT',
  DIGITAL_SIGNATURE: 'DIGITAL_SIGNATURE',
  PHOTO_BEFORE: 'PHOTO_BEFORE',
  PHOTO_AFTER: 'PHOTO_AFTER',
  DEVICE_PHOTO: 'DEVICE_PHOTO',
  DAMAGE_ASSESSMENT: 'DAMAGE_ASSESSMENT',
  PASSWORD_RECORD: 'PASSWORD_RECORD',
  EMAIL_RECORD: 'EMAIL_RECORD',
  PIN_RECORD: 'PIN_RECORD',
  FINGERPRINT_RECORD: 'FINGERPRINT_RECORD',
  ID_DOCUMENT: 'ID_DOCUMENT',
  PROOF_ADDRESS: 'PROOF_ADDRESS',
  TAX_DOCUMENT: 'TAX_DOCUMENT',
  REPORT: 'REPORT',
  RECEIPT: 'RECEIPT',
  INVOICE: 'INVOICE',
  OTHER: 'OTHER'
};

exports.NotificationType = exports.$Enums.NotificationType = {
  SYSTEM: 'SYSTEM',
  SALE: 'SALE',
  SERVICE_ORDER: 'SERVICE_ORDER',
  STOCK_ALERT: 'STOCK_ALERT',
  PAYMENT_DUE: 'PAYMENT_DUE',
  PAYMENT_RECEIVED: 'PAYMENT_RECEIVED',
  NEW_CUSTOMER: 'NEW_CUSTOMER',
  REPORT_READY: 'REPORT_READY'
};

exports.Prisma.ModelName = {
  Tenant: 'Tenant',
  User: 'User',
  Product: 'Product',
  ProductVariant: 'ProductVariant',
  IMEI: 'IMEI',
  InventoryMovement: 'InventoryMovement',
  Supplier: 'Supplier',
  Purchase: 'Purchase',
  PurchaseItem: 'PurchaseItem',
  Customer: 'Customer',
  CustomerDevice: 'CustomerDevice',
  Sale: 'Sale',
  SaleItem: 'SaleItem',
  ServiceOrder: 'ServiceOrder',
  ServiceOrderPart: 'ServiceOrderPart',
  ServiceOrderEvent: 'ServiceOrderEvent',
  Expense: 'Expense',
  Receivable: 'Receivable',
  Transaction: 'Transaction',
  Account: 'Account',
  TaxCalculation: 'TaxCalculation',
  Report: 'Report',
  Setting: 'Setting',
  DocumentFile: 'DocumentFile',
  AuditLog: 'AuditLog',
  Notification: 'Notification'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
