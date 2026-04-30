export default function StatCard({
    title,
    value,
    subtitle,
    icon,
    bgColor = "bg-white",
    textColor = "text-gray-800",
    borderColor = "border-gray-200",
    iconColor = "text-gray-600",
}) {
    return (
        <div
            className={`rounded-lg shadow-sm p-3 flex justify-between items-center border w-[160px] ${borderColor} ${bgColor}`}
        >
            <div>
                <p className="text-xs text-gray-500 font-medium">{title}</p>

                <h2 className={`text-xl font-bold ${textColor}`}>
                    {value}
                    {subtitle && (
                        <span className="text-xs ml-1">{subtitle}</span>
                    )}
                </h2>
            </div>

            {icon && <div className={`text-xl ${iconColor}`}>{icon}</div>}
        </div>
    );
}
