import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="flex w-full flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">
          Gift Crypto with{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            HypeHand
          </span>
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-gray-400">
          The Stellar-powered gifting platform. Send token gifts to your
          favorite creators, earn XP, and engage through secret rooms — all
          on-chain with low fees.
        </p>
        <div className="flex gap-4">
          <Link
            href="/gift"
            className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
          >
            Send a Gift
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-gray-700 px-6 py-3 font-semibold text-gray-300 transition hover:border-gray-500 hover:text-white"
          >
            View Dashboard
          </Link>
        </div>
      </section>

      <section className="w-full max-w-5xl px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 text-center">
            <div className="mb-4 text-4xl">🔗</div>
            <h3 className="mb-2 text-xl font-semibold">Connect Wallet</h3>
            <p className="text-gray-400">
              Link your Stellar wallet to get started with HypeHand.
            </p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 text-center">
            <div className="mb-4 text-4xl">🎁</div>
            <h3 className="mb-2 text-xl font-semibold">Send Gifts</h3>
            <p className="text-gray-400">
              Choose a creator and send token gifts directly on-chain.
            </p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 text-center">
            <div className="mb-4 text-4xl">⭐</div>
            <h3 className="mb-2 text-xl font-semibold">Earn Rewards</h3>
            <p className="text-gray-400">
              Gain XP, climb leaderboards, and unlock exclusive perks.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
