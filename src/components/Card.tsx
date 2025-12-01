import type { ReactNode } from "react";

type GlowColor = "green" | "blue" | "red" | "default";

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  hover?: boolean;
  glowEffect?: boolean;
  glowColor?: GlowColor;
  className?: string;
}

const Card = ({
  children,
  title,
  subtitle,
  icon,
  hover = false,
  glowEffect = false,
  glowColor = "default",
  className,
}: CardProps) => {
  const glowClass =
    glowEffect && glowColor === "green"
      ? "glow-green"
      : glowEffect && glowColor === "blue"
      ? "glow-blue"
      : glowEffect && glowColor === "red"
      ? "glow-red"
      : glowEffect
      ? "glow"
      : "";

  return (
    <div
      className={`
        bg-gray-900 rounded-xl border border-gray-700 shadow-md p-6 transition-all cursor-pointer
        ${hover ? "hover:border-primary-500 hover:shadow-lg hover:-translate-y-0.5" : ""}
        ${glowClass}
        ${className ?? ""}
      `}
    >
      {(title || icon) && (
        <div className="flex items-center space-x-3 mb-4">
          {icon && (
            <div className="p-2 bg-primary-500/10 rounded-lg flex items-center justify-center">
              {icon}
            </div>
          )}

          {(title || subtitle) && (
            <div>
              {title && <h3 className="text-lg font-medium">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
