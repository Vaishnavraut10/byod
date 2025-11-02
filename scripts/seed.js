// ==============================================
// Database Seed Script
// File: /scripts/seed.js
// Run with: npm run seed
// ==============================================

require('dotenv').config();
const mongoose = require('mongoose');
const { Resource } = require('../models');

const seedResources = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing resources
    await Resource.deleteMany({});
    console.log('🗑️  Cleared existing resources');

    // Seed Applications
    const applications = [
      {
        type: 'application',
        name: 'Email',
        description: 'Company email system - Outlook 365',
        category: 'Communication',
        url: 'https://outlook.office.com',
        icon: '📧',
        version: '2024.1',
        isActive: true
      },
      {
        type: 'application',
        name: 'CRM System',
        description: 'Customer Relationship Management',
        category: 'Business',
        url: 'https://crm.company.com',
        icon: '👥',
        version: '5.2.1',
        isActive: true
      },
      {
        type: 'application',
        name: 'Project Manager',
        description: 'Manage projects and tasks',
        category: 'Productivity',
        url: 'https://projects.company.com',
        icon: '📊',
        version: '3.8.0',
        isActive: true
      },
      {
        type: 'application',
        name: 'Team Chat',
        description: 'Internal messaging platform',
        category: 'Communication',
        url: 'https://chat.company.com',
        icon: '💬',
        version: '2.4.5',
        isActive: true
      },
      {
        type: 'application',
        name: 'Calendar',
        description: 'Shared company calendar',
        category: 'Productivity',
        url: 'https://calendar.company.com',
        icon: '📅',
        version: '1.9.2',
        isActive: true
      },
      {
        type: 'application',
        name: 'File Storage',
        description: 'Cloud file storage system',
        category: 'Storage',
        url: 'https://files.company.com',
        icon: '📁',
        version: '4.1.0',
        isActive: true
      },
      {
        type: 'application',
        name: 'Analytics',
        description: 'Business intelligence dashboard',
        category: 'Analytics',
        url: 'https://analytics.company.com',
        icon: '📈',
        version: '2.3.1',
        isActive: true
      },
      {
        type: 'application',
        name: 'HR Portal',
        description: 'Human resources management',
        category: 'HR',
        url: 'https://hr.company.com',
        icon: '👔',
        version: '3.5.2',
        isActive: true
      }
    ];

    // Seed Documents
    const documents = [
      {
        type: 'document',
        name: 'Employee Handbook',
        description: 'Complete guide for all employees',
        category: 'HR',
        file: {
          fileName: 'employee-handbook.pdf',
          originalName: 'Employee Handbook 2024.pdf',
          fileSize: 2457600,
          fileType: 'application/pdf'
        },
        isActive: true
      },
      {
        type: 'document',
        name: 'BYOD Policy',
        description: 'Bring Your Own Device guidelines',
        category: 'Policies',
        file: {
          fileName: 'byod-policy.pdf',
          originalName: 'BYOD Policy.pdf',
          fileSize: 1024000,
          fileType: 'application/pdf'
        },
        isActive: true
      },
      {
        type: 'document',
        name: 'Security Guidelines',
        description: 'Information security best practices',
        category: 'Security',
        file: {
          fileName: 'security-guidelines.pdf',
          originalName: 'Security Guidelines.pdf',
          fileSize: 1536000,
          fileType: 'application/pdf'
        },
        isActive: true
      },
      {
        type: 'document',
        name: 'Onboarding Checklist',
        description: 'New employee onboarding tasks',
        category: 'Training',
        file: {
          fileName: 'onboarding-checklist.pdf',
          originalName: 'Onboarding Checklist.pdf',
          fileSize: 512000,
          fileType: 'application/pdf'
        },
        isActive: true
      },
      {
        type: 'document',
        name: 'Q4 Sales Report',
        description: 'Quarterly sales performance analysis',
        category: 'Sales',
        file: {
          fileName: 'q4-sales-report.xlsx',
          originalName: 'Q4 Sales Report.xlsx',
          fileSize: 3072000,
          fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        },
        isActive: true
      },
      {
        type: 'document',
        name: 'Marketing Strategy 2024',
        description: 'Annual marketing plan and strategies',
        category: 'Marketing',
        file: {
          fileName: 'marketing-strategy-2024.pptx',
          originalName: 'Marketing Strategy 2024.pptx',
          fileSize: 4096000,
          fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        },
        isActive: true
      }
    ];

    // Seed Links
    const links = [
      {
        type: 'link',
        name: 'Company Portal',
        description: 'Main company intranet portal',
        category: 'Company',
        url: 'https://portal.company.com',
        icon: '🏢',
        isActive: true
      },
      {
        type: 'link',
        name: 'IT Support',
        description: 'Submit IT helpdesk tickets',
        category: 'Support',
        url: 'https://support.company.com',
        icon: '🛠️',
        isActive: true
      },
      {
        type: 'link',
        name: 'Training Center',
        description: 'Online learning platform',
        category: 'Training',
        url: 'https://training.company.com',
        icon: '📚',
        isActive: true
      },
      {
        type: 'link',
        name: 'Benefits Portal',
        description: 'Employee benefits information',
        category: 'HR',
        url: 'https://benefits.company.com',
        icon: '🎁',
        isActive: true
      },
      {
        type: 'link',
        name: 'Company News',
        description: 'Latest company announcements',
        category: 'Communication',
        url: 'https://news.company.com',
        icon: '📰',
        isActive: true
      },
      {
        type: 'link',
        name: 'Knowledge Base',
        description: 'Documentation and FAQs',
        category: 'Support',
        url: 'https://kb.company.com',
        icon: '❓',
        isActive: true
      }
    ];

    // Insert all resources
    const allResources = [...applications, ...documents, ...links];
    await Resource.insertMany(allResources);

    console.log(`✅ Seeded ${applications.length} applications`);
    console.log(`✅ Seeded ${documents.length} documents`);
    console.log(`✅ Seeded ${links.length} links`);
    console.log(`🎉 Total: ${allResources.length} resources created`);

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedResources();