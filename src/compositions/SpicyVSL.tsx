import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadDefaultFonts} from '../presets/fonts';

const FACE_LEFT = 580;
const FACE_RIGHT = 1340;

const C = {
  bg: '#0A0A0A',
  red: '#E63946',
  yellow: '#FFD60A',
  white: '#FFFFFF',
  green: '#39D353',
};

interface Sub {s: number; e: number; t: string}
interface Ov {s: number; e: number; text: string; side: 'left' | 'right'; color: string}
interface Sec {s: number; e: number; label: string; color: string}

const SUBS: Sub[] = [
  // Hook A
  {s:2,e:6,t:'TU ECOMMERCE NO VENDE'},
  {s:6,e:9,t:'TODO MAL'},
  {s:9,e:13,t:'NI SIQUIERA LO SABÉS'},
  // Reframe
  {s:13,e:16,t:'ES TU SISTEMA'},
  {s:16,e:19,t:'TUS ANUNCIOS'},
  {s:19,e:22,t:'Y TU PÁGINA'},
  {s:22,e:26,t:'IA DE META'},
  {s:26,e:29,t:'MÁS FÁCIL PERDER'},
  // Setup
  {s:29,e:32,t:'UN DÍA VENDÉS'},
  {s:32,e:36,t:'Y AL OTRO NO'},
  {s:36,e:40,t:'LA MAYORÍA CREE'},
  {s:40,e:43,t:'EL ALGORITMO'},
  {s:43,e:46,t:'EL MERCADO'},
  {s:46,e:49,t:'LA COMPETENCIA'},
  {s:49,e:52,t:'PERO NO.'},
  {s:52,e:56,t:'LO QUE HACÉS VOS'},
  {s:56,e:60,t:'100 MARCAS AUDITADAS'},
  {s:60,e:64,t:'CHICAS Y GRANDES'},
  {s:64,e:68,t:'SIEMPRE LO MISMO'},
  // Problema 1
  {s:72,e:76,t:'EL SISTEMA'},
  {s:76,e:79,t:'SIN ESTRUCTURA'},
  {s:79,e:83,t:'COSAS SIN LÓGICA'},
  {s:83,e:86,t:'SIN LÓGICA'},
  {s:86,e:90,t:'ROL DE CAMPAÑA'},
  {s:90,e:93,t:'DINERO DISPERSO'},
  {s:93,e:96,t:'SIN CONSISTENCIA'},
  {s:96,e:100,t:'DEPENDÉS DEL AZAR'},
  // Problema 2
  {s:104,e:108,t:'LOS CREATIVOS'},
  {s:108,e:111,t:'SIN INTENCIÓN'},
  {s:111,e:115,t:'IGUALES A TODOS'},
  {s:115,e:118,t:'SIN ÁNGULO'},
  {s:118,e:121,t:'SIN DIFERENCIACIÓN'},
  {s:121,e:125,t:'SIN RAZÓN DE CLIC'},
  {s:125,e:129,t:'NO HAY VENTA'},
  {s:129,e:132,t:'ASÍ DE SIMPLE'},
  // Problema 3
  {s:136,e:140,t:'LAS PÁGINAS'},
  {s:140,e:143,t:'NO CONVIERTEN'},
  {s:143,e:147,t:'CERO CONFIANZA'},
  {s:147,e:151,t:'COMO GRANDES MARCAS'},
  {s:151,e:155,t:'SIN CONVENCER'},
  // Dolor
  {s:159,e:162,t:'SEGURO TE PASÓ'},
  {s:162,e:165,t:'TENÉS TRÁFICO'},
  {s:165,e:168,t:'TENÉS VISITAS'},
  {s:168,e:171,t:'CARRITOS INICIADOS'},
  {s:171,e:175,t:'PERO NO VENDÉS'},
  {s:175,e:178,t:'Y ESO FRUSTRA'},
  {s:178,e:182,t:'ESTÁS CERCA'},
  {s:182,e:186,t:'PERO NO LLEGÁS'},
  // Pivot
  {s:187,e:190,t:'CUANDO CAMBIÁS ESTO'},
  {s:190,e:194,t:'CAMBIA TODO'},
  {s:194,e:198,t:'DEJÁS DE IMPROVISAR'},
  {s:198,e:202,t:'OPERÁS CON SISTEMA'},
  // Solución
  {s:205,e:210,t:'LA SPICY AD FORMULA'},
  {s:210,e:214,t:'CAMPAÑAS ESTRUCTURADAS'},
  {s:214,e:217,t:'ANUNCIOS CON INTENCIÓN'},
  {s:217,e:221,t:'PÁGINAS QUE CONVIERTEN'},
  {s:221,e:225,t:'NO ES TEORÍA'},
  {s:225,e:230,t:'ROAS 2 → 39'},
  {s:230,e:234,t:'MARCAS QUE ESCALARON'},
  {s:234,e:237,t:'NO ES MAGIA'},
  {s:237,e:241,t:'ES EL SISTEMA'},
  // Autoridad
  {s:241,e:246,t:'MÁS DE 7 AÑOS'},
  {s:246,e:250,t:'APRENDIZAJE APLICABLE'},
  {s:250,e:253,t:'NO TEORÍA'},
  {s:253,e:256,t:'EJECUCIÓN'},
  // Oferta
  {s:260,e:263,t:'TRES COSAS CLAVE'},
  {s:263,e:266,t:'EL SISTEMA'},
  {s:266,e:269,t:'CREATIVOS CON IA'},
  {s:269,e:273,t:'PÁGINAS DE PRODUCTO'},
  {s:273,e:277,t:'SOPORTE Y COACHING'},
  {s:277,e:281,t:'CASOS REALES'},
  {s:281,e:285,t:'DESAFÍO 30 DÍAS'},
  {s:285,e:288,t:'PASO A PASO'},
  // CTA
  {s:288,e:292,t:'SEGUIR SOLO'},
  {s:292,e:295,t:'PERDIENDO DINERO'},
  {s:295,e:300,t:'SOLO $9 DÓLARES'},
  {s:299,e:300,t:'TE VEO ADENTRO'},
];

