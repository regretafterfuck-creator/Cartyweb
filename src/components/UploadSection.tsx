import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileText, Image, File, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadedFile { id: string; name: string; size: number; type: string; preview?: string; }

function FileIcon({ type }: { type: string }) {
  if (type.startsWith("image/")) return <Image className="w-5 h-5 text-blue-500" />;
  if (type === "application/pdf") return <FileText className="w-5 h-5 text-red-500" />;
  return <File className="w-5 h-5 text-gray-500" />;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadSection() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const next: UploadedFile[] = Array.from(incoming).map(f => ({
      id: `${f.name}-${f.size}-${Date.now()}`, name: f.name, size: f.size, type: f.type,
      preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
    }));
    setFiles(prev => { const s = new Set(prev.map(p => p.name)); return [...prev, ...next.filter(n => !s.has(n.name))]; });
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setIsDragging(false); addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const removeFile = (id: string) => setFiles(prev => {
    const f = prev.find(f => f.id === id); if (f?.preview) URL.revokeObjectURL(f.preview);
    return prev.filter(f => f.id !== id);
  });

  const handleReset = () => { files.forEach(f => { if (f.preview) URL.revokeObjectURL(f.preview); }); setFiles([]); setSubmitted(false); };

  return (
    <section id="upload" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white -z-10" />
      <div className="container mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Share Your Brand Assets</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Upload your logo, color swatches, or inspiration screenshots so our developers understand your vision.</p>
        </motion.div>
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="text-center py-16 rounded-2xl border border-green-200 bg-green-50/60">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Assets Uploaded</h3>
                <p className="text-muted-foreground mb-6">{files.length} file{files.length !== 1 ? "s" : ""} received.</p>
                <Button variant="outline" onClick={handleReset} className="rounded-full">Upload More Files</Button>
              </motion.div>
            ) : (
              <motion.div key="uploader" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div onDragOver={e => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={onDrop} onClick={() => inputRef.current?.click()}
                  className={`cursor-pointer rounded-2xl border-2 border-dashed transition-all p-10 text-center backdrop-blur-sm ${isDragging ? "border-blue-500 bg-blue-50/80 scale-[1.01]" : "border-border bg-white/60 hover:border-blue-400 hover:bg-blue-50/40"}`}>
                  <input ref={inputRef} type="file" multiple accept="image/*,.pdf,.doc,.docx,.txt,.zip" className="hidden" onChange={e => addFiles(e.target.files)} />
                  <motion.div animate={isDragging ? { scale: 1.1 } : { scale: 1 }} transition={{ type: "spring", stiffness: 300 }} className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                  </motion.div>
                  <p className="text-lg font-semibold mb-1">{isDragging ? "Drop files here" : "Drag and drop your files"}</p>
                  <p className="text-sm text-muted-foreground mb-4">or <span className="text-blue-600 font-medium underline underline-offset-2">browse to upload</span></p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["PNG","JPG","PDF","DOCX","TXT","ZIP"].map(fmt => (
                      <span key={fmt} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-muted-foreground border border-border">{fmt}</span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">Max 20 MB per file</p>
                </div>
                <AnimatePresence>
                  {files.length > 0 && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 space-y-2 overflow-hidden">
                      {files.map(f => (
                        <motion.div key={f.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white border border-border shadow-sm">
                          {f.preview ? <img src={f.preview} alt={f.name} className="w-10 h-10 rounded-lg object-cover border border-border" />
                            : <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center"><FileIcon type={f.type} /></div>}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{f.name}</p>
                            <p className="text-xs text-muted-foreground">{formatBytes(f.size)}</p>
                          </div>
                          <button onClick={e => { e.stopPropagation(); removeFile(f.id); }}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-gray-100 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                {files.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex items-center gap-3">
                    <Button onClick={() => setSubmitted(true)} size="lg" className="rounded-full h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 border-0 shadow-lg shadow-blue-500/20">
                      Submit {files.length} Asset{files.length !== 1 ? "s" : ""}
                    </Button>
                    <button onClick={handleReset} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Clear all</button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
                    }
