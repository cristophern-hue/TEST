import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, Video, staticFile} from 'remotion';
import {loadDefaultFonts} from '../presets/fonts';

const FACE_LEFT = 580;
const FACE_RIGHT = 1340;

const C = {
  bg: '#0A0A0A',
  red: '#E63946',
  yellow: '#FFD60A',
  white: '#FFFFFF',
  green: '#39D353',
  orange: '#FF6B2C',
  darkRed: '#1a0404',
};

// Deterministic "random" for glitch (frame-based seed)
function sr(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

// ─── DATA ────────────────────────────────────────────────────────────────────

interface Sub {s: number; e: number; t: string}
interface Ov {s: number; e: number; text: string; side: 'left' | 'right'; color: string}
interface Sec {s: number; e: number; label: string; color: string}

const SUBS: Sub[] = [
  {s:2,e:6,t:'TU ECOMMERCE NO VENDE'},
  {s:6,e:9,t:'TODO MAL'},
  {s:9,e:13,t:'NI SIQUIERA LO SABÉS'},
  {s:13,e:16,t:'ES TU SISTEMA'},
  {s:16,e:19,t:'TUS ANUNCIOS'},
  {s:19,e:22,t:'Y TU PÁGINA'},
  {s:22,e:26,t:'IA DE META'},
  {s:26,e:29,t:'MÁS FÁCIL PERDER'},
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
  {s:72,e:76,t:'EL SISTEMA'},
  {s:76,e:79,t:'SIN ESTRUCTURA'},
  {s:79,e:83,t:'COSAS SIN LÓGICA'},
  {s:83,e:86,t:'SIN LÓGICA'},
  {s:86,e:90,t:'ROL DE CAMPAÑA'},
  {s:90,e:93,t:'DINERO DISPERSO'},
  {s:93,e:96,t:'SIN CONSISTENCIA'},
  {s:96,e:100,t:'DEPENDÉS DEL AZAR'},
  {s:104,e:108,t:'LOS CREATIVOS'},
  {s:108,e:111,t:'SIN INTENCIÓN'},
  {s:111,e:115,t:'IGUALES A TODOS'},
  {s:115,e:118,t:'SIN ÁNGULO'},
  {s:118,e:121,t:'SIN DIFERENCIACIÓN'},
  {s:121,e:125,t:'SIN RAZÓN DE CLIC'},
  {s:125,e:129,t:'NO HAY VENTA'},
  {s:129,e:132,t:'ASÍ DE SIMPLE'},
  {s:136,e:140,t:'LAS PÁGINAS'},
  {s:140,e:143,t:'NO CONVIERTEN'},
  {s:143,e:147,t:'CERO CONFIANZA'},
  {s:147,e:151,t:'COMO GRANDES MARCAS'},
  {s:151,e:155,t:'SIN CONVENCER'},
  {s:159,e:162,t:'SEGURO TE PASÓ'},
  {s:162,e:165,t:'TENÉS TRÁFICO'},
  {s:165,e:168,t:'TENÉS VISITAS'},
  {s:168,e:171,t:'CARRITOS INICIADOS'},
  {s:171,e:175,t:'PERO NO VENDÉS'},
  {s:175,e:178,t:'Y ESO FRUSTRA'},
  {s:178,e:182,t:'ESTÁS CERCA'},
  {s:182,e:186,t:'PERO NO LLEGÁS'},
  {s:187,e:190,t:'CUANDO CAMBIÁS ESTO'},
  {s:190,e:194,t:'CAMBIA TODO'},
  {s:194,e:198,t:'DEJÁS DE IMPROVISAR'},
  {s:198,e:202,t:'OPERÁS CON SISTEMA'},
  {s:205,e:210,t:'LA SPICY AD FORMULA'},
  {s:210,e:214,t:'CAMPAÑAS ESTRUCTURADAS'},
  {s:214,e:217,t:'ANUNCIOS CON INTENCIÓN'},
  {s:217,e:221,t:'PÁGINAS QUE CONVIERTEN'},
  {s:221,e:225,t:'NO ES TEORÍA'},
  {s:225,e:230,t:'ROAS 2 → 39'},
  {s:230,e:234,t:'MARCAS QUE ESCALARON'},
  {s:234,e:237,t:'NO ES MAGIA'},
  {s:237,e:241,t:'ES EL SISTEMA'},
  {s:241,e:246,t:'MÁS DE 7 AÑOS'},
  {s:246,e:250,t:'APRENDIZAJE APLICABLE'},
  {s:250,e:253,t:'NO TEORÍA'},
  {s:253,e:256,t:'EJECUCIÓN'},
  {s:260,e:263,t:'TRES COSAS CLAVE'},
  {s:263,e:266,t:'EL SISTEMA'},
  {s:266,e:269,t:'CREATIVOS CON IA'},
  {s:269,e:273,t:'PÁGINAS DE PRODUCTO'},
  {s:273,e:277,t:'SOPORTE Y COACHING'},
  {s:277,e:281,t:'CASOS REALES'},
  {s:281,e:285,t:'DESAFÍO 30 DÍAS'},
  {s:285,e:288,t:'PASO A PASO'},
  {s:288,e:292,t:'SEGUIR SOLO'},
  {s:292,e:295,t:'PERDIENDO DINERO'},
  {s:295,e:300,t:'SOLO $9 DÓLARES'},
];

const OVS: Ov[] = [
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
const IMPACT_SUBS = ['PERO NO.','ROAS 2 → 39','SOLO $9 DÓLARES','TODO MAL','NO HAY VENTA','PERO NO VENDÉS','CAMBIA TODO','LA SPICY AD FORMULA'];

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
// Keeps viewers watching — they want to see the bar complete

function ProgressBar() {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const progress = frame / durationInFrames;
  const width = interpolate(progress, [0, 1], [0, 100]);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: 3,
        width: `${width}%`,
        background: `linear-gradient(90deg, ${C.red}, ${C.orange}, ${C.yellow})`,
        boxShadow: `0 0 8px ${C.red}`,
      }} />
    </AbsoluteFill>
  );
}

