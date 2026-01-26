export default function() {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-light tracking-wide">STORE CREDIT & GIFT CARDS</h2>

            {/* Store Credit Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">STORE CREDIT</h3>
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900">Credit Code</p>
                    <p className="text-sm text-gray-600">
                        You do not have a credit code. Once you receive store credit, your credit code will be created.
                    </p>
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900">You have $0 credit</p>
                    <p className="text-sm text-gray-600">
                        You can apply your store credit at the checkout. For store credit issued outside of the current store
                        currency, it will be converted to the current currency.
                    </p>
                </div>
            </div>

            <hr className="border-gray-200" />

            {/* Gift Card Balance Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">GIFT CARD BALANCE</h3>
                <p className="text-sm text-gray-600">
                    If your gift card is in another currency, it will be converted in the same currency as the store.
                </p>

                <div className="max-w-md space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="giftCardCode" className="block text-sm text-gray-600">
                            Enter Gift Card Code
                        </label>
                        <input
                            type="text"
                            id="giftCardCode"
                            placeholder="XXXXXXXXXX"
                            className="w-full px-3 py-2 border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                    </div>

                    <button className="w-full bg-black text-white py-3 text-sm font-medium hover:bg-gray-800 transition-colors">
                        CHECK GIFT CARD BALANCE
                    </button>

                    <p className="text-xs text-gray-500">
                        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                    </p>
                </div>
            </div>
        </div>
    )
}