const OVS: Ov[] = [
  {s:2,e:8,text:'TODO MAL',side:'right',color:C.red},
  {s:13,e:16,text:'SISTEMA',side:'left',color:C.red},
  {s:16,e:19,text:'ANUNCIOS',side:'right',color:C.red},
  {s:40,e:43,text:'❌ ALGORITMO',side:'left',color:C.red},
  {s:43,e:46,text:'❌ MERCADO',side:'left',color:C.red},
  {s:46,e:49,text:'❌ COMPETENCIA',side:'left',color:C.red},
  {s:56,e:64,text:'100+ MARCAS',side:'right',color:C.yellow},
  {s:72,e:79,text:'❌ SIN SISTEMA',side:'left',color:C.red},
  {s:90,e:96,text:'💸 DINERO PERDIDO',side:'right',color:C.red},
  {s:104,e:111,text:'❌ SIN INTENCIÓN',side:'left',color:C.red},
  {s:111,e:119,text:'= TODOS LOS DEMÁS',side:'right',color:C.red},
  {s:125,e:130,text:'❌ CERO VENTAS',side:'right',color:C.red},
  {s:136,e:144,text:'❌ SIN CONVERSIÓN',side:'left',color:C.red},
  {s:162,e:165,text:'✓ TRÁFICO',side:'right',color:C.white},
  {s:165,e:168,text:'✓ VISITAS',side:'right',color:C.white},
  {s:168,e:171,text:'✓ CARRITOS',side:'right',color:C.white},
  {s:171,e:175,text:'❌ VENTAS',side:'right',color:C.red},
  {s:198,e:205,text:'SISTEMA ✓',side:'left',color:C.green},
  {s:210,e:214,text:'✓ CAMPAÑAS',side:'left',color:C.green},
  {s:214,e:218,text:'✓ CREATIVOS IA',side:'left',color:C.green},
  {s:218,e:222,text:'✓ PÁGINAS',side:'left',color:C.green},
  {s:225,e:234,text:'ROAS 2→39',side:'right',color:C.yellow},
  {s:241,e:250,text:'7+ AÑOS',side:'right',color:C.yellow},
  {s:250,e:254,text:'❌ TEORÍA',side:'left',color:C.red},
  {s:254,e:257,text:'✓ EJECUCIÓN',side:'left',color:C.green},
  {s:263,e:266,text:'① SISTEMA',side:'left',color:C.white},
  {s:266,e:270,text:'② CREATIVOS IA',side:'left',color:C.white},
  {s:270,e:273,text:'③ PÁGINAS',side:'left',color:C.white},
  {s:273,e:278,text:'+ SOPORTE',side:'right',color:C.yellow},
  {s:278,e:282,text:'+ CASOS REALES',side:'right',color:C.yellow},
  {s:282,e:287,text:'30 DÍAS',side:'right',color:C.yellow},
  {s:295,e:300,text:'$9',side:'left',color:C.yellow},
  {s:295,e:300,text:'$9',side:'right',color:C.yellow},
];

