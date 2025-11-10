import { useState, useEffect } from 'react';
import '../App.css';
import Button from '../components/Button';
import { Card } from '../components/Card';
import { CreateContentModal } from '../components/CreateContentModal';
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Sidebar } from '../components/Sidebar';
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Header } from '../components/Header'; 
import { ContentType } from '../components/CreateContentModal';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [user, setUser] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
                });
                setUser(response.data.user);
            } catch (error) {
                console.error("Failed to fetch user", error);
                navigate("/signin"); // Redirect if token is invalid
            }
        };
        fetchUser();
    }, [navigate]);

    const { contents, addContent, addFileContent, handleDelete } = useContent();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    // Filtering logic based on the activeFilter state
    const filteredContent = contents.filter(card => 
      activeFilter === 'all' || card.type.toLowerCase() === activeFilter.toLowerCase()
    );

    const onAddContentSubmit = async (data: { title: string; link?: string; file?: File | null; type: ContentType; }) => {
    setIsAdding(true);

    if (data.type === ContentType.Document) {
        // Handle file-based content
        if (data.file) {
            await addFileContent({ title: data.title, file: data.file, type: data.type });
        } else {
            console.error("Error: File is missing for document type.");
        }
    } else {
        // Handle link-based content
        if (data.link) {
            await addContent({ title: data.title, link: data.link, type: data.type });
        } else {
            console.error("Error: Link is missing for link-based content type.");
        }
    }

    setIsAdding(false);
    setModalOpen(false);
};

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar isOpen={isSidebarOpen} activeFilter={activeFilter} onFilterChange={setActiveFilter} />

            {/* Wrapper for Header and main content */}
            <div className={`
                flex-1 flex flex-col
                transition-all duration-300 ease-in-out
                ${isSidebarOpen ? 'ml-72' : 'ml-0'}
            `}>
                <Header onToggleSidebar={toggleSidebar} isOpen={isSidebarOpen} user={user} onSignOut={handleSignOut} />

                {/* Main content area */}
                <main className="flex-1 p-4">
                    <div className='flex justify-end gap-4'>
                        <Button  
                            onClick={() => setModalOpen(true)} 
                            variant={"primary"} 
                            startIcon={<PlusIcon size='md' />} 
                            size={"md"} 
                            title='Add content' 
                            fullWidth={false}
                        />
                        <Button 
                            variant={"secondary"} 
                            onClick={async () => { await axios.post(`${BACKEND_URL}/api/v1/brain/share`) }} 
                            startIcon={<ShareIcon size='md' />} 
                            size={'md'} 
                            title={'Share brain'}
                            fullWidth={false} 
                        />
                    </div>

                    <div className='flex gap-4 flex-wrap pt-2'>
                        {filteredContent.map((card) => (
                            <Card
                                key={card._id}
                                type={card.type as "tweet" | "youtube" | "document"}
                                link={card.link}
                                title={card.title} contentId={card._id}
                                onDelete={() => handleDelete(card._id)}
                            />
                        ))}
                    </div>
                </main>
            </div>

            <CreateContentModal 
                open={modalOpen} 
                onClose={() => setModalOpen(false)} 
                onContentAdd={onAddContentSubmit}
                isAdding={isAdding} 
            />
        </div>
    );
}