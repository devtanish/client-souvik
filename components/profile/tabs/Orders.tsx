export default function() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-light tracking-wide">MY ORDERS</h2>
            <div className="space-y-4">
                <div>
                    <p className="text-sm font-medium text-gray-900">You haven&apos;t placed any orders yet.</p>
                    <p className="text-sm text-gray-600">Stock up on something new</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-50">
                        BEST SELLERS
                    </button>
                    <button className="px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-50">
                        SHOP ALL
                    </button>
                    <button className="px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-50">
                        ALL RINGS
                    </button>
                    <button className="px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-50">
                        NEW ARRIVALS
                    </button>
                </div>
            </div>
        </div>
    )
}