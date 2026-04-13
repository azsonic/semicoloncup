'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface IntiveTileProps {
  icon: React.ReactNode;
  title: string;
  value?: string | number;
  subtitle?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'success' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export function IntiveTile({
  icon,
  title,
  value,
  subtitle,
  href,
  onClick,
  variant = 'default',
  size = 'md',
  children,
}: IntiveTileProps) {
  const variantStyles = {
    default: 'bg-[#0f0f0f] border-[#333333] hover:border-[#007fd1]',
    primary: 'bg-[#007fd1]/10 border-[#007fd1] hover:border-[#007fd1]',
    success: 'bg-[#00D68F]/10 border-[#00D68F] hover:border-[#00D68F]',
    accent: 'bg-gradient-to-br from-[#0f0f0f] to-[#007fd1]/20 border-[#007fd1]/50 hover:border-[#007fd1]',
  };

  const sizeStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const Component = href ? motion.a : motion.div;

  return (
    <Component
      href={href}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5,
        boxShadow: variant === 'primary' 
          ? '0 20px 40px rgba(0, 127, 209, 0.3)' 
          : variant === 'success'
          ? '0 20px 40px rgba(0, 214, 143, 0.3)'
          : '0 20px 40px rgba(0, 0, 0, 0.5)'
      }}
      className={`
        relative overflow-hidden rounded-2xl border-2
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        transition-all duration-300 cursor-pointer
      `}
    >
      {/* Geometric Pattern Background */}
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Diagonal lines pattern */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`line-${i}`}
              x1={100 - i * 12}
              y1="0"
              x2="100"
              y2={i * 12}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-white"
            />
          ))}
          {/* Grid pattern */}
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={`grid-${i}`}>
              <line
                x1={50 + i * 8}
                y1="50"
                x2={50 + i * 8}
                y2="100"
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-white"
              />
              <line
                x1="50"
                y1={50 + i * 8}
                x2="100"
                y2={50 + i * 8}
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-white"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm">
            <div className="text-white [&>svg]:w-6 [&>svg]:h-6">
              {icon}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white font-semibold text-lg mb-2">
          {title}
        </h3>

        {/* Value (if provided) */}
        {value !== undefined && (
          <div className="text-4xl font-bold text-white mb-2">
            {value}
          </div>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="text-gray-400 text-sm">
            {subtitle}
          </p>
        )}

        {/* Custom children content */}
        {children}
      </div>
    </Component>
  );
}

// Specialized StatCard variant
export function IntiveStatCard({
  icon,
  label,
  value,
  subtitle,
  color = 'default',
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle: string;
  color?: 'blue' | 'green' | 'purple' | 'yellow' | 'default';
}) {
  const colorStyles = {
    blue: 'from-[#007fd1]',
    green: 'from-[#00D68F]',
    purple: 'from-purple-500',
    yellow: 'from-[#fbbf24]',
    default: 'from-gray-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
      }}
      className="relative overflow-hidden bg-[#0f0f0f] border-2 border-[#333333] rounded-2xl p-6 hover:border-[#007fd1] transition-all duration-300"
    >
      {/* Geometric Pattern Background */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={i}
              x1={100 - i * 10}
              y1="0"
              x2="100"
              y2={i * 10}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-white"
            />
          ))}
        </svg>
      </div>

      {/* Icon with gradient */}
      <div className={`relative z-10 inline-flex items-center justify-center bg-gradient-to-br ${colorStyles[color]} to-transparent p-3 rounded-xl mb-3`}>
        <div className="text-white [&>svg]:w-6 [&>svg]:h-6">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="text-sm text-gray-400 mb-1">{label}</div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
    </motion.div>
  );
}

// Feature tile for landing/marketing pages
export function IntiveFeatureTile({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 25px 50px rgba(0, 127, 209, 0.2)'
      }}
      className="relative overflow-hidden bg-[#0f0f0f] border-2 border-[#333333] rounded-2xl p-8 hover:border-[#007fd1] transition-all duration-300 group"
    >
      {/* Animated Geometric Pattern */}
      <div className="absolute bottom-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.line
              key={`line-${i}`}
              x1={100 - i * 12}
              y1="0"
              x2="100"
              y2={i * 12}
              stroke="currentColor"
              strokeWidth="0.5"
                className="text-[#007fd1]"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={`grid-${i}`}>
              <line
                x1={50 + i * 8}
                y1="50"
                x2={50 + i * 8}
                y2="100"
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-[#00D68F]"
              />
              <line
                x1="50"
                y1={50 + i * 8}
                x2="100"
                y2={50 + i * 8}
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-[#00D68F]"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Icon */}
      <div className="relative z-10 mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-[#007fd1] to-[#00D68F] p-[2px]">
          <div className="w-full h-full bg-[#0f0f0f] rounded-xl flex items-center justify-center">
            <div className="text-white [&>svg]:w-8 [&>svg]:h-8">
              {icon}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-white font-bold text-xl mb-3">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
