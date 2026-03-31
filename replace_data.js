import fs from 'fs';

const csvContent = fs.readFileSync('new_events.csv', 'utf8');
const lines = csvContent.split(/\r?\n/).filter(line => line.trim() !== '');

console.log(`Total lines: ${lines.length}`);

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

let headerIdx = 0;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Nombre,Fuente Verificada')) {
        headerIdx = i;
        break;
    }
}

const eventsRaw = lines.slice(headerIdx + 1).map(parseCSVLine).filter(row => row.length >= 5 && row[0].trim() !== '');
console.log(`Total events found: ${eventsRaw.length}`);

let newEventsCode = `import { EdTechEvent } from './types';\n\nexport const events: EdTechEvent[] = [\n`;

let currentId = 1;
eventsRaw.forEach((event, index) => {
  const name = event[0] ? event[0].trim() : '';
  const website = event[1] ? event[1].trim() : '';
  const dateStr = event[2] ? event[2].trim() : '';
  const locationStr = event[3] ? event[3].trim() : '';
  const type = event[4] ? event[4].trim() : '';
  const notes = event[5] ? event[5].trim() : '';

  let date = "2026-01-01";
  const months = {
    "Enero": "01", "Febrero": "02", "Marzo": "03", "Abril": "04",
    "Mayo": "05", "Junio": "06", "Julio": "07", "Agosto": "08",
    "Septiembre": "09", "Octubre": "10", "Noviembre": "11", "Diciembre": "12",
    "enero": "01", "febrero": "02", "marzo": "03", "abril": "04",
    "mayo": "05", "junio": "06", "julio": "07", "agosto": "08",
    "septiembre": "09", "octubre": "10", "noviembre": "11", "diciembre": "12"
  };
  
  for (const [monthName, monthNum] of Object.entries(months)) {
    if (dateStr.includes(monthName)) {
      const dayMatch = dateStr.match(/(\d+)/);
      const day = dayMatch ? dayMatch[1].padStart(2, '0') : "01";
      date = `2026-${monthNum}-${day}`;
      break;
    }
  }

  let region = "Por confirmar";
  if (locationStr.includes("EE.UU.") || locationStr.includes("USA") || locationStr.includes("Canadá")) {
    region = "Norteamérica";
  } else if (locationStr.includes("México") || locationStr.includes("Brasil") || locationStr.includes("Colombia") || locationStr.includes("Argentina") || locationStr.includes("Costa Rica") || locationStr.includes("Panamá") || locationStr.includes("Ecuador")) {
    region = "Latinoamérica";
  } else if (locationStr.includes("España") || locationStr.includes("Europa")) {
    region = "Europa";
  } else if (locationStr.includes("Dubai") || locationStr.includes("Singapur") || locationStr.includes("EAU")) {
    region = "Resto del Mundo";
  }

  let lat = 0;
  let lng = 0;
  if (locationStr.includes("Orlando")) { lat = 28.5383; lng = -81.3792; }
  else if (locationStr.includes("Madrid")) { lat = 40.4168; lng = -3.7038; }
  else if (locationStr.includes("San Diego")) { lat = 32.7157; lng = -117.1611; }
  else if (locationStr.includes("Las Vegas")) { lat = 36.1699; lng = -115.1398; }
  else if (locationStr.includes("Washington")) { lat = 38.9072; lng = -77.0369; }
  else if (locationStr.includes("Monterrey")) { lat = 25.6866; lng = -100.3161; }
  else if (locationStr.includes("San Antonio")) { lat = 29.4241; lng = -98.4936; }
  else if (locationStr.includes("Dubai")) { lat = 25.2048; lng = 55.2708; }
  else if (locationStr.includes("Nashville")) { lat = 36.1627; lng = -86.7816; }
  else if (locationStr.includes("Sacramento")) { lat = 38.5816; lng = -121.4944; }
  else if (locationStr.includes("Filadelfia")) { lat = 39.9526; lng = -75.1652; }
  else if (locationStr.includes("Austin")) { lat = 30.2672; lng = -97.7431; }
  else if (locationStr.includes("Ciudad de México")) { lat = 19.4326; lng = -99.1332; }
  else if (locationStr.includes("Palm Springs")) { lat = 33.8303; lng = -116.5453; }
  else if (locationStr.includes("Baltimore")) { lat = 39.2904; lng = -76.6122; }
  else if (locationStr.includes("Chicago")) { lat = 41.8781; lng = -87.6298; }
  else if (locationStr.includes("Nueva Orleans")) { lat = 29.9511; lng = -90.0715; }
  else if (locationStr.includes("Puebla")) { lat = 19.0414; lng = -98.2063; }
  else if (locationStr.includes("São Paulo")) { lat = -23.5505; lng = -46.6333; }
  else if (locationStr.includes("Barranquilla")) { lat = 10.9685; lng = -74.7813; }
  else if (locationStr.includes("Los Ángeles")) { lat = 34.0522; lng = -118.2437; }
  else if (locationStr.includes("Ciudad de Panamá")) { lat = 8.9824; lng = -79.5199; }
  else if (locationStr.includes("Salta")) { lat = -24.7821; lng = -65.4232; }
  else if (locationStr.includes("Louisville")) { lat = 38.2527; lng = -85.7585; }
  else if (locationStr.includes("Buenos Aires")) { lat = -34.6037; lng = -58.3816; }
  else if (locationStr.includes("Bogotá")) { lat = 4.7110; lng = -74.0721; }
  else if (locationStr.includes("Nueva York")) { lat = 40.7128; lng = -74.0060; }
  else if (locationStr.includes("Boston")) { lat = 42.3601; lng = -71.0589; }
  else if (locationStr.includes("Denver")) { lat = 39.7392; lng = -104.9903; }
  else if (locationStr.includes("Guadalajara")) { lat = 20.6597; lng = -103.3496; }
  else if (locationStr.includes("Minneapolis")) { lat = 44.9778; lng = -93.2650; }
  else if (locationStr.includes("San José")) { lat = 9.9281; lng = -84.0907; }
  else if (locationStr.includes("Hershey")) { lat = 40.2848; lng = -76.6502; }

  let relevance = "Media";
  if (notes.includes("Universidad Siglo 21") && notes.includes("Cerem") && notes.includes("Capabilia") && notes.includes("Benchlab")) {
    relevance = "Muy Alta";
  } else if (notes.includes("Capabilia") && notes.includes("Benchlab") && notes.includes("Bitlogic")) {
    relevance = "Alta";
  }

  newEventsCode += `    {
        id: ${currentId},
        name: ${JSON.stringify(name)},
        date: "${date}",
        location: ${JSON.stringify(locationStr)},
        region: "${region}",
        type: ${JSON.stringify(type)},
        relevance: "${relevance}",
        notes: ${JSON.stringify(dateStr + (notes ? ' - Empresas: ' + notes : ''))},
        lat: ${lat},
        lng: ${lng},
        website: ${JSON.stringify(website)}
    }${index === eventsRaw.length - 1 ? '' : ','}\n`;
  currentId++;
});

newEventsCode += `];\n`;

fs.writeFileSync('data.ts', newEventsCode);
console.log(`Successfully replaced data.ts with ${currentId - 1} events.`);
