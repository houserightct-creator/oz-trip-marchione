export interface Traveler {
  id: string;
  name: string;
  tag: string;
}

export interface FlightLeg {
  id: string;
  flight: string;
  from: string;
  dep: string;
  to: string;
  arr: string;
  note: string;
}

export interface Flight {
  id: string;
  title: string;
  legs: FlightLeg[];
}

export interface ItineraryStop {
  id: string;
  location: string;
  emoji: string;
  startDate: string;
  nights: number;
  description: string;
  tags: string[];
}

export interface ScheduleEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  who: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface Checklist {
  id: string;
  name: string;
  items: ChecklistItem[];
}

export interface BudgetItem {
  id: string;
  category: string;
  icon: string;
  amount: number;
  note: string;
}

export interface Contact {
  id: string;
  name: string;
  type: string;
  location: string;
  notes: string;
}

export interface DocItem {
  id: string;
  label: string;
  value: string;
}

export interface DayTrip {
  id: string;
  name: string;
  description: string;
  timeframe: string;
  tag: string;
  votes: number;
}

export interface TripData {
  passkey: string;
  crew: Traveler[];
  flights: Flight[];
  itinerary: ItineraryStop[];
  schedule: ScheduleEvent[];
  checklists: Checklist[];
  budget: BudgetItem[];
  contacts: Contact[];
  docs: DocItem[];
  dayTrips: DayTrip[];
  notes: string;
}
