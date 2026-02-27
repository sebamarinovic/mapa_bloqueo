import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Treemap, Legend } from "recharts";

const COLORS = {
  bg: "#0a0e17",
  card: "#111827",
  cardHover: "#1a2332",
  border: "#1e2a3a",
  accent: "#f59e0b",
  accentAlt: "#ef4444",
  accentBlue: "#3b82f6",
  accentGreen: "#10b981",
  accentPurple: "#8b5cf6",
  text: "#e2e8f0",
  textMuted: "#94a3b8",
  textDim: "#64748b",
};

const PIE_COLORS = ["#f59e0b", "#ef4444", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#6366f1", "#84cc16", "#06b6d4", "#e11d48", "#a3e635", "#fb923c", "#818cf8", "#fbbf24"];

const categoryData = [
  { name: "Reparar filtración/fuga", count: 312, pct: 23.0 },
  { name: "Revisión/ajuste válvula", count: 84, pct: 6.2 },
  { name: "Limpieza/destape", count: 81, pct: 6.0 },
  { name: "Alineamiento/montaje", count: 60, pct: 4.4 },
  { name: "Trabajo eléctrico", count: 55, pct: 4.1 },
  { name: "Calibración instrumento", count: 34, pct: 2.5 },
  { name: "Cambio/reparar cañería", count: 30, pct: 2.2 },
  { name: "Cambio válvula", count: 23, pct: 1.7 },
  { name: "Cambio bomba/diafragma", count: 19, pct: 1.4 },
  { name: "Seguridad/resguardo", count: 19, pct: 1.4 },
  { name: "Reparar bomba", count: 18, pct: 1.3 },
  { name: "Soldadura/reparación", count: 15, pct: 1.1 },
  { name: "Cambio correa/rodamiento", count: 12, pct: 0.9 },
  { name: "Lubricación/aceite", count: 8, pct: 0.6 },
  { name: "Reparar placa filtro", count: 7, pct: 0.5 },
];

const areaData = [
  { name: "CAP-4", count: 251 },
  { name: "ATP", count: 250 },
  { name: "CAP-3", count: 243 },
  { name: "GCP-2", count: 195 },
  { name: "GCP-4", count: 194 },
  { name: "Almacenamiento", count: 46 },
  { name: "Transferencia", count: 31 },
  { name: "CAP-3/4", count: 22 },
  { name: "Suministros", count: 18 },
];

const especialidadData = [
  { name: "Mecánica", value: 1057 },
  { name: "Electrónica", value: 218 },
  { name: "Eléctrica", value: 70 },
];

const topEquipos = [
  { tag: "PU-008", count: 17, area: "ATP", tipo: "Filtración/fuga" },
  { tag: "V-105", count: 15, area: "GCP-2", tipo: "Filtración/fuga" },
  { tag: "T-101A", count: 13, area: "GCP-2", tipo: "Filtración/fuga" },
  { tag: "Bomba diafragma", count: 11, area: "ATP", tipo: "Varios" },
  { tag: "LT-1402", count: 10, area: "CAP-3", tipo: "Instrumentación" },
  { tag: "LTO-2", count: 9, area: "Transferencia", tipo: "Filtración/fuga" },
  { tag: "PU-0003", count: 9, area: "ATP", tipo: "Filtración/fuga" },
  { tag: "Muestreador EPAS", count: 9, area: "ATP", tipo: "Instalación" },
  { tag: "PU-0004", count: 8, area: "ATP", tipo: "Filtración/fuga" },
  { tag: "P-101A", count: 8, area: "GCP-2", tipo: "Varios" },
  { tag: "PU-004", count: 8, area: "ATP", tipo: "Filtración/fuga" },
  { tag: "P-101D", count: 7, area: "GCP-2", tipo: "Filtración/fuga" },
  { tag: "T101-B", count: 7, area: "GCP-2", tipo: "Filtración/fuga" },
  { tag: "PU-0025", count: 7, area: "ATP", tipo: "Filtración/fuga" },
  { tag: "HV-25077", count: 6, area: "CAP-3", tipo: "Válvula" },
];

const topDescripciones = [
  { desc: "Abrir y cerrar tapas para limpieza de canastillos", count: 18 },
  { desc: "Reparar filtración por sello mecánico", count: 10 },
  { desc: "Abrir y cerrar intercambiador para lavado de placas", count: 10 },
  { desc: "Instalación de nuevo muestreador de ácido en línea", count: 6 },
  { desc: "Instalación protección de seguridad", count: 6 },
  { desc: "Abrir y cerrar tapas intercambiadores para limpieza", count: 5 },
  { desc: "Abrir tapa inspección codo lado EPAS para retrolavado", count: 5 },
  { desc: "Retiro de flange e instalación limpieza canastillo", count: 5 },
  { desc: "Revisar funcionamiento de válvula", count: 5 },
  { desc: "Limpieza de canastillo", count: 5 },
];

const areaCategoria = {
  "ATP": [
    { name: "Filtración/fuga", value: 77 },
    { name: "Calibración", value: 10 },
    { name: "Eléctrico", value: 8 },
    { name: "Placa filtro", value: 7 },
    { name: "Otros", value: 107 },
  ],
  "CAP-3": [
    { name: "Filtración/fuga", value: 32 },
    { name: "Válvula", value: 28 },
    { name: "Limpieza", value: 24 },
    { name: "Montaje", value: 15 },
    { name: "Otros", value: 111 },
  ],
  "CAP-4": [
    { name: "Filtración/fuga", value: 39 },
    { name: "Limpieza", value: 37 },
    { name: "Válvula", value: 27 },
    { name: "Montaje", value: 15 },
    { name: "Otros", value: 96 },
  ],
  "GCP-4": [
    { name: "Filtración/fuga", value: 62 },
    { name: "Válvula", value: 8 },
    { name: "Calibración", value: 7 },
    { name: "Cañería", value: 7 },
    { name: "Otros", value: 81 },
  ],
  "GCP-2": [
    { name: "Filtración/fuga", value: 55 },
    { name: "Eléctrico", value: 12 },
    { name: "Montaje", value: 9 },
    { name: "Bomba", value: 5 },
    { name: "Otros", value: 88 },
  ],
};

const StatCard = ({ label, value, sub, color }) => (
  <div style={{
    background: `linear-gradient(135deg, ${COLORS.card}, ${COLORS.cardHover})`,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 12,
    padding: "20px 24px",
    borderLeft: `4px solid ${color}`,
  }}>
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 32, fontWeight: 700, color, letterSpacing: "-1px" }}>{value}</div>
    <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 4, fontWeight: 500 }}>{label}</div>
    {sub && <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>{sub}</div>}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#1e293b",
      border: `1px solid ${COLORS.border}`,
      borderRadius: 8,
      padding: "10px 14px",
      fontSize: 12,
      color: COLORS.text,
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label || payload[0]?.name}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || COLORS.accent }}>{p.name || "Cantidad"}: {p.value}</div>
      ))}
    </div>
  );
};

