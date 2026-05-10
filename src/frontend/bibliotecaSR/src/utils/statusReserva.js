import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock,
  XCircle
} from "lucide-react-native";

export const statusReserva = {
  0: { label: "Em Análise", color: "#E29578", icon: Clock },
  1: { label: "Cancelada", color: "#E63946", icon: XCircle },
  2: { label: "Aguardando Retirada", color: "#006D77", icon: CheckCircle2 },
  3: { label: "Não Efetivada", color: "#8D99AE", icon: AlertTriangle },
  4: { label: "Desistência", color: "#E67E22", icon: XCircle },
  5: { label: "Concluída", color: "#2B2D42", icon: BookOpen },
};