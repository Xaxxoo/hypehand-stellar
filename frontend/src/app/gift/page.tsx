export default function GiftPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Send a Gift</h1>

      <form className="space-y-6 rounded-xl border border-gray-800 bg-gray-900 p-6">
        <div>
          <label
            htmlFor="recipient"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Recipient Address
          </label>
          <input
            id="recipient"
            type="text"
            placeholder="G... (Stellar address)"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <div>
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Amount (XLM)
          </label>
          <input
            id="amount"
            type="number"
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Message (optional)
          </label>
          <textarea
            id="message"
            rows={3}
            placeholder="Add a personal message..."
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700"
        >
          Send Gift
        </button>
      </form>
    </div>
  );
}
