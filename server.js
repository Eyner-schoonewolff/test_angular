const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'dist/proyecto')));

// Manejar rutas Angular
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/proyecto/index.html'));
});

// Configurar puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
