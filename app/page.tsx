import dynamic from 'next/dynamic';

const LivePreviewWithPuck = dynamic(
  () => import("../components/LivePreviewWithPuck"),
  { ssr: false }
);

export default function Page() {
  return (
    <>
      <LivePreviewWithPuck />
    </>
  );
}
