import { useEffect, useMemo, useRef, useState } from "react";
import { FaLock, FaCreditCard } from "react-icons/fa";

const CORE = import.meta.env.VITE_API_URL;

const PUBLIC_KEY = import.meta.env.VITE_POWERBOARD_PUBLIC_KEY;
const GATEWAY_ID = import.meta.env.VITE_POWERBOARD_GATEWAY_ID;
const PB_ENV = import.meta.env.VITE_POWERBOARD_ENV || "preproduction_cba";

// PowerBoard Hosted Client SDK (preprod). Docs show this script URL. :contentReference[oaicite:2]{index=2}
const POWERBOARD_WIDGET_SRC =
  "https://widget.preproduction.powerboard.commbank.com.au/sdk/latest/widget.umd.min.js";

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return resolve();

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
}

const PaynowPage = ({ amount = 2000 }) => {
  const widgetContainerRef = useRef(null);
  const widgetInstanceRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState(null);
  const [successInfo, setSuccessInfo] = useState(null);

  const reference = useMemo(() => `ORDER-${Date.now()}`, []);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        setError(null);
        setSuccessInfo(null);
        setLoading(true);

        if (!PUBLIC_KEY || !GATEWAY_ID) {
          throw new Error(
            "Missing VITE_POWERBOARD_PUBLIC_KEY or VITE_POWERBOARD_GATEWAY_ID"
          );
        }

        await loadScriptOnce(POWERBOARD_WIDGET_SRC);

        // cba.HtmlWidget usage from PowerBoard Client SDK docs :contentReference[oaicite:3]{index=3}
        const { cba } = window;
        if (!cba?.HtmlWidget) throw new Error("PowerBoard SDK not available (cba.HtmlWidget missing)");

        // Clear container if re-mounting
        if (widgetContainerRef.current) widgetContainerRef.current.innerHTML = "";

        const widget = new cba.HtmlWidget("#powerboard-widget", PUBLIC_KEY, GATEWAY_ID);
        widget.setEnv(PB_ENV);
        widget.useAutoResize?.(true);

        // Optional: make some fields required
        widget.setFormFields?.(["card_name*", "email", "first_name*", "last_name"]);

        // Listen for finish event (token returned after submit)
        widget.on("finish", async (data) => {
          // data shape can vary; be defensive
          const paymentSourceToken =
            data?.payment_source?.token ||
            data?.payment_source ||
            data?.token ||
            data?.paymentSource ||
            null;

          if (!paymentSourceToken) {
            setError("Payment source token missing from widget finish event.");
            return;
          }

          try {
            setPaying(true);
            setError(null);

            // Send token + amount to your backend route
            const res = await fetch(`${CORE}/create-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                amount,
                currency: "AUD",
                reference,
                description: `Payment for ${reference}`,
                gateway_id: GATEWAY_ID,
                // this is the token produced by the widget
                payment_source_token: paymentSourceToken,
                // optional customer fields if you collected them
                customer: {
                  email: data?.email,
                  first_name: data?.first_name,
                  last_name: data?.last_name,
                },
              }),
            });

            const json = await res.json();
            if (!res.ok) {
              throw new Error(json?.message || `Payment failed (${res.status})`);
            }

            setSuccessInfo(json);
          } catch (e) {
            setError(e.message || "Payment failed");
          } finally {
            setPaying(false);
          }
        });

        // Load the widget iFrame
        widget.load();

        widgetInstanceRef.current = widget;

        if (isMounted) setLoading(false);
      } catch (e) {
        if (isMounted) {
          setError(e.message || "Failed to initialise PowerBoard widget");
          setLoading(false);
        }
      }
    };

    init();

    return () => {
      isMounted = false;
      // no official destroy in docs; we just drop references
      widgetInstanceRef.current = null;
    };
  }, [amount, reference]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span className="ml-3 text-gray-600">Preparing secure payment…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        <p className="font-medium">Payment initialisation failed</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <FaCreditCard className="text-blue-600" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">Pay Now</h4>
            <p className="text-sm text-gray-500">
              Complete your payment securely
            </p>
          </div>
        </div>

        {/* Widget container */}
        <div
          id="powerboard-widget"
          ref={widgetContainerRef}
          className="min-h-[280px]"
        />

        {/* Status */}
        {paying && (
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            Processing payment…
          </div>
        )}

        {successInfo && (
          <div className="mt-4 bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg">
            <p className="font-medium">Payment submitted</p>
            <p className="text-sm mt-1">
              Your backend returned: {successInfo?.message || "success"}
            </p>
          </div>
        )}

        {/* Security Note */}
        <div className="flex items-center gap-2 mt-6 text-sm text-gray-500">
          <FaLock className="text-green-600" />
          <span>Secured by CommBank PowerBoard</span>
        </div>
      </div>
    </div>
  );
};

export default PaynowPage;