const SectionTitle = ({ children, icon }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
    marginTop: 8,
  }}>
    <span style={{ fontSize: 20 }}>{icon}</span>
    <h2 style={{
      fontSize: 18,
      fontWeight: 700,
      color: COLORS.text,
      letterSpacing: "-0.3px",
      margin: 0,
      fontFamily: "'Space Mono', monospace",
    }}>{children}</h2>
    <div style={{ flex: 1, height: 1, background: COLORS.border, marginLeft: 12 }} />
  </div>
);

export default function Dashboard() {
  const [selectedArea, setSelectedArea] = useState("ATP");

  return (
    <div style={{
      background: COLORS.bg,
      minHeight: "100vh",
      padding: "32px 28px",
      fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif",
      color: COLORS.text,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentAlt})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, fontWeight: 700,
          }}>⚙</div>
          <div>
            <h1 style={{
              fontSize: 26,
              fontWeight: 700,
              margin: 0,
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "-0.5px",
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentAlt})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>ESTUDIO DE TRABAJOS RECURRENTES</h1>
            <div style={{ fontSize: 12, color: COLORS.textDim, fontFamily: "'JetBrains Mono', monospace" }}>
              SOLICITUDES DE MANTENCIÓN · 2024 – 2026 · 1.358 REGISTROS
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        <StatCard label="Total Solicitudes" value="1.358" sub="Ene 2024 – Feb 2026" color={COLORS.accent} />
        <StatCard label="Filtraciones / Fugas" value="23%" sub="312 solicitudes — #1 problema" color={COLORS.accentAlt} />
        <StatCard label="Equipo más crítico" value="PU-008" sub="17 intervenciones (ATP)" color={COLORS.accentBlue} />
        <StatCard label="Tasa de ejecución" value="58%" sub="782 trabajos realizados" color={COLORS.accentGreen} />
      </div>

      {/* Row 1: Categorías + Especialidades */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 28 }}>
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24 }}>
          <SectionTitle icon="📊">Tipos de Trabajo más Recurrentes</SectionTitle>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={categoryData} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
              <XAxis type="number" tick={{ fill: COLORS.textDim, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" width={180} tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Solicitudes" radius={[0, 6, 6, 0]}>
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={i === 0 ? COLORS.accentAlt : PIE_COLORS[i % PIE_COLORS.length]} fillOpacity={i === 0 ? 1 : 0.75} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24 }}>
          <SectionTitle icon="🔧">Por Especialidad</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={especialidadData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value">
                {especialidadData.map((e, i) => (
                  <Cell key={i} fill={[COLORS.accent, COLORS.accentBlue, COLORS.accentGreen][i]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
            {especialidadData.map((e, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: [COLORS.accent, COLORS.accentBlue, COLORS.accentGreen][i] }} />
                <span style={{ fontSize: 13, color: COLORS.textMuted }}>{e.name}</span>
                <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 600, color: COLORS.text }}>{e.value}</span>
                <span style={{ fontSize: 11, color: COLORS.textDim }}>({(e.value / 1345 * 100).toFixed(0)}%)</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "14px 16px", background: "rgba(245,158,11,0.08)", borderRadius: 8, border: `1px solid rgba(245,158,11,0.15)` }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, marginBottom: 4 }}>💡 Hallazgo clave</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, lineHeight: 1.5 }}>
              El 78.6% de los trabajos son mecánicos. Filtraciones y fugas dominan esta especialidad con 301 casos.
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Áreas + Área detalle */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24 }}>
          <SectionTitle icon="🏭">Solicitudes por Área</SectionTitle>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={areaData} margin={{ left: -10, right: 20, top: 5, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: COLORS.textDim, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Solicitudes" radius={[6, 6, 0, 0]}>
                {areaData.map((e, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24 }}>
          <SectionTitle icon="🔍">Desglose por Área</SectionTitle>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            {Object.keys(areaCategoria).map(a => (
              <button key={a} onClick={() => setSelectedArea(a)} style={{
                padding: "6px 14px",
                borderRadius: 20,
                border: selectedArea === a ? "none" : `1px solid ${COLORS.border}`,
                background: selectedArea === a ? COLORS.accent : "transparent",
                color: selectedArea === a ? COLORS.bg : COLORS.textMuted,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}>{a}</button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={areaCategoria[selectedArea]} cx="50%" cy="50%" outerRadius={85} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {areaCategoria[selectedArea].map((e, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Top Equipos + Top Descripciones */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24 }}>
          <SectionTitle icon="🚨">Equipos con más Intervenciones</SectionTitle>
          <div style={{ maxHeight: 420, overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                  {["TAG", "N°", "Área", "Tipo principal"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "8px 10px", color: COLORS.textDim, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topEquipos.map((e, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}22`, transition: "background 0.15s" }}>
                    <td style={{ padding: "10px 10px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: i < 3 ? COLORS.accentAlt : COLORS.text }}>
                      {i < 3 && <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: COLORS.accentAlt, marginRight: 8, animation: "pulse 2s infinite" }} />}
                      {e.tag}
                    </td>
                    <td style={{ padding: "10px 10px" }}>
                      <span style={{
                        background: `rgba(245,158,11,${Math.min(e.count / 17, 1) * 0.3})`,
                        padding: "3px 10px",
                        borderRadius: 12,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 700,
                        fontSize: 13,
                      }}>{e.count}</span>
                    </td>
                    <td style={{ padding: "10px 10px", color: COLORS.textMuted }}>{e.area}</td>
                    <td style={{ padding: "10px 10px", color: COLORS.textDim, fontSize: 11 }}>{e.tipo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24 }}>
          <SectionTitle icon="🔄">Trabajos Exactos más Repetidos</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {topDescripciones.map((d, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                background: i === 0 ? "rgba(239,68,68,0.08)" : "rgba(255,255,255,0.02)",
                borderRadius: 8,
                border: `1px solid ${i === 0 ? "rgba(239,68,68,0.2)" : COLORS.border + "44"}`,
              }}>
                <div style={{
                  minWidth: 36, height: 36, borderRadius: 8,
                  background: `linear-gradient(135deg, ${PIE_COLORS[i]}, ${PIE_COLORS[i]}88)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 14,
                  color: "#fff",
                }}>{d.count}</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.4 }}>{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conclusiones */}
      <div style={{
        background: `linear-gradient(135deg, rgba(245,158,11,0.06), rgba(239,68,68,0.06))`,
        border: `1px solid rgba(245,158,11,0.15)`,
        borderRadius: 12,
        padding: 28,
      }}>
        <SectionTitle icon="📋">Conclusiones y Recomendaciones</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          {[
            {
              title: "Filtraciones: problema #1",
              color: COLORS.accentAlt,
              text: "Con 312 casos (23% del total), las filtraciones y fugas de sellos son el trabajo más recurrente. Los equipos PU-008, V-105 y T-101A concentran la mayor cantidad. Se recomienda un programa de reemplazo preventivo de sellos mecánicos."
            },
            {
              title: "Equipos críticos en ATP y GCP-2",
              color: COLORS.accentBlue,
              text: "Las bombas PU del ATP (PU-008, PU-0003, PU-0004) y los estanques T-101A/B del GCP-2 acumulan intervenciones repetitivas. Se sugiere evaluar el estado de estos activos para decidir reemplazo o overhaul mayor."
            },
            {
              title: "Limpieza recurrente en CAP-3/4",
              color: COLORS.accentGreen,
              text: "La limpieza de canastillos e intercambiadores (apertura/cierre) representa un alto volumen de OTs repetitivas. Optimizar frecuencias de lavado químico y evaluar sistemas de auto-limpieza reduciría la carga operativa."
            },
          ].map((c, i) => (
            <div key={i} style={{ padding: "18px 20px", background: COLORS.card, borderRadius: 10, borderTop: `3px solid ${c.color}` }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: c.color, marginBottom: 8, fontFamily: "'Space Mono', monospace" }}>{c.title}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.7 }}>{c.text}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 3px; }
      `}</style>
    </div>
  );
}
