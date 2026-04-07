import { MAX_RECONNECT } from "@/configs";
import { useAppSelector } from "@/store/hook";

const SocketStatus = () => {
  const { status, reconnectAttempts } = useAppSelector(
    (state) => state.priceBoard.data,
  );

  let txtColor = "text-gray-400";
  let text = "Disconnected";
  let animate = false;

  switch (status) {
    case "open":
      txtColor = "text-green-400";
      text = "Connected";
      animate = true;
      break;
    case "connecting":
      txtColor = "text-yellow-400";
      text = "Connecting...";
      animate = true;
      break;
    case "reconnecting":
      txtColor = "text-orange-400";
      text = `Reconnecting (${reconnectAttempts}/${MAX_RECONNECT})`;
      animate = true;
      break;
    case "error":
      txtColor = "text-red-400";
      text = "Error";
      animate = false;
      break;
    case "closed":
      txtColor = "text-red-400";
      text = "Disconnected";
      animate = false;
      break;
    default:
      txtColor = "text-red-400";
      text = "Unknown";
      animate = false;
  }

  return (
    <span
      className='flex flex-row items-center gap-1'
    >
      <span className={`text-xs font-medium ${txtColor} ${animate ? "animate-pulse" : ""}`}>{text}</span>
    </span>
  );
};

export default SocketStatus;
