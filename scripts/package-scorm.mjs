// Empaqueta el build estático de Astro como un curso SCORM 1.2 de un solo SCO.
//
// Pasos: (1) astro build, (2) generar imsmanifest.xml listando automáticamente
// cada archivo de dist/ (para no mantener esa lista a mano), (3) copiar los
// esquemas XSD oficiales de ADL/Rustici junto al manifiesto, (4) comprimir todo
// en course-scorm.zip con imsmanifest.xml en la RAÍZ del zip.
//
// Uso: npm run build:scorm

import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, cpSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { ZipArchive } from 'archiver';
import { createWriteStream } from 'node:fs';

const RAIZ = path.resolve(import.meta.dirname, '..');
const DIST = path.join(RAIZ, 'dist');
const ESQUEMAS = path.join(RAIZ, 'scorm', 'schemas');
const STAGING = path.join(RAIZ, '.scorm-staging');
const ZIP_SALIDA = path.join(RAIZ, 'course-scorm.zip');

const TITULO_CURSO = 'Automatización de flujos de trabajo con IA (n8n) para pymes y emprendimientos';
const IDENTIFICADOR = 'com.uc.especializacion-ia.odc-n8n-pymes';
const MASTERY_SCORE = 80; // % mínimo del REA (ver CLAUDE.md)

function listarArchivosRecursivo(dirBase, dirActual = dirBase) {
  let archivos = [];
  for (const entrada of readdirSync(dirActual)) {
    const rutaCompleta = path.join(dirActual, entrada);
    if (statSync(rutaCompleta).isDirectory()) {
      archivos = archivos.concat(listarArchivosRecursivo(dirBase, rutaCompleta));
    } else {
      archivos.push(path.relative(dirBase, rutaCompleta).split(path.sep).join('/'));
    }
  }
  return archivos;
}

function generarManifiesto(archivosDist) {
  const listaArchivos = archivosDist.map((f) => `      <file href="${f}" />`).join('\n');

  // Estructura basada en la plantilla oficial de Rustici/SCORM.com para SCORM 1.2
  // (scorm.com/scorm-explained/technical-scorm/content-packaging/xml-schema-definition-files/).
  return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${IDENTIFICADOR}" version="1"
       xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
       xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                           http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd
                           http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ODC1">
    <organization identifier="ODC1">
      <title>${TITULO_CURSO}</title>
      <item identifier="item_1" identifierref="recurso_1" isvisible="true">
        <title>${TITULO_CURSO}</title>
        <adlcp:masteryscore>${MASTERY_SCORE}</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="recurso_1" type="webcontent" adlcp:scormtype="sco" href="index.html">
${listaArchivos}
    </resource>
  </resources>
</manifest>
`;
}

async function comprimirCarpeta(carpetaOrigen, rutaZipSalida) {
  return new Promise((resolve, reject) => {
    const salida = createWriteStream(rutaZipSalida);
    const archivo = new ZipArchive({ zlib: { level: 9 } });

    salida.on('close', resolve);
    archivo.on('error', reject);
    archivo.pipe(salida);
    archivo.directory(carpetaOrigen, false);
    archivo.finalize();
  });
}

async function main() {
  console.log('1/5 · Compilando el sitio (astro build)...');
  execSync('npx astro build', { cwd: RAIZ, stdio: 'inherit' });

  if (!existsSync(DIST)) {
    throw new Error(`No se encontró ${DIST}. ¿Falló el build?`);
  }

  console.log('2/5 · Preparando carpeta de empaquetado...');
  rmSync(STAGING, { recursive: true, force: true });
  mkdirSync(STAGING, { recursive: true });
  cpSync(DIST, STAGING, { recursive: true });
  cpSync(ESQUEMAS, STAGING, { recursive: true });

  console.log('3/5 · Generando imsmanifest.xml...');
  const archivosDist = listarArchivosRecursivo(DIST);
  const manifiesto = generarManifiesto(archivosDist);
  writeFileSync(path.join(STAGING, 'imsmanifest.xml'), manifiesto, 'utf-8');
  console.log(`   ${archivosDist.length} archivos listados en el manifiesto.`);

  console.log('4/5 · Comprimiendo en course-scorm.zip...');
  rmSync(ZIP_SALIDA, { force: true });
  await comprimirCarpeta(STAGING, ZIP_SALIDA);

  console.log('5/5 · Limpiando carpeta temporal...');
  rmSync(STAGING, { recursive: true, force: true });

  console.log(`\nListo: ${ZIP_SALIDA}`);
  console.log('Siguiente paso: subir este .zip a SCORM Cloud (cloud.scorm.com) y probarlo en el Course Sandbox.');
}

main().catch((err) => {
  console.error('Error empaquetando el curso SCORM:', err);
  process.exit(1);
});
