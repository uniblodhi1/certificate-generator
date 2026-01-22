# Certificate Generator

A web-based application to generate, manage, and download exhaust emission certificates in bulk. Upload CSV data with QR codes and automatically generate professional certificates with pass/fail validation.

## Features

✅ **Bulk Certificate Generation** - Generate up to 100 certificates at once
✅ **CSV Import** - Upload your certificate data with all details
✅ **QR Code Integration** - Automatically matches QR codes (QR_Q-1.png, QR_Q-2.png, etc.)
✅ **Smart Validation** - Auto-validates CO, Smoke, and Noise against permissible ranges
✅ **Pass/Fail Status** - Green for PASSED, Red for FAILED results
✅ **Custom Branding** - Add your company logo, signature, and official stamp
✅ **Auto Expiry Date** - Automatically calculates expiry date (1 year from inspection)
✅ **Easy Download** - Download all certificates as one HTML file and convert to PDF

## Tech Stack

- **React** - UI Framework
- **Tailwind CSS** - Styling
- **PapaParse** - CSV parsing
- **JavaScript** - Logic

## Installation

### Online (No Installation Required)
Simply visit the live demo and upload your files.

### Local Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/certificate-generator.git
cd certificate-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open browser to `http://localhost:3000`

## How to Use

### 1. Prepare Your Files

**CSV File Requirements:**
- Column headers must match exactly:
  - `QR Code` (e.g., QR_Q-1)
  - `Certificate Number`
  - `Client/ Owner Name`
  - `Location`
  - `TYPE OF BODY`
  - `Invoice`
  - `Model/ CC`
  - `Maker's/ Make Name`
  - `Registration No.`
  - `CO` (e.g., 3.10%)
  - `Smoke` (e.g., 1 Ringelmann scale)
  - `Noise` (e.g., 32 dBA)
  - `Date Of Inspection` (e.g., 20-Dec-25)

**QR Code Files:**
- Named: `QR_Q-1.png`, `QR_Q-2.png`, etc.
- Match the row numbers in your CSV

**Optional Images:**
- Company Logo
- Authorized Signature
- Official Stamp/Seal

### 2. Upload Files

1. Upload your CSV file
2. Select all QR code images (multi-select)
3. Upload Logo, Signature, and Stamp (optional)

### 3. Generate & Download

1. Click **"✓ View Certificates"** to browse and preview
2. Click **"⬇️ Download All Certificates"** to download as HTML

### 4. Convert to PDF

1. Open the downloaded HTML file in your browser
2. Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
3. Select **"Save as PDF"**
4. All certificates saved as one PDF!

## Validation Rules

### Permissible Ranges (NEQS)
- **CO**: Max 6%
- **Smoke**: Max 2 Ringelmann scale
- **Noise**: Max 85 DBA

### Auto Calculations
- **Expiry Date**: Automatically set to 1 year after inspection date
- **Result**: PASSED if within range, FAILED if exceeds range

## Example CSV

```
QR Code,Certificate Number,Client/ Owner Name,Location,TYPE OF BODY,Invoice,Model/ CC,Maker's/ Make Name,Registration No.,CO,Smoke,Noise,Date Of Inspection
QR_Q-1,ES3-EEST-0001-2026,Unib Arshad Lodhi,Wah Cantt,Honda/Reborn,1500,2011,Honda,LE-11-3494,3.10%,1 Ringelmann scale,32 dBA,20-Dec-25
QR_Q-2,ES3-EEST-0002-2026,Qasim,Wah Cantt,Honda/Reborn,1500,2012,Toyota,LE-11-3495,3.10%,2 Ringelmann scale,33 dBA,20-Dec-25
```

## File Structure

```
certificate-generator/
├── src/
│   ├── App.jsx              # Main React component
│   ├── index.js             # Entry point
│   └── styles/              # CSS files
├── public/
│   └── index.html           # HTML template
├── package.json             # Dependencies
├── README.md                # This file
└── .gitignore
```

## Features Explained

### Smart Pass/Fail Validation
- Compares measured values against permissible ranges
- Automatically shows PASSED (green) or FAILED (red)
- Works with percentages (%), Ringelmann scales, and dBA

### Auto Expiry Date Calculation
- Takes inspection date from CSV
- Adds exactly 1 year
- Displays in DD/MM/YYYY format

### Bulk Download
- Max 100 certificates per download
- Single HTML file with all certificates
- Print-optimized layout
- Page breaks between certificates

## Troubleshooting

**QR codes not showing?**
- Ensure filenames match exactly: `QR_Q-1.png`, `QR_Q-2.png`, etc.
- Check that CSV `QR Code` column values match

**Data not populating?**
- Verify CSV column headers match exactly (case-sensitive)
- Ensure no extra spaces in column names

**Download button not working?**
- Try a different browser (Chrome recommended)
- Clear browser cache
- Check file size (should be < 5MB)

## Customization

You can modify:
- Header layout and fonts
- Colors and styling
- Validation ranges (edit the `standards` object)
- Certificate template and content
- Footer text

## License

MIT License - Feel free to use, modify, and distribute

## Support

For issues or questions, create a GitHub Issue or contact the maintainer.

## Future Enhancements

- [ ] Direct PDF export (without printing)
- [ ] Direct PNG export
- [ ] Batch email certificates
- [ ] Database integration
- [ ] Multi-language support
- [ ] Custom validation rules
- [ ] Certificate templates

---

**Made with ❤️ for Environmental Services and Sustainable Solutions (Pvt.) Ltd.**
