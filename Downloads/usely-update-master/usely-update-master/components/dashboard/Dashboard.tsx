'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from './DashboardLayout';
import UsageOverview from './UsageOverview';
import BillingDetails from './BillingDetails';
import SubscriptionManagement from './SubscriptionManagement';

export default function Dashboard() {
  const [isSeeding, setIsSeeding] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const seedTestData = async () => {
    setIsSeeding(true);
    try {
      const response = await fetch('/api/dashboard/seed-data', {
        method: 'POST'
      });
      if (response.ok) {
        // Reload the page to show the new data
        window.location.reload();
      }
    } catch (error) {
      console.error('Error seeding data:', error);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        className="mb-8"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400 text-lg">Monitor your AI usage, manage costs, and control user access across all LLM providers.</p>
          </div>
          <button
            onClick={seedTestData}
            disabled={isSeeding}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {isSeeding ? 'Adding Sample Data...' : 'Add Sample Data'}
          </button>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <UsageOverview />
        </motion.div>
        <motion.div variants={itemVariants}>
          <BillingDetails />
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <SubscriptionManagement />
      </motion.div>
    </DashboardLayout>
  );
} 