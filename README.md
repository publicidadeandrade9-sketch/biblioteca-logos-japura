# Biblioteca de logos: Prefeitura de Japurá

Logos oficiais usados nos vídeos e artes da Prefeitura de Japurá (SEMCOM/ASCOM). Veja todos de uma vez em [`catalogo.png`](catalogo.png).

Cada logo de secretaria tem duas versões:
- `logo-<tema>.png`: original (fundo transparente, com margem).
- `logo-<tema>-recorte.png`: **sem margem transparente**, encostado nas bordas. Use esta para alinhar e centralizar com precisão.

## Estrutura

| Pasta | Arquivo | Uso |
|---|---|---|
| `prefeitura/` | `logo-prefeitura.png` | logo da Prefeitura (fundo branco) |
| | `marca-dagua-1080x1920.png` | marca d'água dos vídeos verticais |
| | `faixa-da-marca.png` | faixa colorida da identidade |
| `comunicacao/` | `logo-comunicacao-social.png` | Secretaria Municipal de Comunicação Social (fundo branco) |
| | `logo-ascom.png` | ASCOM (fundo branco) |
| `secretarias/aquicultura-pesca/` | `logo-aquicultura-pesca.png` | SEMAP – Aquicultura e Pesca |
| `secretarias/assistencia-social/` | `logo-assistencia-social.png` | SEMAS – Assistência Social |
| `secretarias/cultura-desporto/` | `logo-cultura-desporto.png` | Cultura e Desporto |
| `secretarias/defesa-civil/` | `logo-defesa-civil.png` | Defesa Civil Municipal |
| `secretarias/educacao/` | `logo-educacao.png` | SEMED – Educação |
| `secretarias/esporte/` | `logo-esporte.png` | Diretoria Municipal de Esporte e Lazer |
| `secretarias/idam/` | `logo-idam.png` | IDAM |
| `secretarias/interior/` | `logo-interior.png` | Secretaria do Interior |
| `secretarias/meio-ambiente-turismo/` | `logo-meio-ambiente-turismo.png` | SEMATUR – Meio Ambiente e Turismo |
| `secretarias/obras/` | `logo-obras.png` | Secretaria de Obras |
| `secretarias/planejamento/` | `logo-planejamento.png` | Planejamento |
| `secretarias/producao-abastecimento/` | `logo-producao-abastecimento.png` | Produção e Abastecimento |
| `secretarias/saude/` | `logo-semsa.png` | SEMSA – Saúde (versão em alta) |

## Regras de uso nos vídeos
- **Final oficial**: `final-padrao.mp4` já traz Prefeitura, Comunicação Social e ASCOM. Os logos das **secretarias envolvidas** entram por cima, um após o outro (cresce do centro, `power3.out`, 1,5 s; 1º em 1,967 s, +0,567 s por logo; largura ~440 px).
- Não esticar, não recolorir, não colocar sombra pesada. Em fundo escuro, use sobre uma pílula/cartão branco.
- Nunca usar "·" como separador em textos junto dos logos.

## Atualizar
A fonte é `prefeitura-japura/marca` (no projeto Motion Graphics). Para refazer as cópias, os recortes e o catálogo: `node scripts/montar.mjs` (precisa do `sharp`). Logo novo: coloque em `prefeitura-japura/marca/temas/<tema>/`, acrescente na lista do script e rode de novo.
