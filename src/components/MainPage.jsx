import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, ListTodo } from 'lucide-react';
import CodeSnippets from '@/components/CodeSnippets';
import WorkflowPlanner from '@/components/WorkflowPlanner';

const MainPage = () => {
  return (
    <div className="container max-w-screen-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Tabs defaultValue="snippets" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="snippets" className="py-3 text-base gap-2">
              <Code className="h-5 w-5" /> Code Snippets
            </TabsTrigger>
            <TabsTrigger value="workflow" className="py-3 text-base gap-2">
              <ListTodo className="h-5 w-5" /> AI Workflow Planner
            </TabsTrigger>
          </TabsList>
          <TabsContent value="snippets" className="mt-6">
            <CodeSnippets />
          </TabsContent>
          <TabsContent value="workflow" className="mt-6">
            <WorkflowPlanner />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default MainPage;