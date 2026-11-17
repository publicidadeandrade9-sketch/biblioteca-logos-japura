// Monta a biblioteca de logos a partir de prefeitura-japura/marca e gera a versão "-recorte" (sem margem transparente)
// de cada logo. Uso (na pasta biblioteca-logos-japura): node scripts/montar.mjs
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const MARCA = 'C:/Users/stanl/Documents/Motion Graphics/prefeitura-japura/marca';
const sharp = createRequire('C:/Users/stanl/Documents/Motion Graphics/tutorial-casa-do-delivery/package.json')('sharp') // sharp instalado no projeto do tutorial;

// destino ← origem (relativa a MARCA). Só a versão em uso de cada logo (sem as antigas/duplicadas).
const LISTA = {
  'prefeitura/logo-prefeitura.png': 'logo-prefeitura.png',
  'prefeitura/marca-dagua-1080x1920.png': 'marca-dagua-1080x1920.png',
  'prefeitura/faixa-da-marca.png': 'faixa.png',
  'comunicacao/logo-comunicacao-social.png': 'logo-comunicacao.png',
  'comunicacao/logo-ascom.png': 'logo-ascom.png',
  'secretarias/aquicultura-pesca/logo-aquicultura-pesca.png': 'temas/aquicultura-pesca/logo-aquicultura-pesca.png',
  'secretarias/assistencia-social/logo-assistencia-social.png': 'temas/assistencia-social/logo-assistencia-social.png',
  'secretarias/cultura-desporto/logo-cultura-desporto.png': 'temas/cultura-desporto/logo-cultura-desporto.png',
  'secretarias/defesa-civil/logo-defesa-civil.png': 'temas/defesa-civil/logo-defesa-civil.png',
  'secretarias/educacao/logo-educacao.png': 'temas/educacao/logo-educacao.png',
  'secretarias/esporte/logo-esporte.png': 'temas/esporte/logo-esporte.png',
  'secretarias/idam/logo-idam.png': 'temas/idam/logo-idam.png',
  'secretarias/interior/logo-interior.png': 'temas/interior/logo-interior.png',
  'secretarias/meio-ambiente-turismo/logo-meio-ambiente-turismo.png': 'temas/meio-ambiente-turismo/logo-meio-ambiente-turismo.png',
  'secretarias/obras/logo-obras.png': 'temas/obras/logo-obras.png',
  'secretarias/planejamento/logo-planejamento.png': 'temas/planejamento/logo-planejamento.png',
  'secretarias/producao-abastecimento/logo-producao-abastecimento.png': 'temas/producao-abastecimento/logo-producao-abastecimento.png',
  'secretarias/saude/logo-semsa.png': 'temas/saude/logo-semsa-recorte.png', // a versão em alta (de "Logo Vetor - SEMSA.png")
};

const linhas = [];
for (const [dest, orig] of Object.entries(LISTA)) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(path.join(MARCA, orig), dest);
  const m = await sharp(dest).metadata();
  let rec = '';
  if (!dest.includes('marca-dagua') && !dest.includes('faixa') && m.hasAlpha) {
    rec = dest.replace(/\.png$/, '-recorte.png');
    await sharp(dest).trim({ threshold: 1 }).toFile(rec);
    const r = await sharp(rec).metadata();
    rec = `${path.basename(rec)} (${r.width}×${r.height})`;
  }
  linhas.push(`| \`${dest}\` | ${m.width}×${m.height} | ${rec || '—'} |`);
}
fs.writeFileSync('scripts/lista.md', linhas.join('\n') + '\n');
console.log(linhas.join('\n'));

// catálogo visual: todas as logos (versão recortada quando existe) numa folha só, fundo claro
{
  const arqs = Object.keys(LISTA).filter(d => !d.includes('marca-dagua')).map(d => fs.existsSync(d.replace(/\.png$/, '-recorte.png')) ? d.replace(/\.png$/, '-recorte.png') : d);
  const C = 4, CW = 420, CH = 300, P = 30, cols = [];
  for (const [i, a] of arqs.entries()) {
    const img = await sharp(a).resize(CW - 2 * P, CH - 2 * P - 34, { fit: 'inside' }).png().toBuffer();
    const m = await sharp(img).metadata();
    const nome = path.basename(path.dirname(a)) + ' / ' + path.basename(a).replace('-recorte', '').replace('.png', '');
    const txt = Buffer.from(`<svg width="${CW}" height="30"><text x="${CW / 2}" y="22" font-family="Arial" font-size="17" fill="#333" text-anchor="middle">${nome}</text></svg>`);
    const x = (i % C) * CW, y = Math.floor(i / C) * CH;
    cols.push({ input: img, left: x + Math.round((CW - m.width) / 2), top: y + P + Math.round((CH - 2 * P - 34 - m.height) / 2) }, { input: txt, left: x, top: y + CH - 40 });
  }
  await sharp({ create: { width: C * CW, height: Math.ceil(arqs.length / C) * CH, channels: 4, background: '#F2F2F2' } }).composite(cols).png().toFile('catalogo.png');
  console.log('catalogo.png');
}
