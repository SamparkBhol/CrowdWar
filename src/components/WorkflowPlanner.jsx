import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, PlusCircle } from 'lucide-react';
import TaskInsights from '@/components/TaskInsights';
import { useToast } from '@/components/ui/use-toast';

const WorkflowPlanner = () => {
  const [tasks, setTasks] = useLocalStorage('vault-tasks', []);
  const [newTask, setNewTask] = useState({ title: '', priority: 'Medium' });
  const { toast } = useToast();

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      toast({ variant: "destructive", title: "Task title cannot be empty." });
      return;
    }
    const taskToAdd = { id: Date.now(), ...newTask, completed: false };
    setTasks(prevTasks => [...prevTasks, taskToAdd]);
    setNewTask({ title: '', priority: 'Medium' });
    toast({ title: "Task added successfully!", description: `"${taskToAdd.title}" is on your list.` });
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find(task => task.id === taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({ title: "Task removed.", description: `"${taskToDelete.title}" has been deleted.` });
  };
  
  const sortedTasks = [...tasks].sort((a,b) => a.completed - b.completed);

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleAddTask} className="grid md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <Label htmlFor="task-title">New Task</Label>
              <Input
                id="task-title"
                placeholder="e.g., Deploy to production"
                value={newTask.title}
                onChange={e => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="task-priority">Priority</Label>
              <Select value={newTask.priority} onValueChange={p => setNewTask({ ...newTask, priority: p })}>
                <SelectTrigger id="task-priority">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              <PlusCircle className="h-4 w-4 mr-2" /> Add Task
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="mt-8 space-y-4">
        <AnimatePresence>
        {sortedTasks.map(task => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="task-card" data-completed={task.completed}>
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                    />
                    <label htmlFor={`task-${task.id}`} className="font-medium cursor-pointer truncate">{task.title}</label>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      task.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                      task.priority === 'Medium' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {task.priority}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => deleteTask(task.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
         {tasks.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <h3 className="text-xl font-semibold">Your workflow is clear!</h3>
            <p>Add a new task above to get started.</p>
          </div>
        )}
      </div>

      <TaskInsights tasks={tasks} />
    </div>
  );
};

export default WorkflowPlanner;