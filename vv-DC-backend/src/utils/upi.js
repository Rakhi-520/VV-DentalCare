
export function buildUpiString({ pa, pn, am, tn, tr, cu = 'INR' }) {
  if (!pa || !pn || !am || !tr) {
    throw new Error('Missing required UPI params: pa, pn, am, tr');
  }
  const q = new URLSearchParams({
    pa,                       
    pn,                       
    am: String(am),           
    cu,                       
  });
  if (tn) q.set('tn', tn);    
  q.set('tr', tr);           

  return `upi://pay?${q.toString()}`;
}
