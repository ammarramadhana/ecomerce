document.addEventListener('DOMContentLoaded', function() {
  const products = document.querySelectorAll('.product-item');
  const popup = document.getElementById('productPopup');
  const receiptPopup = document.getElementById('receiptPopup');
  const closeButtons = document.querySelectorAll('.close');
  const popupTitle = document.getElementById('popupTitle');
  const popupPrice = document.getElementById('popupPrice');
  const cashButton = document.getElementById('cashButton');
  const creditButton = document.getElementById('creditButton');
  const creditOptions = document.getElementById('creditOptions');
  const installmentPeriod = document.getElementById('installmentPeriod');
  const installmentAmount = document.getElementById('installmentAmount');
  const proceedButton = document.getElementById('proceedButton');
  const receiptTitle = document.getElementById('receiptTitle');
  const receiptPrice = document.getElementById('receiptPrice');
  const receiptPaymentMethod = document.getElementById('receiptPaymentMethod');
  const receiptInstallment = document.getElementById('receiptInstallment');
  const receiptInstallmentPeriod = document.getElementById('receiptInstallmentPeriod');
  const receiptInstallmentAmount = document.getElementById('receiptInstallmentAmount');
  const receiptPriceNote = document.getElementById('receiptPriceNote');

  let selectedProduct = null;
  let selectedPaymentMethod = null;
  let selectedInstallmentPeriod = null;
  let selectedInstallmentAmount = null;

  function calculateTotal(price, dp, tenor, interestRate, taxRate) {
    const installment = (price - dp) * (1 + (interestRate / 100)) / tenor;
    const tax = price * (taxRate / 100);
    const total = price + tax;
    return { installment, tax, total };
  }

  function showReceiptPopup() {
    const title = popupTitle.innerText;
    const price = parseInt(popupPrice.innerText.replace(/[^0-9]/g, ''));
    let dp = 0;
    if (selectedPaymentMethod === 'Credit') {
      dp = 100000000; // DP for Credit
    }
    const tenorMonths = selectedInstallmentPeriod ? parseInt(selectedInstallmentPeriod) : 0;
    const interestRate = selectedPaymentMethod === 'Cash' ? 0 : 5;
    const taxRate = 10;

    const totalInfo = calculateTotal(price, dp, tenorMonths, interestRate, taxRate);

    document.getElementById('item-name').innerText = 'Nama Mobil: ' + title;
    document.getElementById('item-price').innerText = 'Harga Mobil: Rp ' + new Intl.NumberFormat('id-ID').format(price);
    document.getElementById('down-payment').innerText = 'DP: Rp ' + new Intl.NumberFormat('id-ID').format(dp);
    document.getElementById('tax').innerText = 'Pajak: Rp ' + new Intl.NumberFormat('id-ID').format(totalInfo.tax);
    document.getElementById('total').innerText = 'Total Harga: Rp ' + new Intl.NumberFormat('id-ID').format(totalInfo.total);
    receiptPaymentMethod.innerText = 'Metode Pembayaran: ' + selectedPaymentMethod;
    receiptPriceNote.style.display = 'block';

    if (selectedPaymentMethod === 'Credit' && selectedInstallmentPeriod && selectedInstallmentAmount) {
      receiptInstallment.style.display = 'block';
      receiptInstallmentPeriod.innerText = 'Tenor: ' + selectedInstallmentPeriod + ' bulan';
      receiptInstallmentAmount.innerText = 'Cicilan: Rp ' + new Intl.NumberFormat('id-ID').format(selectedInstallmentAmount);
    } else {
      receiptInstallment.style.display = 'none';
    }

    receiptPopup.style.display = 'block';
    popup.style.backgroundColor = 'white'; // Set background color to yellow when showing receipt
  }

  document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      selectedProduct = button.closest('.product-item');
      const productName = button.getAttribute('data-product-name');
      const productPrice = button.getAttribute('data-product-price');

      popupTitle.innerText = productName;
      popupPrice.innerText = 'Rp ' + new Intl.NumberFormat('id-ID').format(parseInt(productPrice));

      popup.style.display = 'block';
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      popup.style.display = 'none';
      receiptPopup.style.display = 'none';
      creditOptions.style.display = 'none';
      installmentAmount.innerText = '';
    });
  });

  window.addEventListener('click', function(event) {
    if (event.target == popup) {
      popup.style.display = 'none';
      creditOptions.style.display = 'none';
      installmentAmount.innerText = '';
    } else if (event.target == receiptPopup) {
      receiptPopup.style.display = 'none';
    }
  });

  creditButton.addEventListener('click', function() {
    selectedPaymentMethod = 'Credit';
    creditOptions.style.display = 'block';
  });

  cashButton.addEventListener('click', function() {
    selectedPaymentMethod = 'Cash';
    creditOptions.style.display = 'none';
    installmentAmount.innerText = '';
    selectedInstallmentPeriod = null;
    selectedInstallmentAmount = null;

    // Directly show receipt popup
    showReceiptPopup();
  });

  installmentPeriod.addEventListener('change', function() {
    const period = installmentPeriod.value;
    const price = parseInt(popupPrice.innerText.replace(/[^0-9]/g, ''));
    const installment = price / period;
    selectedInstallmentPeriod = period;
    selectedInstallmentAmount = installment;
    installmentAmount.innerText = 'Rp ' + new Intl.NumberFormat('id-ID').format(installment);
  });

  proceedButton.addEventListener('click', function() {
    showReceiptPopup();
  });
});