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
            className={`rounded-xl shadow-sm p-5 flex justify-between items-center border ${borderColor} ${bgColor}`}
        >
            <div>
                <p className="text-sm text-gray-600 font-semibold">{title}</p>

                <h2 className={`text-3xl font-bold ${textColor}`}>
                    {value}
                    {subtitle && (
                        <span className="text-base ml-1">{subtitle}</span>
                    )}
                </h2>
            </div>

            {icon && <div className={`text-3xl ${iconColor}`}>{icon}</div>}
        </div>
    );
}
