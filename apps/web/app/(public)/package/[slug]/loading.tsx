export default function PackageDetailLoading() {
  return (
    <div className="min-h-screen bg-[#0A2418] flex flex-col font-sans animate-pulse">
      {/* Top Hero Skeleton */}
      <div className="relative h-[58vh] w-full bg-gradient-to-b from-[#123C2D] to-[#0A2418] flex items-end p-6 sm:p-12">
        <div className="max-w-7xl mx-auto w-full space-y-4">
          <div className="flex gap-2">
            <div className="h-6 w-28 rounded-full bg-white/15" />
            <div className="h-6 w-24 rounded-full bg-white/10" />
            <div className="h-6 w-24 rounded-full bg-white/10" />
          </div>
          <div className="h-12 w-3/4 max-w-2xl rounded-xl bg-white/15" />
          <div className="h-5 w-48 rounded-lg bg-white/10" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-44 rounded-2xl bg-white/10" />
          <div className="h-64 rounded-2xl bg-white/10" />
          <div className="h-72 rounded-2xl bg-white/10" />
        </div>
        <div className="lg:col-span-1">
          <div className="h-[480px] rounded-2xl bg-white/15" />
        </div>
      </div>
    </div>
  );
}

