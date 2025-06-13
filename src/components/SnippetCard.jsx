import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SnippetCard = ({ title, code }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const buttonRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      if (buttonRef.current) {
        buttonRef.current.classList.add('copy-success');
      }
      toast({
        title: "Copied to clipboard!",
        description: `Snippet "${title}" is ready to paste.`,
        duration: 2000,
      });
      setTimeout(() => {
        setCopied(false);
        if (buttonRef.current) {
          buttonRef.current.classList.remove('copy-success');
        }
      }, 2000);
    }).catch(err => {
      toast({
        variant: "destructive",
        title: "Oops! Copy failed.",
        description: "Could not copy to clipboard. Please try again.",
        duration: 3000,
      });
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="snippet-card p-4 rounded-lg flex flex-col gap-3"
    >
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <Button ref={buttonRef} variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <pre className="text-sm p-4 rounded-md overflow-x-auto code-block font-mono scrollbar-thin">
        <code>{code}</code>
      </pre>
    </motion.div>
  );
};

export default SnippetCard;