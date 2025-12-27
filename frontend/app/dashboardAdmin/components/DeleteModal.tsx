"use client";

export default function DeleteModal({ article, onClose, onConfirm }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-xl font-bold mb-4">Supprimer</h2>

        <p className="mb-6">
          Supprimer <b>{article.title}</b> ?
        </p>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2">
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
