const xlsx = require('xlsx');

class ExcelService {
    readExcelFile(filePath) {
        try {
            const workbook = xlsx.readFile(filePath);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            return xlsx.utils.sheet_to_json(sheet);
        } catch (error) {
            console.error('Error reading Excel file:', error);
            throw error;
        }
    }
}

module.exports = new ExcelService();