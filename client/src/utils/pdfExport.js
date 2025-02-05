import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function downloadPDF(memories) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('My Personal Journal', 14, 22);

  const rows = memories.map((mem) => [
    new Date(mem.timestamp).toLocaleDateString(),
    mem.content || '',
    mem.imageUrl ? 'Photo Attached' : 'No Photo'
  ]);

  doc.autoTable({
    head: [['Date', 'Content', 'Photo']],
    body: rows,
    startY: 30
  });

  doc.save('MyJournal.pdf');
}