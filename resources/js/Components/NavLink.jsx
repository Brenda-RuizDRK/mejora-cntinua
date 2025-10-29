import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "border-[#249ed3] text-gray-900 focus:border-[#8aceef]"
                    : "border-transparent text-[#164764] hover:border-gray-300 hover:text-gray-800 focus:border-gray-500 focus:text-gray-700") +
                className
            }
        >
            {children}
        </Link>
    );
}
