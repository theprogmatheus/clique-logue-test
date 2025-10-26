-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "comercialName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "contract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "technicalRetention" INTEGER NOT NULL,
    CONSTRAINT "contract_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "issueDate" DATETIME NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "value" INTEGER NOT NULL,
    "withholdingTaxes" BOOLEAN NOT NULL,
    "issqnTax" INTEGER,
    "irrfTax" INTEGER,
    "csllTax" INTEGER,
    "cofinsTax" INTEGER,
    "inssTax" INTEGER,
    "pisTax" INTEGER,
    "technicalRetention" BOOLEAN NOT NULL,
    "technicalRetentionPercent" INTEGER,
    CONSTRAINT "invoice_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contract" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "attachment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "invoiceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    CONSTRAINT "attachment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "company_cnpj_key" ON "company"("cnpj");
