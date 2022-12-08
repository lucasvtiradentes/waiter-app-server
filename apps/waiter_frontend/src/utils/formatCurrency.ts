export function formatCurrency(originalPrice: number){
  return new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL'}).format(originalPrice);
}
