import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

interface TicketFiltersProps {
  selectedZone: string;
  onZoneChange: (zone: string) => void;
}

const TicketFilters = ({ selectedZone, onZoneChange }: TicketFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap items-center">
        <Button variant="outline" size="sm" className="gap-2 text-xs sm:text-sm">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filtros</span>
        </Button>

        <Select value={selectedZone} onValueChange={onZoneChange}>
          <SelectTrigger className="w-28 sm:w-32 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas Zonas</SelectItem>
            <SelectItem value="frontstage">Frontstage</SelectItem>
            <SelectItem value="camarote">Camarote</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TicketFilters;