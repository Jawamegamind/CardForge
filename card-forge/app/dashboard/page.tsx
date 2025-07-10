export default function Dashboard() {
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="flex flex-col gap-4 rounded-box bg-base-200 p-6 max-w-md">
                <h1 className="text-3xl font-bold self-center">Dashboard</h1>
                <p className="text-base-content/70 text-sm text-center">
                    Welcome to your dashboard! Here you can manage your business cards and settings.
                </p>
            </div>
        </div>
    )
}