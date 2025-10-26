export function cleanCNPJ(cnpj: string): string {
    return cnpj.replace(/[^\d]+/g, '');
}

export function validateCNPJ(cnpj: string): boolean {
    cnpj = cleanCNPJ(cnpj);

    if (cnpj.length !== 14)
        return false;

    if (/^(\d)\1+$/.test(cnpj))
        return false;

    return true;
}



