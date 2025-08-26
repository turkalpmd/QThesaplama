
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Formula, Sex } from './types';
import type { InterpretationResult } from './types';
import { QTC_THRESHOLDS, QTC_LOWER_THRESHOLD, FORMULA_DESCRIPTIONS, INTERPRETATION_MAP, DRUG_LIST } from './constants';

const PillIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
    </svg>
);

const ExternalLinkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.665l3-3Z" />
        <path d="M8.603 14.904a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 0 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.665l-3 3Z" />
    </svg>
);

const RISK_MAP: Record<string, { name: string, className: string }> = {
    'KR': { name: 'Bilinen Risk', className: 'bg-red-100 text-red-800' },
    'PR': { name: 'Olası Risk', className: 'bg-orange-100 text-orange-800' },
    'CR': { name: 'Koşullu Risk', className: 'bg-yellow-100 text-yellow-800' },
    'SR': { name: 'Özel Risk', className: 'bg-sky-100 text-sky-800' },
};

const DrugListModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const processedDrugs = useMemo(() => DRUG_LIST.map(drug => {
        const match = drug.generic.match(/\(([^)]+)\)/);
        const risk = match ? match[1] : 'N/A';
        const genericName = drug.generic.replace(/\s*\(([^)]+)\)/, '').trim();
        return { ...drug, risk, genericName };
    }).sort((a,b) => a.genericName.localeCompare(b.genericName)), []);

    const filteredDrugs = useMemo(() => processedDrugs.filter(drug => {
        const term = searchTerm.toLowerCase();
        return drug.genericName.toLowerCase().includes(term) || drug.brand.toLowerCase().includes(term);
    }), [searchTerm, processedDrugs]);
    
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') {
              onClose();
           }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
           window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div role="dialog" aria-modal="true" aria-labelledby="drug-list-title" className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="p-4 border-b flex justify-between items-center sticky top-0 bg-white rounded-t-2xl">
                    <h2 id="drug-list-title" className="text-xl font-bold text-slate-800">QTc Uzatan İlaçlar Listesi</h2>
                    <button onClick={onClose} aria-label="Kapat" className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </header>
                <div className="p-4 border-b">
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="İlaç adı (jenerik veya marka) ile ara..."
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                        aria-label="İlaç ara"
                    />
                </div>
                <div className="p-2 text-xs text-center text-slate-500 border-b">
                    Risk Kategorileri: <span className="font-semibold text-red-600">KR</span> (Bilinen), <span className="font-semibold text-orange-600">PR</span> (Olası), <span className="font-semibold text-yellow-600">CR</span> (Koşullu), <span className="font-semibold text-sky-600">SR</span> (Özel)
                </div>
                <ul className="overflow-y-auto p-4 space-y-2">
                    {filteredDrugs.length > 0 ? filteredDrugs.map((drug, index) => (
                        <li key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <p className="font-semibold text-slate-900">{drug.genericName}</p>
                                    <p className="text-sm text-slate-600">{drug.brand}</p>
                                </div>
                                {RISK_MAP[drug.risk] && (
                                    <span title={RISK_MAP[drug.risk].name} className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${RISK_MAP[drug.risk].className}`}>
                                        {drug.risk}
                                    </span>
                                )}
                            </div>
                        </li>
                    )) : (
                        <li className="text-center text-slate-500 py-8">Aramanızla eşleşen ilaç bulunamadı.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};


const App: React.FC = () => {
    const [qt, setQt] = useState<string>('');
    const [rr, setRr] = useState<string>('');
    const [sex, setSex] = useState<Sex>(Sex.Male);
    const [formula, setFormula] = useState<Formula>(Formula.Bazett);
    const [qtcResult, setQtcResult] = useState<number | null>(null);
    const [interpretation, setInterpretation] = useState<InterpretationResult>(() => ({
        level: 'Geçersiz',
        ...INTERPRETATION_MAP['Geçersiz']
    }));
    const [isDrugListVisible, setIsDrugListVisible] = useState(false);

    const getInterpretation = useCallback((qtc: number | null, currentSex: Sex): InterpretationResult => {
        if (qtc === null || !isFinite(qtc)) {
            return { level: 'Geçersiz', ...INTERPRETATION_MAP['Geçersiz'] };
        }

        if (qtc < QTC_LOWER_THRESHOLD) {
            return { level: 'Kısa', ...INTERPRETATION_MAP['Kısa'] };
        }

        const thresholds = QTC_THRESHOLDS[currentSex];
        if (qtc <= thresholds.normal) {
            return { level: 'Normal', ...INTERPRETATION_MAP['Normal'] };
        }
        if (qtc <= thresholds.borderline) {
            return { level: 'Sınırda', ...INTERPRETATION_MAP['Sınırda'] };
        }
        return { level: 'Uzamış', ...INTERPRETATION_MAP['Uzamış'] };
    }, []);

    const calculateQtc = useCallback(() => {
        const qtSmallSquares = parseFloat(qt);
        const rrSmallSquares = parseFloat(rr);

        if (isNaN(qtSmallSquares) || isNaN(rrSmallSquares) || qtSmallSquares <= 0 || rrSmallSquares <= 0) {
            setQtcResult(null);
            return;
        }

        const qtMs = qtSmallSquares * 40; // 1 small square = 40ms
        const rrSec = rrSmallSquares * 0.04; // 1 small square = 0.04s
        
        let result = 0;

        switch (formula) {
            case Formula.Bazett:
                result = qtMs / Math.sqrt(rrSec);
                break;
            case Formula.Fredericia:
                result = qtMs / Math.cbrt(rrSec);
                break;
            case Formula.Framingham:
                result = qtMs + 154 * (1 - rrSec);
                break;
            case Formula.Hodges:
                const hrBpm = 60 / rrSec;
                result = qtMs + 1.75 * (hrBpm - 60);
                break;
        }
        setQtcResult(result);
    }, [qt, rr, formula]);
    
    useEffect(() => {
        calculateQtc();
    }, [calculateQtc]);

    useEffect(() => {
        setInterpretation(getInterpretation(qtcResult, sex));
    }, [qtcResult, sex, getInterpretation]);

    const otherFormulas = useMemo(() => 
        (Object.values(Formula) as Array<Formula>).filter(f => f !== formula), 
        [formula]
    );

    return (
        <div className="min-h-screen font-sans flex flex-col items-center p-4 pt-8 sm:p-8">
            {isDrugListVisible && <DrugListModal onClose={() => setIsDrugListVisible(false)} />}
            <main className="w-full max-w-lg">
                <header className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3">
                        <span className="text-5xl" role="img" aria-label="Anatomical Heart">🫀</span>
                        <h1 className="text-4xl font-bold text-slate-800">QTc Hesaplayıcı</h1>
                    </div>
                    <p className="text-slate-500 mt-2">Kalp ritminize göre düzeltilmiş QT aralığını hesaplayın.</p>
                </header>

                <div className="bg-white rounded-2xl shadow-lg p-6 space-y-8">
                    {/* Inputs Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="rr" className="block text-sm font-medium text-slate-700 mb-1">RR Aralığı (küçük kare)</label>
                            <input
                                id="rr"
                                type="number"
                                value={rr}
                                onChange={(e) => setRr(e.target.value)}
                                placeholder="Örn. 20"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                                aria-label="RR interval in small squares"
                            />
                        </div>
                        <div>
                            <label htmlFor="qt" className="block text-sm font-medium text-slate-700 mb-1">QT Aralığı (küçük kare)</label>
                            <input
                                id="qt"
                                type="number"
                                value={qt}
                                onChange={(e) => setQt(e.target.value)}
                                placeholder="Örn. 10"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                                aria-label="QT interval in small squares"
                            />
                        </div>
                    </div>

                    {/* Sex Selection */}
                    <div>
                        <h3 className="text-sm font-medium text-slate-700 mb-2">Cinsiyet</h3>
                        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Cinsiyet">
                            {(Object.values(Sex) as Array<Sex>).map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSex(s)}
                                    role="radio"
                                    aria-checked={sex === s}
                                    className={`px-4 py-2 rounded-lg text-center font-semibold transition ${sex === s ? 'bg-sky-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                                >
                                    {s === Sex.Male ? 'Erkek' : 'Kadın'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Formula Selection */}
                    <div>
                        <h3 className="text-sm font-medium text-slate-700 mb-2">Formül</h3>
                        <div className="space-y-3">
                            {/* Selected Formula */}
                            <div className="p-3 border rounded-lg bg-sky-50 border-sky-500 ring-2 ring-sky-500">
                                <div className="flex items-center">
                                    <input type="radio" name="formula" checked readOnly className="h-4 w-4 text-sky-600 border-slate-300 focus:ring-sky-500" aria-labelledby={`formula-label-${formula}`} />
                                    <div id={`formula-label-${formula}`} className="ml-3">
                                        <p className="font-semibold text-slate-800">{formula}</p>
                                        <p className="text-xs text-slate-500">{FORMULA_DESCRIPTIONS[formula]}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Other Formulas */}
                            <div className="grid grid-cols-3 gap-3">
                                {otherFormulas.map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setFormula(f)}
                                        className="px-3 py-2 text-sm rounded-lg text-center font-semibold transition bg-slate-100 text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                        aria-label={`Select ${f} formula`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* Result Section */}
                    <div className="bg-slate-800 text-white p-6 rounded-xl text-center" aria-live="polite">
                        <h2 className="text-lg font-medium text-slate-300 mb-2">Düzeltilmiş QT</h2>
                        <p className="text-5xl font-bold tracking-tight">
                            {qtcResult !== null && isFinite(qtcResult) ? qtcResult.toFixed(0) : '---'}
                            <span className="text-3xl text-slate-400 ml-1">ms</span>
                        </p>
                    </div>

                    {/* Interpretation Section */}
                    <div className={`p-4 rounded-lg text-center ${interpretation.className}`} aria-live="polite">
                        <p className="font-semibold">{interpretation.level}</p>
                        <p className="text-sm">{interpretation.message}</p>
                    </div>
                    
                    {/* ECG Example Image */}
                    <div className="mt-4 pt-4 border-t border-slate-200">
                         <img 
                            src="/QT-RRinterval.png"
                            alt="EKG trasesinde RR ve QT aralıklarını gösteren örnek" 
                            className="w-full rounded-lg object-contain" 
                        />
                    </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button 
                        onClick={() => setIsDrugListVisible(true)} 
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        aria-haspopup="dialog"
                    >
                        <PillIcon className="w-5 h-5" />
                        QTc Uzatan İlaçlar
                    </button>
                    <a 
                        href="https://crediblemeds.org/druglist" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 font-semibold text-slate-700 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
                    >
                        <ExternalLinkIcon className="w-5 h-5" />
                        CredibleMeds®
                    </a>
                </div>

                <footer className="text-center mt-8">
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        <strong>Yasal Uyarı:</strong> Bu araç sadece eğitim amaçlıdır ve profesyonel tıbbi tavsiye yerine geçmez. Tıbbi kararlar için her zaman bir sağlık uzmanına danışın.
                    </p>
                </footer>
            </main>
        </div>
    );
};

export default App;
