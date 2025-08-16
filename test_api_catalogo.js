// test_api_catalogo.js
const axios = require('axios');

const URL = 'https://whatsapp-nube.com/api_web/api_web_catalogo_new2.php';
const PARAMS = {
  dominio: 'consmopcmayorista.com',
  id: 24,
};

// intenta adivinar el campo de existencias "por sedes"
function pickExistenciaRaw(prod) {
  return (
    prod.existencia2 ??
    prod.existencias2 ??
    prod.existencia_sedes ??
    prod.existenciaSedes ??
    prod.stock_sedes ??
    prod.stock2 ??
    prod.existencias ??
    prod.existencia ?? // a veces meten la lista aquí
    ''
  );
}

// suma segura: "Sede:2,Sede2:1" -> 3 ; "Sede,Sede2" -> 0
function sumarExistencia2(str) {
  if (!str || typeof str !== 'string') return 0;
  return str.split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .reduce((acc, tok) => {
      const n = parseInt((tok.split(':')[1] || ''), 10);
      return acc + (Number.isFinite(n) ? n : 0);
    }, 0);
}

(async () => {
  try {
    const resp = await axios.get(URL, { params: PARAMS, validateStatus: () => true, timeout: 10000 });

    console.log('=== STATUS ===', resp.status, resp.statusText);
    if (resp.status !== 200) {
      console.log('Respuesta no OK. Body (primeros 500 chars):\n', String(resp.data).slice(0,500));
      return;
    }

    const data = resp.data;
    console.log('\n=== Tipo de respuesta ===', typeof data);

    // Detectar array de productos
    let productos = [];
    if (Array.isArray(data)) productos = data;
    else productos = data.productos || data.items || data.data || [];

    console.log('Productos es array?', Array.isArray(productos), 'len:', productos.length);

    if (!Array.isArray(productos) || productos.length === 0) {
      console.log('Estructura completa (primeros 800 chars):\n', JSON.stringify(data).slice(0,800));
      return;
    }

    console.log('\nKeys del primer producto:', Object.keys(productos[0]));

    // Muestra 20 con id + existencia cruda + total sumado
    productos.slice(0,20).forEach(p => {
      const id = p.idpro ?? p.id ?? p.codigo ?? p.ref ?? p.sku ?? '(sin_id)';
      const raw = pickExistenciaRaw(p) || '';
      const total = sumarExistencia2(raw);
      console.log(`ID: ${id} | existencia2_raw: "${raw}" | total: ${total}`);
    });

  } catch (e) {
    console.error('ERROR llamando API:', e.message);
  }
})();
