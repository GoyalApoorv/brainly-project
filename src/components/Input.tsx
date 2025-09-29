
    export function Input({placeholder, ref}: {placeholder: string; ref: any}) {
    return <div>
        <input type="text" placeholder={placeholder} ref={ref}className="px-4 py-2 hover:cursor-text m-1 border border-gray-400 rounded-md w-80"/>
    </div>
}