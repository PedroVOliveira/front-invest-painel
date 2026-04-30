export default function AssetDetailsModal({
  params,
}: {
  params: { ticker: string };
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-xl font-bold">Detalhes do Ativo: {params.ticker}</h2>
        <p>Esta é uma Intercepting Route (Drawer/Modal).</p>
      </div>
    </div>
  );
}
