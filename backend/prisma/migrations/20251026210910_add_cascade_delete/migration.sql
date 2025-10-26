-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_attachment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "invoiceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    CONSTRAINT "attachment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoice" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_attachment" ("id", "invoiceId", "name", "path", "size") SELECT "id", "invoiceId", "name", "path", "size" FROM "attachment";
DROP TABLE "attachment";
ALTER TABLE "new_attachment" RENAME TO "attachment";
CREATE TABLE "new_contract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "technicalRetention" INTEGER NOT NULL,
    CONSTRAINT "contract_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_contract" ("code", "companyId", "id", "name", "technicalRetention") SELECT "code", "companyId", "id", "name", "technicalRetention" FROM "contract";
DROP TABLE "contract";
ALTER TABLE "new_contract" RENAME TO "contract";
CREATE TABLE "new_invoice" (
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
    CONSTRAINT "invoice_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contract" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_invoice" ("code", "cofinsTax", "contractId", "csllTax", "dueDate", "id", "inssTax", "irrfTax", "issqnTax", "issueDate", "pisTax", "technicalRetention", "technicalRetentionPercent", "value", "withholdingTaxes") SELECT "code", "cofinsTax", "contractId", "csllTax", "dueDate", "id", "inssTax", "irrfTax", "issqnTax", "issueDate", "pisTax", "technicalRetention", "technicalRetentionPercent", "value", "withholdingTaxes" FROM "invoice";
DROP TABLE "invoice";
ALTER TABLE "new_invoice" RENAME TO "invoice";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
