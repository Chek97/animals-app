
const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className='bg-blue-950 w-full min-h-screen text-white'>
            {children}
        </div>
    )
}

export default layout