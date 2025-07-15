'use client'

import { useEffect, useState } from "react"
import Navbar from "../_components/navbar"
import CreateCardForm from "../_components/createCardForm"
import { createClient } from "@/utils/supabase/client"

interface BusinessCard {
  id: string
  name: string
  title: string
  company: string
  phone: string
  email: string
  website: string
  address: string
  logo_text: string
  template: string
  created_at: string
}

export default function Dashboard() {
    const [cards, setCards] = useState<BusinessCard[]>([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    const [userTable, setUserTable] = useState<any>(null)
    const supabase = createClient()

    // Function for modal pop up trigger
    function modalTrigger() {
        (document.getElementById('create_card_modal') as HTMLDialogElement)?.showModal()
    }

    // Function to close modal
    function closeModal() {
        (document.getElementById('create_card_modal') as HTMLDialogElement)?.close()
    }

    // Fetch user and cards
    const fetchCards = async () => {
        try {
            const { data: { user }, error: userError } = await supabase.auth.getUser()
            
            if (userError || !user) {
                console.error('User not authenticated:', userError)
                return
            }

            setUser(user)

            // Fetch user details from the users table using the UID from supabase auth
            const { data: userData, error: userTableError } = await supabase
                .from('users')
                .select('*')
                .eq('user_id', user.id)
                .single()
            
            if (userTableError) {
                console.error('Error fetching user details:', userTableError)
                return
            }

            setUserTable(userData)

            const { data, error } = await supabase
                .from('business_cards')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error fetching cards:', error)
                return
            }

            setCards(data || [])
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    // Handle successful card save
    const handleSaveSuccess = () => {
        fetchCards() // Refresh the cards list
        closeModal() // Close the modal
    }

    useEffect(() => {
        fetchCards()
    }, [])

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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="stat bg-base-100 rounded-box shadow">
                        <div className="stat-figure text-primary">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 001-4V5z" />
                            </svg>
                        </div>
                        <div className="stat-title">Total Cards</div>
                        <div className="stat-value text-primary">{loading ? '...' : cards.length}</div>
                        <div className="stat-desc">{cards.length === 1 ? '1 card created' : `${cards.length} cards created`}</div>
                    </div>
                    
                    <div className="stat bg-base-100 rounded-box shadow">
                        <div className="stat-figure text-secondary">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="stat-title">Last Created</div>
                        <div className="stat-value text-secondary">{
                            loading ? '...' : 
                            cards.length > 0 ? 
                                new Date(cards[0].created_at).toLocaleDateString() : 
                                'None'
                        }</div>
                        <div className="stat-desc">{
                            cards.length > 0 ? 
                                `${cards[0]?.name || 'Unknown'}` : 
                                'Create your first card'
                        }</div>
                    </div>
                    
                    <div className="stat bg-base-100 rounded-box shadow">
                        <div className="stat-figure text-accent">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        </div>
                        <div className="stat-title">Templates</div>
                        <div className="stat-value text-accent">1</div>
                        <div className="stat-desc">Modern template active</div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* My Business Cards */}
                    <div className="lg:col-span-2">
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="card-title text-2xl">My Business Cards</h2>
                                    <div className="flex gap-2">
                                        <button
                                            className="btn btn-ghost btn-sm"
                                            onClick={fetchCards}
                                            disabled={loading}
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            {loading ? 'Loading...' : 'Refresh'}
                                        </button>
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
                                </div>
                                
                                {/* Business Cards Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {loading ? (
                                        // Loading skeleton
                                        <>
                                            {[...Array(4)].map((_, i) => (
                                                <div key={i} className="card card-compact bg-base-100 shadow-md">
                                                    <div className="card-body">
                                                        <div className="animate-pulse space-y-2">
                                                            <div className="h-4 bg-base-300 rounded w-3/4"></div>
                                                            <div className="h-3 bg-base-300 rounded w-1/2"></div>
                                                            <div className="h-3 bg-base-300 rounded w-2/3"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    ) : cards.length > 0 ? (
                                        // Display actual cards
                                        cards.map((card, index) => (
                                            <div key={card.id} className={`card card-compact shadow-md text-white ${
                                                index % 3 === 0 ? 'bg-gradient-to-br from-primary to-primary-focus' :
                                                index % 3 === 1 ? 'bg-gradient-to-br from-secondary to-secondary-focus' :
                                                'bg-gradient-to-br from-accent to-accent-focus'
                                            }`}>
                                                <div className="card-body">
                                                    <h3 className="font-bold text-lg">{card.name}</h3>
                                                    <p className="text-sm opacity-90">{card.title}</p>
                                                    <p className="text-sm opacity-90">{card.company}</p>
                                                    <p className="text-xs opacity-75">{card.email}</p>
                                                    <div className="card-actions justify-end mt-2">
                                                        <button className="btn btn-sm btn-ghost hover:bg-white/20">Edit</button>
                                                        <button className="btn btn-sm btn-ghost hover:bg-white/20">Share</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        // Empty state
                                        <div className="col-span-full text-center py-12">
                                            <svg className="w-16 h-16 text-base-content/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 001-4V5z" />
                                            </svg>
                                            <h3 className="text-lg font-semibold text-base-content/70 mb-2">No business cards yet</h3>
                                            <p className="text-base-content/50 mb-4">Create your first business card to get started</p>
                                            <button
                                                className="btn btn-primary"
                                                onClick={modalTrigger}
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                Create Your First Card
                                            </button>
                                        </div>
                                    )}
                                    
                                    {/* Add New Card - only show if there are existing cards */}
                                    {cards.length > 0 && (
                                        <div 
                                            className="card card-compact bg-base-200 border-2 border-dashed border-base-300 hover:border-primary hover:bg-base-300 transition-all cursor-pointer"
                                            onClick={modalTrigger}
                                        >
                                            <div className="card-body items-center justify-center">
                                                <svg className="w-12 h-12 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                <p className="text-base-content/70">Create New Card</p>
                                            </div>
                                        </div>
                                    )}
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
                                    {cards.length > 0 ? (
                                        cards.slice(0, 3).map((card) => (
                                            <div key={card.id} className="flex items-center space-x-3">
                                                <div className="avatar placeholder">
                                                    <div className="bg-primary text-primary-content rounded-full w-8">
                                                        <span className="text-xs">{card.logo_text || card.name.charAt(0)}</span>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm">Card "{card.name}" was created</p>
                                                    <p className="text-xs text-base-content/70">
                                                        {new Date(card.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-4">
                                            <p className="text-sm text-base-content/70">No activity yet</p>
                                            <p className="text-xs text-base-content/50">Create a card to see activity here</p>
                                        </div>
                                    )}
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
                                            <span>{user?.email?.charAt(0).toUpperCase() || 'U'}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold">{userTable?.full_name || 'User'}</p>
                                        <p className="text-sm text-base-content/70">{userTable?.email || 'user@example.com'}</p>
                                    </div>
                                </div>
                                <button className="btn btn-outline btn-sm btn-block">Edit Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Create Card Modal */}
            <dialog id="create_card_modal" className="modal">
                <div className="modal-box max-w-5xl w-full">
                    <h3 className="text-2xl font-bold mb-4">Create Business Card</h3>

                    <CreateCardForm onSaveSuccess={handleSaveSuccess} />

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