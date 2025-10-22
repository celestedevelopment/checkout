'use client';

import { useState } from 'react';

interface Contact {
  id: string;
  name: string;
  email: string;
  paymentDetails: string;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Vegasmore',
    email: 'martian@vegasmore.com',
    paymentDetails: ''
  }
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);

  return (
    <div className="h-full bg-white">
      {/* Table Header */}
      <div className="grid grid-cols-3 gap-8 px-8 py-4 border-b border-gray-100 text-sm font-medium text-gray-500">
        <div>Name</div>
        <div>Email</div>
        <div>Payment details</div>
      </div>

      {/* Table Content */}
      <div className="px-8">
        {contacts.map((contact) => (
          <div key={contact.id} className="grid grid-cols-3 gap-8 py-6 border-b border-gray-50 last:border-b-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {contact.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-gray-900 font-medium">{contact.name}</span>
            </div>
            <div className="text-gray-600">{contact.email}</div>
            <div className="text-gray-400">{contact.paymentDetails || '-'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}