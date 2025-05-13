const fs = require('fs');

// Đọc file JSON DevTools export
const raw = fs.readFileSync('cookies.json', 'utf8');
const parsed = JSON.parse(raw);

// Lấy ra mảng cookies
const devtoolsCookies = parsed.cookies;

// Chuyển đổi sang định dạng Puppeteer
const puppeteerCookies = devtoolsCookies.map(cookie => {
  const converted = {
    name: cookie.name,
    value: cookie.value,
    domain: cookie.domain,
    path: cookie.path,
    secure: cookie.secure,
    httpOnly: cookie.httpOnly,
  };

  // Puppeteer không nhận session=true, nhưng có thể nhận expires
  if (!cookie.session && cookie.expirationDate) {
    converted.expires = Math.floor(cookie.expirationDate);
  }

  // Puppeteer không nhận các giá trị `sameSite: "unspecified"` — chỉ nhận "Strict", "Lax", hoặc "None"
  if (['Strict', 'Lax', 'None'].includes(cookie.sameSite)) {
    converted.sameSite = cookie.sameSite;
  }

  return converted;
});

// Ghi ra file JSON chuẩn cho Puppeteer
fs.writeFileSync('converted-cookies.json', JSON.stringify(puppeteerCookies, null, 2));
console.log('✅ Đã convert xong sang converted-cookies.json');
