export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Creator Dashboard</h1>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <p className="mb-1 text-sm text-gray-400">Total Gifts Received</p>
          <p className="text-3xl font-bold">—</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <p className="mb-1 text-sm text-gray-400">XP Earned</p>
          <p className="text-3xl font-bold">—</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <p className="mb-1 text-sm text-gray-400">Wallet Balance</p>
          <p className="text-3xl font-bold">—</p>
        </div>
      </div>

      <section className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
        <p className="text-gray-400">
          Connect your wallet to view your gift history and earnings.
        </p>
        <div className="mt-4">
          <button className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold transition hover:bg-purple-700">
            Connect Wallet
          </button>
        </div>
      </section>
    </div>
  );
}
