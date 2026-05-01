import { Suspense } from "react";
import { AssetModalWrapper } from "@/components/custom/dashboard/asset-modal/asset-modal-wrapper";
import { AssetModalContent } from "@/components/custom/dashboard/asset-modal-content";
import { AssetDetailsLoading } from "@/components/custom/dashboard/asset-details-loading";

interface AssetModalPageProps {
  params: Promise<{ symbol: string }>;
}

export default async function AssetModalPage({ params }: AssetModalPageProps) {
  const { symbol } = await params;

  return (
    <AssetModalWrapper>
      <Suspense fallback={<AssetDetailsLoading />}>
        <AssetModalContent symbol={symbol} />
      </Suspense>
    </AssetModalWrapper>
  );
}
