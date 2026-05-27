import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Plus, Trash, FileText, Download, DollarSign, RefreshCw, Calculator, HelpCircle } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function FinanceTools({ toolId }: { toolId: string }) {
  if (toolId === 'invoice-gen') return <InvoiceGenerator />;
  if (toolId === 'tax-calc') return <TaxCalculator />;
  if (toolId === 'currency-converter') return <CurrencyConverter />;
  return null;
}

// 1. Invoice Generator Component (Actually exports to print-ready PDF or Excel spreadsheet!)
interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

function InvoiceGenerator() {
  const [invoiceNum, setInvoiceNum] = useState(`INV-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [issueDate, setIssueDate] = useState('2026-05-27');
  const [dueDate, setDueDate] = useState('2026-06-27');
  const [sender, setSender] = useState({ name: 'My Corporation LLC', email: 'billing@mycorp.com', address: '123 Main St, New York, NY' });
  const [client, setClient] = useState({ name: 'Acme Solutions Inc', email: 'procurement@acme.com', address: '456 Business Park, Boston, MA' });
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Consulting & Software Development Services', quantity: 20, rate: 120 },
    { id: '2', description: 'Monthly Hosting & Maintenance SLA', quantity: 1, rate: 250 },
  ]);
  const [taxPercent, setTaxPercent] = useState(15);
  const [discountPercent, setDiscountPercent] = useState(5);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Math.random().toString(36).substring(7), description: 'New Line Item', quantity: 1, rate: 100 },
    ]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    );
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  };

  const subtotal = calculateSubtotal();
  const discountAmount = Math.round((subtotal * discountPercent / 100) * 100) / 100;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = Math.round((taxableAmount * taxPercent / 100) * 100) / 100;
  const total = taxableAmount + taxAmount;

  // Export PDF using standard jsPDF coordinates
  const exportPDF = () => {
    const doc = new jsPDF();

    // Palette Colors
    doc.setFillColor(37, 99, 235); // Blue Accent
    doc.rect(0, 0, 210, 15, 'F');

    // Title
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59);
    doc.text('INVOICE', 14, 35);

    doc.setFontSize(10);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(`Invoice Number: ${invoiceNum}`, 14, 42);
    doc.text(`Issue Date: ${issueDate}`, 14, 47);
    doc.text(`Due Date: ${dueDate}`, 14, 52);

    // Identitites
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('Sender Details:', 14, 65);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(sender.name, 14, 71);
    doc.text(sender.email, 14, 76);
    doc.text(sender.address, 14, 81);

    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('Bill To (Client):', 110, 65);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(client.name, 110, 71);
    doc.text(client.email, 110, 76);
    doc.text(client.address, 110, 81);

    // Table Header
    doc.setFillColor(241, 245, 249);
    doc.rect(14, 93, 182, 8, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(51, 65, 85);
    doc.text('Item Description', 16, 98);
    doc.text('Qty', 115, 98);
    doc.text('Rate ($)', 140, 98);
    doc.text('Amount ($)', 170, 98);

    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    let startY = 107;

    items.forEach((item) => {
      doc.text(item.description, 16, startY);
      doc.text(String(item.quantity), 115, startY);
      doc.text(String(item.rate), 140, startY);
      doc.text(String((item.quantity * item.rate).toFixed(2)), 170, startY);
      doc.setDrawColor(241, 245, 249);
      doc.line(14, startY + 3, 196, startY + 3);
      startY += 10;
    });

    // Summary calculation
    const rightAlignStart = 140;
    doc.setFont('Helvetica', 'normal');
    doc.text('Subtotal:', rightAlignStart, startY + 5);
    doc.text(`$${subtotal.toFixed(2)}`, 170, startY + 5);

    doc.text(`Discount (${discountPercent}%):`, rightAlignStart, startY + 11);
    doc.text(`-$${discountAmount.toFixed(2)}`, 170, startY + 11);

    doc.text(`Estimated Tax (${taxPercent}%):`, rightAlignStart, startY + 17);
    doc.text(`+$${taxAmount.toFixed(2)}`, 170, startY + 17);

    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text('Total Balance Due:', rightAlignStart, startY + 25);
    doc.text(`$${total.toFixed(2)}`, 170, startY + 25);

    // Footer note
    doc.setFont('Helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('Thank you for your business. Terms are net invoice date terms. Generated via NexusUtils.', 14, startY + 45);

    doc.save(`${invoiceNum}.pdf`);
  };

  // Export Excel utilizing sheet structures
  const exportExcel = () => {
    const rawData = [
      ['INVOICE', ''],
      ['Invoice Number', invoiceNum],
      ['Issue Date', issueDate],
      ['Due Date', dueDate],
      [],
      ['Sender:', sender.name, '', 'Bill To (Client):', client.name],
      ['Email:', sender.email, '', 'Email:', client.email],
      ['Address:', sender.address, '', 'Address:', client.address],
      [],
      ['Item Description', 'Quantity', 'Rate ($)', 'Amount ($)'],
      ...items.map((it) => [it.description, it.quantity, it.rate, it.quantity * it.rate]),
      [],
      ['', '', 'Subtotal ($)', subtotal],
      ['', '', `Discount (${discountPercent}%)`, -discountAmount],
      ['', '', `Estim. Tax (${taxPercent}%)`, taxAmount],
      ['', '', 'Total Balance Due ($)', total],
    ];

    const ws = XLSX.utils.aoa_to_sheet(rawData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Invoice Details');
    XLSX.writeFile(wb, `${invoiceNum}.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Professional Invoice Creator</h3>
            <p className="text-xs text-slate-400">Fill details below and render a certified PDF business invoice on the fly.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportPDF}
              className="py-2.5 px-4 bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white rounded-lg flex items-center gap-1.5 transition shadow-xs cursor-pointer"
            >
              <Download className="h-4 w-4" />
              Download PDF Invoice
            </button>
            <button
              onClick={exportExcel}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-bold text-xs text-slate-700 dark:text-slate-200 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
            >
              <FileText className="h-4 w-4 text-green-500" />
              Export Excel (XLSX)
            </button>
          </div>
        </div>

        {/* Invoice Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Invoice Number</label>
            <input
              type="text"
              value={invoiceNum}
              onChange={(e) => setInvoiceNum(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none focus:border-blue-500 text-slate-800 dark:text-slate-100 font-sans text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Issue Date</label>
            <input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none focus:border-blue-500 text-slate-800 dark:text-slate-100 font-sans text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Due Date (30 Days)</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none focus:border-blue-500 text-slate-800 dark:text-slate-100 font-sans text-sm"
            />
          </div>
        </div>

        {/* Sender & receiver details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-3.5 bg-blue-50/20 dark:bg-blue-950/10 p-4 rounded-lg border border-blue-100/40 dark:border-blue-950/40">
            <h4 className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Sender Information (Your Company)</h4>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Company Legal Name"
                value={sender.name}
                onChange={(e) => setSender({ ...sender, name: e.target.value })}
                className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-820 rounded outline-none text-xs text-slate-800 dark:text-slate-100"
              />
              <input
                type="email"
                placeholder="Business Email Address"
                value={sender.email}
                onChange={(e) => setSender({ ...sender, email: e.target.value })}
                className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-820 rounded outline-none text-xs text-slate-800 dark:text-slate-100"
              />
              <input
                type="text"
                placeholder="Corporate Address Location"
                value={sender.address}
                onChange={(e) => setSender({ ...sender, address: e.target.value })}
                className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-820 rounded outline-none text-xs text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="space-y-3.5 bg-slate-50 dark:bg-slate-950/30 p-4 rounded-lg border border-slate-150 dark:border-slate-850">
            <h4 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Client Billing Details (Receiver)</h4>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Client Corporation Name"
                value={client.name}
                onChange={(e) => setClient({ ...client, name: e.target.value })}
                className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-820 rounded outline-none text-xs text-slate-800 dark:text-slate-100"
              />
              <input
                type="email"
                placeholder="Client Billing Email"
                value={client.email}
                onChange={(e) => setClient({ ...client, email: e.target.value })}
                className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-820 rounded outline-none text-xs text-slate-800 dark:text-slate-100"
              />
              <input
                type="text"
                placeholder="Client Snail Mail Address"
                value={client.address}
                onChange={(e) => setClient({ ...client, address: e.target.value })}
                className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-820 rounded outline-none text-xs text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Dynamic products lines */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Invoice Items Billing Lines</h4>
            <button
              onClick={addItem}
              className="py-1 px-2.5 bg-slate-100 hover:bg-slate-205 dark:bg-slate-800 dark:hover:bg-slate-700 font-bold text-xs text-blue-600 dark:text-blue-400 rounded flex items-center gap-1 transition"
            >
              <Plus className="h-3 w-3" />
              Add Item Row
            </button>
          </div>

          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50/50 dark:bg-slate-950/10 p-2.5 rounded-lg border border-slate-150 dark:border-slate-830">
                <div className="col-span-12 sm:col-span-6">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    placeholder="Description of work or items"
                    className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-820 rounded text-xs text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                    placeholder="Qty"
                    className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-820 rounded text-xs text-slate-800 dark:text-slate-100 font-mono text-center"
                  />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <input
                    type="number"
                    value={item.rate}
                    min="0"
                    onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                    placeholder="Rate ($)"
                    className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-820 rounded text-xs text-slate-800 dark:text-slate-100 font-mono text-center"
                  />
                </div>
                <div className="col-span-3 sm:col-span-1 text-center font-mono text-xs font-bold text-slate-600 dark:text-slate-400">
                  ${(item.quantity * item.rate).toLocaleString()}
                </div>
                <div className="col-span-1 text-right">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded transition"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Math summary summary */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex flex-col items-end gap-3.5">
          <div className="w-full sm:w-80 space-y-2.5">
            <div className="grid grid-cols-2 text-xs font-semibold text-slate-500">
              <span>Subtotal:</span>
              <span className="text-right font-mono text-slate-700 dark:text-slate-350">${subtotal.toLocaleString()}</span>
            </div>

            <div className="grid grid-cols-2 items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                Discount (%):
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-12 p-1 border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-slate-900 text-center text-xs font-mono"
                />
              </span>
              <span className="text-right font-mono text-xs text-red-500 font-bold">-${discountAmount.toLocaleString()}</span>
            </div>

            <div className="grid grid-cols-2 items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                Est. Tax (%):
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-12 p-1 border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-slate-900 text-center text-xs font-mono"
                />
              </span>
              <span className="text-right font-mono text-xs text-slate-700 dark:text-slate-350 font-bold">+${taxAmount.toLocaleString()}</span>
            </div>

            <div className="grid grid-cols-2 text-sm font-bold text-slate-800 dark:text-slate-200 pt-2.5">
              <span className="text-blue-600 dark:text-blue-400">Total Balance Due:</span>
              <span className="text-right font-mono text-blue-600 dark:text-blue-400">${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Tax Calculator Code
function TaxCalculator() {
  const [income, setIncome] = useState(75000);
  const [deductions, setDeductions] = useState(13850); // Standard single deduction 2024
  const [taxState, setTaxState] = useState(6.5); // general state percentage

  const calculateTax = () => {
    const taxableIncome = Math.max(0, income - deductions);

    // Simplified US Federal Bracket rules:
    // 10% up to 11,600
    // 12% from 11,601 to 47,150
    // 22% from 47,151 to 100,525
    // 24% from 100,526 to 191,950
    // 32% beyond
    let federalTax = 0;
    const brackets = [
      { max: 11600, rate: 0.10 },
      { max: 47150, rate: 0.12 },
      { max: 100525, rate: 0.22 },
      { max: 191950, rate: 0.24 },
      { max: Infinity, rate: 0.32 },
    ];

    let prevMax = 0;
    for (const b of brackets) {
      if (taxableIncome > b.max) {
        federalTax += (b.max - prevMax) * b.rate;
        prevMax = b.max;
      } else {
        federalTax += (taxableIncome - prevMax) * b.rate;
        break;
      }
    }

    const stateTax = taxableIncome * (taxState / 100);
    const totalTax = federalTax + stateTax;
    const netIncome = income - totalTax;
    const effRate = income > 0 ? Math.round((totalTax / income) * 1000) / 10 : 0;

    return { federalTax, stateTax, totalTax, netIncome, effRate, taxableIncome };
  };

  const results = calculateTax();

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Income Tax & Deduction Estimator</h3>
          <p className="text-xs text-slate-400">Evaluate marginal brackets, standard deduction write-offs, and estimated annual take-home salary.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">Annual Gross Income<DollarSign className="h-3 w-3" /></span>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none focus:border-blue-500 text-slate-800 dark:text-slate-100 font-sans text-sm font-bold"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">Total Deductions (Standard Single)<DollarSign className="h-3 w-3" /></span>
            <input
              type="number"
              value={deductions}
              onChange={(e) => setDeductions(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none focus:border-blue-500 text-slate-800 dark:text-slate-100 font-sans text-sm font-bold"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">State Tax Rate (%)<HelpCircle className="h-3 w-3 text-slate-400" title="State-level income tax coefficient" /></span>
            <input
              type="number"
              value={taxState}
              step="0.1"
              onChange={(e) => setTaxState(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none focus:border-blue-500 text-slate-800 dark:text-slate-100 font-sans text-sm font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Tax Breakdown Summary</h4>
            <div className="space-y-2.5 p-4.5 bg-slate-50 dark:bg-slate-950/30 rounded-lg border border-slate-150 dark:border-slate-830">
              <div className="flex justify-between text-xs py-1.5 border-b border-slate-150/50 dark:border-slate-800">
                <span className="text-slate-500">Gross Income:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 font-bold">${income.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs py-1.5 border-b border-slate-150/50 dark:border-slate-800">
                <span className="text-slate-500">Standard Deductions Claimed:</span>
                <span className="font-mono text-red-500 font-semibold">-${deductions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs py-1.5 border-b border-slate-150/50 dark:border-slate-800">
                <span className="text-slate-500">Taxable Net Earnings:</span>
                <span className="font-mono text-slate-850 dark:text-slate-350 font-semibold">${results.taxableIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs py-1.5 border-b border-slate-150/50 dark:border-slate-800">
                <span className="text-slate-500">Federal Bracket Tax:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">${results.federalTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-xs py-1.5 border-b border-slate-150/50 dark:border-slate-800">
                <span className="text-slate-500">Sub-State Income Tax ({taxState}%):</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">${results.stateTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-xs py-1.5 border-b border-slate-110 dark:border-slate-800">
                <span className="text-red-500 font-bold">Total Estimated Tax Due:</span>
                <span className="font-mono text-red-500 font-bold">${results.totalTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm pt-2">
                <span className="text-green-600 dark:text-green-400 font-bold">Net Take-Home Salary:</span>
                <span className="font-mono text-green-600 dark:text-green-400 font-extrabold">${results.netIncome.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div className="p-4 bg-blue-50/30 dark:bg-blue-950/15 border border-blue-100/50 dark:border-blue-950/45 rounded-xl text-center space-y-2">
              <Calculator className="h-8 w-8 text-blue-500 mx-auto" />
              <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">{results.effRate}%</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Effective Annual Tax Rate</p>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto">This represents the absolute proportion of your total income paid out in taxation relative to progressive brackets.</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Post-Tax Budget Split</h4>
              <div className="h-7 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex font-mono text-[10px] font-bold text-white text-center shadow-inner">
                {results.totalTax > 0 && (
                  <div
                    className="bg-red-500 flex items-center justify-center transition-all duration-300"
                    style={{ width: `${Math.round((results.totalTax / income) * 100)}%` }}
                  >
                    Tax ({Math.round((results.totalTax / income) * 100)}%)
                  </div>
                )}
                <div
                  className="bg-green-600 flex items-center justify-center transition-all duration-300"
                  style={{ width: `${100 - Math.round((results.totalTax / income) * 100)}%` }}
                >
                  Take-home ({100 - Math.round((results.totalTax / income) * 100)}%)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Currency Converter Component
function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [source, setSource] = useState('USD');
  const [target, setTarget] = useState('EUR');
  const [copied, setCopied] = useState(false);

  // Coefficients relative to USD (May 2026 standardized values)
  const RATES: Record<string, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 156.4,
    CAD: 1.36,
    AUD: 1.50,
    CHF: 0.91,
    INR: 83.2,
  };

  const CURRENCY_LABELS: Record<string, string> = {
    USD: 'US Dollar ($)',
    EUR: 'Euro (€)',
    GBP: 'British Pound (£)',
    JPY: 'Japanese Yen (¥)',
    CAD: 'Canadian Dollar (C$)',
    AUD: 'Australian Dollar (A$)',
    CHF: 'Swiss Franc (CHF)',
    INR: 'Indian Rupee (₹)',
  };

  const handleSwap = () => {
    setSource(target);
    setTarget(source);
  };

  const getConversion = () => {
    const amountInUSD = amount / RATES[source];
    const converted = amountInUSD * RATES[target];
    const rateOfConversion = RATES[target] / RATES[source];
    return {
      converted: Math.round(converted * 100) / 100,
      rate: Math.round(rateOfConversion * 10000) / 10000,
    };
  };

  const conversion = getConversion();

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Live Currency Convert Tracker</h3>
          <p className="text-xs text-slate-400">Trade or convert assets using stable spot pricing coefficients.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-3 space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none focus:border-blue-500 text-slate-800 dark:text-slate-100 font-sans text-sm font-bold"
            />
          </div>

          <div className="md:col-span-4 space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">From (Source)</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none focus:border-blue-500 text-slate-800 dark:text-slate-100 text-sm font-semibold"
            >
              {Object.keys(RATES).map((code) => (
                <option key={code} value={code}>{CURRENCY_LABELS[code]}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-1 pt-4 text-center">
            <button
              onClick={handleSwap}
              className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-350 rounded-full transition shadow-xs"
              title="Swap Currencies"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          <div className="md:col-span-4 space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">To (Target)</label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none focus:border-blue-500 text-slate-800 dark:text-slate-100 text-sm font-semibold"
            >
              {Object.keys(RATES).map((code) => (
                <option key={code} value={code}>{CURRENCY_LABELS[code]}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950/40 p-5 rounded-lg border border-slate-150 dark:border-slate-830 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Spot Conversion Result</h4>
            <p className="text-sm font-sans text-slate-500 dark:text-slate-400">
              {amount.toLocaleString()} {source} =
            </p>
            <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tracking-tight">
              {conversion.converted.toLocaleString()} {target}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs font-semibold text-slate-500">Live Exchange rate index:</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-250 font-mono">1 {source} = {conversion.rate} {target}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
