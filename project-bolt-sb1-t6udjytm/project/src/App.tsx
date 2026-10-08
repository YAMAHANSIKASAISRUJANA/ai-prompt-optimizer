import { useState } from 'react';
import { Sparkles, Copy, Check, Trash2, Wand2, Clipboard } from 'lucide-react';
import { optimizePrompt } from '@/lib/optimizePrompt';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [appliedRules, setAppliedRules] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const handleOptimize = () => {
    const { optimized, appliedRules } = optimizePrompt(input);
    setResult(optimized);
    setAppliedRules(appliedRules);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('');
    setAppliedRules([]);
    setCopied(false);
  };

  const canOptimize = input.trim().length > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">AI Prompt Optimizer</h1>
            <p className="text-xs text-slate-400">Turn rough ideas into clear, effective prompts</p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 shadow-2xl shadow-black/40 overflow-hidden">
            {/* Input section */}
            <div className="p-6 sm:p-8">
              <label htmlFor="prompt-input" className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
                <Wand2 className="h-4 w-4 text-cyan-400" />
                Your prompt
              </label>
              <textarea
                id="prompt-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. write a blog post about productivity"
                rows={4}
                className="w-full resize-y rounded-xl bg-slate-950/60 border border-slate-800 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition"
              />

              <div className="flex flex-wrap gap-3 mt-5">
                <button
                  onClick={handleOptimize}
                  disabled={!canOptimize}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Sparkles className="h-4 w-4" />
                  Optimize Prompt
                </button>
                <button
                  onClick={handleClear}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear
                </button>
              </div>
            </div>

            {/* Result section */}
            {result && (
              <div className="border-t border-slate-800 bg-slate-950/40 p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Clipboard className="h-4 w-4 text-cyan-400" />
                    Optimized prompt
                  </label>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {result}
                </div>

                {appliedRules.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Improvements applied</p>
                    <div className="flex flex-wrap gap-2">
                      {appliedRules.map((rule) => (
                        <span
                          key={rule}
                          className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-300"
                        >
                          {rule}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-6">
        <div className="max-w-5xl mx-auto px-6 text-center text-xs text-slate-500">
          AI Prompt Optimizer — runs entirely in your browser, no sign-in or API keys required.
        </div>
      </footer>
    </div>
  );
}

export default App;
