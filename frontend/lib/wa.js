export function buildWhatsAppMessage({ courseName, price, name, email, batch }) {
  return `Hello, I want to enroll in ${courseName}.\nPrice: ₹${price}\nName: ${name || 'N/A'}\nEmail: ${email || 'N/A'}\nBatch: ${batch}\nPlease guide me further.`;
}
export function waLink(message) {
  return `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
