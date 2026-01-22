const downloadAsHTML = () => {
    if (csvData.length === 0) {
      setError('No data to download');
      return;
    }

    const certCount = Math.min(csvData.length, 100);
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Certificates</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: white; }
        .certificate { page-break-after: always; padding: 25px; background-color: #f0ede8; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 2px solid #333; gap: 10px; }
        .qr-box { width: 80px; height: 80px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-size: 7px; }
        .header-right { flex: 1; text-align: right; }
        .header-right h1 { font-size: 11px; font-weight: bold; margin: 0; white-space: nowrap; }
        .header-right h2 { font-size: 11px; font-weight: bold; margin: 2px 0; }
        .header-right p { font-size: 9px; margin: 3px 0 0 0; }
        .logo-box { width: 128px; height: 96px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 7px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 8px; }
        .form-group { border-bottom: 1px solid #999; padding-bottom: 4px; }
        .form-group label { font-size: 8px; font-weight: bold; color: #4a7a8a; }
        .form-group div { font-size: 10px; color: #333; }
        .equipment { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; padding: 8px; background: #fff; border: 1px solid #ccc; margin-bottom: 12px; }
        .equipment label { font-size: 8px; font-weight: bold; color: #4a7a8a; }
        .equipment div { font-size: 10px; }
        .test-results { background: #4a7a8a; color: white; margin-bottom: 12px; }
        .test-header { padding: 6px; text-align: center; font-weight: bold; font-size: 10px; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #4a7a8a; padding: 4px; font-size: 8px; border: 1px solid #666; }
        td { padding: 4px; font-size: 8px; border: 1px solid #666; }
        .passed { background: #4CAF50; color: white; padding: 2px 4px; border-radius: 2px; font-weight: bold; }
        .failed { background: #f44336; color: white; padding: 2px 4px; border-radius: 2px; font-weight: bold; }
        .cert-text { background: #4a7a8a; color: white; padding: 8px; font-size: 7px; line-height: 1.3; margin-bottom: 8px; }
        .sig-section { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 8px; }
        .sig-block { text-align: center; }
        .sig-line { border-top: 1px solid #333; height: 25px; margin-bottom: 2px; }
        .sig-label { font-size: 7px; }
        .footer { background: #4a7a8a; color: white; text-align: center; padding: 6px; font-weight: bold; font-size: 9px; }
        @media print { .certificate { page-break-after: always; } }
    </style>
</head>
<body>`;

    for (let i = 0; i < certCount; i++) {
      const data = csvData[i];
      const inspDate = new Date(data['Date Of Inspection']);
      const expiryDate = new Date(inspDate.getFullYear() + 1, inspDate.getMonth(), inspDate.getDate());
      const expiryStr = expiryDate.toLocaleDateString('en-GB');

      const getResult = (measured, param) => {
        const standards = { CO: 6, Smoke: 2, Noise: 85 };
        const num = parseFloat(measured);
        return num <= standards[param] ? 'PASSED' : 'FAILED';
      };

      html += `<div class="certificate">
<div class="header">
  <div class="qr-box">QR</div>
  <div class="header-right">
    <h1>Environmental Services and Sustainable Solutions</h1>
    <h2>(Pvt.) Ltd.</h2>
    <p>SUSTAIN THE PULSE</p>
  </div>
  <div class="logo-box">LOGO</div>
</div>
<div style="margin-bottom: 12px;">
  <div class="form-row">
    <div class="form-group"><label>Certificate Number:</label><div>${data['Certificate Number'] || '-'}</div></div>
    <div class="form-group"><label>Date Of Inspection:</label><div>${data['Date Of Inspection'] || '-'}</div></div>
  </div>
  <div class="form-row">
    <div class="form-group"><label>Client / Owner Name:</label><div>${data['Client/ Owner Name'] || '-'}</div></div>
    <div class="form-group"><label>Date of Expiry:</label><div>${expiryStr}</div></div>
  </div>
  <div class="form-row">
    <div class="form-group"><label>Location:</label><div>${data['Location'] || '-'}</div></div>
    <div class="form-group"><label>Relevant Standard:</label><div>NEQS</div></div>
  </div>
  <div class="form-row">
    <div class="form-group"><label>Type of Body:</label><div>${data['TYPE OF BODY'] || '-'}</div></div>
    <div class="form-group"><label>Invoice:</label><div>${data['Invoice'] || '-'}</div></div>
  </div>
</div>
<div class="equipment">
  <div><label>Model / CC</label><div>${data['Model/ CC'] || '-'}</div></div>
  <div><label>Makers/ Make Name</label><div>${data["Maker's/ Make Name"] || '-'}</div></div>
  <div><label>Registration No.</label><div>${data['Registration No.'] || '-'}</div></div>
</div>
<div class="test-results">
  <div class="test-header">TEST RESULTS</div>
  <table>
    <tr><th>Sr.</th><th>PARAMETERS</th><th>PERMISSIBLE</th><th>MEASURED</th><th>RESULT</th></tr>
    <tr><td>1</td><td>CO</td><td>6%</td><td>${data['CO'] || '-'}</td><td><span class="${getResult(data['CO'], 'CO') === 'PASSED' ? 'passed' : 'failed'}">${getResult(data['CO'], 'CO')}</span></td></tr>
    <tr><td>2</td><td>SMOKE</td><td>2 Ringelmann</td><td>${data['Smoke'] || '-'}</td><td><span class="${getResult(data['Smoke'], 'Smoke') === 'PASSED' ? 'passed' : 'failed'}">${getResult(data['Smoke'], 'Smoke')}</span></td></tr>
    <tr><td>3</td><td>NOISE</td><td>85 DBA</td><td>${data['Noise'] || '-'}</td><td><span class="${getResult(data['Noise'], 'Noise') === 'PASSED' ? 'passed' : 'failed'}">${getResult(data['Noise'], 'Noise')}</span></td></tr>
  </table>
</div>
<div class="cert-text">I certify that the item(s)/described above were examined in the prescribed manner as per the standard. The testing parameters mentioned above were found satisfactory at the time of the test.</div>
<div class="sig-section">
  <div class="sig-block"><div class="sig-line"></div><div class="sig-label">Authorized Signatory</div></div>
  <div class="sig-block"><div class="sig-line"></div><div class="sig-label">Official Seal</div></div>
</div>
<div class="footer">CERTIFICATE OF EXHAUST EMISSION</div>
</div>`;
    }

    html += `</body></html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Certificates_${certCount}.html`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }, 100);
  };import React, { useState } from 'react';
import { Upload, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';

export default function CertificateGenerator() {
  const [csvData, setCsvData] = useState([]);
  const [qrCodes, setQrCodes] = useState({});
  const [images, setImages] = useState({ logo: null, signature: null, stamp: null });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState('');
  const [uploadedQRCount, setUploadedQRCount] = useState(0);
  const [generated, setGenerated] = useState(false);

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data);
        setError('');
      },
      error: (err) => setError(`CSV Error: ${err.message}`),
    });
  };

  const handleQRUpload = (e) => {
    const files = e.target.files;
    if (!files) return;

    const codes = { ...qrCodes };
    let count = 0;

    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (event) => {
        codes[file.name] = event.target.result;
        count++;
        if (count === files.length) {
          setQrCodes(codes);
          setUploadedQRCount(Object.keys(codes).length);
          setError('');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (type) => (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImages({ ...images, [type]: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  const validateRange = (measured, paramType) => {
    if (!measured) return true;

    // Standard permissible ranges
    const standards = {
      CO: 6, // 6%
      Smoke: 2, // 2 Ringelmann scale
      Noise: 85 // 85 DBA
    };

    const num = parseFloat(measured);
    if (isNaN(num)) return true;

    return num <= standards[paramType];
  };

  const currentData = csvData[currentIndex];
  const qrFilename = `QR_Q-${currentIndex + 1}.png`;
  const qrImage = qrCodes[qrFilename] || qrCodes[`QR_Q-${currentIndex + 1}`];

  // Calculate expiry date (1 year from inspection date)
  const getExpiryDate = () => {
    if (!currentData['Date Of Inspection']) return '-';
    try {
      const inspDate = new Date(currentData['Date Of Inspection']);
      const expiryDate = new Date(inspDate.getFullYear() + 1, inspDate.getMonth(), inspDate.getDate());
      return expiryDate.toLocaleDateString('en-GB');
    } catch {
      return '-';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Upload Section */}
        {!generated && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Certificate Generator</h1>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-4 mb-6 flex gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0" />
                <span className="text-red-800">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* CSV Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
                <Upload className="mx-auto mb-3 text-gray-600" size={32} />
                <label className="cursor-pointer">
                  <span className="text-lg font-semibold text-gray-700 block mb-2">Upload CSV File</span>
                  <span className="text-sm text-gray-500">1000 entries with certificate data</span>
                  <input type="file" accept=".csv" onChange={handleCSVUpload} className="hidden" />
                </label>
              </div>

              {/* QR Codes Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
                <Upload className="mx-auto mb-3 text-gray-600" size={32} />
                <label className="cursor-pointer">
                  <span className="text-lg font-semibold text-gray-700 block mb-2">Upload QR Code Images</span>
                  <span className="text-sm text-gray-500">QR001.png to QR1000.png (select multiple)</span>
                  <input type="file" accept="image/*" multiple onChange={handleQRUpload} className="hidden" />
                </label>
                {uploadedQRCount > 0 && (
                  <span className="text-xs text-green-600 mt-2 block">{uploadedQRCount} QR codes uploaded</span>
                )}
              </div>
            </div>

            {/* Image Uploads */}
            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Upload Images</h2>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {['logo', 'signature', 'stamp'].map((type) => (
                  <div key={type} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
                    {images[type] ? (
                      <img src={images[type]} alt={type} className="h-20 mx-auto mb-3" />
                    ) : (
                      <Upload className="mx-auto mb-3 text-gray-600" size={24} />
                    )}
                    <label className="cursor-pointer">
                      <span className="text-sm font-semibold text-gray-700 block mb-2 capitalize">{type}</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload(type)} className="hidden" />
                    </label>
                  </div>
                ))}
              </div>

              {/* Generate Button */}
              {csvData.length > 0 && uploadedQRCount > 0 && (
                <div className="text-center space-y-4">
                  <button
                    onClick={() => setGenerated(true)}
                    className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 text-lg"
                  >
                    ✓ View Certificates
                  </button>
                  <button
                    onClick={downloadAsHTML}
                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 text-lg block mx-auto"
                  >
                    ⬇️ Download All Certificates
                  </button>
                  <p className="text-sm text-gray-600">Open the downloaded file in your browser, then press Ctrl+P to print/save as PDF</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Certificate Preview */}
        {generated && csvData.length > 0 && currentData && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Navigation */}
            <div className="flex justify-between items-center p-6 bg-gray-50 border-b">
              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
              >
                <ChevronLeft size={20} /> Previous
              </button>
              <span className="text-gray-700 font-semibold">
                Certificate {currentIndex + 1} of {csvData.length}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  🖨️ Print/PDF
                </button>
                <button
                  onClick={() => setCurrentIndex(Math.min(csvData.length - 1, currentIndex + 1))}
                  disabled={currentIndex === csvData.length - 1}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                  Next <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Certificate Content */}
            <div className="p-12 bg-yellow-50">
              {/* Header */}
              <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-gray-300 gap-4">
                {qrImage ? (
                  <div className="flex-shrink-0">
                    <img src={qrImage} alt="QR Code" className="w-24 h-24 border-2 border-gray-800" />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-24 h-24 border-2 border-gray-400 border-dashed flex items-center justify-center text-xs text-gray-500">
                    No QR
                  </div>
                )}
                
                <div className="flex-1 text-right">
                  <h1 className="text-xs font-bold text-gray-800 mb-0 whitespace-nowrap">
                    Environmental Services and Sustainable Solutions
                  </h1>
                  <h2 className="text-xs font-bold text-gray-800 mb-1">
                    (Pvt.) Ltd.
                  </h2>
                  <p className="text-xs text-gray-700">SUSTAIN THE PULSE</p>
                </div>

                {images.logo && (
                  <div className="flex-shrink-0">
                    <img src={images.logo} alt="Logo" className="h-24 w-32" />
                  </div>
                )}
              </div>

              {/* Certificate Details */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="border-b border-gray-400 pb-2">
                  <label className="text-xs font-bold text-teal-700">Certificate Number:</label>
                  <div className="text-sm text-gray-800">{currentData['Certificate Number'] || '-'}</div>
                </div>
                <div className="border-b border-gray-400 pb-2">
                  <label className="text-xs font-bold text-teal-700">Date Of Inspection:</label>
                  <div className="text-sm text-gray-800">{currentData['Date Of Inspection'] || '-'}</div>
                </div>
                <div className="border-b border-gray-400 pb-2">
                  <label className="text-xs font-bold text-teal-700">Client / Owner Name:</label>
                  <div className="text-sm text-gray-800">{currentData['Client/ Owner Name'] || '-'}</div>
                </div>
                <div className="border-b border-gray-400 pb-2">
                  <label className="text-xs font-bold text-teal-700">Date of Expiry:</label>
                  <div className="text-sm text-gray-800">{getExpiryDate()}</div>
                </div>
                <div className="border-b border-gray-400 pb-2">
                  <label className="text-xs font-bold text-teal-700">Location:</label>
                  <div className="text-sm text-gray-800">{currentData['Location'] || '-'}</div>
                </div>
                <div className="border-b border-gray-400 pb-2">
                  <label className="text-xs font-bold text-teal-700">Relevant Standard:</label>
                  <div className="text-sm text-gray-800">NEQS</div>
                </div>
                <div className="border-b border-gray-400 pb-2">
                  <label className="text-xs font-bold text-teal-700">Type of Body:</label>
                  <div className="text-sm text-gray-800">{currentData['TYPE OF BODY'] || '-'}</div>
                </div>
                <div className="border-b border-gray-400 pb-2">
                  <label className="text-xs font-bold text-teal-700">Invoice:</label>
                  <div className="text-sm text-gray-800">{currentData['Invoice'] || '-'}</div>
                </div>
              </div>

              {/* Equipment Details */}
              <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-white rounded border border-gray-300">
                <div>
                  <label className="text-xs font-bold text-teal-700 block">Model / CC</label>
                  <div className="text-sm text-gray-800">{currentData['Model/ CC'] || '-'}</div>
                </div>
                <div>
                  <label className="text-xs font-bold text-teal-700 block">Makers/ Make Name</label>
                  <div className="text-sm text-gray-800">{currentData["Maker's/ Make Name"] || '-'}</div>
                </div>
                <div>
                  <label className="text-xs font-bold text-teal-700 block">Registration No.</label>
                  <div className="text-sm text-gray-800">{currentData['Registration No.'] || '-'}</div>
                </div>
              </div>

              {/* Test Results */}
              <div className="mb-8 bg-teal-700 rounded overflow-hidden">
                <div className="bg-teal-700 text-white text-center py-3 font-bold">TEST RESULTS</div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-teal-700 text-white">
                      <th className="border border-teal-600 p-2 text-left">Sr. No</th>
                      <th className="border border-teal-600 p-2 text-left">PARAMETERS</th>
                      <th className="border border-teal-600 p-2 text-left">PERMISSIBLE RANGES</th>
                      <th className="border border-teal-600 p-2 text-left">MEASURED VALUES</th>
                      <th className="border border-teal-600 p-2 text-left">RESULT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['CO', 'Smoke', 'Noise'].map((param, idx) => {
                      const standards = { CO: '6%', Smoke: '2 Ringelmann scale', Noise: '85 DBA' };
                      const permissible = standards[param];
                      const measured = currentData[param] || '';
                      const passed = validateRange(measured, param);
                      
                      return (
                        <tr key={idx} className="bg-white hover:bg-gray-50">
                          <td className="border border-gray-300 p-2">{idx + 1}</td>
                          <td className="border border-gray-300 p-2">{param.toUpperCase()}</td>
                          <td className="border border-gray-300 p-2">{permissible}</td>
                          <td className="border border-gray-300 p-2">{measured}</td>
                          <td className="border border-gray-300 p-2 text-center">
                            <span className={`px-2 py-1 rounded font-bold text-white text-xs ${
                              passed ? 'bg-green-600' : 'bg-red-600'
                            }`}>
                              {passed ? 'PASSED' : 'FAILED'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Certification Text */}
              <div className="bg-teal-700 text-white p-4 rounded text-xs leading-relaxed mb-8">
                I certify that the item(s)/described above were examined in the prescribed manner as per the standard. The testing parameters mentioned above were found satisfactory at the time of the test. This test report does not relieve the contractor/user from their obligations to keep the maintained equipment used safely.
              </div>

              {/* Signature Section */}
              <div className="grid grid-cols-2 gap-12 mb-6">
                <div className="text-center">
                  <div className="h-20 mb-2 flex items-end justify-center">
                    {images.signature && <img src={images.signature} alt="Signature" className="max-h-16" />}
                  </div>
                  <div className="border-t border-gray-800 pt-2 text-xs font-semibold">Authorized Signatory</div>
                </div>
                <div className="text-center">
                  <div className="h-20 mb-2 flex items-end justify-center">
                    {images.stamp && <img src={images.stamp} alt="Stamp" className="max-h-16" />}
                  </div>
                  <div className="border-t border-gray-800 pt-2 text-xs font-semibold">Official Seal</div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-teal-700 text-white text-center py-3 font-bold tracking-wider">
                CERTIFICATE OF EXHAUST EMISSION
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
