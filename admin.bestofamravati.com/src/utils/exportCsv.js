export const exportToCSV = (data, filename) => {
  if (!data || !data.length) {
    alert("No data available to export");
    return;
  }

  // Get all unique keys across all objects to form headers
  const keys = Array.from(new Set(data.flatMap(Object.keys)));
  const csvRows = [];
  
  // Header row
  csvRows.push(keys.join(','));

  // Data rows
  for (const row of data) {
    const values = keys.map(key => {
      const val = row[key] !== null && row[key] !== undefined ? row[key] : '';
      const escaped = String(val).replace(/"/g, '""'); // escape double quotes
      return `"${escaped}"`; // wrap in double quotes
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
