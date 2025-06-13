import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Lightbulb, PieChart, Activity, Target } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskInsights = ({ tasks }) => {
  const insights = useMemo(() => {
    if (!tasks || tasks.length === 0) {
      return {
        totalTasks: 0,
        completedTasks: 0,
        completionRate: 0,
        priorityCounts: { Low: 0, Medium: 0, High: 0 },
        suggestion: "Add some tasks to get started!",
        nextTask: null,
      };
    }

    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    const priorityCounts = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, { Low: 0, Medium: 0, High: 0 });

    const incompleteTasks = tasks.filter(t => !t.completed);
    let nextTask = null;
    let suggestion = "Keep up the great work! ✨";

    if (incompleteTasks.length > 0) {
      const highPriority = incompleteTasks.find(t => t.priority === 'High');
      const mediumPriority = incompleteTasks.find(t => t.priority === 'Medium');
      
      nextTask = highPriority || mediumPriority || incompleteTasks[0];
      suggestion = `Your next focus should be: "${nextTask.title}". Let's get it done!`;
    } else if (totalTasks > 0) {
        suggestion = "All tasks completed! Great job! 🎉 Ready to add more?"
    }
    
    if (totalTasks > 5 && completionRate < 30) {
        suggestion = "Feeling overwhelmed? Try tackling a small, low-priority task first to build momentum."
    }

    return {
      totalTasks,
      completedTasks,
      completionRate,
      priorityCounts,
      suggestion,
      nextTask,
    };
  }, [tasks]);

  const pieData = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [
      {
        label: 'Priority',
        data: [insights.priorityCounts.Low, insights.priorityCounts.Medium, insights.priorityCounts.High],
        backgroundColor: ['#3b82f6', '#f97316', '#ef4444'],
        borderColor: '#1e293b',
        borderWidth: 2,
      },
    ],
  };
  
  const pieOptions = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e2e8f0',
          font: { size: 12 },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8"
    >
      <Accordion type="single" collapsible defaultValue="insights" className="w-full">
        <AccordionItem value="insights" className="border-border rounded-lg bg-card overflow-hidden">
          <AccordionTrigger className="px-6 text-lg font-semibold hover:no-underline">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <span>AI-Powered Task Insights</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <Card className="mb-6 bg-secondary/50">
              <CardHeader className="flex-row items-center gap-4">
                 <Activity className="h-8 w-8 text-primary flex-shrink-0" />
                 <div>
                  <CardTitle className="text-base font-medium">AI Suggestion</CardTitle>
                   <p className="text-sm text-muted-foreground">{insights.suggestion}</p>
                 </div>
              </CardHeader>
            </Card>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{insights.completionRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    {insights.completedTasks} of {insights.totalTasks} tasks completed
                  </p>
                  <Progress value={insights.completionRate} className="mt-4 h-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Task Priorities</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-40">
                    <Pie data={pieData} options={pieOptions} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default TaskInsights;