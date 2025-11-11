'use client'

import { useEffect, useState, startTransition } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Check initial theme
        const theme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = theme === 'dark' || (!theme && prefersDark);

        startTransition(() => {
            setMounted(true);
            setIsDark(shouldBeDark);
        });

        if (shouldBeDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const handleToggle = (checked: boolean) => {
        setIsDark(checked);
        if (checked) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    if (!mounted) {
        return null; // Prevent hydration mismatch
    }

    return (
        <div className="flex items-center gap-2">
            <Sun className="size-4 text-white" />
            <Switch
                checked={isDark}
                onCheckedChange={handleToggle}
                className="data-[state=checked]:bg-violet-400"
            />
            <Moon className="size-4 text-white" />
        </div>
    );
}

