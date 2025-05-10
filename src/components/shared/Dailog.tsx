interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Dialog({ open, onClose, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center overflow-x-hidden p-20">
      <div
        className="bg-white rounded-lg m-10 shadow-xl w-full max-w-md mx-auto px-4 py-2 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      <div className="fixed inset-0 -z-10" onClick={onClose}></div>
    </div>
  );
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold mb-4 text-center text-rose-500">
      {children}
    </h2>
  );
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return <div className="py-2">{children}</div>;
}

export function DialogFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-end gap-2 mt-6">{children}</div>;
}
