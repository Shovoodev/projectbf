export const pdfTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 12px;
      color: #000;
    }

    h2 {
      margin-bottom: 4px;
    }

    .section {
      margin-bottom: 16px;
    }

    .row {
      display: flex;
      gap: 12px;
      margin-bottom: 8px;
    }

    .field {
      flex: 1;
      border-bottom: 1px solid #000;
      padding-bottom: 2px;
    }

    .label {
      font-weight: bold;
      font-size: 11px;
    }

    footer {
      position: fixed;
      bottom: 10mm;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 10px;
    }
  </style>
</head>
<body>

  <h2>Investor Details</h2>

  <div class="section">
    <div class="row">
      <div class="field">
        <div class="label">Surname</div>
        ${data.surname || ''}
      </div>
      <div class="field">
        <div class="label">Given Names</div>
        ${data.givenNames || ''}
      </div>
    </div>

    <div class="row">
      <div class="field">
        <div class="label">Email</div>
        ${data.email || ''}
      </div>
      <div class="field">
        <div class="label">Mobile</div>
        ${data.mobile || ''}
      </div>
    </div>
  </div>

  <footer>
    KeyInvest Funeral Bond PDS – July 2026
  </footer>

</body>
</html>
`;
