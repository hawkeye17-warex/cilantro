const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');
const path = require('path');

const app = express();
const PORT = 3000;

// Important CORS configuration
app.use(cors({
    origin: '*', // Be more specific in production
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/menu', (req, res) => {
    try {
        const filePath = path.join(__dirname, 'menu.xlsx');
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const menuData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        
        // Log server-side data
        console.log('Server menu data:', menuData);
        
        res.json(menuData);
    } catch (error) {
        console.error('Server error reading menu:', error);
        res.status(500).json({ error: 'Failed to read menu data' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});