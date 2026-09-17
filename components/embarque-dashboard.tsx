'use client'

import { useState } from 'react'
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Bus,
  ChevronDown,
  CircleHelp,
  Clock3,
  LayoutDashboard,
  Map,
  Menu,
  MessageSquareText,
  Moon,
  MoreHorizontal,
  Navigation,
  Route,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Ticket,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'

const navItems = [
  { label: 'Visão geral', icon: LayoutDashboard },
  { label: 'Mapa em tempo real', icon: Map },
  { label: 'Frota', icon: Bus },
  { label: 'Rotas', icon: Route },
  { label: 'Passageiros', icon: Users },
  { label: 'Incidentes', icon: AlertTriangle, badge: '3' },
]

const vehicles = [
  { id: 'MPT-23', route: 'Terminal → Museu', occupancy: '78%', speed: '42 km/h', status: 'Em movimento', tone: 'success' },
  { id: 'MPT-12', route: 'Baixa → Polana', occupancy: '63%', speed: '36 km/h', status: 'Em movimento', tone: 'success' },
  { id: 'MPT-07', route: 'Polana → Costa do Sol', occupancy: '41%', speed: '50 km/h', status: 'Parada', tone: 'warning' },
  { id: 'MPT-05', route: 'Terminal → Baixa', occupancy: '91%', speed: '28 km/h', status: 'Atrasado', tone: 'danger' },
]

function Brand() {
  return <div className="brand"><div className="brand-mark"><Bus size={19} strokeWidth={2.5} /></div><div><strong>Embarque</strong><span>Inteligente</span></div></div>
}

function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  return <>
    {mobileOpen && <button aria-label="Fechar menu" className="sidebar-backdrop" onClick={onClose} />}
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-top"><Brand /><button className="icon-button mobile-close" aria-label="Fechar menu" onClick={onClose}><X size={18} /></button></div>
      <div className="workspace"><div className="workspace-icon"><ShieldCheck size={16} /></div><div><span>Central de operações</span><strong>Maputo, MZ</strong></div><ChevronDown size={15} /></div>
      <nav className="nav-list" aria-label="Navegação principal">{navItems.map((item, index) => { const Icon = item.icon; return <button key={item.label} className={`nav-item ${index === 0 ? 'active' : ''}`}><Icon size={17} /><span>{item.label}</span>{item.badge && <em>{item.badge}</em>}</button> })}</nav>
      <div className="sidebar-bottom"><button className="nav-item"><Settings size={17} /><span>Definições</span></button><div className="profile"><div className="avatar">OM</div><div><strong>Olívia Matola</strong><span>Operadora</span></div><MoreHorizontal size={17} /></div></div>
    </aside>
  </>
}

function StatCard({ icon: Icon, label, value, trend, tone }: { icon: typeof Activity; label: string; value: string; trend: string; tone: string }) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={18} /></div><div className="stat-copy"><span>{label}</span><strong>{value}</strong><small className={tone === 'danger' ? 'negative' : ''}><TrendingUp size={12} /> {trend}</small></div></div>
}

function MapPanel() {
  return <div className="map-panel"><div className="map-toolbar"><div className="search-field"><Search size={15} /><span>Pesquisar veículo ou rota</span></div><button className="map-filter active">Tempo real</button><button className="map-filter">Satélite</button></div><div className="map-art" aria-label="Mapa de Maputo com veículos em tempo real"><div className="map-label maputo">Maputo</div><div className="road road-one" /><div className="road road-two" /><div className="road road-three" /><div className="route-line route-blue" /><div className="route-line route-green" /><div className="route-line route-orange" />{[['MPT-23','blue','31%','top-a'],['MPT-12','green','64%','top-b'],['MPT-07','orange','20%','top-c'],['MPT-05','red','78%','top-d'],['MPT-18','blue','45%','top-e']].map(([id, color, load, pos]) => <div className={`bus-point ${color} ${pos}`} key={id}><Bus size={15} /><span>{id}</span><small>{load}</small></div>)}<div className="map-control"><button>+</button><button>−</button></div></div><div className="map-footer"><span><i className="dot green-dot" /> 24 veículos ativos</span><span><i className="dot blue-dot" /> 6 rotas monitoradas</span><span>Atualizado há 12s</span></div></div>
}

function VehicleTable() {
  return <div className="table-card"><div className="section-heading"><div><span className="eyebrow">OPERAÇÃO</span><h2>Veículos em circulação</h2></div><button className="text-button">Ver frota <Navigation size={14} /></button></div><div className="vehicle-table"><div className="table-head"><span>Veículo</span><span>Rota atual</span><span>Ocupação</span><span>Estado</span></div>{vehicles.map((vehicle) => <div className="table-row" key={vehicle.id}><div className="vehicle-name"><div className="mini-bus"><Bus size={14} /></div><strong>{vehicle.id}</strong></div><span>{vehicle.route}</span><span className="mono">{vehicle.occupancy}</span><span className={`status ${vehicle.tone}`}><i />{vehicle.status}</span></div>)}</div></div>
}

