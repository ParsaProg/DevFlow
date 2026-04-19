import { CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export const ShowSuccessAlert = ({
  content,
  minWidth,
}: {
  content: string;
  minWidth?: string;
}) =>
  toast(content, {
    duration: 3000,
    position: "top-center",
    icon: <CheckCircle2 className="text-green-400 p-0 ml-2" />,
    className: "animate-slide-up",
    style: {
      borderRadius: "5px",
      fontSize: "15px",
      background: "white",
      color: "#404040",
      minWidth: minWidth || "380px",
      textAlign: "center",
      border: "0.1px solid #e1e0e0",
      paddingTop: "8px",
      paddingBottom: "8px",
    },
  });