const SECTIONS: Sec[] = [
  {s:68,e:72,label:'PROBLEMA #1',color:C.red},
  {s:100,e:104,label:'PROBLEMA #2',color:C.red},
  {s:132,e:136,label:'PROBLEMA #3',color:C.red},
  {s:205,e:208,label:'SPICY AD FORMULA 🌶',color:C.yellow},
  {s:256,e:260,label:'LA OFERTA',color:C.green},
];

const FLASH_SECS = [0,6,33,49,52,90,125,155,171,187,205,221,225,287,291,294];

const BEAT_SECS = [3,6,9,12,16,19,22,26,29,33,36,40,43,46,49,52,56,60,64,68,72,76,79,83,86,90,93,96,100,104,108,111,115,118,121,125,129,132,136,140,143,147,151,155,159,162,165,168,171,175,178,182,186,190,194,198,201,205,210,214,217,221,225,230,234,237,241,246,250,253,256,260,263,266,269,272,276,280,284,287,291,294,299];

// ─── Background ──────────────────────────────────────────────────────────────

function Background() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const breath = Math.sin(frame * 0.015) * 0.5 + 0.5;

  let scale = 1;
  for (const sec of BEAT_SECS) {
    const bf = Math.round(sec * fps);
    const d = frame - bf;
    if (d >= 0 && d <= 12) {
      const p = interpolate(d, [0, 4, 12], [1.015, 1.008, 1], {extrapolateRight: 'clamp'});
      scale = Math.max(scale, p);
    }
  }

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at ${50 + breath * 8}% ${45 + breath * 4}%, #1a0606 0%, #0A0A0A 65%)`,
      transform: `scale(${scale})`,
    }} />
  );
}

// ─── Vignette ─────────────────────────────────────────────────────────────────

function Vignette() {
  return (
    <AbsoluteFill style={{
      background: 'radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(0,0,0,0.75) 80%)',
      pointerEvents: 'none',
    }} />
  );
}

// ─── Hook A intro flash ───────────────────────────────────────────────────────

function HookAFlash() {
  const frame = useCurrentFrame();
  if (frame > 45) return null;
  const opacity = interpolate(frame, [0, 5, 28, 40], [0, 1, 1, 0], {extrapolateRight: 'clamp'});
  const scale = interpolate(frame, [0, 8], [1.35, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity,
      transform: `scale(${scale})`,
      pointerEvents: 'none',
    }}>
      <span style={{
        fontFamily: '"Inter","Arial Black",sans-serif',
        fontSize: 190,
        fontWeight: 900,
        color: C.red,
        letterSpacing: 14,
        textShadow: `0 0 100px ${C.red}, 0 0 40px ${C.red}88`,
        userSelect: 'none',
      }}>
        TODO MAL
      </span>
    </AbsoluteFill>
  );
}

// ─── Color flash ──────────────────────────────────────────────────────────────

function ColorFlash() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  let opacity = 0;
  for (const sec of FLASH_SECS) {
    const ff = Math.round(sec * fps);
    const d = frame - ff;
    if (d >= 0 && d <= 3) {
      const v = interpolate(d, [0, 3], [0.75, 0], {extrapolateRight: 'clamp'});
      opacity = Math.max(opacity, v);
    }
  }

  if (opacity === 0) return null;

  return (
    <AbsoluteFill style={{
      backgroundColor: C.red,
      opacity,
      mixBlendMode: 'screen',
      pointerEvents: 'none',
    }} />
  );
}

// ─── Section labels ───────────────────────────────────────────────────────────

