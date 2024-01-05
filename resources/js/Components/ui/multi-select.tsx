import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/Components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";

export type OptionType = Record<"value" | "label", string>;

interface MultiSelectProps {
    options: Record<"value" | "label", string>[];
    selected: string[];
    // onChange: React.Dispatch<
    //     React.SetStateAction<Record<"value" | "label", string>[]>
    // >;
    onChange: (selected: string[]) => void;
    className?: string;
    placeholder?: string;
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
    ({ options, selected, onChange, className, ...props }, ref) => {
        const [open, setOpen] = React.useState(false);

        const handleUnselect = (item: string) => {
            onChange(selected.filter((i) => i !== item));
        };

        // on delete key press, remove last selected item
        React.useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Backspace" && selected.length > 0) {
                    onChange(
                        selected.filter(
                            (_, index) => index !== selected.length - 1
                        )
                    );
                }

                // close on escape
                if (e.key === "Escape") {
                    setOpen(false);
                }
            };

            document.addEventListener("keydown", handleKeyDown);

            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            };
        }, [onChange, selected]);

        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className={className}>
                    <Button
                        ref={ref}
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={`group w-full justify-between ${
                            selected.length > 1 ? "h-full" : "h-10"
                        }`}
                        onClick={() => setOpen(!open)}
                    >
                        <div className="flex flex-wrap items-center gap-1">
                            {selected.map((item) => (
                                <Badge
                                    variant="outline"
                                    key={item}
                                    className="flex items-center gap-1 group-hover:bg-background"
                                    onClick={() => handleUnselect(item)}
                                >
                                    {/* {item.label} */}
                                    {
                                        options?.find(
                                            (option) => option.value === item
                                        )?.label
                                    }
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="icon"
                                        className="border-none"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUnselect(item);
                                            }
                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleUnselect(item);
                                        }}
                                    >
                                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                    </Button>
                                </Badge>
                            ))}
                            {selected.length === 0 && (
                                <span>{props.placeholder ?? "Select ..."}</span>
                            )}
                        </div>
                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 min-w-[var(--radix-popover-trigger-width)]">
                    <Command className={className}>
                        <CommandInput
                            placeholder="Search ..."
                            className="border-none outline-none focus:ring-0"
                        />
                        <CommandEmpty>No item found.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    onSelect={() => {
                                        onChange(
                                            selected.some(
                                                (item) => item === option.value
                                            )
                                                ? selected.filter(
                                                      (item) =>
                                                          item !== option.value
                                                  )
                                                : [...selected, option?.value]
                                        );
                                        setOpen(true);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selected.some(
                                                (item) => item === option.value
                                            )
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        );
    }
);

MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