// ─── SECTION VIBE (background color shifts with emotion) ──────────────────────

function SectionVibe() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sec = frame / fps;

  // Pain zone: redder/darker
  const painIntensity = interpolate(sec, [60, 80, 150, 186], [0, 0.8, 0.8, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // Solution zone: slight green tint
  const solutionIntensity = interpolate(sec, [200, 215, 280, 290], [0, 0.6, 0.6, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // CTA zone: intense red
  const ctaIntensity = interpolate(sec, [285, 295, 300], [0, 1, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'screen'}}>
      {painIntensity > 0 && (
        <AbsoluteFill style={{
          background: `radial-gradient(ellipse at 50% 100%, rgba(100,0,0,${painIntensity * 0.3}) 0%, transparent 70%)`,
        }} />
      )}
      {solutionIntensity > 0 && (
        <AbsoluteFill style={{
          background: `radial-gradient(ellipse at 50% 100%, rgba(0,80,0,${solutionIntensity * 0.2}) 0%, transparent 70%)`,
        }} />
      )}
      {ctaIntensity > 0 && (
        <AbsoluteFill style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(150,0,0,${ctaIntensity * 0.4}) 0%, transparent 60%)`,
        }} />
      )}
    </AbsoluteFill>
  );
}

// ─── BACKGROUND ───────────────────────────────────────────────────────────────

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

// ─── VIGNETTE ─────────────────────────────────────────────────────────────────

function Vignette() {
  return (
    <AbsoluteFill style={{
      background: 'radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(0,0,0,0.78) 80%)',
      pointerEvents: 'none',
    }} />
  );
}

// ─── GLITCH INTRO ─────────────────────────────────────────────────────────────
// Hook psicológico: el glitch activa el sistema de alerta del cerebro

function GlitchIntro() {
  const frame = useCurrentFrame();
  if (frame > 50) return null;

  const opacity = interpolate(frame, [0, 4, 30, 44], [0, 1, 1, 0], {extrapolateRight: 'clamp'});
  const scale = interpolate(frame, [0, 6], [1.4, 1], {extrapolateRight: 'clamp'});

  // Glitch slice displacement (deterministic)
  const glitchActive = frame < 35 && sr(frame * 7) > 0.6;
  const sliceOffset = glitchActive ? (sr(frame * 13) - 0.5) * 40 : 0;
  const rgbOffset = glitchActive ? sr(frame * 17) * 12 : 0;

  return (
    <AbsoluteFill style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity,
      transform: `scale(${scale})`,
      pointerEvents: 'none',
    }}>
      {/* RGB split layers */}
      <div style={{position: 'relative'}}>
        {/* Cyan channel */}
        <div style={{
          position: 'absolute',
          fontFamily: 'Arial Black, sans-serif',
          fontSize: 190,
          fontWeight: 900,
          color: 'cyan',
          letterSpacing: 14,
          opacity: glitchActive ? 0.4 : 0,
          transform: `translate(${-rgbOffset}px, 0)`,
          whiteSpace: 'nowrap',
          top: 0, left: 0,
        }}>TODO MAL</div>
        {/* Red channel */}
        <div style={{
          position: 'absolute',
          fontFamily: 'Arial Black, sans-serif',
          fontSize: 190,
          fontWeight: 900,
          color: C.red,
          letterSpacing: 14,
          opacity: glitchActive ? 0.4 : 0,
          transform: `translate(${rgbOffset}px, ${sliceOffset}px)`,
          whiteSpace: 'nowrap',
          top: 0, left: 0,
        }}>TODO MAL</div>
        {/* Main text */}
        <div style={{
          fontFamily: 'Arial Black, sans-serif',
          fontSize: 190,
          fontWeight: 900,
          color: C.red,
          letterSpacing: 14,
          textShadow: `0 0 80px ${C.red}, 0 0 30px ${C.red}88`,
          whiteSpace: 'nowrap',
        }}>TODO MAL</div>
      </div>
    </AbsoluteFill>
  );
}

// ─── COLOR FLASH ──────────────────────────────────────────────────────────────

function ColorFlash() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  let opacity = 0;
  for (const sec of FLASH_SECS) {
    const ff = Math.round(sec * fps);
    const d = frame - ff;
    if (d >= 0 && d <= 3) {
      const v = interpolate(d, [0, 3], [0.7, 0], {extrapolateRight: 'clamp'});
      opacity = Math.max(opacity, v);
    }
  }
  if (opacity === 0) return null;

  return (
    <AbsoluteFill style={{
      backgroundColor: C.red,
      opacity,
      pointerEvents: 'none',
    }} />
  );
}

// ─── SECTION LABELS ───────────────────────────────────────────────────────────

function SectionLabels() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sec = frame / fps;

  const current = SECTIONS.find(s => sec >= s.s && sec < s.e);
  if (!current) return null;

  const lf = frame - Math.round(current.s * fps);
  const total = Math.round((current.e - current.s) * fps);
  const opacity = interpolate(lf, [0, 6, total - 6, total], [0, 1, 1, 0], {extrapolateRight: 'clamp'});
  const scaleV = interpolate(lf, [0, 8], [0.75, 1], {extrapolateRight: 'clamp'});

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
          boxShadow: `0 0 20px ${current.color}88`,
        }}>
          <span style={{
            fontFamily: 'Arial Black, sans-serif',
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

// ─── ROAS ANIMATED COUNTER ────────────────────────────────────────────────────
// Psicología: los números en movimiento capturan atención involuntaria

function ROASCounter() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sec = frame / fps;

  // Visible 225-240s
  if (sec < 224 || sec > 242) return null;

  const localFrame = frame - Math.round(224 * fps);
  const totalFrames = Math.round(16 * fps);

  const progress = spring({
    fps,
    frame: localFrame,
    config: {damping: 18, stiffness: 60, mass: 1},
  });

  const opacity = interpolate(localFrame, [0, 10, totalFrames - 10, totalFrames], [0, 1, 1, 0], {extrapolateRight: 'clamp'});
  const roasValue = Math.round(interpolate(progress, [0, 1], [2, 39]));
  const glowIntensity = interpolate(roasValue, [2, 39], [0, 1]);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{
        position: 'absolute',
        right: 60,
        top: '50%',
        transform: 'translateY(-50%)',
        opacity,
        textAlign: 'right',
        maxWidth: 1920 - FACE_RIGHT - 40,
      }}>
        <div style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: 22,
          fontWeight: 700,
          color: C.yellow,
          letterSpacing: 4,
          textTransform: 'uppercase',
          marginBottom: 4,
          opacity: 0.8,
        }}>ROAS</div>
        <div style={{
          fontFamily: 'Arial Black, monospace',
          fontSize: 110,
          fontWeight: 900,
          color: C.yellow,
          lineHeight: 1,
          textShadow: `0 0 ${40 + glowIntensity * 60}px ${C.yellow}, 0 0 ${20 + glowIntensity * 30}px ${C.orange}`,
          letterSpacing: -2,
        }}>
          {roasValue}x
        </div>
        <div style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: 20,
          color: C.white,
          opacity: 0.6,
          marginTop: 6,
          letterSpacing: 2,
        }}>CASO REAL ✓</div>
      </div>
    </AbsoluteFill>
  );
}

// ─── PROOF IMAGE REVEAL ───────────────────────────────────────────────────────
// Prueba social visual — las imágenes reales son las más convincentes

interface ImageRevealProps {
  src: string;
  startSec: number;
  endSec: number;
  side: 'left' | 'right';
  badge?: string;
}

function ImageReveal({src, startSec, endSec, side, badge}: ImageRevealProps) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sec = frame / fps;

  if (sec < startSec - 0.5 || sec > endSec + 0.5) return null;

  const lf = frame - Math.round(startSec * fps);
  const total = Math.round((endSec - startSec) * fps);

  // Cinematic zoom in — enters big, settles to final size
  const imgScale = interpolate(lf, [0, total], [1.08, 1.0], {extrapolateRight: 'clamp'});

  // Container scale (entrance pop)
  const containerScale = interpolate(lf, [0, 20], [0.88, 1], {extrapolateRight: 'clamp'});

  // Fade in/out
  const opacity = interpolate(lf, [0, 14, total - 14, total], [0, 1, 1, 0], {extrapolateRight: 'clamp'});

  // Border draw animation — goes from 0% to 100% perimeter
  const borderProgress = interpolate(lf, [0, 25], [0, 1], {extrapolateRight: 'clamp'});

  // Pulsing glow
  const glowPulse = Math.sin(frame * 0.1) * 0.5 + 0.5;
  const glowSize = 14 + glowPulse * 10;

  // Badge slide up
  const badgeY = interpolate(lf, [10, 24], [20, 0], {extrapolateRight: 'clamp'});
  const badgeOpacity = interpolate(lf, [10, 24], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {/* Dark cinematic overlay */}
      <AbsoluteFill style={{backgroundColor: `rgba(0,0,0,${opacity * 0.65})`}} />

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${containerScale})`,
        opacity,
        width: '80%',
        maxWidth: 1540,
      }}>
        <div style={{
          position: 'relative',
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: `0 0 ${glowSize}px ${C.red}, 0 0 ${glowSize * 3}px rgba(230,57,70,0.2), 0 24px 70px rgba(0,0,0,0.95)`,
          // Animated border via outline opacity trick
          outline: `3px solid rgba(230,57,70,${borderProgress})`,
        }}>
          {/* Image with Ken Burns zoom */}
          <div style={{overflow: 'hidden', borderRadius: 10}}>
            <Img
              src={src}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                maxHeight: 800,
                objectFit: 'contain',
                transform: `scale(${imgScale})`,
                transformOrigin: 'center center',
              }}
            />
          </div>

          {/* Red color grade overlay — integrates image into video palette */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(180,20,30,0.12)',
            mixBlendMode: 'multiply',
          }} />

          {/* Vignette interna */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
          }} />

          {/* Bottom gradient for badge */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.75) 100%)',
          }} />

          {/* Badge */}
          {badge && (
            <div style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              opacity: badgeOpacity,
              transform: `translateY(${badgeY}px)`,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <div style={{
                backgroundColor: C.red,
                padding: '6px 18px',
                borderRadius: 4,
                boxShadow: `0 0 14px ${C.red}88`,
              }}>
                <span style={{
                  fontFamily: 'Arial Black, sans-serif',
                  fontSize: 16,
                  fontWeight: 900,
                  color: C.white,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}>{badge}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── BELIEF CARDS (sec 40-52) ────────────────────────────────────────────────
// Las 3 falsas creencias aparecen como tarjetas y se tachan en "PERO NO."

function BeliefCards() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sec = frame / fps;

  if (sec < 39 || sec > 53) return null;

  const beliefs = ['EL ALGORITMO', 'EL MERCADO', 'LA COMPETENCIA'];
  const showSecs = [40, 43, 46];
  const xStartFrame = Math.round(49 * fps);
  const xProgress = interpolate(frame - xStartFrame, [0, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const containerEnd = Math.round(53 * fps);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: 40, top: '50%', transform: 'translateY(-50%)', maxWidth: FACE_LEFT - 60}}>
        {beliefs.map((belief, i) => {
          const showFrame = Math.round(showSecs[i] * fps);
          if (frame < showFrame) return null;
          const lf = frame - showFrame;
          const opacity = interpolate(frame, [showFrame, showFrame + 8, containerEnd - 8, containerEnd], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const slideX = interpolate(lf, [0, 8], [-40, 0], {extrapolateRight: 'clamp'});

          return (
            <div key={belief} style={{opacity, transform: `translateX(${slideX}px)`, marginBottom: 14, position: 'relative'}}>
              <div style={{
                backgroundColor: 'rgba(230,57,70,0.12)',
                border: `1px solid rgba(230,57,70,0.35)`,
                borderRadius: 6,
                padding: '10px 20px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <span style={{fontFamily: 'Arial Black, sans-serif', fontSize: 30, fontWeight: 900, color: C.white, textTransform: 'uppercase', letterSpacing: 2}}>
                  {belief}
                </span>
                {xProgress > 0 && (
                  <div style={{position: 'absolute', top: '50%', left: 0, height: 3, width: `${xProgress * 100}%`, backgroundColor: C.red, transform: 'translateY(-50%)', boxShadow: `0 0 8px ${C.red}`}} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

// ─── 100 MARCAS COUNTER (sec 55-65) ──────────────────────────────────────────

function MarcasCounter() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sec = frame / fps;

  if (sec < 54 || sec > 66) return null;

  const lf = frame - Math.round(54 * fps);
  const total = Math.round(12 * fps);
  const progress = spring({fps, frame: lf, config: {damping: 22, stiffness: 45}});
  const count = Math.round(interpolate(progress, [0, 1], [0, 100]));
  const opacity = interpolate(lf, [0, 8, total - 8, total], [0, 1, 1, 0], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{position: 'absolute', right: 50, top: '50%', transform: 'translateY(-50%)', textAlign: 'right', maxWidth: 1920 - FACE_RIGHT - 40, opacity}}>
        <div style={{fontFamily: 'Arial Black, sans-serif', fontSize: 110, fontWeight: 900, color: C.yellow, lineHeight: 1, textShadow: `0 0 50px ${C.yellow}88`}}>
          {count}+
        </div>
        <div style={{fontFamily: 'Arial, sans-serif', fontSize: 18, color: C.white, opacity: 0.6, letterSpacing: 3, textTransform: 'uppercase', marginTop: 4}}>
          MARCAS AUDITADAS
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── SECTION ICON ─────────────────────────────────────────────────────────────

function SectionIcon() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sec = frame / fps;

  const icons = [
    {s: 68, e: 72, icon: '⚙️'},
    {s: 100, e: 104, icon: '🎯'},
    {s: 132, e: 136, icon: '📄'},
  ];

  const current = icons.find(ic => sec >= ic.s && sec < ic.e);
  if (!current) return null;

  const lf = frame - Math.round(current.s * fps);
  const total = Math.round((current.e - current.s) * fps);
  const scaleV = spring({fps, frame: lf, config: {damping: 10, stiffness: 250}});
  const opacity = interpolate(lf, [0, 4, total - 4, total], [0, 1, 1, 0], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{opacity, transform: `scale(${scaleV})`, fontSize: 130, lineHeight: 1, textAlign: 'center'}}>
        {current.icon}
      </div>
    </AbsoluteFill>
  );
}

// ─── PAIN CHECKLIST (sec 162-178) ────────────────────────────────────────────

function PainChecklist() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sec = frame / fps;

  if (sec < 161 || sec > 178) return null;

  const items = [
    {s: 162, text: 'TRÁFICO', ok: true},
    {s: 165, text: 'VISITAS', ok: true},
    {s: 168, text: 'CARRITOS', ok: true},
    {s: 171, text: 'VENTAS = 0', ok: false},
  ];

  const containerOpacity = interpolate(frame, [Math.round(161 * fps), Math.round(162 * fps), Math.round(177 * fps), Math.round(178 * fps)], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: 40, top: '50%', transform: 'translateY(-50%)', maxWidth: FACE_LEFT - 60, opacity: containerOpacity}}>
        {items.map((item) => {
          const showFrame = Math.round(item.s * fps);
          if (frame < showFrame) return null;
          const lf = frame - showFrame;
          const slideX = interpolate(lf, [0, 8], [-30, 0], {extrapolateRight: 'clamp'});
          const iconScale = spring({fps, frame: lf, config: {damping: 8, stiffness: 350}});

          return (
            <div key={item.text} style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, transform: `translateX(${slideX}px)`}}>
              <div style={{fontSize: 38, transform: `scale(${iconScale})`, lineHeight: 1}}>{item.ok ? '✅' : '❌'}</div>
              <div style={{
                fontFamily: 'Arial Black, sans-serif',
                fontSize: 36,
                fontWeight: 900,
                color: item.ok ? C.white : C.red,
                textTransform: 'uppercase',
                letterSpacing: 2,
                textShadow: item.ok ? 'none' : `0 0 25px ${C.red}`,
              }}>
                {item.text}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

// ─── LATERAL OVERLAYS ─────────────────────────────────────────────────────────

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
        const isXL = o.text === '$9';
        const slideX = interpolate(lf, [0, 8], [o.side === 'left' ? -50 : 50, 0], {extrapolateRight: 'clamp'});
        const opacity = interpolate(lf, [0, 6, dur - 6, dur], [0, 1, 1, 0], {extrapolateRight: 'clamp'});
        const posStyle: React.CSSProperties = o.side === 'left'
          ? {left: 40, maxWidth: FACE_LEFT - 60, textAlign: 'left' as const}
          : {right: 40, maxWidth: 1920 - FACE_RIGHT - 60, textAlign: 'right' as const};

        return (
          <div key={`${o.s}-${o.side}-${i}`} style={{
            position: 'absolute',
            top: '50%',
            transform: `translateY(-50%) translateX(${slideX}px)`,
            opacity,
            ...posStyle,
          }}>
            <span style={{
              fontFamily: 'Arial Black, sans-serif',
              fontSize: isXL ? 100 : 44,
              fontWeight: 900,
              color: o.color,
              textTransform: 'uppercase',
              letterSpacing: isXL ? 6 : 1,
              textShadow: `0 0 25px ${o.color}55, 0 2px 8px rgba(0,0,0,0.9)`,
              display: 'block',
              lineHeight: 1.2,
            }}>
              {o.text}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

// ─── SUBTITLES ────────────────────────────────────────────────────────────────

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
  const isImpact = IMPACT_SUBS.indexOf(current.t) !== -1;
  const isCTA = current.t === 'SOLO $9 DÓLARES';

  // CTA pulse effect
  const ctaPulse = isCTA ? (Math.sin(frame * 0.2) * 0.15 + 1) : 1;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{
        position: 'absolute',
        bottom: 72,
        left: 0,
        right: 0,
        textAlign: 'center',
        transform: `translateY(${ty}px) scale(${ctaPulse})`,
        opacity,
      }}>
        <div style={{
          fontFamily: 'Arial Black, sans-serif',
          fontSize: isCTA ? 84 : isImpact ? 74 : 58,
          fontWeight: 900,
          color: isCTA ? C.yellow : isImpact ? C.red : C.white,
          textTransform: 'uppercase',
          letterSpacing: isImpact ? 5 : 3,
          textShadow: isCTA
            ? `0 0 60px ${C.yellow}, 0 0 30px ${C.orange}, 0 2px 10px rgba(0,0,0,0.95)`
            : isImpact
              ? `0 0 50px ${C.red}, 0 2px 10px rgba(0,0,0,0.95)`
              : '0 2px 10px rgba(0,0,0,0.95)',
          backgroundColor: isCTA ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.55)',
          padding: isCTA ? '10px 36px' : '6px 28px',
          borderRadius: 4,
          display: 'inline-block',
          border: isCTA ? `2px solid ${C.yellow}44` : 'none',
        }}>
          {current.t}
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── FACE GUIDE ───────────────────────────────────────────────────────────────

function FaceGuide() {
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{
        position: 'absolute',
        left: FACE_LEFT,
        width: FACE_RIGHT - FACE_LEFT,
        top: 0,
        bottom: 0,
        borderLeft: '1px solid rgba(255,255,255,0.05)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
      }} />
    </AbsoluteFill>
  );
}

// ─── MAIN COMPOSITION ─────────────────────────────────────────────────────────

export const SpicyVSL: React.FC = () => {
  loadDefaultFonts();

  const img3 = staticFile('assets/resultados-roas.png');
  const img4 = staticFile('assets/autoridad.png');
  const imgFormula = staticFile('assets/La spicy ad formula, iamgen de un video del modulo hay dibujos y todo el item del sistema.png');
  const imgCreativos = staticFile('assets/imagen del modulo diseño de creativos con AI se ve parte de un video.png');
  const imgProductPage = staticFile('assets/Imagen del modulo product apge que convierten.png');
  const imgSkoll = staticFile('assets/imagen de skoll general donde se ven todos los cursos.png');
  const img30dias = staticFile('assets/Captura de un video de entrenamiento 30 dias, se ve un pantallazo de estrategia para marcas chicas grandes con diferenciacion de campañas.png');
  const videoSrc = staticFile('assets/spicyvsl_fixed.mp4');

  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {/* Layer 1: Base background */}
      <Background />

      {/* Layer 2: Talking head video */}
      <AbsoluteFill>
        <Video
          src={videoSrc}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </AbsoluteFill>

      {/* Layer 2: Section emotional vibe */}
      <SectionVibe />

      {/* Layer 3: Impact flashes */}
      <ColorFlash />

      {/* Layer 4: Hook A glitch intro */}
      <GlitchIntro />

      {/* Layer 5: Proof images — aparecen en los laterales */}
      {/* Spicy Ad Formula — sec 205 */}
      <ImageReveal src={imgFormula} startSec={205} endSec={213} side="right" badge="EL SISTEMA COMPLETO" />
      {/* Creativos con IA — sec 214 */}
      <ImageReveal src={imgCreativos} startSec={214} endSec={221} side="right" badge="MÓDULO: CREATIVOS CON IA" />
      {/* Páginas que convierten — sec 217 */}
      <ImageReveal src={imgProductPage} startSec={217} endSec={225} side="left" badge="MÓDULO: PRODUCT PAGE" />
      {/* Resultados ROAS — sec 225 */}
      <ImageReveal src={img3} startSec={225} endSec={237} side="right" badge="CASO REAL ✓" />
      {/* Autoridad — sec 241 */}
      <ImageReveal src={img4} startSec={241} endSec={255} side="right" badge="7+ AÑOS DE EXPERIENCIA" />
      {/* Skoll overview — sec 260 */}
      <ImageReveal src={imgSkoll} startSec={260} endSec={272} side="right" badge="LA COMUNIDAD" />
      {/* 30 días — sec 281 */}
      <ImageReveal src={img30dias} startSec={281} endSec={290} side="right" badge="DESAFÍO 30 DÍAS" />

      {/* Layer 6: Vignette (focuses attention on center) */}
      <Vignette />

      {/* Layer 7: Section transition labels */}
      <SectionLabels />

      {/* Layer 8: Section icons */}
      <SectionIcon />

      {/* Layer 9: ROAS animated counter */}
      <ROASCounter />

      {/* Layer 10: Belief cards with strikethrough (sec 40-52) */}
      <BeliefCards />

      {/* Layer 11: 100 marcas counter (sec 55-65) */}
      <MarcasCounter />

      {/* Layer 12: Pain checklist (sec 162-178) */}
      <PainChecklist />

      {/* Layer 9: Lateral keyword overlays */}
      <LateralOverlays />

      {/* Layer 10: Subtitles */}
      <Subtitles />

      {/* Layer 11: Progress bar (retention tool) */}
      <ProgressBar />

      {/* Layer 12: Face safe zone guide */}
      <FaceGuide />
    </AbsoluteFill>
  );
};
