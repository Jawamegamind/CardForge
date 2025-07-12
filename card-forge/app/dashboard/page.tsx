'use client'

import Navbar from "../_components/navbar"
import CreateCardForm from "../_components/createCardForm"
import Link from "next/link"

export default function Dashboard() {
    // Function for modal pop up trigger
    function modalTrigger() {
        (document.getElementById('create_card_modal') as HTMLDialogElement)?.showModal()
    }

    return (
        <div className="min-h-screen bg-base-200">
            <Navbar />
            
            {/* Main Dashboard Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-base-content mb-2">Welcome back!</h1>
                    <p className="text-base-content/70">Manage your business cards and create new ones with ease.</p>
                </div>

                {/* Quick Stats */}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="stat bg-base-100 rounded-box shadow">
                        <div className="stat-figure text-primary">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 001-4V5z" />
                            </svg>
                        </div>
                        <div className="stat-title">Total Cards</div>
                        <div className="stat-value text-primary">3</div>
                        <div className="stat-desc">2 active templates</div>
                    </div>
                    
                    <div className="stat bg-base-100 rounded-box shadow">
                        <div className="stat-figure text-secondary">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <div className="stat-title">Views This Month</div>
                        <div className="stat-value text-secondary">127</div>
                        <div className="stat-desc">↗︎ 12% (22)</div>
                    </div>
                    
                    <div className="stat bg-base-100 rounded-box shadow">
                        <div className="stat-figure text-accent">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                        </div>
                        <div className="stat-title">Shares</div>
                        <div className="stat-value text-accent">42</div>
                        <div className="stat-desc">This month</div>
                    </div>
                </div> */}

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* My Business Cards */}
                    <div className="lg:col-span-2">
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="card-title text-2xl">My Business Cards</h2>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={modalTrigger}
                                        >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        New Card
                                    </button>
                                </div>
                                
                                {/* Business Cards Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Card 1 */}
                                    <div className="card card-compact bg-gradient-to-br from-primary to-primary-focus text-primary-content shadow-md">
                                        <div className="card-body">
                                            <h3 className="font-bold text-lg">John Doe</h3>
                                            <p className="text-sm opacity-90">Software Engineer</p>
                                            <p className="text-sm opacity-90">TechCorp Inc.</p>
                                            <div className="card-actions justify-end mt-2">
                                                <button className="btn btn-sm btn-ghost">Edit</button>
                                                <button className="btn btn-sm btn-ghost">Share</button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Card 2 */}
                                    <div className="card card-compact bg-gradient-to-br from-secondary to-secondary-focus text-secondary-content shadow-md">
                                        <div className="card-body">
                                            <h3 className="font-bold text-lg">Jane Smith</h3>
                                            <p className="text-sm opacity-90">Marketing Director</p>
                                            <p className="text-sm opacity-90">Creative Agency</p>
                                            <div className="card-actions justify-end mt-2">
                                                <button className="btn btn-sm btn-ghost">Edit</button>
                                                <button className="btn btn-sm btn-ghost">Share</button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Card 3 */}
                                    <div className="card card-compact bg-gradient-to-br from-accent to-accent-focus text-accent-content shadow-md">
                                        <div className="card-body">
                                            <h3 className="font-bold text-lg">Alex Johnson</h3>
                                            <p className="text-sm opacity-90">Freelance Designer</p>
                                            <p className="text-sm opacity-90">Independent</p>
                                            <div className="card-actions justify-end mt-2">
                                                <button className="btn btn-sm btn-ghost">Edit</button>
                                                <button className="btn btn-sm btn-ghost">Share</button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Add New Card */}
                                    <div className="card card-compact bg-base-200 border-2 border-dashed border-base-300 hover:border-primary hover:bg-base-300 transition-all cursor-pointer">
                                        <div className="card-body items-center justify-center">
                                            <svg className="w-12 h-12 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            <p className="text-base-content/70">Create New Card</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h3 className="card-title mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <button 
                                    onClick={modalTrigger} 
                                    className="btn btn-outline btn-block justify-start">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Create New Card
                                    </button>
                                    <button className="btn btn-outline btn-block justify-start">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                        Import Template
                                    </button>
                                    <button className="btn btn-outline btn-block justify-start">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Manage Templates
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h3 className="card-title mb-4">Recent Activity</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar placeholder">
                                            <div className="bg-primary text-primary-content rounded-full w-8">
                                                <span className="text-xs">JD</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm">Card "John Doe" was viewed</p>
                                            <p className="text-xs text-base-content/70">2 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar placeholder">
                                            <div className="bg-secondary text-secondary-content rounded-full w-8">
                                                <span className="text-xs">JS</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm">Card "Jane Smith" was shared</p>
                                            <p className="text-xs text-base-content/70">1 day ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar placeholder">
                                            <div className="bg-accent text-accent-content rounded-full w-8">
                                                <span className="text-xs">AJ</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm">New card "Alex Johnson" created</p>
                                            <p className="text-xs text-base-content/70">3 days ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Quick View */}
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h3 className="card-title mb-4">Profile</h3>
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="avatar placeholder">
                                        <div className="bg-primary text-primary-content rounded-full w-12">
                                            <span>U</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold">User Name</p>
                                        <p className="text-sm text-base-content/70">user@example.com</p>
                                    </div>
                                </div>
                                <button className="btn btn-outline btn-sm btn-block">Edit Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <dialog id="create_card_modal" className="modal">
                <div className="modal-box max-w-5xl w-full">
                    <h3 className="text-2xl font-bold mb-4">Create Business Card</h3>

                    <CreateCardForm />

                    <div className="modal-action mt-6">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}