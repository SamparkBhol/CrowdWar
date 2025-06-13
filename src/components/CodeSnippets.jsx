import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { categories } from '@/data/snippets';
import SnippetCard from '@/components/SnippetCard';
import { Search } from 'lucide-react';

const CodeSnippets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(categories[0].name);

  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return { categories, allSnippets: [] };
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    const allSnippets = [];
    const filteredCategories = categories
      .map(category => {
        const filteredSnippets = category.snippets.filter(
          snippet =>
            snippet.title.toLowerCase().includes(lowercasedFilter) ||
            snippet.code.toLowerCase().includes(lowercasedFilter) ||
            category.name.toLowerCase().includes(lowercasedFilter)
        );
        if (filteredSnippets.length > 0) {
          allSnippets.push(...filteredSnippets.map(s => ({ ...s, categoryName: category.name })));
        }
        return { ...category, snippets: filteredSnippets };
      })
      .filter(category => category.snippets.length > 0);
    return { categories: filteredCategories, allSnippets };
  }, [searchTerm]);

  const renderContent = () => {
    if (searchTerm) {
      return (
        <AnimatePresence>
          {filteredData.allSnippets.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
            >
              {filteredData.allSnippets.map(snippet => (
                <SnippetCard key={`${snippet.categoryName}-${snippet.title}`} title={snippet.title} code={snippet.code} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <h3 className="text-2xl font-semibold">No results found for "{searchTerm}"</h3>
              <p>Try adjusting your search term.</p>
            </div>
          )}
        </AnimatePresence>
      );
    }

    return (
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto scrollbar-thin pb-2">
          <TabsList className="bg-transparent p-0 border-b border-border rounded-none">
            {categories.map(category => (
              <TabsTrigger
                key={category.name}
                value={category.name}
                className="pb-3 text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <AnimatePresence mode="wait">
          {categories.map(category => (
            <TabsContent key={category.name} value={category.name} className="mt-6" forceMount={activeTab === category.name}>
               {activeTab === category.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnimatePresence>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.snippets.map(snippet => (
                        <SnippetCard key={snippet.title} title={snippet.title} code={snippet.code} />
                      ))}
                    </div>
                  </AnimatePresence>
                </motion.div>
              )}
            </TabsContent>
          ))}
        </AnimatePresence>
      </Tabs>
    );
  };

  return (
    <div>
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search snippets by title, content, or category..."
          className="w-full pl-10 h-12 text-base bg-muted/50 border-border search-glow"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      {renderContent()}
    </div>
  );
};

export default CodeSnippets;