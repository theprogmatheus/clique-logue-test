export function formatCNPJ(cnpj: string): string {
    if (cnpj) {
        const apenasNumeros = cnpj.replace(/\D/g, "");
        if (apenasNumeros.length !== 14) return cnpj;
        return apenasNumeros.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
            "$1.$2.$3/$4-$5"
        );
    }
    return cnpj;
}