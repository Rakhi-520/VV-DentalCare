import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function CancelAppointmentPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [detail, setDetail] = useState("");

  const id = searchParams.get("id");
  const token = searchParams.get("token");

  useEffect(() => {
    async function run() {
      if (!id || !token) {
        setStatus("invalid");
        setDetail("Missing id or token in the link.");
        return;
      }

      const localKey = `cancelled:${id}`;
      if (localStorage.getItem(localKey)) {
        setStatus("already");
        setDetail("This cancellation link was already used on this device.");
        return;
      }

      try {
        await axios.post(`/api/appointments/${id}/cancel`, { token });
      
        localStorage.setItem(localKey, "1");
        setStatus("success");
        setDetail("Your appointment has been cancelled successfully.");
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Something went wrong.";

       
        if (msg.includes("already paid")) {
          setStatus("paid");
          setDetail(
            "Payment is completed for this appointment. To cancel, please contact the clinic."
          );
        } else if (msg.includes("Invalid token")) {
          setStatus("invalid");
          setDetail("This cancellation link is invalid or has expired.");
        } else if (msg.includes("Appointment not found")) {
          setStatus("notfound");
          setDetail("We couldn't find this appointment. It may have been removed.");
        } else if (msg.includes("already cancelled")) {
          
          localStorage.setItem(localKey, "1");
          setStatus("already");
          setDetail("This appointment has already been cancelled.");
        } else {
          setStatus("error");
          setDetail(msg);
        }
      }
    }

    run();
  }, [id, token]);

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      {status === "loading" && <p>Cancelling your appointment…</p>}
      {status === "success" && (
        <p className="text-green-600 font-semibold">{detail}</p>
      )}
      {status === "already" && (
        <p className="text-amber-600 font-semibold">{detail}</p>
      )}
      {status === "paid" && (
        <p className="text-amber-700 font-semibold">{detail}</p>
      )}
      {status === "invalid" && (
        <p className="text-red-600 font-semibold">{detail}</p>
      )}
      {status === "notfound" && (
        <p className="text-red-600 font-semibold">{detail}</p>
      )}
      {status === "error" && (
        <p className="text-red-600 font-semibold">
          We couldn't process the cancellation. {detail}
        </p>
      )}
    </div>
  );
}
