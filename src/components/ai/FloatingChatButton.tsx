
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, X } from 'lucide-react';
import { CvAgentChatPopup } from '@/components/ai/CvAgentChatPopup';
import { cn } from '@/lib/utils';

const FAB_SIZE_CLASSES = "h-16 w-16";
const FAB_SIZE_NUMERIC = 64; // Corresponds to w-16 (16 * 0.25rem = 4rem = 64px)
const FAB_MARGIN_CLASSES = "bottom-6 right-6";
const FAB_MARGIN_NUMERIC = 24; // Corresponds to 6 (6 * 0.25rem = 1.5rem = 24px)

export function FloatingChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [didDrag, setDidDrag] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; initialTop: number; initialLeft: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const fabSize = FAB_SIZE_NUMERIC;
  const fabMargin = FAB_MARGIN_NUMERIC;

  // Initialize position
  useEffect(() => {
    const initialTop = window.innerHeight - fabSize - fabMargin;
    const initialLeft = window.innerWidth - fabSize - fabMargin;
    setPosition({ top: initialTop, left: initialLeft });
  }, [fabSize, fabMargin]); // Rerun if these somehow change, though they are const

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    // e.preventDefault(); // Prevents text selection but can interfere with focus
    setIsDragging(true);
    setDidDrag(false);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialTop: position.top,
      initialLeft: position.left,
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !dragStartRef.current || !buttonRef.current) return;
    
    setDidDrag(true); // Mark that a drag has occurred

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    
    let newTop = dragStartRef.current.initialTop + dy;
    let newLeft = dragStartRef.current.initialLeft + dx;

    // Boundary checks
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft + buttonRect.width > windowWidth) newLeft = windowWidth - buttonRect.width;
    if (newTop + buttonRect.height > windowHeight) newTop = windowHeight - buttonRect.height;

    setPosition({ top: newTop, left: newLeft });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    // Note: didDrag is reset in handleClick to allow immediate re-click
  }, [handleMouseMove]);
  
  // Cleanup event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);


  const handleClick = () => {
    if (didDrag) {
      setDidDrag(false); // Reset for next interaction
      return;
    }
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <Button
        ref={buttonRef}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        style={ position.top !== 0 || position.left !== 0 ? { 
            transform: `translate(${position.left}px, ${position.top}px)`,
            // Overwrite Tailwind fixed positioning when actively dragging/positioned
            position: 'fixed', 
            // Set initial to 0,0 then translate to effectively use transform for positioning
            top: 0, 
            left: 0,
            bottom: 'auto',
            right: 'auto',
          } : {} // Empty style object if not yet positioned by state to let Tailwind classes take over
        }
        className={cn(
          FAB_SIZE_CLASSES,
          "fixed z-50 rounded-full p-0 shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center",
          // Only apply bottom-6 right-6 if not being actively dragged/positioned by state
          (position.top === 0 && position.left === 0 && !isDragging) ? FAB_MARGIN_CLASSES : "", 
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        )}
        aria-label={isChatOpen ? "Close chat assistant" : "Open AI chat assistant"}
        title={isChatOpen ? "Close chat assistant" : "Open AI chat assistant"}
      >
        {isChatOpen ? <X size={28} /> : <Bot size={28} />}
      </Button>
      <CvAgentChatPopup open={isChatOpen} onOpenChange={setIsChatOpen} />
    </>
  );
}