function AIInsight() {
  return <div className="ai-card"><div className="ai-orb"><Sparkles size={19} /></div><div className="ai-content"><div className="ai-title"><span>Embarque AI</span><span className="ai-live"><i /> Ativo</span></div><h3>O fluxo na Baixa está 18% acima do normal.</h3><p>Recomendação: adicionar uma viatura à rota MPT-12 entre 17:30 e 18:15.</p><button className="ai-button">Ver recomendação <ChevronDown size={15} /></button></div></div>
}

export function EmbarqueDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(false)
  return <div className={`app-shell ${dark ? 'dark-shell' : ''}`}><Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} /><main className="main-content"><header className="topbar"><button className="icon-button menu-button" aria-label="Abrir menu" onClick={() => setMobileOpen(true)}><Menu size={20} /></button><div className="mobile-brand"><Brand /></div><div className="breadcrumb"><span>Central de operações</span><strong>Visão geral</strong></div><div className="top-actions"><button className="icon-button theme-button" aria-label="Alternar tema" onClick={() => setDark(!dark)}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button><button className="icon-button notification-button" aria-label="Notificações"><Bell size={18} /><i /></button><div className="top-user"><div className="avatar">OM</div><span>Olívia Matola</span><ChevronDown size={14} /></div></div></header><div className="page-content"><div className="page-intro"><div><span className="eyebrow">QUARTA-FEIRA, 16 ABRIL 2025</span><h1>Bom dia, Olívia</h1><p>Acompanhe a mobilidade de Maputo em tempo real.</p></div><button className="primary-button"><Map size={16} /> Abrir mapa completo</button></div><section className="stats-grid"><StatCard icon={Bus} label="Veículos ativos" value="24 / 28" trend="+3.2% hoje" tone="blue" /><StatCard icon={Activity} label="Pontualidade média" value="92%" trend="+5.1% esta semana" tone="green" /><StatCard icon={Users} label="Passageiros hoje" value="8.492" trend="+8.4% hoje" tone="orange" /><StatCard icon={AlertTriangle} label="Incidentes abertos" value="3" trend="−40% esta semana" tone="red" /></section><section className="main-grid"><MapPanel /><AIInsight /></section><section className="bottom-grid"><VehicleTable /><div className="activity-card"><div className="section-heading"><div><span className="eyebrow">MONITORIZAÇÃO</span><h2>Atividade recente</h2></div><button className="icon-button"><MoreHorizontal size={18} /></button></div><div className="activity-list">{[['MPT-23 chegou à paragem Museu','Há 2 min','success'],['Incidente registado na Av. 24 de Julho','Há 18 min','danger'],['MPT-14 iniciou a rota Terminal → Baixa','Há 31 min','blue'],['Motorista conectado: MPT-07','Há 42 min','green']].map(([text,time,tone]) => <div className="activity-item" key={text}><span className={`activity-dot ${tone}`}><Activity size={12} /></span><div><strong>{text}</strong><small>{time}</small></div></div>)}</div><button className="full-link">Ver toda a atividade <ChevronDown size={14} /></button></div></section></div><nav className="bottom-nav">{navItems.slice(0,5).map((item, index) => { const Icon = item.icon; return <button className={index === 0 ? 'active' : ''} key={item.label}><Icon size={18} /><span>{index === 0 ? 'Início' : item.label.split(' ')[0]}</span></button> })}</nav></main></div>
}

export function DesignSystemPage() { return <main style={{padding: 48, fontFamily: 'Inter, sans-serif'}}><h1>Embarque Inteligente — Design System</h1><p style={{color:'#475569', marginTop:8}}>Componentes base disponíveis na fundação do produto.</p><div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>{['#2563EB','#0F172A','#10B981','#F59E0B','#EF4444','#F8FAFC'].map(c => <div key={c} style={{width:120, height:80, background:c, borderRadius:12, border:'1px solid #E2E8F0', padding:10, color:c==='#F8FAFC'?'#0F172A':'white', fontFamily:'monospace'}}>{c}</div>)}</div></main> }

export function PlaceholderArea({ title }: { title: string }) { return <main style={{padding:48, fontFamily:'Inter, sans-serif'}}><span style={{color:'#2563EB', fontWeight:700, fontSize:12, letterSpacing:'.12em'}}>EMBARQUE INTELIGENTE</span><h1 style={{fontSize:42, margin:'12px 0'}}>Área {title}</h1><p style={{color:'#475569'}}>Estrutura preparada para a próxima fase do produto.</p></main> }
