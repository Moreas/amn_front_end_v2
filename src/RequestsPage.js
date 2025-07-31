import React, { useState, useMemo } from 'react';
import { 
  Plus,
  ChevronDown,
  ChevronUp,
  Search,
  Phone,
  Mail,
  MessageSquare,
  User,
  Clock,
  Star,
  Eye,
  CheckCircle
} from 'lucide-react';

// Sample requests data (aggregating messages, calls, and leads)
const requestsData = [
  // Messages
  {
    id: 1,
    type: 'message',
    source: 'Website Contact Form',
    contact: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    location: 'Tampa Area',
    subject: 'Inquiry about mobile nail services',
    content: 'Hi, I\'m interested in booking a mobile nail service for my mother who lives in an assisted living facility. Can you provide more information about your services and pricing?',
    status: 'new',
    priority: 'high',
    assignedTo: 'Jade',
    createdAt: '2025-08-15 09:30:00',
    lastActivity: '2025-08-15 09:30:00',
    tags: ['new client', 'assisted living', 'pricing inquiry']
  },
  {
    id: 2,
    type: 'message',
    source: 'Facebook Messenger',
    contact: 'Maria Rodriguez',
    email: 'maria.rodriguez@email.com',
    phone: '(555) 234-5678',
    location: 'Orlando Area',
    subject: 'Booking request for next week',
    content: 'I would like to book a nail appointment for next Tuesday. Do you have availability in the afternoon?',
    status: 'in_progress',
    priority: 'medium',
    assignedTo: 'Amber',
    createdAt: '2025-08-14 14:15:00',
    lastActivity: '2025-08-15 10:45:00',
    tags: ['booking', 'existing client', 'scheduling']
  },
  {
    id: 3,
    type: 'message',
    source: 'Instagram DM',
    contact: 'Jennifer Smith',
    email: 'jennifer.smith@email.com',
    phone: '(555) 345-6789',
    location: 'Jacksonville Area',
    subject: 'Question about gel manicures',
    content: 'Do you offer gel manicures? I\'m looking for something that lasts longer than regular polish.',
    status: 'resolved',
    priority: 'low',
    assignedTo: 'Silvia',
    createdAt: '2025-08-13 16:20:00',
    lastActivity: '2025-08-14 11:30:00',
    tags: ['service inquiry', 'gel manicure', 'resolved']
  },
  // Phone Calls
  {
    id: 4,
    type: 'call',
    source: 'Incoming Call',
    contact: 'Lisa Chen',
    email: 'lisa.chen@email.com',
    phone: '(555) 456-7890',
    location: 'West Palm Beach Area',
    subject: 'Phone inquiry about services',
    content: 'Customer called to ask about pricing for pedicures and whether we travel to their area. Call duration: 8 minutes.',
    status: 'new',
    priority: 'high',
    assignedTo: 'Jade',
    createdAt: '2025-08-15 11:00:00',
    lastActivity: '2025-08-15 11:08:00',
    tags: ['phone call', 'pricing inquiry', 'service area']
  },
  {
    id: 5,
    type: 'call',
    source: 'Outgoing Call',
    contact: 'Amanda Wilson',
    email: 'amanda.wilson@email.com',
    phone: '(555) 567-8901',
    location: 'Tampa Area',
    subject: 'Follow-up call for appointment',
    content: 'Called to confirm tomorrow\'s appointment and discuss any special requirements. Call duration: 5 minutes.',
    status: 'completed',
    priority: 'medium',
    assignedTo: 'Amber',
    createdAt: '2025-08-15 10:00:00',
    lastActivity: '2025-08-15 10:05:00',
    tags: ['follow-up', 'appointment confirmation', 'completed']
  },
  {
    id: 6,
    type: 'call',
    source: 'Missed Call',
    contact: 'Rachel Brown',
    email: 'rachel.brown@email.com',
    phone: '(555) 678-9012',
    location: 'Orlando Area',
    subject: 'Missed call - needs callback',
    content: 'Customer called but no answer. Left voicemail requesting callback about rescheduling appointment.',
    status: 'pending',
    priority: 'high',
    assignedTo: 'Silvia',
    createdAt: '2025-08-15 08:45:00',
    lastActivity: '2025-08-15 08:45:00',
    tags: ['missed call', 'callback needed', 'rescheduling']
  },
  // Leads
  {
    id: 7,
    type: 'lead',
    source: 'Google Ads',
    contact: 'Jessica Davis',
    email: 'jessica.davis@email.com',
    phone: '(555) 789-0123',
    location: 'Fort Myers Area',
    subject: 'New lead from Google Ads',
    content: 'Customer clicked on Google Ad for "mobile nail services" and filled out contact form. Interested in booking for elderly parent.',
    status: 'new',
    priority: 'high',
    assignedTo: 'Jade',
    createdAt: '2025-08-15 12:30:00',
    lastActivity: '2025-08-15 12:30:00',
    tags: ['google ads', 'new lead', 'elderly care', 'assisted living']
  },
  {
    id: 8,
    type: 'lead',
    source: 'Referral',
    contact: 'Nicole Taylor',
    email: 'nicole.taylor@email.com',
    phone: '(555) 890-1234',
    location: 'Jacksonville Area',
    subject: 'Referral from existing client',
    content: 'Referred by Sarah Johnson. Interested in regular nail services for herself and occasional services for her mother.',
    status: 'contacted',
    priority: 'medium',
    assignedTo: 'Amber',
    createdAt: '2025-08-14 15:20:00',
    lastActivity: '2025-08-15 09:15:00',
    tags: ['referral', 'existing client', 'regular service']
  },
  {
    id: 9,
    type: 'lead',
    source: 'Facebook Lead Ad',
    contact: 'Emily White',
    email: 'emily.white@email.com',
    phone: '(555) 901-2345',
    location: 'Tampa Area',
    subject: 'Facebook lead ad conversion',
    content: 'Customer engaged with Facebook lead ad for "luxury mobile nail services". Interested in premium services.',
    status: 'qualified',
    priority: 'high',
    assignedTo: 'Silvia',
    createdAt: '2025-08-14 18:45:00',
    lastActivity: '2025-08-15 14:20:00',
    tags: ['facebook ads', 'luxury services', 'qualified lead']
  },
  {
    id: 10,
    type: 'lead',
    source: 'Website',
    contact: 'Ashley Garcia',
    email: 'ashley.garcia@email.com',
    phone: '(555) 012-3456',
    location: 'Orlando Area',
    subject: 'Website lead - service inquiry',
    content: 'Customer visited website and filled out contact form. Interested in bridal party services for upcoming wedding.',
    status: 'new',
    priority: 'high',
    assignedTo: 'Jade',
    createdAt: '2025-08-15 13:15:00',
    lastActivity: '2025-08-15 13:15:00',
    tags: ['website', 'bridal services', 'wedding', 'group booking']
  },
  {
    id: 11,
    type: 'message',
    source: 'Email',
    contact: 'Michelle Lee',
    email: 'michelle.lee@email.com',
    phone: '(555) 123-4568',
    location: 'West Palm Beach Area',
    subject: 'Corporate event inquiry',
    content: 'I\'m organizing a corporate wellness event and would like to know if you offer on-site nail services for employees.',
    status: 'in_progress',
    priority: 'high',
    assignedTo: 'Amber',
    createdAt: '2025-08-14 10:30:00',
    lastActivity: '2025-08-15 16:45:00',
    tags: ['corporate', 'wellness event', 'on-site services', 'group booking']
  },
  {
    id: 12,
    type: 'call',
    source: 'Incoming Call',
    contact: 'Stephanie Kim',
    email: 'stephanie.kim@email.com',
    phone: '(555) 234-5679',
    location: 'Fort Myers Area',
    subject: 'Emergency appointment request',
    content: 'Customer needs urgent nail repair for important meeting tomorrow. Call duration: 12 minutes.',
    status: 'urgent',
    priority: 'high',
    assignedTo: 'Silvia',
    createdAt: '2025-08-15 17:00:00',
    lastActivity: '2025-08-15 17:12:00',
    tags: ['emergency', 'urgent', 'nail repair', 'same day']
  }
];

function RequestsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assignedToFilter, setAssignedToFilter] = useState('all');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const itemsPerPage = 10;

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = requestsData.filter(request => {
      const matchesSearch = 
        request.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === 'all' || request.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
      const matchesAssignedTo = assignedToFilter === 'all' || request.assignedTo === assignedToFilter;
      
      const matchesTab = activeTab === 'all' || request.type === activeTab;
      
      return matchesSearch && matchesType && matchesStatus && matchesPriority && matchesAssignedTo && matchesTab;
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'createdAt' || sortField === 'lastActivity') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, typeFilter, statusFilter, priorityFilter, assignedToFilter, activeTab, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'contacted': return 'bg-purple-100 text-purple-700';
      case 'qualified': return 'bg-indigo-100 text-indigo-700';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'message': return <Mail className="w-4 h-4" />;
      case 'call': return <Phone className="w-4 h-4" />;
      case 'lead': return <User className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'message': return 'text-blue-600';
      case 'call': return 'text-green-600';
      case 'lead': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };



  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate statistics
  const totalRequests = requestsData.length;
  const newRequests = requestsData.filter(r => r.status === 'new').length;
  const urgentRequests = requestsData.filter(r => r.priority === 'high').length;
  const resolvedRequests = requestsData.filter(r => r.status === 'resolved' || r.status === 'completed').length;

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">REQUESTS</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Requests</p>
              <p className="text-2xl font-bold text-gray-800">{totalRequests}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-red-800" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">New Requests</p>
              <p className="text-2xl font-bold text-blue-600">{newRequests}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Urgent</p>
              <p className="text-2xl font-bold text-red-600">{urgentRequests}</p>
            </div>
            <Star className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Resolved</p>
              <p className="text-2xl font-bold text-green-600">{resolvedRequests}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Requests
            </button>
            <button
              onClick={() => setActiveTab('message')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'message'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Messages
            </button>
            <button
              onClick={() => setActiveTab('call')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'call'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Phone Calls
            </button>
            <button
              onClick={() => setActiveTab('lead')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'lead'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Leads
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
            >
              <option value="all">All Types</option>
              <option value="message">Messages</option>
              <option value="call">Phone Calls</option>
              <option value="lead">Leads</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="resolved">Resolved</option>
              <option value="completed">Completed</option>
              <option value="urgent">Urgent</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              value={assignedToFilter}
              onChange={(e) => setAssignedToFilter(e.target.value)}
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
            >
              <option value="all">All Assignees</option>
              <option value="Jade">Jade</option>
              <option value="Amber">Amber</option>
              <option value="Silvia">Silvia</option>
            </select>
          </div>

          {/* Requests Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-yellow-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                    onClick={() => handleSort('contact')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Contact</span>
                      {sortField === 'contact' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Created</span>
                      {sortField === 'createdAt' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      <div className={`flex items-center space-x-2 ${getTypeColor(request.type)}`}>
                        {getTypeIcon(request.type)}
                        <span className="capitalize">{request.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div>
                        <div className="font-medium text-gray-900">{request.contact}</div>
                        <div className="text-gray-500">{request.email}</div>
                        <div className="text-gray-500">{request.phone}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div>
                        <div className="font-medium text-gray-900">{request.subject}</div>
                        <div className="text-gray-500 truncate max-w-xs">{request.content}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{request.source}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{request.assignedTo}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatDate(request.createdAt)}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Phone className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                      <span className="font-medium">{Math.min(endIndex, filteredAndSortedData.length)}</span> of{' '}
                      <span className="font-medium">{filteredAndSortedData.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === pageNum
                                ? 'z-10 bg-red-50 border-red-500 text-red-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-800 rounded-full flex items-center justify-center shadow-lg hover:bg-red-900 transition-colors">
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}

export default RequestsPage; 