function SectionLabels() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sec = frame / fps;

  const current = SECTIONS.find(s => sec >= s.s && sec < s.e);
  if (!current) return null;

  const localFrame = frame - Math.round(current.s * fps);
  const total = Math.round((current.e - current.s) * fps);
  const opacity = interpolate(localFrame, [0, 6, total - 6, total], [0, 1, 1, 0], {extrapolateRight: 'clamp'});
  const scaleV = interpolate(localFrame, [0, 8], [0.75, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{
        position: 'absolute',
        top: 36,
        left: '50%',
        transform: `translateX(-50%) scale(${scaleV})`,
        opacity,
        whiteSpace: 'nowrap',
      }}>
        <div style={{
          backgroundColor: current.color,
          padding: '10px 44px',
          borderRadius: 4,
        }}>
          <span style={{
            fontFamily: '"Inter","Arial Black",sans-serif',
            fontSize: 34,
            fontWeight: 900,
            color: C.bg,
            textTransform: 'uppercase',
            letterSpacing: 5,
          }}>
            {current.label}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Lateral overlays ─────────────────────────────────────────────────────────

function LateralOverlays() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sec = frame / fps;

  const active = OVS.filter(o => sec >= o.s && sec < o.e);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {active.map((o, i) => {
        const startFrame = Math.round(o.s * fps);
        const endFrame = Math.round(o.e * fps);
        const dur = endFrame - startFrame;
        const lf = frame - startFrame;

        const isXL = o.text === 'ROAS 2→39' || o.text === 'TODO MAL' || o.text === '$9';
        const slideX = interpolate(lf, [0, 8], [o.side === 'left' ? -50 : 50, 0], {extrapolateRight: 'clamp'});
        const opacity = interpolate(lf, [0, 6, dur - 6, dur], [0, 1, 1, 0], {extrapolateRight: 'clamp'});

        const posStyle: React.CSSProperties = o.side === 'left'
          ? {left: 40, maxWidth: FACE_LEFT - 60, textAlign: 'left' as const}
          : {right: 40, maxWidth: 1920 - FACE_RIGHT - 60, textAlign: 'right' as const};

        return (
          <div
            key={`${o.s}-${o.side}-${i}`}
            style={{
              position: 'absolute',
              top: '50%',
              transform: `translateY(-50%) translateX(${slideX}px)`,
              opacity,
              ...posStyle,
            }}
          >
            <span style={{
              fontFamily: '"Inter","Arial Black",sans-serif',
              fontSize: isXL ? 100 : 48,
              fontWeight: 900,
              color: o.color,
              textTransform: 'uppercase',
              letterSpacing: isXL ? 6 : 2,
              textShadow: `0 0 30px ${o.color}55, 0 2px 8px rgba(0,0,0,0.9)`,
              display: 'block',
              lineHeight: 1.15,
            }}>
              {o.text}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

// ─── Subtitles ────────────────────────────────────────────────────────────────

const IMPACT_SUBS = new Set(['PERO NO.','ROAS 2 → 39','SOLO $9 DÓLARES','TODO MAL','NO HAY VENTA','PERO NO VENDÉS','CAMBIA TODO']);

function Subtitles() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sec = frame / fps;

  const current = SUBS.find(s => sec >= s.s && sec < s.e);
  if (!current) return null;

  const lf = frame - Math.round(current.s * fps);
  const total = Math.round((current.e - current.s) * fps);
  const opacity = interpolate(lf, [0, 5, total - 5, total], [0, 1, 1, 0], {extrapolateRight: 'clamp'});
  const ty = interpolate(lf, [0, 8], [12, 0], {extrapolateRight: 'clamp'});

  const isImpact = IMPACT_SUBS.has(current.t);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{
        position: 'absolute',
        bottom: 72,
        left: 0,
        right: 0,
        textAlign: 'center',
        transform: `translateY(${ty}px)`,
        opacity,
      }}>
        <span style={{
          fontFamily: '"Inter","Arial Black",sans-serif',
          fontSize: isImpact ? 74 : 58,
          fontWeight: 900,
          color: isImpact ? C.red : C.white,
          textTransform: 'uppercase',
          letterSpacing: isImpact ? 5 : 3,
          textShadow: isImpact
            ? `0 0 50px ${C.red}, 0 2px 10px rgba(0,0,0,0.95)`
            : '0 2px 10px rgba(0,0,0,0.95)',
          backgroundColor: 'rgba(0,0,0,0.55)',
          padding: '6px 28px',
          borderRadius: 4,
        }}>
          {current.t}
        </span>
      </div>
    </AbsoluteFill>
  );
}

// ─── Face safe zone guide (remove before final render) ────────────────────────

function FaceGuide() {
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{
        position: 'absolute',
        left: FACE_LEFT,
        width: FACE_RIGHT - FACE_LEFT,
        top: 0,
        bottom: 0,
        borderLeft: '1px solid rgba(255,255,255,0.06)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }} />
    </AbsoluteFill>
  );
}

// ─── Main composition ─────────────────────────────────────────────────────────

export const SpicyVSL: React.FC = () => {
  loadDefaultFonts();

  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      <Background />
      <ColorFlash />
      <HookAFlash />
      <Vignette />
      <SectionLabels />
      <LateralOverlays />
      <Subtitles />
      <FaceGuide />
    </AbsoluteFill>
  );
};
